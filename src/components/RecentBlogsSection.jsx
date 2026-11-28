import Link from "next/link";
import { fetchPublishedBlogs } from "@/lib/blogs";
import RecentBlogsCarousel from "@/components/RecentBlogsCarousel";

// Server component — fetches blogs, hands them to the client carousel.
export default async function RecentBlogsSection() {
  let blogs = [];
  try {
    const all = await fetchPublishedBlogs();
    // Show up to 9 recent blogs in the carousel (3 pages of 3)
    blogs = Array.isArray(all) ? all.slice(0, 9) : [];
  } catch {
    return null;
  }

  if (blogs.length === 0) return null;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-black mb-2">
          Recent Blogs
        </h2>
        <p className="text-center text-gray-500 mb-10 text-sm">
          Stay updated with the latest insights on factory licensing &amp; compliance.
        </p>

        {/* px-6 gives arrow buttons room to sit outside the cards */}
        <div className="relative px-6">
          <RecentBlogsCarousel blogs={blogs} />
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-block bg-[#7A3EF2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#6230d0] transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
