import type { AuthorInfo } from "@/types/global";

export const AuthorNames = [
  "Mina Boktor",
  "Samuel Goldsmith",
  "Brendon Peters",
] as const;

export type AuthorName = (typeof AuthorNames)[number];

export const Authors: Record<AuthorName, AuthorInfo> = {
  "Mina Boktor": {
    linkedInUrl: "https://www.linkedin.com/in/mina-boktor-108126211",
    githubUrl: "https://github.com/minaboktor2628",
    major: "BS - Computer Science",
    paperLocation: "/papers/mina.pdf",
    title: "Mina's paper",
  },
  "Brendon Peters": {
    paperLocation: "/papers/brendon.pdf",
    title: "Brendon's paper",
    githubUrl: "https://github.com/bjpeters2027",
    major: "BS - Computer Science and Data Science",
    portfolioUrl: "https://bjpeters2027.github.io/",
    linkedInUrl: "https://www.linkedin.com/in/brendon-peters-comp-sci/",
  },
  "Samuel Goldsmith": {
    major: "BS/MS - CS/AI",
    githubUrl: "https://github.com/SamuelGoldsmith",
    linkedInUrl: "https://www.linkedin.com/in/samuel-r-goldsmith/",
    portfolioUrl: "https://samuel_goldsmith.com",
    paperLocation: "/papers/samuel.pdf",
    title: "Samuel's paper",
  },
};
