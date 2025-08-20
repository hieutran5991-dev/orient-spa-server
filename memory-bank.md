# Memory Bank - Next.js Spa Services & Prices Application

## Project Overview

This is a Next.js 15 application for a spa/wellness center that provides service listings, pricing, and booking functionality. The project uses TypeScript, Tailwind CSS, and includes email functionality with nodemailer.

## File Structure

### Core Application Structure

```
src/
├── app/                          # Next.js App Router
│   ├── services-prices/          # Services & Prices page
│   │   └── page.tsx             # Main services listing page
│   ├── promotions/              # Promotions section
│   │   ├── page.tsx            # Promotions listing page
│   │   └── [slug]/             # Dynamic promotion detail pages
│   │       └── page.tsx        # Individual promotion page
│   ├── booking/                 # Booking functionality
│   │   └── page.tsx            # Booking page
│   ├── contact/                 # Contact page
│   ├── confirm/                 # Confirmation page
│   ├── api/                     # API routes
│   ├── layout.tsx              # Root layout component
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── Layout.tsx              # Main layout wrapper
│   ├── BookingContent.tsx      # Booking form component
│   ├── ContactForm.tsx         # Contact form component
│   ├── HomeContent.tsx         # Home page content
│   └── layout/                 # Layout components
│       ├── Header.tsx          # Site header
│       └── Footer.tsx          # Site footer
├── mock/                       # Mock data for development
│   ├── servicesData.ts        # Services and pricing data
│   └── promotionsData.ts      # Promotions and special offers data
├── css/                       # Additional CSS files
│   └── services.css          # Services page specific styles
└── lib/                      # Utility functions
```

### Public Assets

```
public/
├── css/                       # Global stylesheets
│   └── style.css             # Main stylesheet
├── js/                       # JavaScript files
│   ├── booking.js           # Booking functionality
│   ├── common.js            # Common utilities
│   └── lib.js               # Library functions
├── images/                   # Image assets
├── fonts/                    # Font files
└── static/                   # Static files
    └── images/
        └── Orient-Spa-Menu-2024_2025.pdf
```

## Services Data Structure

### Service Interface

```typescript
interface Service {
  id: number // Unique identifier
  name: string // Service name
  description: string // Service description (supports \n for line breaks)
  duration: string // Service duration (e.g., "1 hr 30 min")
  price: string // Service price (e.g., "580,000 VND")
  category: string // Service category name
}
```

### Service Categories

The application organizes services into 9 main categories:

1. **Special Promotion** (`tab-1`)

   - Combo packages with discounted prices
   - Limited-time offers
   - Multi-service bundles

2. **Orient Packages** (`tab-2`)

   - Signature spa packages
   - Traditional Oriental treatments
   - Luxury multi-hour experiences

3. **Body Massage** (`tab-3`)

   - Various massage types and durations
   - Different pressure levels
   - Aromatherapy, Thai, Deep Tissue, Hot Stone

4. **Foot Massage** (`tab-4`)

   - Foot-focused treatments
   - Reflexology services
   - Foot care and massage combinations

5. **Facial Care** (`tab-5`)

   - Facial treatments and skincare
   - Anti-aging services
   - Cleansing and rejuvenation

6. **Body Care** (`tab-6`)

   - Body scrubs and wraps
   - Exfoliation treatments
   - Body beautification services

7. **Nails Care** (`tab-7`)

   - Manicure and pedicure services
   - Gel polish applications
   - Nail maintenance and removal

8. **Nail Combo** (`tab-8`)

   - Combined nail services
   - Spa manicure/pedicure packages
   - Premium nail care combinations

9. **Shampoo & Blowdry** (`tab-9`)
   - Hair washing services
   - Hair styling and drying
   - Head massage combinations

## Promotions Data Structure

### Promotion Interface

```typescript
interface Promotion {
  id: string // Unique identifier
  title: string // Promotion title
  duration: string // Treatment duration (e.g., "105min")
  description: string[] // Array of included services
  imageUrl: string // Promotion image URL
  slug: string // URL slug for routing
  price?: {
    // Optional pricing information
    original: string // Original price
    discounted: string // Promotional price
  }
  validUntil?: string // Expiry date
  featured?: boolean // Featured promotion flag
}
```

### Promotions Categories

The application includes various types of promotions:

1. **Featured Promotions**

   - Body & Foot Massage (105min)
   - Body & Facial Care (120min)
   - Scrub & Body Massage (130min)
   - Healing Touch Package (180min)
   - Pampering Package (285min)

2. **Seasonal Offers**

   - Limited-time discounts
   - Holiday special packages
   - Monthly themed promotions

3. **Special Categories**
   - Couples packages
   - Student discounts
   - Loyalty member exclusives
   - Group booking offers

## Technical Implementation

