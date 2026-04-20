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
export const BASE_URL = "https://api.betwise.com/v1/";