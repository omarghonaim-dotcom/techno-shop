import Image from "next/image";
import { PopularPost } from "@/types/blog";

interface PopularItemProps {
  post: PopularPost;
}

export default function PopularItem({ post }: PopularItemProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 text-right">
        <span className="text-xs text-purple-600 font-medium">
          {post.category}
        </span>
        <h3 className="text-sm text-gray-800 font-medium leading-5 mt-1 line-clamp-2">
          {post.title}
        </h3>
      </div>
    </div>
  );
}