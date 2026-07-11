
import BlogPost from "@/components/blog/BlogPost";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { BlogPost as BlogPostType, PopularPost } from "@/types/blog";

// Sample data - replace with your actual data source (API, CMS, etc.)
const popularPosts: PopularPost[] = [
  {
    id: "1",
    title: "Best Mid-Range Smartphones in Today's Market",
    imageUrl: "/images/xioami.png",
    category: "Mobile",
  },
  {
    id: "2",
    title: "Comparing iPhone and Samsung Cameras",
    imageUrl: "/images/xioami.png",
    category: "Camera",
  },
  {
    id: "3",
    title: "Gaming Laptop Buying Guide",
    imageUrl: "/images/rog.png",
    category: "Laptop",
  },
  {
    id: "4",
    title: "Complete Review of Wireless Headphones",
    imageUrl: "/images/speaker.png",
    category: "Audio",
  },
];

const blogPosts: BlogPostType[] = [
  {
    id: "1",
    title: "Expert Review of the New Asus ROG Laptop",
    description:
      "The Asus ROG laptop delivers an unparalleled gaming experience with its powerful processor and advanced graphics card. This product features a modern design and an advanced cooling system...",
    imageUrl: "/images/rog.png",
    category: "Laptop",
    readMoreText: "Read More",
  },
  {
    id: "2",
    title: "Introducing Xiaomi's New Smartphone Series",
    description:
      "Xiaomi has set new standards in the mobile industry with the launch of its latest series. Advanced cameras, long-lasting battery, and beautiful design are the standout features of these products...",
    imageUrl: "/images/xioami.png",
    category: "Mobile",
    readMoreText: "Read More",
  },
  {
    id: "3",
    title: "New Asus Laptop Model with Stunning Design",
    description:
      "This laptop combines power and beauty, making it an ideal choice for professionals and gaming enthusiasts. A high-quality display and ergonomic keyboard are among the other advantages of this product...",
    imageUrl: "/images/Frame 2.png",
    category: "Laptop",
    
    readMoreText: "Read More",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <BlogSidebar popularPosts={popularPosts} title="Most Popular" />

          {/* Main Content */}
          <main className="flex-1">
            {blogPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}