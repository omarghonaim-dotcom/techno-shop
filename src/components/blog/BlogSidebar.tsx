import { PopularPost } from "@/types/blog";
import PopularItem from "./PopularItem";

interface BlogSidebarProps {
  popularPosts: PopularPost[];
  title: string;
}

export default function BlogSidebar({ popularPosts, title }: BlogSidebarProps) {
  return (
    <aside className="w-full lg:w-72 lg:sticky lg:top-6 lg:self-start">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-base font-bold text-gray-900 text-right mb-2 pb-3 border-b-2 border-purple-600 inline-block">
          {title}
        </h2>
        <div className="mt-2">
          {popularPosts.map((post) => (
            <PopularItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </aside>
  );
}