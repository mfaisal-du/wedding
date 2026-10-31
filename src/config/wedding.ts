export type TimelineIcon = "mehndi" | "sehra" | "barat" | "reception" | "lunch";

export interface TimelineItem {
  eventKey: EventKey;
  date: string;
  title: string;
  time: string;
  venue: string;
  mapUrl: string;
  icon: TimelineIcon;
}

export const PAKISTAN_UTC_OFFSET = "+05:00";
export const PAKISTAN_TIME_ZONE = "Asia/Karachi";

const ABDULLAH_GARDEN_MAP = "https://maps.app.goo.gl/US6NxScqWVL9ZBsU7";
const SABZWARI_TOWN_MAP = "https://maps.app.goo.gl/chzT7NPURJsDQhCN8";
const GREEN_LAND_MAP = "https://maps.app.goo.gl/v6niCx7eJW2pgJvy7";

export type ThemeKey = "cream" | "maroon" | "emerald" | "rose" | "midnight";

export type EventKey = "mehndi" | "barat" | "walima";

export type InvitationKey = "mehndi" | "barat" | "walima" | "all";

export interface InvitationProfile {
  eventLabel: string;
  events: EventKey[];
  countdownLine: string;
}

export interface EventTime {
  label: string;
  isoDate: string;
  note?: string;
}

export interface WeddingEvent {
  key: EventKey;
  /** included in this guest's invitation */
  enabled: boolean;
  name: string;
  nameUr: string;
  tagline: string;
  taglineUr: string;
  times: EventTime[];
  venue: string;
  venueUr: string;
  /** opens the venue in Google Maps */
  mapUrl: string;
  /** short line from the printed card, shown beneath the venue */
  note?: string;
  noteUr?: string;
}

export interface WeddingConfig {
  theme: ThemeKey;
  /** show the Urdu line beneath each English line */
  showUrdu: boolean;
  eventLabel: string;
  groom: string;
  groomParents: string;
  bride: string;
  brideParents: string;
  /** Urdu renderings — optional, shown when showUrdu is on */
  groomUr: string;
  brideUr: string;
  invitedLineUr: string;
  inviteMessage: string;
  inviteMessageUr: string;
  events: WeddingEvent[];
  day: string;
  month: string;
  year: string;
  weekday: string;
  startTime: string;
  /** local ISO datetime, e.g. 2026-12-12T18:00:00 — drives the countdown */
  isoDate: string;
  /** short line shown beneath the countdown */
  countdownLine: string;
  verse: string;
  verseRef: string;
  timeline: TimelineItem[];
}

export const DEFAULT_EVENTS: WeddingEvent[] = [
  {
    key: "mehndi",
    enabled: true,
    name: "Mehndi",
    nameUr: "مہندی",
    tagline: "An evening of henna, dhol & colour",
    taglineUr: "مہندی، ڈھول اور رنگوں کی شام",
    times: [{ label: "Mehndi", isoDate: "2026-11-06T18:00:00+05:00" }],
    venue: "Abdullah Garden & Marquee, Sabzwari Town, Canal Road, Multan",
    venueUr: "عبداللہ گارڈن اینڈ مارکی، سبزواری ٹاؤن، کینال روڈ، ملتان",
    mapUrl: ABDULLAH_GARDEN_MAP,
    note: "Awaiting Eyes: All Cousins & Friends",
  },
  {
    key: "barat",
    enabled: true,
    name: "Barat",
    nameUr: "بارات",
    tagline: "The wedding procession & celebration",
    taglineUr: "بارات اور شادی کی تقریب",
    times: [
      { label: "Sehra Bandi", isoDate: "2026-11-07T07:00:00+05:00" },
      { label: "Departure of Barat", isoDate: "2026-11-07T08:00:00+05:00", note: "Sharp" },
    ],
    venue: "Rana House # 254, Sabzwari Town, Multan",
    venueUr: "رانا ہاؤس نمبر 254، سبزواری ٹاؤن، ملتان",
    mapUrl: SABZWARI_TOWN_MAP,
    noteUr: "وقت کی پابندی کا خاص خیال رکھیں!",
  },
  {
    key: "walima",
    enabled: true,
    name: "Walima",
    nameUr: "ولیمہ",
    tagline: "Join us for our Walima luncheon.",
    taglineUr: "ولیمہ کی پُروقار دعوت",
    times: [
      { label: "Reception of Guests", isoDate: "2026-11-08T13:00:00+05:00" },
      { label: "Lunch", isoDate: "2026-11-08T14:00:00+05:00" },
    ],
    venue:
      "Green Land Marriage Hall (1), Jail Mod, Near Shell Petrol Pump, Vehari Road, Multan",
    venueUr: "گرین لینڈ میرج ہال (1)، جیل موڈ، شیل پیٹرول پمپ کے قریب، وہاڑی روڈ، ملتان",
    mapUrl: GREEN_LAND_MAP,
  },
];