### Key Components

#### Services Page (`/src/app/services-prices/page.tsx`)

- **Purpose**: Display all spa services organized by category with tabbed navigation
- **Features**:
  - Interactive tab system for service categories
  - Service cards with name, description, duration, and price
  - "Book Now" buttons that redirect to booking page
  - Responsive design using CSS classes from existing stylesheet
- **State Management**: Uses React useState for active tab management
- **Integration**: Uses Layout component for consistent header/footer

#### Mock Data (`/src/mock/servicesData.ts`)

- **Purpose**: Centralized service data management
- **Structure**:
  - Individual arrays for each service category
  - Combined serviceCategories array for easy iteration
  - Helper functions for data retrieval
  - Type definitions for TypeScript support

### Styling Approach

- **Main Styles**: Located in `/public/css/style.css`
- **Page-Specific**: Additional styles in `/src/css/services.css`
- **CSS Classes**: Uses existing class naming convention from original HTML
- **Responsive**: Built-in responsive design with existing CSS framework

### Booking Integration

- **Flow**: Services page → Booking page with service ID parameter
- **URL Pattern**: `/booking?service={serviceId}`
- **Backend**: Existing booking system handles service selection
- **JavaScript**: Integration with existing `/public/js/common.js` booking functions

## Data Management Strategy

### Mock Data Benefits

1. **Development Speed**: Quick iteration without backend dependency
2. **Type Safety**: Full TypeScript support with defined interfaces
3. **Maintenance**: Centralized data management in single file
4. **Testing**: Easy to modify data for testing different scenarios
5. **Scalability**: Easy migration to API endpoints when backend is ready

### Future API Integration

The mock data structure is designed to easily transition to API calls:

```typescript
// Current: Import from mock
import { servicesData, serviceCategories } from '@/mock/servicesData'

// Future: Fetch from API
const servicesData = await fetch('/api/services').then((res) => res.json())
```

## Development Guidelines

### Adding New Services

1. Add service object to appropriate category array in `/src/mock/servicesData.ts`
2. Ensure unique ID assignment
3. Follow existing naming and description patterns
4. Test booking integration with new service ID

### Modifying Categories

1. Update category arrays in mock data
2. Update tab configuration in services page
3. Ensure CSS classes support new categories
4. Test tab navigation functionality

### Styling Updates

1. Main styles in `/public/css/style.css`
2. Component-specific styles in `/src/css/services.css`
3. Follow existing class naming conventions
4. Test responsive behavior across devices

## Dependencies

### Core Technologies

- **Next.js 15**: App Router for routing and SSR
- **React 19**: Component library
- **TypeScript 5**: Type safety and development experience
- **Tailwind CSS 4**: Utility-first CSS framework

### Additional Libraries

- **nodemailer 7**: Email functionality for booking confirmations
- **mysql2**: Database connectivity
- **jQuery**: Legacy JavaScript for existing booking system

## Performance Considerations

### Client-Side Rendering

- Services page uses 'use client' directive for interactivity
- Tab switching is handled client-side for smooth UX
- Large service dataset is statically imported (no runtime fetch)

### Code Organization

- Separation of concerns with dedicated mock data file
- Reusable Layout component for consistent structure
- TypeScript interfaces for better development experience

## Security Notes

### Data Validation

- Service IDs should be validated before booking submission
- Price and duration formats should be consistent
- Description content should be sanitized if user-generated

### API Integration Preparation

- Mock data structure ready for API replacement
- Service ID validation prepared for backend integration
- Booking flow designed with security considerations

## Maintenance Tasks

### Regular Updates

1. **Service Prices**: Update pricing in mock data as needed
2. **Service Descriptions**: Keep descriptions current and accurate
3. **Seasonal Promotions**: Update Special Promotion category regularly
4. **Category Organization**: Reorganize services as business evolves

### Monitoring

1. **Booking Conversion**: Track which services get booked most
2. **User Interaction**: Monitor tab usage and popular categories
3. **Performance**: Watch for any performance issues with large datasets
4. **Mobile Experience**: Ensure responsive design works across devices

## Notes for Future Development

### API Migration Checklist

- [ ] Create backend API endpoints for services
- [ ] Implement caching strategy for service data
- [ ] Add content management system for easy service updates
- [ ] Implement service availability checking
- [ ] Add pricing variations (member vs. non-member)
- [ ] Implement service recommendations
- [ ] Add service image support
- [ ] Create admin interface for service management

### Enhanced Features Roadmap

- [ ] Service search and filtering
- [ ] Price comparison tools
- [ ] Service bundling recommendations
- [ ] Customer reviews and ratings
- [ ] Loyalty program integration
- [ ] Multi-language support
- [ ] Advanced booking calendar integration
- [ ] Real-time availability updates
