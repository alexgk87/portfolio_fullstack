export type ProjectProps = {
  id: string;
  projectTitle: string;
  imageUrl: string;
  projectDescription: string;
  publishedAt?: string | null; // Optional: could be null if unpublished
  public: boolean; // True if the project is public
  status: "draft" | "published"; // Draft or published status
  tags: string[]; // Array of tags
};

/*
export const existingProjects: ProjectProps[] = [
    {
      "projectTitle": "Portfolio Item 1",
      "imageUrl": "",
      "projectDescription": "A very long description for Portfolio Item 1. This project was a lot of fun to work on and I learned a lot from it. I hope you enjoy it as much as I did!",
      id: crypto.randomUUID()
    },
    {
      "projectTitle": "Portfolio Item 2",
      "imageUrl": "",
      "projectDescription": "Description for Portfolio Item 2",
      id: crypto.randomUUID()
    },
    {
      "projectTitle": "Portfolio Item 3",
      "imageUrl": "",
      "projectDescription": "Description for Portfolio Item 3",
      id: crypto.randomUUID()
    },
    {
      "projectTitle": "Portfolio Item 4",
      "imageUrl": "",
      "projectDescription": "Description for Portfolio Item 4",
      id: crypto.randomUUID()
    }
  ]
    */