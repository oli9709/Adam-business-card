/**
 * ============================================================
 * Chillbusan Tours — Profile Data Configuration
 * ============================================================
 *
 * Single source of truth for all user profiles.
 * To add a new profile, append an entry to PROFILES keyed by
 * a lowercase URL-safe slug (used as ?u=<slug>).
 *
 * The UI layer imports `useProfile()` and never touches
 * this file — clean separation of content and presentation.
 * ============================================================
 */

import { useMemo } from "react";

/* ─────────────── Profile Data ─────────────── */

const PROFILES = {
  adam: {
    id: "adam",
    profilePicture: "/assets/IMG_5017.png",
    fullName: "Adam",
    jobTitle: "Tour Operator & Guide",
    bio: "Helping you explore the hidden gems of Busan — street food alleys, coastal trails, and everything in between. 🇰🇷",
    phone: "+82-10-8491-1771",
    whatsapp: "821084911771",
    links: [
      {
        key: "website",
        icon: "globe",
        label: "Official Website",
        url: "https://chillbusantours.com",
        gradient: "from-ocean-500 to-ocean-700",
      },
      {
        key: "instagram-official",
        icon: "instagram",
        label: "Official Instagram",
        url: "https://www.instagram.com/chilltours_busan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        gradient: "from-pink-500 to-purple-600",
      },
      {
        key: "instagram-personal",
        icon: "instagram",
        label: "Personal Instagram",
        url: "https://www.instagram.com/officious_4o/#",
        gradient: "from-amber-400 to-pink-500",
      },
      {
        key: "telegram",
        icon: "telegram",
        label: "Telegram",
        url: "https://t.me/MardanovOtabek",
        gradient: "from-blue-400 to-blue-600",
      },
      {
        key: "tiktok",
        icon: "tiktok",
        label: "TikTok",
        url: "https://www.tiktok.com/@chilltours_busan?_t=ZS-8wtxduMO4Cv&_r=1",
        gradient: "from-cyan-400 to-teal-500",
      },
      {
        key: "review",
        icon: "star",
        label: "Give us review 😍",
        url: "https://g.page/r/CaiW7oKUP1MKEBM/review",
        gradient: "from-gold-400 to-amber-500",
      },
    ],
  },

  ali: {
    id: "ali",
    profilePicture: "/images/profiles/ali_photo.jpg",
    fullName: "Ali",
    jobTitle: "Tour Coordinator & Photographer",
    bio: "Capturing Busan through a local lens — temple sunrises, harbour sunsets, and the best cafés you've never heard of. 📸",
    phone: "+82-10-8765-4321",
    whatsapp: "821087654321",
    links: [
      {
        key: "website",
        icon: "globe",
        label: "Official Website",
        url: "https://chillbusan.com",
        gradient: "from-ocean-500 to-ocean-700",
      },
      {
        key: "instagram-official",
        icon: "instagram",
        label: "Official Instagram",
        url: "https://www.instagram.com/chillbusantours",
        gradient: "from-pink-500 to-purple-600",
      },
      {
        key: "instagram-personal",
        icon: "instagram",
        label: "Personal Instagram",
        url: "https://www.instagram.com/ali_chillbusan",
        gradient: "from-amber-400 to-pink-500",
      },
      {
        key: "tiktok",
        icon: "tiktok",
        label: "TikTok",
        url: "https://tiktok.com/@chillbusan.ali",
        gradient: "from-cyan-400 to-teal-500",
      },
    ],
  },
};

const DEFAULT_PROFILE = "adam";

/* ─────────────── React Hook ─────────────── */

/**
 * useProfile()
 *
 * Reads the `u` query-parameter from the current URL and returns
 * the matching profile object, memoised for render stability.
 *
 *   ?u=adam  → PROFILES.adam
 *   ?u=ali   → PROFILES.ali
 *   (none)   → PROFILES.adam   (DEFAULT_PROFILE)
 *   ?u=xyz   → PROFILES.adam   (unknown slug falls back to default)
 */
export function useProfile() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = (params.get("u") || DEFAULT_PROFILE).toLowerCase().trim();
    return PROFILES[slug] || PROFILES[DEFAULT_PROFILE];
  }, []);
}

export default PROFILES;
