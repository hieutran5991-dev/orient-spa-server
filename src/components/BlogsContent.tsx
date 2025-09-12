"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/utils/constants";
import Link from "next/link";
import type { NamespaceKeys } from "use-intl";
import React from "react";
import { formatDate } from "@/utils/format";
import Image from "next/image";

// Fake blog data based on the image content
const blogPosts = [
  {
    id: 1,
    title: "An Afternoon Of Chill From Saint Joseph Church To Hoan Kiem Lake",
    excerpt:
      "Experience the captivating flow of history and culture as you stroll through 2 of Hanoi's most iconic landmarks: St. Joseph's Cathedral and Hoan Kiem Lake.",
    image: "/images/hanoi-saint-joseph.jpg",
    category: "Travel Guide",
    readTime: "5 min read",
    date: "2025-09-01",
  },
  {
    id: 2,
    title: "Discover Hanoi's 10 Best Pho and Bun Cha Experiences",
    excerpt:
      "When it comes to Hanoi's food, Pho (noodle soup) and Bun cha (grilled pork with rice vermicelli) are undeniably the two most iconic dishes.",
    image: "/images/hanoi-pho-buncha.jpg",
    category: "Food & Culture",
    readTime: "7 min read",
    date: "2025-08-28",
  },
  {
    id: 3,
    title: "Best Chocolate for Your Sweet Discovery in Hanoi",
    excerpt:
      "Using the finest cocoa beans and advanced world production processes, chocolate in Hanoi is not only diverse in flavor but also stands out for its quality.",
    image: "/images/hanoi-chocolate.jpg",
    category: "Local Discovery",
    readTime: "4 min read",
    date: "2025-08-25",
  },
  {
    id: 4,
    title: "Health Tips & Wellness from SEN SPA Da Nang",
    excerpt:
      "Discover essential wellness tips and health practices that will enhance your spa experience and promote overall well-being.",
    image: "/images/spa-wellness.jpg",
    category: "Health & Wellness",
    readTime: "6 min read",
    date: "2025-08-20",
  },
  {
    id: 5,
    title: "Traditional Vietnamese Massage Techniques",
    excerpt:
      "Learn about the ancient art of Vietnamese massage and how our skilled therapists use traditional techniques to heal body and mind.",
    image: "/images/vietnamese-massage.jpg",
    category: "Spa Treatments",
    readTime: "8 min read",
    date: "2025-08-15",
  },
  {
    id: 6,
    title: "Da Nang: Hidden Gems Beyond the Beaches",
    excerpt:
      "Explore the cultural richness and hidden treasures of Da Nang that go beyond its famous beaches and coastal attractions.",
    image: "/images/danang-hidden-gems.jpg",
    category: "Travel Guide",
    readTime: "10 min read",
    date: "2025-08-10",
  },
];

const BlogsContent = () => {
  const t = useTranslations("blogs" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;

  return (
    <main className="tw:bg-white tw:min-h-screen">
      <div className="title-container text-center">
        <h1 className="title-text">{t("title")}</h1>
      </div>


      <div className="tw:py-16">
        <div className="tw:container tw:mx-auto tw:px-4 tw:max-w-[1210px]">
        <p className="tw:text-center tw:text-[24px] tw:md:text-[36px] tw:mb-[24px]">{t("subtitle")}</p>
          <div className="tw:mb-16">
            <div className="tw:bg-white tw:rounded-lg tw:shadow-xl tw:overflow-hidden">
              <div className="tw:grid tw:md:grid-cols-2 tw:gap-0">
                <div className="tw:relative tw:max-w-[100%] tw:max-h-[380px] tw:md:h-full tw:bg-gradient-to-br tw:from-pink-100 tw:to-purple-100 tw:flex tw:items-center tw:justify-center">
                  <Image src="/images/1dd97d76cfabbcbae7380d0199b18409.jpg" width={800} height={1200} className="tw:object-cover tw:max-w-full" alt=""/>
                </div>
                <div className="tw:p-8 tw:flex tw:flex-col tw:justify-center">
                  {/*<div className="tw:flex tw:items-center tw:mb-4">*/}
                  {/*  <span className="tw:bg-[var(--main-color)] tw:text-white tw:px-3 tw:py-1 tw:rounded-full tw:text-sm tw:font-medium">*/}
                  {/*    {blogPosts[0].category}*/}
                  {/*  </span>*/}
                  {/*  <span className="tw:ml-4 tw:text-sm tw:text-gray-500">*/}
                  {/*    {blogPosts[0].readTime}*/}
                  {/*  </span>*/}
                  {/*</div>*/}
                  <h2 className="tw:text-2xl tw:md:text-3xl tw:font-bold tw:text-gray-800 tw:mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="tw:text-gray-600 tw:mb-6 tw:leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <Link
                    href={`/${locale}/blogs/${blogPosts[0].id}`}
                    className="tw:inline-block tw:w-fit tw:bg-[var(--main-color)] tw:text-white tw:px-6 tw:py-3 tw:rounded-md tw:font-medium tw:transition-colors tw:duration-300 tw:hover:bg-[var(--hover-color)] tw:uppercase tw:text-xl tw:tracking-wide"
                  >
                    {t("readMore")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-3 tw:gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="tw:bg-white tw:rounded-lg tw:shadow-lg tw:overflow-hidden tw:transition-transform tw:duration-300 hover:tw:transform hover:tw:scale-105"
              >
                {/* Image */}
                <div className="tw:relative tw:h-[240px] tw:overflow-hidden tw:bg-gradient-to-br tw:from-pink-100 tw:to-purple-100 tw:flex tw:items-center tw:justify-center">
                  <Image src="/images/1dd97d76cfabbcbae7380d0199b18409.jpg" width={800} height={800} className="tw:object-cover" alt=""/>
                </div>

                <div className="tw:p-6">
                  {/*<div className="tw:flex tw:items-center tw:justify-between tw:mb-3">*/}
                  {/*  <span className="tw:bg-gray-100 tw:text-gray-600 tw:px-2 tw:py-1 tw:rounded-full tw:text-xs tw:font-medium">*/}
                  {/*    {post.category}*/}
                  {/*  </span>*/}
                  {/*  <span className="tw:text-xs tw:text-gray-500">*/}
                  {/*    {post.readTime}*/}
                  {/*  </span>*/}
                  {/*</div>*/}

                  <h3 className="tw:text-2xl tw:font-semibold tw:text-gray-800 tw:mb-3 tw:line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="tw:text-gray-600 tw:text-xl tw:mb-4 tw:leading-relaxed tw:line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="tw:flex tw:items-center tw:justify-between">
                    <span className="tw:text-xl tw:text-gray-400">
                      {formatDate(post.date)}
                    </span>
                    <Link
                      href={`/${locale}/blogs/${post.id}`}
                      className="tw:text-[var(--main-color)] tw:font-medium tw:text-xl tw:hover:underline"
                    >
                      {t("readMore")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/*<div className="tw:text-center tw:mt-12">*/}
          {/*  <button className="tw:bg-[var(--main-color)] tw:text-white tw:px-8 tw:py-3 tw:rounded-md tw:font-medium tw:transition-colors tw:duration-300 hover:tw:bg-[var(--hover-color)] tw:uppercase tw:text-sm tw:tracking-wide">*/}
          {/*    {t("loadMore")}*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </main>
  );
};

export default BlogsContent;
