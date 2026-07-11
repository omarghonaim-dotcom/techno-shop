import Image from "next/image";
import { BlogPost as BlogPostType } from "@/types/blog";

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="mb-10">
      <div
        className={`relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-4`}
      >
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      
      <div className="text-right">
        <span className="text-sm text-purple-600 font-medium">
          {post.category}
        </span>
        
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-3 leading-7">
          {post.title}
        </h2>
        
        <p className="text-sm text-gray-600 leading-6 mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
          {post.readMoreText}
        </button>
      </div>
    </article>
  );
}