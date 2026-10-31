import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const AUDIO_SOURCE = "/audio/TMRD-BG-final.mp3";

export interface MusicHandle {
  play: () => void;
}

type PlaybackStatus = "loading" | "ready" | "starting" | "playing" | "paused" | "blocked" | "error";

const BackgroundMusic = forwardRef<MusicHandle>(function BackgroundMusic(_props, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const explicitlyOffRef = useRef(false);
  const [status, setStatus] = useState<PlaybackStatus>("loading");

  const attemptPlay = () => {
    const audio = audioRef.current;
    if (!audio) {
      setStatus("error");
      return;
    }
    explicitlyOffRef.current = false;
    audio.volume = 0.8;
    setStatus("starting");
    const result = audio.play();
    result?.catch((error: DOMException) => {
      if (error.name === "AbortError" && explicitlyOffRef.current) {
        setStatus("paused");
        return;
      }
      setStatus(error.name === "NotAllowedError" ? "blocked" : "error");
    });
  };

  useImperativeHandle(ref, () => ({ play: attemptPlay }));

  const turnMusicOff = () => {
    explicitlyOffRef.current = true;
    audioRef.current?.pause();
    setStatus("paused");
  };

  const toggleMusic = () => {
    if (status === "playing" || status === "starting") {
      turnMusicOff();
      return;
    }
    if (status === "error") audioRef.current?.load();
    attemptPlay();
  };

  const statusText: Record<PlaybackStatus, string> = {
    loading: "Loading the music file",
    ready: "Music is ready. Opening the invitation will try playback.",
    starting: "Starting music",
    playing: "Music is playing",
    paused: explicitlyOffRef.current ? "Music is off" : "Music is paused",
    blocked: "Playback was blocked. Tap to try again.",
    error: "The music file could not be played. The invitation is still available.",
  };
  const buttonLabel = status === "playing"
    ? "Music on"
    : status === "starting"
      ? "Starting music"
      : status === "paused" && explicitlyOffRef.current
        ? "Music off"
        : status === "loading"
          ? "Loading music"
          : status === "error"
            ? "Retry music"
            : "Tap to play music";

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SOURCE}
        preload="auto"
        loop
        aria-hidden="true"
        onCanPlay={() => setStatus((current) => current === "loading" ? "ready" : current)}
        onPlaying={() => {
          if (explicitlyOffRef.current) {
            audioRef.current?.pause();
            return;
          }
          setStatus("playing");
        }}
        onPause={() => setStatus("paused")}
        onError={() => setStatus("error")}
      />
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
        {status === "paused" && explicitlyOffRef.current
          ? <VolumeX className="h-4 w-4" aria-hidden />
          : <Music className="h-4 w-4" aria-hidden />}
        {buttonLabel}
      </button>
      <span className="sr-only" role="status">{statusText[status]}</span>
    </>
  );
});

export default BackgroundMusic;