import { House, ReceiptText, User, UsersIcon } from "lucide-react";


export const sideNavLinks = [
    {
        title: "Home",
        url:"/",
        icon: House

    },
    {
        title: "Market Place",
        url:"/market-place",
        icon: ReceiptText
        
    },
    {
        title: "TipSters",
        url:"/tipsters",
        icon: UsersIcon
        
    },
    {
        title: "My Profile",
        url:"/my-profile",
        icon: User
        
    }
]

export const isClient = typeof window !== "undefined";
export const BASE_URL = "http://localhost:3001/api/v1";

export function formatMonthYear(isoDate: string): string | null {
    if (!isoDate) return null;
   
    const date = new Date(isoDate);
   
    if (isNaN(date.getTime())) return null;
   
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC", // use UTC to avoid timezone-shift changing the month
    });
  }