export function formatWeddingDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PAKISTAN_TIME_ZONE,
  }).format(pakistanDate(isoDate));
}

export function formatWeddingTime(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: PAKISTAN_TIME_ZONE,
  }).format(pakistanDate(isoDate));
}

function datePart(isoDate: string, part: "day" | "month" | "year" | "weekday"): string {
  const options: Intl.DateTimeFormatOptions = { timeZone: PAKISTAN_TIME_ZONE };
  if (part === "day") options.day = "numeric";
  else if (part === "year") options.year = "numeric";
  else options[part] = "long";
  return new Intl.DateTimeFormat("en-US", options).format(pakistanDate(isoDate));
}

const EVENT_ICON: Record<EventKey, TimelineIcon[]> = {
  mehndi: ["mehndi"],
  barat: ["sehra", "barat"],
  walima: ["reception", "lunch"],
};

const DEFAULT_TIMELINE: TimelineItem[] = DEFAULT_EVENTS.flatMap((event) =>
  event.times.map((time, index) => ({
    eventKey: event.key,
    date: formatWeddingDate(time.isoDate),
    title: time.label,
    time: `${formatWeddingTime(time.isoDate)}${time.note ? ` (${time.note})` : ""}`,
    venue: event.venue,
    mapUrl: event.mapUrl,
    icon: EVENT_ICON[event.key][index],
  }))
);

export const RSVP_NAMES = [
  "Rana M. Faisal Ismail",
  "Rana M. Umair Ismail (Chief Officer)",
  "& All Family Members, Relatives & Friends",
];

export const RSVP_CONTACTS = [
  { name: "Rana Ismail", phone: "0300-9635752", whatsappPhone: "0300-9635752" },
  { name: "Rana Umair", phone: "0304-4258489", whatsappPhone: "0304-4258489" },
  { name: "Rana Faisal", phone: "0304-9992754", whatsappPhone: "+968-95305730" },
];

export const LOOKING_FORWARD = [
  "Rana Sultan Ahmed (Ex. Chairman UC Langar Sarai) (Late)",
  "Haji Rana Luqman (Late)",
  "Haji Rana Akbar",
  "Rana Yameen",
  "Rana Younas",
  "Rana Mehboob Alam (Late)",
  "Haji Rana Akram",
  "Rana Tariq Sohail",
  "Gohar Ayoub",
  "Rana Ghulam Rasool",
  "Ch. M. Qasim (Ali Pur)",
  "Ch. M. Aslam (Ali Pur)",
  "Rana Anwar (Lhr.)",
  "Rana Sarwar (Lhr.)",
  "Rana Hameed (Lhr.)",
];

/**
 * Each guest group gets its own invitation:
 *  - mehndi-only, barat-only, and walima-only links
 *  - visiting without ?invite=, or with ?invite=all, shows all three events
 */
export const INVITATION_PROFILES: Record<InvitationKey, InvitationProfile> = {
  mehndi: {
    eventLabel: "Mehndi Celebration",
    events: ["mehndi"],
    countdownLine: "until the mehndi begins",
  },
  barat: {
    eventLabel: "Barat Ceremony",
    events: ["barat"],
    countdownLine: "until the barat begins",
  },
  walima: {
    eventLabel: "Walima Reception",
    events: ["walima"],
    countdownLine: "until the walima begins",
  },
  all: {
    eventLabel: "Wedding Celebrations",
    events: ["mehndi", "barat", "walima"],
    countdownLine: "until the celebrations begin",
  },
};

