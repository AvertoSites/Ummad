import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SONGS } from "../../data/songs";
import { getYouTubeId } from "../../utils/video";

/* ── Minimal typings for the YouTube IFrame Player API ─────────────────── */

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  loadVideoById(id: string): void;
  destroy(): void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: () => void;
        onStateChange?: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;

let ytApiPromise: Promise<YTNamespace> | null = null;

/** Loads the YouTube IFrame API script once and resolves with window.YT. */
function loadYouTubeApi(): Promise<YTNamespace> {
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return ytApiPromise;
}

const TRACKS = SONGS.map((s) => ({ ...s, videoId: getYouTubeId(s.youtubeUrl) }))
  .filter((s): s is typeof s & { videoId: string } => Boolean(s.videoId));

/**
 * Floating site-wide music player. Lives in MainLayout so playback continues
 * across route changes.
 *
 * Browsers block autoplay with sound, so the playlist starts muted on load and
 * is unmuted either by the "Tap to unmute" button or by the visitor's first
 * click / tap / key press anywhere on the page.
 */
export function MusicPlayer() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const indexRef = useRef(0);
  // Set when the first interaction happens before the player is ready
  const pendingUnmuteRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  // Start minimized on phones so the card doesn't cover the page
  const [collapsed, setCollapsed] = useState(
    () => window.matchMedia("(max-width: 639px)").matches,
  );

  const playIndex = useCallback((i: number) => {
    const next = (i + TRACKS.length) % TRACKS.length;
    indexRef.current = next;
    setIndex(next);
    playerRef.current?.loadVideoById(TRACKS[next].videoId);
  }, []);

  const unmute = useCallback(() => {
    const p = playerRef.current;
    if (!p) {
      pendingUnmuteRef.current = true;
      return;
    }
    p.unMute();
    p.playVideo();
    setMuted(false);
  }, []);

  // Create the YouTube player once, muted + autoplaying
  useEffect(() => {
    const host = hostRef.current;
    if (!TRACKS.length || !host) return;
    let cancelled = false;
    // YT replaces its target node with an iframe, so give it a node React doesn't own
    const target = document.createElement("div");
    host.appendChild(target);

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(target, {
        videoId: TRACKS[0].videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            const p = playerRef.current!;
            if (pendingUnmuteRef.current) {
              p.unMute();
              setMuted(false);
            } else {
              p.mute();
            }
            p.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === YT_PLAYING) setPlaying(true);
            else if (e.data === YT_PAUSED) setPlaying(false);
            else if (e.data === YT_ENDED) playIndex(indexRef.current + 1);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [playIndex]);

  // Unmute on the visitor's first click / tap / key press anywhere on the page.
  // pointerup (not pointerdown) so a touch-scroll, which cancels the pointer,
  // doesn't count.
  useEffect(() => {
    const onFirst = (e: Event) => {
      document.removeEventListener("pointerup", onFirst, true);
      document.removeEventListener("keydown", onFirst, true);
      // Clicks on the player's own controls are handled by those buttons
      if (rootRef.current?.contains(e.target as Node)) return;
      unmute();
    };
    document.addEventListener("pointerup", onFirst, true);
    document.addEventListener("keydown", onFirst, true);
    return () => {
      document.removeEventListener("pointerup", onFirst, true);
      document.removeEventListener("keydown", onFirst, true);
    };
  }, [unmute]);

  if (!TRACKS.length) return null;

  const track = TRACKS[index];

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      unmute();
    } else {
      p.mute();
      setMuted(true);
    }
  };

  const iconBtn =
    "inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-600 hover:text-sky-700 hover:bg-slate-100 transition-colors";

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={t("player.label")}
      className={`fixed z-40 bottom-4 left-4 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden transition-[width] duration-200 ${
        collapsed ? "w-[16rem]" : "w-[min(18rem,calc(100vw-2rem))]"
      }`}
    >
      <div className={collapsed ? "flex items-center gap-2 p-2" : ""}>
        {/* Video — kept mounted and visible in both states so playback never restarts */}
        <div
          className={`relative bg-slate-900 shrink-0 ${
            collapsed ? "w-20 aspect-video rounded-md overflow-hidden" : "w-full aspect-video"
          }`}
        >
          <div ref={hostRef} className="absolute inset-0 pointer-events-none" />
          {muted && !collapsed && (
            <button
              type="button"
              onClick={unmute}
              className="absolute inset-0 flex items-center justify-center bg-slate-900/40 hover:bg-slate-900/50 transition-colors"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sky-700 text-sm font-semibold shadow motion-safe:animate-pulse">
                <Volume2 className="w-4 h-4" aria-hidden />
                {t("player.tapToUnmute")}
              </span>
            </button>
          )}
        </div>

        {collapsed ? (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {track.title}
              </p>
              <p className="text-[11px] text-slate-500 truncate">{track.artist}</p>
            </div>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? t("player.unmute") : t("player.mute")}
              className={`${iconBtn} ${muted ? "text-sky-700 bg-sky-50" : ""}`}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label={t("player.expand")}
              className={iconBtn}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="px-3 pt-2.5 pb-2">
            <div className="flex items-start gap-2">
              <Music className="w-4 h-4 mt-0.5 text-sky-700 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {track.title}
                </p>
                <p className="text-xs text-slate-500 truncate">{track.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label={t("player.collapse")}
                className={`${iconBtn} -mt-1 -mr-1`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => playIndex(index - 1)}
                  aria-label={t("player.previous")}
                  className={iconBtn}
                  disabled={TRACKS.length < 2}
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? t("player.pause") : t("player.play")}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition-colors"
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => playIndex(index + 1)}
                  aria-label={t("player.next")}
                  className={iconBtn}
                  disabled={TRACKS.length < 2}
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? t("player.unmute") : t("player.mute")}
                className={iconBtn}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
