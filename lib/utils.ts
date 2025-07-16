import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateBase64Id = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let str = "";
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/[+/=]/g, (char) => {
    switch (char) {
      case "+":
        return "-";
      case "/":
        return "_";
      case "=":
        return "";
      default:
        return char;
    }
  });
};

export const trimGroupName = (name: string) => {
  return name.length > 20 ? `${name.slice(0, 20)}...` : name;
}
