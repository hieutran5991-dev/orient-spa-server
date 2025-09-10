# Memory Bank - Project Context & History

## Project Overview

**Project Name:** Next.js Multi-language Spa Website  
**Framework:** Next.js 14 with App Router  
**Internationalization:** next-intl  
**Styling:** Tailwind CSS  
**Language Support:** English, Vietnamese, Japanese

## Project Timeline & Evolution

### Phase 1: Initial Setup

- **Request:** "for me plan to implement multi langueage"
- **Implementation:** Set up `next-intl` library and basic configuration
- **Files Created:**
  - `next.config.ts` - next-intl plugin integration
  - `src/lib/i18n.ts` - internationalization configuration
  - `src/middleware.ts` - locale detection and routing
  - Basic translation files for EN/VI/JA

### Phase 2: Core Structure

- **Request:** "i want / then no redirect to /en but to be English directly"
- **Implementation:** Configured middleware with `localePrefix: 'as-needed'`
- **Key Changes:**
  - Root URL `/` serves English content directly
  - `/[locale]/...` routes for other languages
  - Deleted conflicting `page.tsx` files

### Phase 3: Page Implementation

- **Request:** "now do for me other page"
- **Implementation:** Created locale-aware pages:
  - `/[locale]/booking/page.tsx`
  - `/[locale]/contact/page.tsx`
  - `/[locale]/menu-prices/page.tsx`
  - `/[locale]/promotions/page.tsx`
  - `/[locale]/promotions/[slug]/page.tsx`

### Phase 4: Data Refactoring

- **Request:** "sao có 2 mock data nhỉ, tôi muốn gộp chúng lại"
- **Implementation:** Unified data structure in `src/lib/mockData.ts`
- **Key Changes:**
  - Merged `spaServices` and `promotionServices`
  - Added `isPromotion`, `isHot`, `originalPrice`, `validUntil` fields
  - Created `promotionPackages` array for new HTML structure

### Phase 5: Component Refactoring

- **Request:** "hãy tạo thành component service-prices giống trang home"
- **Implementation:** Created dedicated content components:
  - `ServicesPricesContent.tsx`
  - `PromotionsContent.tsx`
  - `PromotionDetailContent.tsx`
  - Following `HomeContent.tsx` pattern

### Phase 6: Styling Updates

- **Request:** "in header make style jsx to tailwind"
- **Implementation:** Converted Header component from JSX styling to Tailwind CSS

### Phase 7: HTML Structure Implementation

- **Request:** "this is detail page structure <main class='main-content'>..."
- **Implementation:** Rebuilt `PromotionDetailContent.tsx` to match exact HTML structure
- **Key Features:**
  - Exact CSS class matching
  - "Other promotions" section
  - Proper breadcrumb navigation
  - Full translation support

### Phase 8: Contact Page Implementation

- **Request:** "base on memory bank, rule @memory-bank.md adding contact: <main class='main-content'>..."
- **Implementation:** Created complete contact page following project patterns
- **Key Features:**
  - Exact HTML structure matching with CSS classes
  - Contact form with validation and API integration
  - Google Maps integration
  - QR code sections for WhatsApp/Kakao Talk
  - Full multi-language support (EN/VI/JA)
  - API endpoint for form submission
  - Form state management and error handling

### Phase 9: Booking Form Refactoring & API Integration

- **Request:** "adding api to get spaLocations for booking form, move booking form to separate component"
- **Implementation:** Refactored booking form and integrated with external API
- **Key Features:**
  - Created `BookingForm` component for separation of concerns
  - Direct external API integration from client using axios
  - Integrated with external API response structure
  - Updated types to match API response format
  - Removed mock data dependencies
  - Added proper error handling with Vietnamese messages
  - No Next.js API route needed - direct client-to-external API calls

## Technical Architecture

