# Memory Bank - Development Rules & Standards

## 🚀 Project Overview
This is a **multilanguage Next.js project** with the following structure:
- **Languages**: English (en), Vietnamese (vi), Japanese (ja)
- **Framework**: Next.js 14+ with App Router
- **Internationalization**: next-intl
- **Styling**: CSS modules + global CSS
- **Constants**: Centralized in `src/utils/constants.ts` ✅
- **Translations**: Dynamic loading for better performance ✅

> **📝 Note**: All locale constants have been migrated from `src/lib/i18n.ts` to `src/utils/constants.ts` for better organization and maintainability.

> **🚀 Performance**: Translations are now loaded dynamically based on the current page, improving performance and reducing bundle size.

## 📋 Core Development Rules

### 1. **Multilanguage Implementation (MANDATORY)**
When adding new pages/components, **ALWAYS** implement translations:

#### ✅ **DO THIS:**
```tsx
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n';

const MyComponent = () => {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  
  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description')}</p>
    </div>
  );
};
```

#### ❌ **NEVER DO THIS:**
```tsx
// Hardcoded text - FORBIDDEN!
const MyComponent = () => {
  return (
    <div>
      <h1>Welcome to our spa</h1>  // ❌ NO HARDCODED TEXT
      <p>Book your appointment today</p>  // ❌ NO HARDCODED TEXT
    </div>
  );
};
```

### 1.1. **Locale Type Usage (REQUIRED)**
Always use the `Locale` type from `@/utils/constants` instead of hardcoded string literals:

```tsx
// ✅ CORRECT - Import and use Locale type
import type { Locale } from '@/utils/constants';
const locale = useLocale() as Locale;

// ❌ INCORRECT - Hardcoded string literals
const locale = useLocale() as 'en' | 'vi' | 'ja';
```

**Benefits:**
- Type safety across the entire application
- Centralized locale management
- Easier to add new languages in the future
- Consistent locale handling

### 1.2. **Constants Organization (REQUIRED)**
All project constants are centralized in `src/utils/constants.ts`:

```tsx
// ✅ CORRECT - Import from constants file
import { SUPPORTED_LANGUAGE, DEFAULT_LANGUAGE, type Locale } from '@/utils/constants';
import { BOOKING_CONFIG, VALIDATION_RULES } from '@/utils/constants';

// ❌ INCORRECT - Hardcoded values or imports from other files
const languages = ['en', 'vi', 'ja']; // ❌ NO HARDCODED ARRAYS
import { SUPPORTED_LANGUAGE } from '@/lib/i18n'; // ❌ OLD IMPORT PATH
```

**Available Constants:**
- `SUPPORTED_LANGUAGE` - Array of supported locales
- `DEFAULT_LANGUAGE` - Default locale
- `Locale` - TypeScript type for locales
- `APP_CONFIG` - Application configuration
- `API_CONFIG` - API configuration
- `BOOKING_CONFIG` - Booking system configuration
- `VALIDATION_RULES` - Form validation rules
- `UPLOAD_CONFIG` - File upload configuration

### 1.3. **Translation Loading with Namespaces (RECOMMENDED)**
Use `next-intl`'s built-in namespace feature for clean and performant translation loading:

#### **✅ BEST APPROACH: Use useTranslations with Namespaces**
```tsx
import { useTranslations } from 'next-intl';

const MyComponent = () => {
  // Load page-specific translations
  const t = useTranslations('home');
  // Load common/shared translations
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{tCommon('bookNow')}</button>
    </div>
  );
};
```

#### **Available Namespaces:**
- `useTranslations('common')` - Shared translations (navigation, common buttons, etc.)
- `useTranslations('home')` - Home page specific translations
- `useTranslations('booking')` - Booking page specific translations
- `useTranslations('services')` - Services page specific translations
- `useTranslations('promotions')` - Promotions page specific translations
- `useTranslations('contact')` - Contact page specific translations
- `useTranslations('confirm')` - Confirm page specific translations

