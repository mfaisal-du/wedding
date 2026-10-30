import { icsUtcStamp, type WeddingConfig, type WeddingEvent } from "../config/wedding";

function escapeCalendarText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldCalendarLine(line: string): string {
  const encoder = new TextEncoder();
  const segments: string[] = [];
  let segment = "";
  for (const character of line) {
    if (encoder.encode(segment + character).length > 75) {
      segments.push(`${segment}\r\n `);
      segment = character;
    } else {
      segment += character;
    }
  }
  return segments.join("") + segment;
}

export function downloadCalendar(config: WeddingConfig, events: WeddingEvent[]): void {
  const entries = events.flatMap((event) =>
    event.times.map((time, index) => {
      const stamp = icsUtcStamp(time.isoDate);
      const summary = `${config.groom} weds ${config.bride} — ${event.name}: ${time.label}`;
      return [
        "BEGIN:VEVENT",
        `UID:${event.key}-${stamp}-${index}@3bs.io`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
        `DTSTART:${stamp}`,
        `SUMMARY:${escapeCalendarText(summary)}`,
        `LOCATION:${escapeCalendarText(event.venue)}`,
        "END:VEVENT",
      ];
    })
  );
  const contents = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//3BS//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    ...entries.flat(),
    "END:VCALENDAR",
  ].map(foldCalendarLine).join("\r\n") + "\r\n";
  const blobUrl = URL.createObjectURL(new Blob([contents], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `${config.groom}-${config.bride}-wedding.ics`.toLowerCase().replace(/\s+/g, "-");
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}