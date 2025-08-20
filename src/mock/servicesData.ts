// Service data types
export interface Service {
  id: number
  name: string
  description: string
  duration: string
  price: string
  category: string
}

export interface ServiceCategory {
  id: string
  label: string
  services: Service[]
}

// Special Promotion Services
export const specialPromotionServices: Service[] = [
  {
    id: 1,
    name: 'Body + Foot Massage',
    description:
      'Body Massage 75 minutes\nFoot massage/treatment 30 minutes\nChoice of Aroma therapy, Thai massage or Deep Tissue Massage',
    duration: '1 hr 45 min',
    price: '620,000 VND',
    category: 'Special Promotion'
  },
  {
    id: 2,
    name: 'Body + Facial Care',
    description:
      'Body Massage 75 minutes\nFacial care 45 minutes\nChoice of Aroma, Thai, Deep Tissue or Hotstone Massage',
    duration: '2 hr',
    price: '820,000 VND',
    category: 'Special Promotion'
  },
  {
    id: 3,
    name: 'Scrub + Body Massage',
    description: 'Body scrub 40 minutes\nBody massage 90 minutes\nUnlimited choice for body massage types',
    duration: '2 hr 10 min',
    price: '920,000 VND',
    category: 'Special Promotion'
  },
  {
    id: 4,
    name: 'Healing Touch Package',
    description:
      'Foot scrub 10 minutes\nSauna/ Herbal bath 20 minutes\nBody massage 90 minutes\nOri Hair-wash 60 minutes',
    duration: '3 hr',
    price: '1,200,000 VND',
    category: 'Special Promotion'
  },
  {
    id: 60,
    name: 'Pampering Package',
    description:
      "Body Scrub 40'\nHerbal Bath 20'\nSignature Massage 90'\nDeep Cleansing Facial 75'\nSpa Foot Care/Nails (Manicure/ Pedicure)",
    duration: '4 hr 45 min',
    price: '1,890,000 VND',
    category: 'Special Promotion'
  }
]

// Orient Packages Services
export const orientPackagesServices: Service[] = [
  {
    id: 32,
    name: 'Glowing Package',
    description: "Foot treatment 45' + Aromatherapy massage 75' + Shampoo & Blow dry 40'",
    duration: '2 hr 40 min',
    price: '920,000 VND',
    category: 'Orient Packages'
  },
  {
    id: 33,
    name: 'Refreshing Package',
    description: "Body scrub 40' + Body massage 60' + Basic Facial 45'",
    duration: '2 hr 25 min',
    price: '1,150,000 VND',
    category: 'Orient Packages'
  },
  {
    id: 34,
    name: 'Orient Signature Package',
    description: "Body scrub 40' + Herbal bath/ Body Wrap 20' + Body massage 90' + Facial 30'",
    duration: '3 hr',
    price: '1,350,000 VND',
    category: 'Orient Packages'
  },
  {
    id: 35,
    name: 'Gentleman Care',
    description:
      "De-stress tea, Foot massage 30' + Body scrub + Back massage 30' + Facial 30' + Basic manicure pedicure / Shampoo & Blowdry",
    duration: '3 hr',
    price: '1,250,000 VND',
    category: 'Orient Packages'
  },
  {
    id: 36,
    name: "Couple's Delight",
    description: "Footbath + Relaxing body massage 90' + Facial 30' for couple",
    duration: '2 hr',
    price: '1,650,000 VND',
    category: 'Orient Packages'
  },
  {
    id: 37,
    name: 'Orient Luxury Package',
    description:
      "Detox tea / Skin rejuvenation tea + Body scrub 40' + Body massage 75' + Ori hairwash & head massage + Relaxing 4-step pedicure",
    duration: '3 hr 45 min',
    price: '1,500,000 VND',
    category: 'Orient Packages'
  },
  {
    id: 38,
    name: 'Holistic Spa Package',
    description:
      "Fruit detox drinks + Body scrub 40' + Oriental Herbal bath + ORI Massage 2 hours + Deep Cleansing Facial Care + Basic Manicure, Pedicure with Callus treatment.",
    duration: '5 hr',
    price: '2,280,000 VND',
    category: 'Orient Packages'
  }
]

