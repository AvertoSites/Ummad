import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Music2, Play, ExternalLink } from "lucide-react";
import { getYouTubeId, getYouTubeThumbnail } from "../../utils/video";

interface MusicVideoTileProps {
  youtubeUrl: string;
  title: string;
  artist: string;
}

/**
 * Grid tile that shows a YouTube music video's thumbnail and swaps in the
 * embedded player (with sound) when the visitor presses play.
 */
export function MusicVideoTile({ youtubeUrl, title, artist }: MusicVideoTileProps) {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);
  const thumbnail = getYouTubeThumbnail(youtubeUrl);

  return (
    <div className="group flex flex-col h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-900 to-slate-950 shadow-sm ring-1 ring-sky-900/40 hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
        {playing && videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${t("musicVideo.play")}: ${title}`}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex items-center justify-center">
                <span className="absolute w-11 h-11 rounded-full bg-white/30 animate-ping" />
                <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-sky-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play size={16} className="fill-sky-800 ml-0.5" />
                </span>
              </span>
            </span>
            <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 bg-sky-400 text-slate-900 rounded-full uppercase tracking-wide">
              <Music2 size={8} />
              {t("musicVideo.label")}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-col flex-1 p-2.5">
        <span className="text-[9px] font-semibold text-sky-300 uppercase tracking-wide mb-1 truncate">
          {artist}
        </span>
        <h3 className="text-xs font-semibold text-white leading-snug line-clamp-2">
          {title}
        </h3>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 pt-1.5 text-[10px] text-sky-200/70 hover:text-white transition-colors"
        >
          <ExternalLink size={9} />
          {t("musicVideo.watchOnYouTube")}
        </a>
      </div>
    </div>
  );
}
