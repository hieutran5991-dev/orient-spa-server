// Promotion data types
export interface Promotion {
  id: string
  title: string
  duration: string
  description: string[]
  imageUrl: string
  slug: string
  price?: {
    original: string
    discounted: string
  }
  validUntil?: string
  featured?: boolean
}

// Current promotions data
export const promotionsData: Promotion[] = [
  {
    id: 'body-foot-massage',
    title: 'Body & Foot Massage',
    duration: '105min',
    description: [
      'Body Massage 75 minutes',
      'Foot massage/treatment 30 minutes',
      'Choice of Aroma, Thai, Deep Tissue or Hotstone Massage'
    ],
    imageUrl: '/images/4912d86776594b171a8c8e711813b796.jpg',
    slug: 'body-foot-massage',
    price: {
      original: '720,000 VND',
      discounted: '620,000 VND'
    },
    validUntil: 'August 31, 2025',
    featured: true
  },
  {
    id: 'body-facial-care',
    title: 'Body & Facial Care',
    duration: '120min',
    description: [
      'Body Massage 75 minutes',
      'Facial care 45 minutes',
      'Choice of Aroma, Thai, Deep Tissue or Hotstone Massage'
    ],
    imageUrl: '/images/1778e314640f2068c1a75a9074cfeea6.jpg',
    slug: 'body-facial-care',
    price: {
      original: '920,000 VND',
      discounted: '820,000 VND'
    },
    validUntil: 'August 31, 2025',
    featured: true
  },
  {
    id: 'scrub-body-massage',
    title: 'Scrub & Body Massage',
    duration: '130min',
    description: ['Body scrub 40 minutes', 'Body massage 90 minutes', 'Unlimited choice for body massage types'],
    imageUrl: '/images/794b418e99094ff7a77982eb09180284.jpg',
    slug: 'scrub-body-massage',
    price: {
      original: '1,020,000 VND',
      discounted: '920,000 VND'
    },
    validUntil: 'August 31, 2025',
    featured: true
  },
  {
    id: 'healing-touch-package',
    title: 'Healing Touch Package',
    duration: '180min',
    description: [
      'Foot scrub 10 minutes',
      'Sauna/ Herbal bath 20 minutes',
      'Body massage 90 minutes',
      'Ori Hair-wash 60 minutes'
    ],
    imageUrl: '/images/a04316765fd496c858bdd28e64d54c9a.jpg',
    slug: 'healing-touch-package',
    price: {
      original: '1,400,000 VND',
      discounted: '1,200,000 VND'
    },
    validUntil: 'August 31, 2025',
    featured: true
  },
  {
    id: 'pampering-package',
    title: 'Pampering Package',
    duration: '285min',
    description: [
      'Body Scrub 40 minutes',
      'Herbal Bath 20 minutes',
      'Signature Massage 90 minutes',
      'Deep Cleansing Facial 75 minutes',
      'Spa Foot Care/Nails (Manicure/ Pedicure)'
    ],
    imageUrl: '/images/8e9d983aa9da72c1ec45b92cf3c2325c.jpg',
    slug: 'pampering-package',
    price: {
      original: '2,090,000 VND',
      discounted: '1,890,000 VND'
    },
    validUntil: 'August 31, 2025',
    featured: true
  },
  {
    id: 'couples-retreat',
    title: 'Couples Romantic Retreat',
    duration: '150min',
    description: [
      'Side-by-side couples massage 90 minutes',
      'Champagne and chocolate treats',
      'Rose petal foot bath',
      'Complimentary aromatherapy candles'
    ],
    imageUrl: '/images/couples-massage.jpg',
    slug: 'couples-retreat',
    price: {
      original: '1,800,000 VND',
      discounted: '1,500,000 VND'
    },
    validUntil: 'September 15, 2025',
    featured: false
  },
  {
    id: 'student-special',
    title: 'Student Special - Deep Tissue Massage',
    duration: '60min',
    description: [
      'Deep tissue massage 60 minutes',
      'Valid with student ID',
      'Available Monday-Thursday only',
      'Perfect for study stress relief'
    ],
    imageUrl: '/images/student-massage.jpg',
    slug: 'student-special',
    price: {
      original: '450,000 VND',
      discounted: '350,000 VND'
    },
    validUntil: 'December 31, 2025',
    featured: false
  },
  {
    id: 'loyalty-member',
    title: 'Loyalty Member Exclusive',
    duration: '120min',
    description: [
      'Any 90-minute massage of choice',
      'Complimentary 30-minute facial',
      'Free herbal tea service',
      'Valid for VIP members only'
    ],
    imageUrl: '/images/vip-treatment.jpg',
    slug: 'loyalty-member',
    price: {
      original: '850,000 VND',
      discounted: '650,000 VND'
    },
    validUntil: 'Ongoing',
    featured: false
  }
]

// Helper functions
export const getFeaturedPromotions = (): Promotion[] => {
  return promotionsData.filter((promo) => promo.featured)
}

export const getPromotionBySlug = (slug: string): Promotion | undefined => {
  return promotionsData.find((promo) => promo.slug === slug)
}

export const getAllPromotions = (): Promotion[] => {
  return promotionsData
}

export const getActivePromotions = (): Promotion[] => {
  const now = new Date()
  return promotionsData.filter((promo) => {
    if (promo.validUntil === 'Ongoing') return true

    const validUntil = new Date(promo.validUntil || '')
    return validUntil > now
  })
}
