/**
 * Central place for real contact + social details. Anything left blank is
 * simply not rendered, so no placeholder links ever ship.
 */
export const siteConfig = {
  contact: {
    email: "info.ummad26@gmail.com",
    // Fill in when a public number exists, e.g. "+1 (613) 555-0199".
    phone: "",
  },
  social: [
    // { network: "facebook", url: "https://facebook.com/..." },
    // { network: "x", url: "https://x.com/..." },
    // { network: "instagram", url: "https://instagram.com/..." },
  ] as { network: "facebook" | "x" | "instagram"; url: string }[],
};