export const DEFAULT_CONFIG: WeddingConfig = {
  theme: "maroon",
  showUrdu: true,
  eventLabel: "Wedding Celebrations",
  groom: "Uzair Ismail",
  groomParents: "",
  bride: "Rahma Farooq",
  brideParents: "",
  groomUr: "عزیر اسماعیل",
  brideUr: "رحمہ فاروق",
  invitedLineUr: "آپ کو ہماری تقریبِ سعید میں مدعو کیا جاتا ہے",
  inviteMessage:
    "Join us with your prayers and blessings as we celebrate our wedding and begin our life together.",
  inviteMessageUr:
    "محبت، دعاؤں اور خوشیوں سے بھرپور اس موقع پر ہمارے ساتھ شریک ہوں۔",
  events: DEFAULT_EVENTS,
  day: "6 · 7 · 8",
  month: "November",
  year: "2026",
  weekday: "Save the dates",
  startTime: "",
  isoDate: DEFAULT_EVENTS[0].times[0].isoDate,
  countdownLine: "until the celebrations begin",
  verse: "And We created you in pairs.",
  verseRef: "Surah An-Naba · 78:8",
  timeline: DEFAULT_TIMELINE,
};

export function resolveInvitationKey(): InvitationKey {
  if (typeof window === "undefined") return "all";
  const pathKey = window.location.pathname.match(/^\/invite\/(mehndi|barat|walima|valima)\/?$/)?.[1];
  if (pathKey === "mehndi" || pathKey === "barat" || pathKey === "walima") return pathKey;
  if (pathKey === "valima") return "walima";
  const params = new URLSearchParams(window.location.search);
  const raw = (params.get("invite") ?? params.get("event") ?? "").toLowerCase();
  if (raw === "mehndi" || raw === "barat") return raw;
  if (raw === "walima" || raw === "valima") return "walima";
  return "all";
}

export function buildInvitationConfig(
  key: InvitationKey = resolveInvitationKey()
): WeddingConfig {
  const profile = INVITATION_PROFILES[key] ?? INVITATION_PROFILES.all;
  const selectedEvents = DEFAULT_EVENTS.filter((event) => profile.events.includes(event.key));
  const firstTime = selectedEvents[0].times[0];
  return {
    ...DEFAULT_CONFIG,
    eventLabel: profile.eventLabel,
    day: selectedEvents.length === 1
      ? datePart(firstTime.isoDate, "day")
      : selectedEvents.map((event) => datePart(event.times[0].isoDate, "day")).join(" · "),
    month: datePart(firstTime.isoDate, "month"),
    year: datePart(firstTime.isoDate, "year"),
    weekday: selectedEvents.length === 1 ? datePart(firstTime.isoDate, "weekday") : "Save the dates",
    startTime: selectedEvents.length === 1 ? formatWeddingTime(firstTime.isoDate) : "",
    isoDate: firstTime.isoDate,
    countdownLine: profile.countdownLine,
    events: DEFAULT_EVENTS.map((event) => ({
      ...event,
      enabled: profile.events.includes(event.key),
    })),
    timeline: DEFAULT_TIMELINE.filter((item) => profile.events.includes(item.eventKey)),
  };
}

/** Treat a zone-less ISO datetime as Pakistan local time, never the host/browser zone. */
export function pakistanDate(iso: string): Date {
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(iso);
  return new Date(hasZone ? iso : `${iso}${PAKISTAN_UTC_OFFSET}`);
}

/** Convert a Pakistan-local datetime to a UTC stamp for calendar exports. */
export function icsUtcStamp(iso: string, addHours = 0): string {
  const date = pakistanDate(iso);
  if (Number.isNaN(date.getTime())) return "";
  const utc = new Date(date.getTime() + addHours * 3_600_000);
  return utc.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