// Body Massage Services
export const bodyMassageServices: Service[] = [
  {
    id: 13,
    name: 'Back & Shoulder Massage',
    description: 'Reduce stiffness & improve circulation in back & shoulder area',
    duration: '45 min',
    price: '350,000 VND',
    category: 'Body Massage'
  },
  {
    id: 14,
    name: 'Head massage',
    description: 'Using a warm salt pillow as base, this treatment will relax your neck and head area completely',
    duration: '30 min',
    price: '280,000 VND',
    category: 'Body Massage'
  },
  {
    id: 15,
    name: "Aroma Therapy Massage 60'",
    description: 'Foot bath, body massage with essential oils of choice. Pressure: Light - medium.',
    duration: '1 hr',
    price: '390,000 VND',
    category: 'Body Massage'
  },
  {
    id: 16,
    name: "Aroma Therapy Massage 75'",
    description: 'Foot bath, body massage with essential oils of choice. Pressure: Light - medium.',
    duration: '1 hr 15 min',
    price: '480,000 VND',
    category: 'Body Massage'
  },
  {
    id: 17,
    name: "Aroma Therapy Massage 90'",
    description: 'Foot bath, body massage with essential oils of choice. Pressure: Light - medium.',
    duration: '1 hr 30 min',
    price: '580,000 VND',
    category: 'Body Massage'
  },
  {
    id: 18,
    name: "Thai Massage 60'",
    description:
      'Foot bath, Thai massage that combines streching and blending technique to ease muscle tension\nPressure: Medium-Strong',
    duration: '1 hr',
    price: '420,000 VND',
    category: 'Body Massage'
  },
  {
    id: 19,
    name: "Thai Massage 75'",
    description:
      'Foot bath, Thai massage that combines streching and blending technique to ease muscle tension\nPressure: Medium-Strong',
    duration: '1 hr 15 min',
    price: '510,000 VND',
    category: 'Body Massage'
  },
  {
    id: 20,
    name: "Thai Massage 90'",
    description:
      'Foot bath, Thai massage that combines streching and blending technique to ease muscle tension\nPressure: Medium-Strong',
    duration: '1 hr 30 min',
    price: '600,000 VND',
    category: 'Body Massage'
  },
  {
    id: 21,
    name: "Hot Stone Massage 75'",
    description: 'Foot bath, Body massage with oil and using warm stone\nPressure: light-medium',
    duration: '1 hr 15 min',
    price: '490,000 VND',
    category: 'Body Massage'
  },
  {
    id: 22,
    name: "Hot Stone Massage 90'",
    description: 'Foot bath, Body massage with oil and using warm stone\nPressure: light-medium',
    duration: '1 hr 30 min',
    price: '600,000 VND',
    category: 'Body Massage'
  },
  {
    id: 23,
    name: "Deep Tissue Massage 60'",
    description:
      'Foot bath, using body massage with stronger pressure to relieve persistent muscle tensions.\nPressure: Medium - Strong - Very strong.',
    duration: '1 hr',
    price: '390,000 VND',
    category: 'Body Massage'
  },
  {
    id: 24,
    name: "Deep Tissue Massage 75'",
    description:
      'Foot bath, using body massage with stronger pressure to relieve persistent muscle tensions.\nPressure: Medium - Strong - Very strong.',
    duration: '1 hr 15 min',
    price: '480,000 VND',
    category: 'Body Massage'
  },
  {
    id: 25,
    name: "Deep Tissue Massage 90'",
    description:
      'Foot bath, using body massage with stronger pressure to relieve persistent muscle tensions.\nPressure: Medium - Strong - Very strong.',
    duration: '1 hr 30 min',
    price: '580,000 VND',
    category: 'Body Massage'
  },
  {
    id: 26,
    name: "ORI Signature Massage 4 in 1 (90')",
    description:
      'Foot bath, body massage with essential oil combining all techiques from Orient traditional massage (Vietnamese, Thai, Chinese, Japanese) and warm stone.',
    duration: '1 hr 30 min',
    price: '620,000 VND',
    category: 'Body Massage'
  },
  {
    id: 27,
    name: "ORI Signature Massage 4 in 1 (120')",
    description:
      'Foot bath, body massage with essential oil combining all techiques from Orient traditional massage (Vietnamese, Thai, Chinese, Japanese) and warm stone.',
    duration: '2 hr',
    price: '820,000 VND',
    category: 'Body Massage'
  }
]

// Foot Massage Services
export const footMassageServices: Service[] = [
  {
    id: 5,
    name: 'Foot Treatment',
    description: 'Foot bath, Scrub and callus removal, Massage, Lotion',
    duration: '45 min',
    price: '320,000 VND',
    category: 'Foot Massage'
  },
  {
    id: 7,
    name: 'Foot Massage With Hot Stone',
    description: 'Foot bath, foot massage with oil and combine with hot stone',
    duration: '1 hr 15 min',
    price: '420,000 VND',
    category: 'Foot Massage'
  },
  {
    id: 8,
    name: 'Foot and Head Massage',
    description: "Foot bath, foot massage with essential oils of choice for 60' and head massage 30'",
    duration: '1 hr 30 min',
    price: '520,000 VND',
    category: 'Foot Massage'
  },
  {
    id: 9,
    name: 'Foot and Back Massage',
    description: "Foot bath, foot massage with essential oils of choice 60', back massage 30'",
    duration: '1 hr 30 min',
    price: '550,000 VND',
    category: 'Foot Massage'
  }
]

