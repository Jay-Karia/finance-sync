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
      { name: "Roommates", link: "/groups/roommates" },
      { name: "Trip to Japan", link: "/groups/trip-japan" },
      { name: "Family Budget", link: "/groups/family" },
    ],
  },
];
