import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_mailer',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Email status enum
export enum EmailStatus {
  NOT_SENT = 'not_sent',
  SENT = 'sent',
  ERROR = 'error'
}

// Email history interface
export interface EmailHistory {
  id?: number;
  receiver: string;
  receiver_name?: string;
  phone_number?: string;
  subject: string;
  mail_content: string;
  status: EmailStatus;
  error_message?: string;
  sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

// Initialize database tables
export async function initializeDatabase(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    
    // Create email_history table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS email_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        receiver VARCHAR(255) NOT NULL,
        receiver_name VARCHAR(255),
        phone_number VARCHAR(20),
        subject VARCHAR(500) NOT NULL,
        mail_content TEXT NOT NULL,
        status ENUM('not_sent', 'sent', 'error') DEFAULT 'not_sent',
        error_message TEXT,
        sent_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_receiver (receiver),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    connection.release();
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Insert email history record
export async function insertEmailHistory(emailData: Omit<EmailHistory, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  try {
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(`
      INSERT INTO email_history (
        receiver, receiver_name, phone_number, subject, 
        mail_content, status, error_message, sent_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      emailData.receiver,
      emailData.receiver_name || null,
      emailData.phone_number || null,
      emailData.subject,
      emailData.mail_content,
      emailData.status,
      emailData.error_message || null,
      emailData.sent_at || null
    ]);
    
    connection.release();
    
    const insertResult = result as mysql.ResultSetHeader;
    return insertResult.insertId;
  } catch (error) {
    console.error('Failed to insert email history:', error);
    throw error;
  }
}

// Update email history status
export async function updateEmailHistoryStatus(
  id: number, 
  status: EmailStatus, 
  errorMessage?: string,
  sentAt?: Date
): Promise<void> {
  try {
    const connection = await pool.getConnection();
    
    await connection.execute(`
      UPDATE email_history 
      SET status = ?, error_message = ?, sent_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      status,
      errorMessage || null,
      sentAt || null,
      id
    ]);
    
    connection.release();
  } catch (error) {
    console.error('Failed to update email history status:', error);
    throw error;
  }
}

// Get email history by ID
export async function getEmailHistoryById(id: number): Promise<EmailHistory | null> {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT * FROM email_history WHERE id = ?
    `, [id]);
    
    connection.release();
    
    const results = rows as EmailHistory[];
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Failed to get email history:', error);
    throw error;
  }
}

// Get email history with pagination
export async function getEmailHistory(
  page: number = 1, 
  limit: number = 10, 
  status?: EmailStatus
): Promise<{ data: EmailHistory[], total: number, totalPages: number }> {
  try {
    const connection = await pool.getConnection();
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    let params: any[] = [];
    
    if (status) {
      whereClause = 'WHERE status = ?';
      params.push(status);
    }
    
    // Get total count
    const [countResult] = await connection.execute(`
      SELECT COUNT(*) as total FROM email_history ${whereClause}
    `, params);
    
    const total = (countResult as any[])[0].total;
    
    // Get paginated data
    const [rows] = await connection.execute(`
      SELECT * FROM email_history ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `, [...params, limit, offset]);
    
    connection.release();
    
    return {
      data: rows as EmailHistory[],
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Failed to get email history:', error);
    throw error;
  }
}

export default pool;