// Facial Care Services
export const facialCareServices: Service[] = [
  {
    id: 28,
    name: 'Mini Facial',
    description: 'A quick relieving massage and treatment for your face',
    duration: '30 min',
    price: '300,000 VND',
    category: 'Facial Care'
  },
  {
    id: 29,
    name: 'Basic Facial Care',
    description: 'Cleansing, exfoliation, massage, facial mask, lotion application',
    duration: '45 min',
    price: '450,000 VND',
    category: 'Facial Care'
  },
  {
    id: 30,
    name: 'Deep Cleansing Facial Care',
    description:
      'Cleansing, exfoliation with rice bran, extraction/ blackhead removal, massage, detox facial mask, lotion application',
    duration: '1 hr 15 min',
    price: '650,000 VND',
    category: 'Facial Care'
  },
  {
    id: 31,
    name: 'Anti-aging Facial Care',
    description:
      'Cleansing, exfoliation with rice bran, extraction/ blackhead removal, massage, rebalancing facial mask, anti-aging serum',
    duration: '1 hr 15 min',
    price: '750,000 VND',
    category: 'Facial Care'
  }
]

// Body Care Services
export const bodyCareServices: Service[] = [
  {
    id: 10,
    name: 'Body Scrub',
    description: 'Choices of Himalayan salt, green tea or honey and lime',
    duration: '40 min',
    price: '360,000 VND',
    category: 'Body Care'
  },
  {
    id: 11,
    name: 'Body Scrub & Wrap',
    description:
      'Foot bath\nBody scrub with choices of oats, Himalayan salt, green tea or oats grains\nOats/mud/ aloe vera wrap',
    duration: '1 hr',
    price: '550,000 VND',
    category: 'Body Care'
  },
  {
    id: 12,
    name: 'Body Scrub + Wrap + Back Massage',
    description: "Body scrub, Body wrap, Back massage 45'",
    duration: '1 hr 45 min',
    price: '820,000 VND',
    category: 'Body Care'
  }
]

// Nails Care Services
export const nailsCareServices: Service[] = [
  {
    id: 39,
    name: 'CND Vinylux Long Wear Nail Polish (Manicure/Pedicure)',
    description:
      'A beautiful, long wear polish infused with Vitamin E, Karetin & Jojoba Oil. Only 15 mins to dry Colors range are the same with shellac. Last up to 7 days.',
    duration: '40 min',
    price: '180,000 VND',
    category: 'Nails Care'
  },
  {
    id: 41,
    name: 'CND Vinylux Long Wear Nail Polish (Manicure & Pedicure)',
    description:
      'A beautiful, long wear polish infused with Vitamin E, Karetin & Jojoba Oil. Only 15 mins to dry Colors range are the same with shellac. Last up to 7 days',
    duration: '1 hr 20 min',
    price: '320,000 VND',
    category: 'Nails Care'
  },
  {
    id: 42,
    name: 'Premium Gel Polish (Manicure/Pedicure)',
    description: 'Ultra intense color with long lasting shine and wear that last for weeks.',
    duration: '45 min',
    price: '240,000 VND',
    category: 'Nails Care'
  },
  {
    id: 43,
    name: 'Premium Gel Polish (Manicure & Pedicure)',
    description: 'Ultra intense color with long lasting shine and wear that last for weeks.',
    duration: '1 hr 30 min',
    price: '450,000 VND',
    category: 'Nails Care'
  },
  {
    id: 44,
    name: 'Gel Polish (Manicure/Pedicure)',
    description: 'High-quality gel polish for manicure or pedicure',
    duration: '45 min',
    price: '180,000 VND',
    category: 'Nails Care'
  },
  {
    id: 45,
    name: 'Gel Polish (Manicure & Pedicure)',
    description: 'High-quality gel polish for both manicure and pedicure',
    duration: '1 hr 30 min',
    price: '330,000 VND',
    category: 'Nails Care'
  },
  {
    id: 46,
    name: 'Gel Polish Removal',
    description: 'Professional gel polish removal service',
    duration: '20 min',
    price: '50,000 VND',
    category: 'Nails Care'
  },
  {
    id: 47,
    name: 'Hard Gel Removal',
    description: 'Professional hard gel removal service',
    duration: '1 hr 15 min',
    price: '100,000 VND',
    category: 'Nails Care'
  },
  {
    id: 48,
    name: 'Basic Manicure/ Pedicure',
    description: 'Basic nail care and shaping service',
    duration: '30 min',
    price: '100,000 VND',
    category: 'Nails Care'
  },
  {
    id: 49,
    name: 'Basic Manicure and Pedicure',
    description: 'Basic nail care for both hands and feet',
    duration: '1 hr',
    price: '180,000 VND',
    category: 'Nails Care'
  },
  {
    id: 50,
    name: 'Foot scrub',
    description: 'Exfoliating foot scrub treatment',
    duration: '30 min',
    price: '150,000 VND',
    category: 'Nails Care'
  },
  {
    id: 51,
    name: 'Spa Manicure/Pedicure',
    description: 'Premium nail care with relaxing treatment',
    duration: '1 hr',
    price: '350,000 VND',
    category: 'Nails Care'
  }
]

