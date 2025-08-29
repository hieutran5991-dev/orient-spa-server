'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { SUPPORTED_LANGUAGE, type Locale } from '@/utils/constants'
import type { NamespaceKeys } from 'use-intl'

const Header = () => {
  const tCommon = useTranslations('common' as NamespaceKeys<string, string>)
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === `/${locale}` || path === `/${locale}/`) {
      return pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/'
    }
    return pathname.startsWith(path)
  }

  // Helper function to get navigation link classes
  const getNavLinkClasses = (path: string) => {
    const baseClasses = "px-3 py-2 text-2xl uppercase tracking-wide transition-colors duration-200"
    const activeClasses = "text-pink-600 font-semibold"
    const inactiveClasses = "text-gray-800 hover:text-pink-600"

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`
  }

  // Helper function to get mobile nav link classes
  const getMobileNavLinkClasses = (path: string) => {
    const baseClasses = "block text-2xl font-medium transition-colors duration-200 uppercase tracking-wide"
    const activeClasses = "text-pink-600 font-semibold"
    const inactiveClasses = "text-gray-900 hover:text-pink-600"

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleLanguageChange = (newLocale: Locale) => {
    const segments = pathname.split('/')
    if (SUPPORTED_LANGUAGE.includes(segments[1] as Locale)) {
      segments.splice(1, 1)
    }
    const newPath = `/${newLocale}${segments.join('/')}`
    router.push(newPath)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1210px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:h-[120px] gap-8">
            {/* Left Navigation */}
            <nav className="flex items-center">
              <a
                href={`/${locale}`}
                className={getNavLinkClasses(`/${locale}`)}
              >
                {tCommon('navigation.home')}
              </a>
              <a
                href={`/${locale}/services-prices`}
                className={getNavLinkClasses(`/${locale}/services-prices`)}
              >
                {tCommon('navigation.services')}
              </a>
              <a
                href={`/${locale}/promotions`}
                className={getNavLinkClasses(`/${locale}/promotions`)}
              >
                Promotions
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <a href={`/${locale}`} className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Orient Spa Hanoi"
                  width={200}
                  height={32}
                  className="h-full w-auto object-contain"
                />
              </a>
            </div>

            {/* Right Navigation */}
            <nav className="flex items-center space-x-8">
              {/* About Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center space-x-1 text-gray-800 hover:text-pink-600 px-3 py-2 text-2xl uppercase tracking-wide transition-colors duration-200"
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <span>About Us</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <div className="py-2">
                    <a
                      href="/page/about-us.html"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      About Orient Spa
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a
                      href="/spa/orient-spa-old-quarter.html"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      Orient at 26 Au Trieu
                    </a>
                    <a
                      href="/spa/orient-spa-nails.html"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      Orient at 18 Bao Khanh
                    </a>
                    <a
                      href="/spa/la-flora-by-orient.html"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      La Flora at 22 Au Trieu
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a
                      href="/blog.html"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      Blogs
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={`/${locale}/contact`}
                className={getNavLinkClasses(`/${locale}/contact`)}
              >
                {tCommon('navigation.contact')}
              </a>

              <a
                href={`/${locale}/reservation`}
                className={getNavLinkClasses(`/${locale}/reservation`)}
              >
                Book Online
              </a>

              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-800 hover:text-pink-600 px-3 py-2 text-base text-2xl transition-colors duration-200 cursor-pointer">
                  <div className="relative">
                    <span className="text-lg font-bold">A</span>
                    <span className="absolute -top-1 -right-1 text-xs text-pink-600">文</span>
                  </div>
                </button>

                {/* Language Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full text-left px-4 py-2 text-lg transition-colors duration-150 ${locale === 'en'
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      🇺🇸 {tCommon('languages.en')}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('vi')}
                      className={`w-full text-left px-4 py-2 text-lg transition-colors duration-150 ${locale === 'vi'
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      🇻🇳 {tCommon('languages.vi')}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ja')}
                      className={`w-full text-left px-4 py-2 text-lg transition-colors duration-150 ${locale === 'ja'
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      🇯🇵 {tCommon('languages.ja')}
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <header className="lg:hidden bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              className="text-pink-600 hover:text-pink-700 p-2 rounded-md transition-colors duration-200 cursor-pointer"
              aria-label="Open mobile menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex flex-col items-center">
              <a href={`/${locale}`} className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Orient Spa Hanoi"
                  width={200}
                  height={32}
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>

            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={closeMobileMenu}
              className="text-pink-600 hover:text-pink-700 p-2 rounded-md transition-colors duration-200 cursor-pointer"
              aria-label="Close mobile menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="px-4 py-8">
            <ul className="space-y-6">
              <li>
                <a
                  href={`/${locale}`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}`)}
                >
                  {tCommon('navigation.home')}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/services-prices`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/services-prices`)}
                >
                  {tCommon('navigation.services')}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/promotions`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/promotions`)}
                >
                  Promotions
                </a>
              </li>
              <li>
                <a
                  href="/page/about-us.html"
                  onClick={closeMobileMenu}
                  className="block text-2xl font-medium text-gray-900 hover:text-pink-600 transition-colors duration-200 uppercase tracking-wide"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/contact`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/contact`)}
                >
                  {tCommon('navigation.contact')}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/reservation`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/reservation`)}
                >
                  Book Online
                </a>
              </li>

              {/* Mobile Language Switcher */}
              <li className="pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  <p className="text-lg font-medium text-gray-700">Language</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleLanguageChange('en')
                        closeMobileMenu()
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-colors duration-200 cursor-pointer ${locale === 'en'
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      🇺🇸 {tCommon('languages.en')}
                    </button>
                    <button
                      onClick={() => {
                        handleLanguageChange('vi')
                        closeMobileMenu()
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-colors duration-200 cursor-pointer ${locale === 'vi'
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      🇻🇳 {tCommon('languages.vi')}
                    </button>
                    <button
                      onClick={() => {
                        handleLanguageChange('ja')
                        closeMobileMenu()
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-colors duration-200 cursor-pointer ${locale === 'ja'
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:text-pink-600 font-medium'
                        }`}
                    >
                      🇯🇵 {tCommon('languages.ja')}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header
