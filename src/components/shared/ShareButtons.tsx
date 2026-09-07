import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Share2, Link2, Check } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "./SocialIcons";

interface ShareButtonsProps {
  title: string;
  /** Defaults to the current page URL. */
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const nativeShare = () => {
    navigator.share({ title, url: shareUrl }).catch(() => {});
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-sky-700 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 mr-1">
        {t("general.share")}
      </span>

      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={btn}>
          <Share2 size={13} /> {t("general.share")}
        </button>
      )}

      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title,
        )}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        <TwitterIcon size={13} /> X
      </a>
      <a
        className={btn}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <FacebookIcon size={13} /> Facebook
      </a>
      <button type="button" onClick={copy} className={btn}>
        {copied ? (
          <>
            <Check size={13} /> {t("general.linkCopied")}
          </>
        ) : (
          <>
            <Link2 size={13} /> {t("general.copyLink")}
          </>
        )}
      </button>
    </div>
  );
}
