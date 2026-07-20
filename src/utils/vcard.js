/**
 * generateVCard(profile)
 *
 * Builds a standard vCard 3.0 string from a profile object
 * and triggers a browser download of the .vcf file.
 */
export function downloadVCard(profile) {
  const websiteLink = profile.links.find((l) => l.key === "website");
  const websiteUrl = websiteLink ? websiteLink.url : "";

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.fullName} — Chillbusan Tours`,
    `N:;${profile.fullName};;;`,
    `ORG:Chillbusan Tours`,
    `TITLE:${profile.jobTitle}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `TEL;TYPE=CELL;TYPE=MSG:+${profile.whatsapp}`,
    websiteUrl ? `URL:${websiteUrl}` : "",
    `NOTE:${profile.bio}`,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${profile.fullName.toLowerCase()}-chillbusan.vcf`;
  document.body.appendChild(anchor);
  anchor.click();

  // Cleanup
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
