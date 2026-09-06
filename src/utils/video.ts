/** Extracts the YouTube video id from a watch / youtu.be URL, or null. */
export function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\s]+)/);
  return match ? match[1] : null;
}

/** Extracts the numeric Vimeo id from a vimeo.com URL, or null. */
export function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

/** Returns a YouTube thumbnail URL for a YouTube link, or null for anything else (Vimeo, direct files, etc). */
export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

/**
 * True when the URL points straight at a playable video file (Firebase Storage
 * upload, .mp4, .webm, …) rather than a YouTube / Vimeo watch page. Only these
 * can be dropped into a <video> tag for muted background playback.
 */
export function isDirectVideoFile(url: string): boolean {
  if (getYouTubeId(url) || getVimeoId(url)) return false;
  if (/\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i.test(url)) return true;
  return url.includes("firebasestorage.googleapis.com");
}

/**
 * Returns an embeddable iframe URL for YouTube / Vimeo, or null if the URL is a
 * direct video file. Pass `{ autoplay: true }` to start playback muted.
 */
export function getVideoEmbedUrl(
  url: string,
  opts: { autoplay?: boolean } = {},
): string | null {
  const yt = getYouTubeId(url);
  if (yt) {
    const params = opts.autoplay
      ? `?autoplay=1&mute=1&loop=1&playlist=${yt}&controls=0&playsinline=1&modestbranding=1`
      : "";
    return `https://www.youtube.com/embed/${yt}${params}`;
  }
  const vi = getVimeoId(url);
  if (vi) {
    const params = opts.autoplay
      ? "?autoplay=1&muted=1&loop=1&background=1"
      : "";
    return `https://player.vimeo.com/video/${vi}${params}`;
  }
  return null;
}