### File Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-aware layout
│   │   ├── page.tsx            # Homepage
│   │   ├── booking/page.tsx    # Booking page
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── services-prices/page.tsx  # Services & prices
│   │   └── promotions/
│   │       ├── page.tsx        # Promotions listing
│   │       └── [slug]/page.tsx # Promotion detail
│   └── layout.tsx              # Root layout (minimal)
├── components/
│   ├── HomeContent.tsx         # Homepage content
│   ├── ServicesPricesContent.tsx  # Services content
│   ├── PromotionsContent.tsx   # Promotions listing
│   ├── PromotionDetailContent.tsx # Promotion detail
│   ├── ContactContent.tsx      # Contact page content
│   ├── BookingForm.tsx         # Booking form component
│   └── layout/
│       ├── Header.tsx          # Navigation + language switcher
│       ├── Footer.tsx          # Footer
│       └── Layout.tsx          # Page wrapper
├── lib/
│   ├── i18n.ts                 # Internationalization config
│   ├── mockData.ts             # Unified data structure
│   └── axios.ts                # HTTP client with Vietnamese error messages
├── config/
│   └── api.ts                  # External API configuration
├── app/
│   └── api/
│       └── contact/
│           └── route.ts         # Contact form API endpoint
├── locales/
│   ├── en/
│   │   ├── common.json         # English common translations
│   │   └── contact.json        # English contact translations
│   ├── vi/
│   │   ├── common.json         # Vietnamese common translations
│   │   └── contact.json        # Vietnamese contact translations
│   └── ja/
│       ├── common.json         # Japanese common translations
│       └── contact.json        # Japanese contact translations
├── types/
│   ├── contact.ts              # Contact form types
│   └── api.ts                  # Common API response types
└── middleware.ts                # Locale routing
```

### Key Technologies & Libraries

#### Next.js Configuration

- **App Router:** Uses `app/` directory with dynamic `[locale]` routing
- **Middleware:** Handles locale detection and URL rewriting
- **Image Optimization:** Next.js Image component for performance

#### Internationalization

- **next-intl:** Primary i18n library
- **Locale Detection:** Automatic based on URL path
- **Translation Files:** JSON-based with nested key structure
- **Dynamic Locale:** `useLocale()` and `useTranslations()` hooks

#### Data Management

- **TypeScript Interfaces:** `SpaLocation`, `SpaService`, `PromotionPackage`
- **Mock Data:** Centralized in `mockData.ts`
- **Helper Functions:** Data retrieval and filtering utilities

#### Styling

- **Tailwind CSS:** Utility-first CSS framework
- **Responsive Design:** Mobile-first approach
- **Component Styling:** Consistent class naming conventions

## Translation Structure

### Key Translation Categories

```json
{
  "navigation": "Navigation menu items",
  "hero": "Homepage hero section",
  "booking": "Booking form and process",
  "about": "About page content",
  "locations": "Spa location information",
  "whyChooseUs": "Value proposition",
  "services": "Service descriptions and pricing",
  "contact": "Contact form and information",
  "promotions": "Promotional content and offers",
  "common": "Shared UI elements",
  "languages": "Language names"
}
```

### Translation Patterns

- **Nested Keys:** `promotions.whatsIncluded` for complex content
- **Dynamic Values:** `{count}` placeholders for variables
- **Consistent Naming:** Same key structure across all languages
- **Context-Aware:** Different translations for different use cases

## Data Models

### SpaService Interface

```typescript
interface SpaService {
  id: string
  slug: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  benefits: Record<Locale, string[]>
  duration: string
  price: number
  originalPrice?: number
  image: string
  isPromotion: boolean
  isHot: boolean
  validUntil?: string
}
```

### SpaLocation Interface

```typescript
interface SpaLocation {
  id: string
  name: Record<Locale, string>
  address: Record<Locale, string>
  maxCapacity: number
  roomTypes: string
  image: string
}
```

## Routing Logic

### Middleware Configuration

```typescript
export default createMiddleware({
  locales: SUPPORTED_LANGUAGE,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'as-needed'
})
```

### URL Patterns

- **Root:** `/` → English content (default)
- **Localized:** `/[locale]/...` → Language-specific content
- **Dynamic:** `/[locale]/promotions/[slug]` → Specific promotion

### Locale Detection

- **URL Path:** Primary method via `[locale]` segment
- **Fallback:** Defaults to English if locale invalid
- **Validation:** Uses `hasLocale()` helper function

## Error Handling

### Common Issues Resolved

1. **404 Errors:** Fixed conflicting page.tsx files
2. **TypeScript Errors:** Corrected type definitions for next-intl
3. **Rendering Errors:** Fixed multi-language object rendering
4. **Import Errors:** Resolved missing export issues

### Error Prevention

- **Type Safety:** Strict TypeScript configuration
- **Validation:** Locale validation in middleware
- **Fallbacks:** Default values for missing data
- **Error Boundaries:** Graceful error handling

## Performance Optimizations

### Image Handling

- **Next.js Image:** Automatic optimization and lazy loading
- **Responsive Images:** Proper sizing for different devices
- **Format Optimization:** WebP support when available

### Code Splitting

- **Dynamic Imports:** Lazy loading for heavy components
- **Route-based Splitting:** Automatic code splitting by route
- **Bundle Optimization:** Minimized bundle size

## User Experience Features

### Language Switching

- **Header Integration:** Language switcher in navigation
- **URL Updates:** Seamless locale switching
- **State Persistence:** Maintains user language preference

### Responsive Design

- **Mobile First:** Optimized for mobile devices
- **Breakpoint System:** Consistent responsive behavior
- **Touch Friendly:** Proper touch targets and interactions

### Navigation

- **Breadcrumbs:** Clear navigation hierarchy
- **Active States:** Visual feedback for current page
- **Smooth Transitions:** Pleasant user experience

## Future Considerations

### Scalability

- **Content Management:** CMS integration potential
- **Dynamic Routes:** Expandable promotion system
- **API Integration:** Replace mock data with real APIs

### Features

- **Search Functionality:** Service and promotion search
- **User Accounts:** Customer management system
- **Online Booking:** Real-time availability and booking

### Maintenance

- **Translation Updates:** Easy content management
- **Performance Monitoring:** Ongoing optimization
- **Security Updates:** Regular dependency updates

## Lessons Learned

### Best Practices

1. **Start Simple:** Begin with basic structure, add complexity gradually
2. **Type Safety:** Use TypeScript from the beginning
3. **Component Separation:** Keep pages simple, move logic to components
4. **Data Consistency:** Unified data structure prevents conflicts
5. **Translation Planning:** Plan translation keys carefully

### Common Pitfalls

1. **File Conflicts:** Avoid multiple page.tsx files
2. **Type Mismatches:** Ensure next-intl types are correct
3. **Import Issues:** Use absolute imports consistently
4. **State Management:** Keep component state local when possible

### Development Tips

1. **Incremental Changes:** Make small, testable changes
2. **Error Handling:** Implement proper error boundaries
3. **Performance:** Monitor bundle size and loading times
4. **Testing:** Test on multiple devices and browsers
