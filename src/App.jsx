import {
  Phone,
  MessageCircle,
  UserPlus,
  Globe,
  ExternalLink,
  MapPin,
  Camera,
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
      strokeWidth="2"
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
};

/* ════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════ */

export default function App() {
  const profile = useProfile();

  const whatsappMsg = encodeURIComponent(
    `Hello ${profile.fullName}! I'm interested in a tour with Chillbusan Tours.`
  );

  return (
    <div className="relative min-h-dvh flex flex-col items-center">
      {/* ── Background ── */}
      <div className="fixed inset-0 -z-10 bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      </div>

      {/* ── Content wrapper (mobile-centric) ── */}
      <main className="w-full max-w-[430px] px-5 pb-12 pt-10 flex flex-col items-center gap-7">

        {/* ─── HEADER / BRANDING ─── */}
        <header
          className="animate-fade-up flex flex-col items-center gap-1.5"
          style={{ animationDelay: "0s" }}
        >
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-ocean-400" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ocean-300/70">
              Busan, South Korea
            </span>
          </div>
          <h1 className="text-[26px] font-extrabold tracking-tight bg-gradient-to-r from-ocean-200 via-teal-400 to-gold-400 bg-clip-text text-transparent">
            Chillbusan Tours
          </h1>
        </header>

        {/* ─── HERO PROFILE CARD ─── */}
        <section
          className="animate-fade-up glass-strong rounded-3xl w-full p-7 flex flex-col items-center gap-5"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Avatar */}
          <div className="profile-ring rounded-full p-1">
            <img
              src={profile.profilePicture}
              alt={`${profile.fullName} — Chillbusan Tours`}
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>

          {/* Name & Title */}
          <div className="text-center">
            <h2 className="text-[22px] font-bold tracking-tight">{profile.fullName}</h2>
            <p className="text-sm font-medium text-ocean-300 mt-1">
              {profile.jobTitle}
            </p>
          </div>

          {/* Bio */}
          <p className="text-center text-[13px] leading-relaxed text-white/60 max-w-[300px]">
            {profile.bio}
          </p>
        </section>

        {/* ─── QUICK ACTIONS ─── */}
        <section
          className="animate-fade-up w-full grid grid-cols-3 gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Call Me */}
          <a
            href={`tel:${profile.phone}`}
            id="action-call"
            className="tap-scale action-glow glass rounded-2xl flex flex-col items-center justify-center gap-2.5 py-5 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Phone size={20} className="text-white" />
            </div>
            <span className="text-[11px] font-semibold tracking-wide">Call Me</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${profile.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            id="action-whatsapp"
            className="tap-scale action-glow glass rounded-2xl flex flex-col items-center justify-center gap-2.5 py-5 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <MessageCircle size={20} className="text-white" />
            </div>
            <span className="text-[11px] font-semibold tracking-wide">WhatsApp</span>
          </a>

          {/* Save Contact */}
          <button
            onClick={() => downloadVCard(profile)}
            id="action-save-contact"
            className="tap-scale action-glow glass rounded-2xl flex flex-col items-center justify-center gap-2.5 py-5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/20">
              <UserPlus size={20} className="text-white" />
            </div>
            <span className="text-[11px] font-semibold tracking-wide">Save Contact</span>
          </button>
        </section>

        {/* ─── CONNECT WITH US — LINK HUB ─── */}
        <section
          className="animate-fade-up w-full flex flex-col gap-3"
          style={{ animationDelay: "0.35s" }}
        >
          <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/35 px-1 mb-0.5">
            Connect with us
          </h3>

          {profile.links.map((link) => {
            const Icon = ICON_MAP[link.icon] || Globe;

            return (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`link-${link.key}`}
                className="link-card tap-scale glass rounded-2xl flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-colors group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <span className="font-semibold text-sm flex-1">
                  {link.label}
                </span>
                <ExternalLink
                  size={15}
                  className="text-white/25 group-hover:text-white/60 transition-colors flex-shrink-0"
                />
              </a>
            );
          })}
        </section>

        {/* ─── FOOTER ─── */}
        <footer
          className="animate-fade-up text-center mt-6"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-[10px] text-white/20 tracking-wide">
            © {new Date().getFullYear()} Chillbusan Tours · All rights reserved
          </p>
        </footer>
      </main>
    </div>
  );
}
