# Project Rules & Guidelines

## Code Standards

### 1. File Naming Conventions
- Use kebab-case for file names: `my-component.tsx`
- Use PascalCase for component names: `MyComponent`
- Use camelCase for variables and functions: `myVariable`, `myFunction`

### 2. Component Structure
- Always use TypeScript for type safety
- Use functional components with hooks
- Export components as default exports
- Place components in `src/components/` directory

### 3. Import/Export Rules
- Use absolute imports with `@/` prefix: `@/components/MyComponent`
- Group imports: React/Next.js, third-party, local
- Use named exports for utilities, default exports for components

### 4. Styling Guidelines
- Use Tailwind CSS classes for styling
- Avoid inline styles unless necessary
- Use CSS modules for complex component-specific styles
- Follow responsive design principles

### 5. Internationalization
- Use `next-intl` for all text content
- Access translations via `useTranslations()` hook
- Use `useLocale()` for locale-specific logic
- Store translations in `src/locales/[locale]/common.json`

### 6. Data Management
- Use TypeScript interfaces for data structures
- Store mock data in `src/lib/mockData.ts`
- Use helper functions for data manipulation
- Implement proper error handling

### 7. Routing
- Use Next.js App Router with `[locale]` dynamic segments
- Implement proper middleware for locale detection
- Use `Link` component for internal navigation
- Handle 404s with `notFound()` function

### 8. Performance
- Use Next.js Image component for images
- Implement proper loading states
- Use React.memo for expensive components
- Optimize bundle size

### 9. Error Handling
- Use try-catch blocks for async operations
- Implement proper error boundaries
- Show user-friendly error messages
- Log errors for debugging

### 10. Testing
- Write unit tests for utilities
- Test component rendering
- Mock external dependencies
- Use descriptive test names

## Development Workflow

### 1. Before Committing
- Run linting: `npm run lint`
- Check for TypeScript errors
- Ensure all tests pass
- Update documentation if needed

### 2. Code Review Checklist
- [ ] Code follows project conventions
- [ ] All imports are properly organized
- [ ] TypeScript types are correct
- [ ] Translations are implemented
- [ ] Responsive design is considered
- [ ] Error handling is in place

### 3. File Organization
```
src/
├── app/           # Next.js app router pages
├── components/    # Reusable components
├── lib/          # Utilities and data
├── locales/      # Translation files
├── types/        # TypeScript type definitions
└── utils/        # Helper functions
```

## Communication Rules

### 1. Language
- Always respond in English and Vietnamese
- Use clear, concise language
- Provide examples when explaining concepts

### 2. Code Changes
- Explain what was changed and why
- Show before/after code when relevant
- Highlight important modifications
- Provide context for decisions

### 3. Problem Solving
- Identify the root cause first
- Suggest multiple solutions when possible
- Explain trade-offs clearly
- Test solutions before implementing

## Quality Standards

### 1. Code Quality
- Follow DRY principle (Don't Repeat Yourself)
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic

### 2. User Experience
- Ensure responsive design works on all devices
- Implement proper loading states
- Handle edge cases gracefully
- Provide clear feedback for user actions

### 3. Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure proper color contrast
- Support keyboard navigation

## Security Guidelines

### 1. Data Handling
- Validate all user inputs
- Sanitize data before rendering
- Use environment variables for sensitive data
- Implement proper authentication if needed

### 2. API Security
- Use HTTPS for all external requests
- Implement rate limiting
- Validate API responses
- Handle errors securely

## Maintenance

### 1. Dependencies
- Keep dependencies up to date
- Remove unused packages
- Monitor for security vulnerabilities
- Document breaking changes

### 2. Performance Monitoring
- Monitor bundle size
- Track loading times
- Optimize images and assets
- Use performance profiling tools

### 3. Documentation
- Keep README up to date
- Document API changes
- Update component documentation
- Maintain changelog
