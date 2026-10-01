export interface Song {
  title: string;
  artist: string;
  youtubeUrl: string;
}

/** Site-wide music playlist, played in order by the floating MusicPlayer. */
export const SONGS: Song[] = [
  {
    title: "Dab Dhax-mooday",
    artist: "Hibo Nuura & Cabdi Muxumed Amiin Ahun",
    youtubeUrl: "https://youtu.be/QMdJGPvAhsQ",
  },
  {
    title: "Gorayadu Ilmaheeda",
    artist: "Hibo Nuura Maxamed",
    youtubeUrl: "https://youtu.be/35_oFinU1lM",
  },
];
