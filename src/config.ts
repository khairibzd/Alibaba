import { Category } from "@prisma/client";

export const INFINITE_SCROLL_LIMIT = 8;

export const ORDER_INFINITE_SCROLL_LIMIT = 3;

export const categories: Category[] = [
  {
    name: "Men",
    slug: "men",
  },
  {
    name: "Clothing",
    slug: "clothing",
  },
  {
    name: "Woman",
    slug: "woman",
  },
  {
    name: "Shoes",
    slug: "shoes",
  },
];
