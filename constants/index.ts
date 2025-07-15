export const NAVBAR_ITEMS: {
  name: string;
  link: string;
  dropdown?: { name: string; link: string }[];
}[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "New Group",
    link: "new",
  },
  {
    name: "My Groups",
    link: "",
    dropdown: [
      { name: "Roommates", link: "/groups/1" },
      { name: "Trip to Japan", link: "/groups/2" },
      { name: "Family Budget", link: "/groups/3" },
    ],
  },
];
