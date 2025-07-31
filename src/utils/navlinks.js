export const navLinksData = [
  {
    name: "Home",
    path: "/",
     
  },
  {
    name: "Men",

    children: [
      { name: "Mens-Shirts", path: "/category/Mens-Shirts" },
      { name: "Mens-Shoes", path: "/category/Mens-Shoes" },
      { name: "Mens-Watches", path: "/category/Mens-Watches" },
    ],
  },
  {
    name: "Women",
    children: [
      { name: "Women-Bags", path: "/category/womens-bags" },
      { name: "Women-Dresses", path: "/category/womens-dresses" },
      { name: "Women-Shoes", path: "/category/womens-shoes" },
      { name: "Women-Jwellery", path: "/category/womens-jewellery" },
      { name: "Women-Watches", path: "/category/womens-watches" },
    ],
  },
  {
    name: "Explore",
    children: [
      { name: "Groceries", path: "/category/groceries" },
      { name: "Furniture", path: "/category/furniture" },
      { name: "Beauty", path: "/category/beauty" },
    ],
  },
  {
    name: "Category",
    path: "/categories",
  },
];
