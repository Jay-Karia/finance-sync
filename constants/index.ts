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
    link: "/new",
  },
  {
    name: "Groups",
    link: "/",
    dropdown: [],
  },
];

export const SUCCESS_TOAST_STYLE = {
  style: { background: "#d4edda", color: "#155724" },
};

export const ERROR_TOAST_STYLE = {
  style: { background: "#f8d7da", color: "#721c24" },
};
export const INFO_TOAST_STYLE = {
  style: { background: "#cce5ff", color: "#004085" },
};