#### **Benefits of Namespace Approach:**
- ✅ **Cleaner Code** - No custom hooks needed
- ✅ **Better Performance** - Built-in optimization by next-intl
- ✅ **Type Safety** - Better TypeScript support
- ✅ **Simpler Syntax** - Just `t('key')` instead of `translations.key`
- ✅ **Automatic Caching** - next-intl handles caching automatically
- ✅ **No Loading States** - Translations are available immediately

#### **Example Usage in Components:**
```tsx
// Home page component
const HomeContent = () => {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{tCommon('bookNow')}</button>
    </div>
  );
};

// Booking page component
const BookingContent = () => {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('makeReservation')}</p>
      <button>{tCommon('bookNow')}</button>
    </div>
  );
};
```

### 2. **Translation Key Structure**
Follow this naming convention for translation keys:
```
page.section.element
```
Examples:
- `home.hero.title`
- `booking.form.submit`
- `services.list.massage`

### 3. **Page Structure Requirements**
Every new page MUST follow this structure:

#### **File Organization:**
```
src/app/[locale]/new-page/
├── page.tsx          # Main page component
└── (optional sub-pages)

src/components/
└── NewPageContent.tsx  # Main content component

src/locales/
├── en/
│   └── new-page.json   # English translations
├── vi/
│   └── new-page.json   # Vietnamese translations
└── ja/
    └── new-page.json   # Japanese translations
```

#### **Page Component Structure:**
```tsx
'use client';

import Layout from "@/components/layout/Layout";
import NewPageContent from "@/components/NewPageContent";

export default function NewPage() {
  return (
    <Layout className="new-page-container">
      <NewPageContent />
    </Layout>
  );
}
```

#### **Content Component Structure:**
```tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/lib/i18n';

const NewPageContent = () => {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  
  return (
    <div>
      <h1>{t('newPage.title')}</h1>
      <p>{t('newPage.description')}</p>
    </div>
  );
};

export default NewPageContent;
```

### 4. **Translation Files Structure**
Each translation file must contain ALL text used in the component:

```json
// src/locales/en/new-page.json
{
  "newPage": {
    "title": "Page Title",
    "description": "Page description text",
    "button": {
      "submit": "Submit",
      "cancel": "Cancel"
    }
  }
}

// src/locales/vi/new-page.json
{
  "newPage": {
    "title": "Tiêu đề trang",
    "description": "Mô tả trang",
    "button": {
      "submit": "Gửi",
      "cancel": "Hủy"
    }
  }
}

// src/locales/ja/new-page.json
{
  "newPage": {
    "title": "ページタイトル",
    "description": "ページの説明",
    "button": {
      "submit": "送信",
      "cancel": "キャンセル"
    }
  }
}
```

### 5. **Constants & Types Organization**

#### **Constants** → `src/utils/constants.ts`
```tsx
// Add to existing constants file
export const NEW_PAGE_CONSTANTS = {
  MAX_ITEMS: 10,
  TIMEOUT: 5000,
  STATUSES: ['active', 'inactive', 'pending']
} as const;
```

#### **Types** → `src/types/newPage.ts`
```tsx
export interface NewPageData {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface NewPageFormData {
  title: string;
  description: string;
}
```

#### **Mock Data** → `src/lib/mockData.ts`
```tsx
// Add to existing mockData.ts file
export const newPageMockData: NewPageData[] = [
  {
    id: "1",
    title: "Sample Title",
    description: "Sample description",
    status: "active"
  }
];
```

### 6. **CSS Rules**
- **NO NEW CSS FILES** - Use existing CSS structure
- **NO CSS MODULES** - Use global CSS classes
- **NO TAILWIND** - Use custom CSS classes
- CSS will be handled by the user (you)

