import { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  UserPlus,
  Globe,
  ExternalLink,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import { useProfile } from "./data";
import { downloadVCard } from "./utils/vcard";

/* ── Instagram SVG icon ── */
function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ── TikTok SVG icon ── */
function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.04.86.11V9a6.27 6.27 0 0 0-.86-.06 6.33 6.33 0 0 0-6.33 6.33A6.33 6.33 0 0 0 9.49 21.6a6.33 6.33 0 0 0 6.33-6.33V8.72a8.16 8.16 0 0 0 3.77.92V6.69Z" />
    </svg>
  );
}

/* ── Icon resolver ── */
const ICON_MAP = {
  globe: Globe,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  star: Star,
};

/* ════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════ */

export default function App() {
  const profile = useProfile();
  const [isDark, setIsDark] = useState(false);

  // Toggle theme logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const whatsappMsg = encodeURIComponent(
    `Hello ${profile.fullName}! I'm interested in a tour with Chillbusan Tours.`
  );

  return (
    <div className="relative min-h-dvh flex flex-col items-center">
      {/* ── Content wrapper (mobile-centric) ── */}
      <main className="w-full max-w-[480px] px-6 pb-16 pt-8 flex flex-col">
        
        {/* ── Theme Toggle ── */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors text-neutral-500 dark:text-neutral-400"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* ─── HERO PROFILE ─── */}
        <section className="flex flex-col items-center mb-10 text-center">
          {/* Avatar */}
          <div className="mb-6">
            <img
              src={profile.profilePicture}
              alt={`${profile.fullName} Profile`}
              className="w-24 h-24 rounded-full object-cover shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800"
            />
          </div>

          {/* Name & Title */}
          <h1 className="text-4xl font-serif tracking-tight text-neutral-900 dark:text-white mb-2">
            {profile.fullName}
          </h1>
          <p className="text-[13px] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 font-medium mb-6">
            {profile.jobTitle}
          </p>

          {/* Bio */}
          <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-[340px]">
            {profile.bio}
          </p>
        </section>

        {/* ─── QUICK ACTIONS ─── */}
        <section className="grid grid-cols-3 gap-3 mb-12">
          <a
            href={`tel:${profile.phone}`}
            className="btn-primary"
          >
            <Phone size={16} />
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${profile.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={16} />
            <span>Message</span>
          </a>
          <button
            onClick={() => downloadVCard(profile)}
            className="btn-primary"
          >
            <UserPlus size={16} />
            <span>Save</span>
          </button>
        </section>

        {/* ─── LINKS (CONNECT) ─── */}
        <section className="flex flex-col">
          {profile.links.map((link) => {
            const Icon = ICON_MAP[link.icon] || Globe;

            return (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="list-item-minimal group"
              >
                <div className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                
                <span className="font-serif text-[17px] text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white flex-1 transition-colors">
                  {link.label}
                </span>

                <ExternalLink
                  size={16}
                  strokeWidth={1.5}
                  className="text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-400 dark:group-hover:text-neutral-500 transition-colors"
                />
              </a>
            );
          })}
        </section>
      </main>
    </div>
  );
}