// Nail Combo Services
export const nailComboServices: Service[] = [
  {
    id: 54,
    name: 'Spa Manicure/Pedicure + Gel',
    description: 'Premium nail care combined with gel polish application',
    duration: '1 hr 40 min',
    price: '480,000 VND',
    category: 'Nail Combo'
  },
  {
    id: 55,
    name: 'Spa Manicure/Pedicure + Premium Gel Color',
    description: 'Premium nail care with high-end gel color application',
    duration: '2 hr',
    price: '520,000 VND',
    category: 'Nail Combo'
  },
  {
    id: 56,
    name: 'Spa Manicure and Pedicure + Gel Color',
    description: 'Complete nail care package with gel color for hands and feet',
    duration: '3 hr 30 min',
    price: '850,000 VND',
    category: 'Nail Combo'
  },
  {
    id: 57,
    name: 'Spa Manicure and Pedicure + Premium Gel Color',
    description: 'Complete premium nail care package with premium gel colors',
    duration: '3 hr 30 min',
    price: '960,000 VND',
    category: 'Nail Combo'
  }
]

// Shampoo & Blowdry Services
export const shampooBlowdryServices: Service[] = [
  {
    id: 58,
    name: 'Shampoo & Blowdry',
    description: 'Professional hair washing and styling service',
    duration: '40 min',
    price: '180,000 VND',
    category: 'Shampoo & Blowdry'
  },
  {
    id: 59,
    name: 'ORI hairwash & head massage',
    description: 'Oriental style hair washing with relaxing head massage',
    duration: '1 hr',
    price: '350,000 VND',
    category: 'Shampoo & Blowdry'
  }
]

// Service Categories with tabs mapping
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'tab-1',
    label: 'Special Promotion',
    services: specialPromotionServices
  },
  {
    id: 'tab-2',
    label: 'Orient Packages',
    services: orientPackagesServices
  },
  {
    id: 'tab-3',
    label: 'Body Massage',
    services: bodyMassageServices
  },
  {
    id: 'tab-4',
    label: 'Foot Massage',
    services: footMassageServices
  },
  {
    id: 'tab-5',
    label: 'Facial Care',
    services: facialCareServices
  },
  {
    id: 'tab-6',
    label: 'Body Care',
    services: bodyCareServices
  },
  {
    id: 'tab-7',
    label: 'Nails Care',
    services: nailsCareServices
  },
  {
    id: 'tab-8',
    label: 'Nail Combo',
    services: nailComboServices
  },
  {
    id: 'tab-9',
    label: 'Shampoo & Blowdry',
    services: shampooBlowdryServices
  }
]

// Convert to the format expected by the component
export const servicesData = serviceCategories.reduce((acc, category) => {
  acc[category.id] = category.services
  return acc
}, {} as Record<string, Service[]>)

// Export all services as a flat array
export const allServices: Service[] = [
  ...specialPromotionServices,
  ...orientPackagesServices,
  ...bodyMassageServices,
  ...footMassageServices,
  ...facialCareServices,
  ...bodyCareServices,
  ...nailsCareServices,
  ...nailComboServices,
  ...shampooBlowdryServices
]

// Helper functions
export const getServiceById = (id: number): Service | undefined => {
  return allServices.find((service) => service.id === id)
}

export const getServicesByCategory = (category: string): Service[] => {
  return allServices.filter((service) => service.category === category)
}

export const getCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return serviceCategories.find((category) => category.id === categoryId)
}