### 7. **Import Patterns**
Always use absolute imports with `@/` prefix:
```tsx
// ✅ CORRECT
import Layout from "@/components/layout/Layout";
import { useTranslations } from 'next-intl';
import { NEW_PAGE_CONSTANTS } from '@/lib/constants';

// ❌ INCORRECT
import Layout from "../../components/layout/Layout";
import { useTranslations } from 'next-intl';
```

### 8. **Component Naming Convention**
- **Page Components**: PascalCase (e.g., `NewPageContent`)
- **Translation Keys**: camelCase (e.g., `newPage.title`)
- **File Names**: PascalCase for components, kebab-case for pages

### 9. **Required Imports for New Pages**
```tsx
'use client';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/utils/constants';
import Layout from "@/components/layout/Layout";
```

### 10. **Translation Usage in Components**
Always use the namespace approach for clean and performant translations:

```tsx
// ✅ CORRECT - Use namespaces
const MyComponent = () => {
  const t = useTranslations('pageName');        // Page-specific translations
  const tCommon = useTranslations('common');    // Shared translations
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{tCommon('bookNow')}</button>
    </div>
  );
};

// ❌ INCORRECT - Don't use without namespace
const MyComponent = () => {
  const t = useTranslations();  // ❌ No namespace specified
  
  return (
    <div>
      <h1>{t('pageName.title')}</h1>  // ❌ Verbose key structure
    </div>
  );
};
```

### 10. **Locale Handling**
Always handle locale in components:
```tsx
import type { Locale } from '@/utils/constants';

const locale = useLocale() as Locale;

// Use locale for conditional logic if needed
if (locale === 'vi') {
  // Vietnamese specific logic
}
```

## 🔄 Workflow for Adding New Pages

1. **Create page directory**: `src/app/[locale]/new-page/`
2. **Create page.tsx**: Wrap with Layout component
3. **Create content component**: `src/components/NewPageContent.tsx`
4. **Add translations**: Create JSON files in all 3 languages
5. **Add constants**: Update `src/utils/constants.ts`
6. **Add types**: Create `src/types/newPage.ts`
7. **Add mock data**: Update `src/lib/mockData.ts`
8. **NO CSS** - You will handle styling

## 📁 **Constants & Types Organization**

#### **Constants** → `src/utils/constants.ts`
```tsx
// Add to existing constants file
export const NEW_PAGE_CONSTANTS = {
  MAX_ITEMS: 10,
  TIMEOUT: 5000,
  STATUSES: ['active', 'inactive', 'pending']
} as const;
```

#### **Types** → `src/types/newPage.ts`
```tsx
export interface NewPageData {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface NewPageFormData {
  title: string;
  description: string;
}
```

#### **Mock Data** → `src/lib/mockData.ts`
```tsx
// Add to existing mockData.ts file
export const newPageMockData: NewPageData[] = [
  {
    id: "1",
    title: "Sample Title",
    description: "Sample description",
    status: "active"
  }
];
```

## ⚠️ Common Mistakes to Avoid

- ❌ Hardcoding text in components
- ❌ Creating new CSS files
- ❌ Using relative imports
- ❌ Forgetting to wrap with Layout component
- ❌ Missing translation keys
- ❌ Inconsistent naming conventions
- ❌ Not handling locale properly

## 📚 Reference Examples

See existing implementations in:
- `src/app/[locale]/page.tsx` (Home page)
- `src/components/HomeContent.tsx`
- `src/locales/en/home.json`
- `src/lib/mockData.ts`
- `src/types/booking.ts`

## 🎯 Success Checklist

Before submitting a new page, ensure:
- [ ] All text uses translation keys
- [ ] Translations exist in all 3 languages
- [ ] Page wrapped with Layout component
- [ ] Content component created in components folder
- [ ] Constants added to utils/constants.ts
- [ ] Types added to types folder
- [ ] Mock data added to lib/mockData.ts
- [ ] No new CSS files created
- [ ] All imports use @/ prefix
- [ ] Locale properly handled with Locale type
- [ ] All constants imported from @/utils/constants

---

**Remember**: This is a multilanguage project. Every piece of text must be translatable!
