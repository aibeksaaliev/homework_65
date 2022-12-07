export interface PageType {
  title: string;
  description: string;
}

export interface PagesType {
  [category: string]: PageType;
}