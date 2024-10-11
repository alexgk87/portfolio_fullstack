export type ProjectProps = {
  id: string;
  projectTitle: string;
  imageUrl: string;
  projectDescription: string;
  publishedAt?: string | null;
  isPublic: boolean;
  status: "draft" | "published";
  tags: string[];
};