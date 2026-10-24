import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export const MUSIC_VIDEO_ID = "CB0o2cGq8Ow";

export interface MusicHandle {
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YtPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YtPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  setVolume: (v: number) => void;
  destroy?: () => void;
}

/**
 * Audio-only soundtrack: the official YouTube player streams the
 * chosen song unseen — guests only ever see the elegant toggle pill.
 */
const YoutubeMusic = forwardRef<MusicHandle, { onState?: (playing: boolean) => void }>(
  function YoutubeMusic({ onState }, ref) {
    const hostRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YtPlayer | null>(null);
    const pendingPlay = useRef(false);
    const readyRef = useRef(false);
    // music is ON by default — guests may switch it off if they wish
    const [playing, setPlaying] = useState(true);
    const mutedByUser = useRef(false);
    const onStateRef = useRef(onState);
    onStateRef.current = onState;

    useImperativeHandle(ref, () => ({
      play: () => {
        if (readyRef.current && playerRef.current) playerRef.current.playVideo();
        else pendingPlay.current = true;
      },
      pause: () => {
        pendingPlay.current = false;
        playerRef.current?.pauseVideo();
      },
      toggle: () => {
        if (playing) {
          mutedByUser.current = true;
          pendingPlay.current = false;
          setPlaying(false);
          playerRef.current?.pauseVideo();
        } else {
          mutedByUser.current = false;
          setPlaying(true);
          if (readyRef.current && playerRef.current) playerRef.current.playVideo();
          else pendingPlay.current = true;
        }
      },
    }));

    // if the browser blocked the initial play, resume on the guest's next interaction
    useEffect(() => {
      const retry = () => {
        if (mutedByUser.current) return;
        if (readyRef.current && playerRef.current) playerRef.current.playVideo();
      };
      window.addEventListener("pointerdown", retry, { passive: true });
      window.addEventListener("scroll", retry, { passive: true });
      return () => {
        window.removeEventListener("pointerdown", retry);
        window.removeEventListener("scroll", retry);
      };
    }, []);

    useEffect(() => {
      let cancelled = false;

      const create = () => {
        if (cancelled || !hostRef.current || !window.YT) return;
        playerRef.current = new window.YT.Player(hostRef.current, {
          videoId: MUSIC_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: MUSIC_VIDEO_ID,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onReady: (e: { target: YtPlayer }) => {
              readyRef.current = true;
              e.target.setVolume(80);
              // music on by default
              if (!mutedByUser.current) {
                pendingPlay.current = false;
                e.target.playVideo();
              }
            },
            onStateChange: (e: { data: number }) => {
              const isPlaying = window.YT ? e.data === window.YT.PlayerState.PLAYING : false;
              // while the guest still wants music, keep the pill lit even
              // during brief buffering states
              if (!mutedByUser.current && !isPlaying) return;
              setPlaying(isPlaying);
              onStateRef.current?.(isPlaying);
            },
          },
        }) as YtPlayer;
      };

      if (window.YT?.Player) {
        create();
      } else {
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          prev?.();
          create();
        };
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          document.head.appendChild(tag);
        }
      }
      return () => {
        cancelled = true;
        playerRef.current?.destroy?.();
        playerRef.current = null;
        readyRef.current = false;
      };
    }, []);

    return (
      <>
        {/* player kept completely out of sight — music only */}
        <div
          className="fixed -bottom-2 -right-2 h-px w-px overflow-hidden opacity-[0.01] pointer-events-none"
          aria-hidden
        >
          <div ref={hostRef} className="h-full w-full" />
        </div>

        {/* Music on / off pill */}
        <motion.button
          onClick={() => {
            if (playing) {
              mutedByUser.current = true;
              pendingPlay.current = false;
              setPlaying(false);
              playerRef.current?.pauseVideo();
            } else {
              mutedByUser.current = false;
              setPlaying(true);
              if (readyRef.current && playerRef.current) playerRef.current.playVideo();
              else pendingPlay.current = true;
            }
          }}
          aria-label={playing ? "Turn music off" : "Turn music on"}
          className={`safe-dock-right fixed z-[90] group flex items-center gap-2 sm:gap-2.5 rounded-full pl-3 pr-3.5 py-2.5 sm:pl-3.5 sm:pr-4 sm:py-3 border shadow-[0_16px_36px_-16px_rgba(120,85,45,0.7)] backdrop-blur-md transition-colors duration-300 ${
            playing
              ? "bg-goldrich border-goldrich text-cream"
              : "bg-cream/85 border-gold/50 text-goldrich hover:border-goldrich"
          }`}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="relative flex items-center justify-center">
            {playing && (
              <span
                className="absolute inset-0 rounded-full bg-cream/40"
                style={{ animation: "pulse-ring 2s ease-out infinite" }}
              />
            )}
            {playing ? (
              <Music className="relative w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.8} />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.8} />
            )}
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.24em] sm:tracking-[0.3em] uppercase">
            {playing ? "Music on" : "Music off"}
          </span>
          {playing && (
            <span className="flex items-end gap-[3px] h-3.5 ml-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-cream/90 origin-bottom"
                  style={{ animation: `eq 0.9s ease-in-out ${i * 0.18}s infinite`, height: "100%" }}
                />
              ))}
            </span>
          )}
        </motion.button>
      </>
    );
  }
);

export default YoutubeMusic;
