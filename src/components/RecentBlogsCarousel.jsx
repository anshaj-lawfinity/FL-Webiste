"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RecentBlogsCarousel({ blogs }) {
  const [current, setCurrent] = useState(0);

  if (!blogs || blogs.length === 0) return null;

  const total = blogs.length;

  // On desktop show 3 at a time, tablet 2, mobile 1.
  // We slide by 1 blog per click and clamp at the ends.
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  const canPrev = current > 0;
  const canNext = current < total - 1;

  return (
    <div className="relative">
      {/* Overflow wrapper — clips the sliding track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current} * (100% / 3)))` }}
        >
          {blogs.map((blog) => (
            <div
              key={blog._id || blog.urlSlug}
              // 1 card on mobile, 1/2 on tablet, 1/3 on desktop
              className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-3"
            >
              <Link
                href={`/blogs/${blog.urlSlug}`}
                className="group block rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full"
              >
                {blog.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title || "Blog"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {blog.category && (
                      <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2">
                    {blog.publishedDate
                      ? new Date(blog.publishedDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#7A3EF2] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.summary || blog.metaDescription}
                  </p>
                  <span className="inline-block mt-3 text-sm text-[#7A3EF2] font-medium">
                    Read More →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        disabled={!canPrev}
        aria-label="Previous blogs"
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center transition-opacity ${
          canPrev ? "opacity-100 hover:bg-gray-50 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        disabled={!canNext}
        aria-label="Next blogs"
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center transition-opacity ${
          canNext ? "opacity-100 hover:bg-gray-50 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {blogs.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to blog ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#7A3EF2] w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
