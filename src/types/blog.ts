export interface PopularPost {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  hasGradientBg?: boolean;
  gradientColors?: string;
  readMoreText: string;
}