export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

function formatMonthYear(date: Date): string {
  return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
}

function formatDuration(startDate: Date, endDate: Date): string {
  const differenceInMonths =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());

  if (differenceInMonths < 12) {
    return `${differenceInMonths} month${differenceInMonths === 1 ? "" : "s"}`;
  }
  const differenceInYears = (differenceInMonths / 12).toFixed(1);
  return `${differenceInYears} year${differenceInYears === "1.0" ? "" : "s"}`;
}

export function dateRange(startDate: Date, endDate: Date | "Current"): string {
  const normalizedEndDate = endDate === "Current" ? new Date() : endDate;
  const endLabel = endDate === "Current" ? "Present" : formatMonthYear(normalizedEndDate);

  return `${formatMonthYear(startDate)} - ${endLabel} (${formatDuration(startDate, normalizedEndDate)})`;
}

export function shortDateRange(startDate: Date, endDate: Date | "Current"): string {
  const endYear = endDate === "Current" ? "Present" : endDate.getFullYear().toString();
  const startYear = startDate.getFullYear().toString();

  if (startYear === endYear) return startYear;
  return `${startYear} - ${endYear}`;
}

type Role = { dateStart: Date; dateEnd: Date | "Current" };

/** Derives the overall company date range from its roles array. */
export function companyDateRange(roles: Role[]): {
  startDate: Date;
  endDate: Date | "Current";
} {
  let startDate = roles[0].dateStart;
  let endDate: Date | "Current" = roles[0].dateEnd;

  for (const role of roles) {
    if (role.dateStart < startDate) startDate = role.dateStart;
    if (role.dateEnd === "Current") {
      endDate = "Current";
    } else if (endDate !== "Current" && role.dateEnd > endDate) {
      endDate = role.dateEnd;
    }
  }

  return { startDate, endDate };
}
