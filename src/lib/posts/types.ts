export type Categories = "번역";

export type Post = {
  id: string;
  title: string;
  date: string;
  lastModified?: string;
  categories?: Categories[];
};
