declare type TopTipster ={
  id: number;
  initials: string;
  name: string;
  tier: TierType;
  sports: string;
  accuracy: number;
  subs: string;
  thisWeek: string;
  price: string | null;
  free: boolean;
  avatarBg: string;
  borderColor: string;
  accentColor: string;
}

declare type FollowTipster ={
  id: number;
  initials: string;
  name: string;
  sports: string;
  accuracy: number;
  subs: string;
  avatarBg: string;
  borderColor: string;
}
declare type TierType = "ELITE" | "PRO" | "FREE";

declare type Selection = {
  match?: string;
  market?: string;
  odd?: string;
  locked: boolean;
}

declare type BetSlip = {
  id: number;
  initials: string;
  avatarBg: string;
  name: string;
  verified: boolean;
  sport: "Football" | "Basketball" | "Tennis" | "Rugby" | "Cricket";
  leagues: string;
  odds: string;
  type: string;
  timer: string;
  timerUrgent: boolean;
  accuracy: number;
  badge?: "HOT PICK" | "FREE" | "NEW";
  badgeColor?: string;
  selections: {
    match?: string;
    market?: string;
    odd?: string;
    locked: boolean;
  }[];
  platforms: Platform[];
  price: string;
  priceLabel: string;
  isFree: boolean;
}

declare type Platform = "Sportpesa" | "Betin" | "1xBet" | "Betway";
declare type SportFilter = "All" | "Football" | "Basketball" | "Tennis" | "Rugby" | "Cricket";
declare type SortOption = "Hottest" | "Newest" | "Highest Odds" | "Lowest Price" | "Best Accuracy";
declare type ViewMode = "grid" | "list";
declare type AccuracyFilter =
  | "Any accuracy"
  | "90%+ Elite"
  | "80–90% Pro"
  | "70–80% Standard";