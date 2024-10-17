import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInfo() {
  const { userInfo } = useSelector((state: any) => state.auth);
  return userInfo;
}
