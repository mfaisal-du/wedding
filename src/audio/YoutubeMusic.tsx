import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

export const MUSIC_VIDEO_ID = "CB0o2cGq8Ow";

export interface MusicHandle {
  play: () => void;
}

type PlaybackStatus = "loading" | "ready" | "starting" | "playing" | "paused" | "blocked" | "error";

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YtPlayer;
      PlayerState: { UNSTARTED: number; PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YtPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy?: () => void;
}

const YoutubeMusic = forwardRef<MusicHandle>(function YoutubeMusic(_props, ref) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const musicOffRef = useRef(false);
  const attemptTimerRef = useRef<number | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>(musicOffRef.current ? "paused" : "loading");

  const attemptPlay = () => {
    if (musicOffRef.current) return;
    if (!readyRef.current || !playerRef.current) {
      pendingPlayRef.current = true;
      setStatus("loading");
      return;
    }
    pendingPlayRef.current = false;
    setStatus("starting");
    playerRef.current.playVideo();
    if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
    attemptTimerRef.current = window.setTimeout(() => {
      setStatus((current) => current === "starting" ? "blocked" : current);
    }, 2500);
  };

  useImperativeHandle(ref, () => ({ play: attemptPlay }));

  useEffect(() => {
    let cancelled = false;
    let apiTimeout: number | null = null;

    const createPlayer = () => {
      if (cancelled || playerRef.current || !hostRef.current || !window.YT?.Player) return;
      if (apiTimeout !== null) window.clearTimeout(apiTimeout);
      playerRef.current = new window.YT.Player(hostRef.current, {
        width: "200",
        height: "200",
        videoId: MUSIC_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: MUSIC_VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            readyRef.current = true;
            event.target.setVolume(80);
            if (pendingPlayRef.current && !musicOffRef.current) {
              pendingPlayRef.current = false;
              setStatus("starting");
              event.target.playVideo();
              attemptTimerRef.current = window.setTimeout(() => {
                setStatus((current) => current === "starting" ? "blocked" : current);
              }, 2500);
            } else {
              setStatus(musicOffRef.current ? "paused" : "ready");
            }
          },
          onStateChange: (event: { data: number }) => {
            const states = window.YT?.PlayerState;
            if (!states) return;
            if (event.data === states.PLAYING) {
              if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
              musicOffRef.current = false;
              setStatus("playing");
            } else if (event.data === states.PAUSED) {
              if (musicOffRef.current) {
                if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
                setStatus("paused");
              }
            } else if (event.data === states.ENDED) {
              if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
              setStatus("paused");
            }
          },
          onError: () => {
            if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
            setStatus("error");
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      const callback = () => {
        previousCallback?.();
        createPlayer();
      };
      window.onYouTubeIframeAPIReady = callback;
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }
      apiTimeout = window.setTimeout(() => {
        if (!window.YT?.Player) setStatus("error");
      }, 12000);
      return () => {
        cancelled = true;
        if (window.onYouTubeIframeAPIReady === callback) {
          window.onYouTubeIframeAPIReady = previousCallback;
        }
        if (apiTimeout !== null) window.clearTimeout(apiTimeout);
        if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
        playerRef.current?.destroy?.();
        playerRef.current = null;
        readyRef.current = false;
      };
    }

    return () => {
      cancelled = true;
      if (attemptTimerRef.current !== null) window.clearTimeout(attemptTimerRef.current);
      playerRef.current?.destroy?.();
      playerRef.current = null;
      readyRef.current = false;
    };
  }, []);

  const turnMusicOff = () => {
    pendingPlayRef.current = false;
    musicOffRef.current = true;
    setStatus("paused");
    playerRef.current?.pauseVideo();
  };

  const toggleMusic = () => {
    if (status === "error") {
      window.open(`https://www.youtube.com/watch?v=${MUSIC_VIDEO_ID}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (status === "playing" || status === "starting") {
      turnMusicOff();
      return;
    }
    musicOffRef.current = false;
    attemptPlay();
  };

  const statusText: Record<PlaybackStatus, string> = {
    loading: "Loading the music player",
    ready: "YouTube player loaded. Playback has not been confirmed.",
    starting: "Requesting playback",
    playing: "Music is playing",
    paused: musicOffRef.current ? "Music is off" : "Music is paused",
    blocked: "Playback did not start. Tap to retry or use the YouTube player.",
    error: "Music could not be loaded. The invitation is still available.",
  };
  const buttonLabel = status === "playing" || status === "starting"
    ? status === "playing" ? "Music on" : "Starting music"
    : status === "paused" && musicOffRef.current
      ? "Music off"
      : status === "loading"
        ? "Loading music"
        : status === "error"
          ? "Open music on YouTube"
          : status === "blocked"
            ? "Tap to play music"
            : "Tap to play music";

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-[220px] -left-[220px] h-[200px] w-[200px] overflow-hidden opacity-0">
        <div ref={hostRef} className="h-[200px] w-[200px]" />
      </div>
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={`${buttonLabel}. ${statusText[status]}`}
        aria-pressed={status === "playing"}
        className={`safe-dock-right fixed z-[90] inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-3 font-sans text-sm font-medium shadow-[0_16px_36px_-16px_rgba(120,85,45,0.7)] backdrop-blur-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-goldrich ${
          status === "playing"
            ? "border-goldrich bg-goldrich text-cream"
            : "border-gold/60 bg-cream/95 text-goldrich hover:border-goldrich"
        }`}
      >
        {status === "paused" && musicOffRef.current
          ? <VolumeX className="h-4 w-4" aria-hidden />
          : <Music className="h-4 w-4" aria-hidden />}
        {buttonLabel}
      </button>
      <span className="sr-only" role="status">{statusText[status]}</span>
    </>
  );
});

export default YoutubeMusic;