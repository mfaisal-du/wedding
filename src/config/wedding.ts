export type TimelineIcon = "mehndi" | "sehra" | "barat" | "reception" | "lunch";

export interface TimelineItem {
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
  day: string;
  month: string;
  year: string;
  weekday: string;
  startTime: string;
  isoDate: string;
  countdownLine: string;
  timeline: TimelineItem[];
}

export interface EventTime {
  label: string;
  value: string;
}

export interface WeddingEvent {
  key: EventKey;
  /** included in this guest's invitation */
  enabled: boolean;
  name: string;
  nameUr: string;
  tagline: string;
  taglineUr: string;
  date: string;
  time: string;
  /** local ISO datetime used for calendar export */
  isoDate: string;
  /** optional labelled timings shown instead of the single time line */
  times?: EventTime[];
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
    date: "Friday, 6th November 2026",
    time: "6:00 PM",
    isoDate: "2026-11-06T18:00:00",
    times: [{ label: "Mehndi", value: "6:00 PM" }],
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
    date: "Saturday, 7th November 2026",
    time: "7:00 AM",
    isoDate: "2026-11-07T07:00:00",
    times: [
      { label: "Sehra Bandi", value: "7:00 AM" },
      { label: "Departure of Barat", value: "8:00 AM (Sharp)" },
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
    tagline: "A celebration dinner in our honour",
    taglineUr: "ولیمہ کی پُروقار دعوت",
    date: "Sunday, 8th November 2026",
    time: "1:00 PM",
    isoDate: "2026-11-08T13:00:00",
    times: [
      { label: "Reception of Guests", value: "1:00 PM" },
      { label: "Lunch", value: "2:00 PM" },
    ],
    venue:
      "Green Land Marriage Hall (1), Jail Mor, Near Shell Petrol Pump, Vehari Road, Multan",
    venueUr: "گرین لینڈ میرج ہال (1)، جیل مور، نیئر شیل پیٹرول پمپ، وہاڑی روڈ، ملتان",
    mapUrl: GREEN_LAND_MAP,
  },
];

const MEHNDI_SCHEDULE: TimelineItem[] = [
  {
    date: "Fri 6 Nov",
    title: "Mehndi",
    time: "6:00 PM",
    venue: "Abdullah Garden & Marquee",
    mapUrl: ABDULLAH_GARDEN_MAP,
    icon: "mehndi",
  },
];

const BARAT_SCHEDULE: TimelineItem[] = [
  {
    date: "Sat 7 Nov",
    title: "Sehra Bandi",
    time: "7:00 AM",
    venue: "Rana House # 254, Sabzwari Town",
    mapUrl: SABZWARI_TOWN_MAP,
    icon: "sehra",
  },
  {
    date: "Sat 7 Nov",
    title: "Departure of Barat",
    time: "8:00 AM (Sharp)",
    venue: "Rana House # 254, Sabzwari Town",
    mapUrl: SABZWARI_TOWN_MAP,
    icon: "barat",
  },
];

const WALIMA_SCHEDULE: TimelineItem[] = [
  {
    date: "Sun 8 Nov",
    title: "Reception of Guests",
    time: "1:00 PM",
    venue: "Green Land Marriage Hall (1)",
    mapUrl: GREEN_LAND_MAP,
    icon: "reception",
  },
  {
    date: "Sun 8 Nov",
    title: "Lunch",
    time: "2:00 PM",
    venue: "Green Land Marriage Hall (1)",
    mapUrl: GREEN_LAND_MAP,
    icon: "lunch",
  },
];

export const RSVP_NAMES = [
  "Rana M. Faisal Ismail",
  "Rana M. Umair Ismail (Chief Officer)",
  "& All Family Members, Relatives & Friends",
];

export const RSVP_PHONES = ["0300-9635752", "0304-4258489", "0304-9992754"];

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
    day: "6",
    month: "November",
    year: "2026",
    weekday: "Friday",
    startTime: "6:00 PM",
    isoDate: "2026-11-06T18:00:00",
    countdownLine: "until the mehndi begins",
    timeline: MEHNDI_SCHEDULE,
  },
  barat: {
    eventLabel: "Barat Ceremony",
    events: ["barat"],
    day: "7",
    month: "November",
    year: "2026",
    weekday: "Saturday",
    startTime: "7:00 AM",
    isoDate: "2026-11-07T07:00:00",
    countdownLine: "until the barat begins",
    timeline: BARAT_SCHEDULE,
  },
  walima: {
    eventLabel: "Walima Reception",
    events: ["walima"],
    day: "8",
    month: "November",
    year: "2026",
    weekday: "Sunday",
    startTime: "1:00 PM",
    isoDate: "2026-11-08T13:00:00",
    countdownLine: "until the walima begins",
    timeline: WALIMA_SCHEDULE,
  },
  all: {
    eventLabel: "Wedding Celebrations",
    events: ["mehndi", "barat", "walima"],
    day: "6 · 7 · 8",
    month: "November",
    year: "2026",
    weekday: "Save the dates",
    startTime: "6:00 PM",
    isoDate: "2026-11-06T18:00:00",
    countdownLine: "until the celebrations begin",
    timeline: [...MEHNDI_SCHEDULE, ...BARAT_SCHEDULE, ...WALIMA_SCHEDULE],
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
    "Join us for an evening of love, laughter, duas, and cherished memories as we begin our forever — together.",
  inviteMessageUr:
    "محبت، دعاؤں اور خوشیوں سے بھرپور اس موقع پر ہمارے ساتھ شریک ہوں۔",
  events: DEFAULT_EVENTS,
  day: "6 · 7 · 8",
  month: "November",
  year: "2026",
  weekday: "Save the dates",
  startTime: "6:00 PM",
  isoDate: "2026-11-06T18:00:00",
  countdownLine: "until the celebrations begin",
  verse: "And We created you in pairs.",
  verseRef: "Surah An-Naba · 78:8",
  timeline: [...MEHNDI_SCHEDULE, ...BARAT_SCHEDULE, ...WALIMA_SCHEDULE],
};

export function resolveInvitationKey(): InvitationKey {
  if (typeof window === "undefined") return "all";
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
  return {
    ...DEFAULT_CONFIG,
    eventLabel: profile.eventLabel,
    day: profile.day,
    month: profile.month,
    year: profile.year,
    weekday: profile.weekday,
    startTime: profile.startTime,
    isoDate: profile.isoDate,
    countdownLine: profile.countdownLine,
    events: DEFAULT_EVENTS.map((event) => ({
      ...event,
      enabled: profile.events.includes(event.key),
    })),
    timeline: profile.timeline,
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
