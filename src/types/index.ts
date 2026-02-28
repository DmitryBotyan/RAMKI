export type ArticleBodyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'blockquote'; text: string; attribution?: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; label?: string; caption?: string };

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  author?: string;
  // Extended fields for article page:
  lede?: string;
  tags?: string[];
  authorId?: string;
  body?: ArticleBodyBlock[];
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  photoUrl?: string;
}

export interface MagazineIssue {
  id: string;
  number: string;
  title: string;
  coverUrl: string;
  price: number;
}

export interface EcosystemBlock {
  id: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  imageUrl?: string;
}

export type DesignVariant = 1;

export interface NavItem {
  label: string;
  path: string;
}
