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

export function dateRange(startDate: Date, endDate: Date | "Current"): string {
  const normalizedEndDate = endDate === "Current" ? new Date() : endDate;

  const differenceInMonths =
    normalizedEndDate.getMonth() -
    startDate.getMonth() +
    12 * (normalizedEndDate.getFullYear() - startDate.getFullYear());

  const differenceInYears = (differenceInMonths / 12).toFixed(1);

  return `${startDate.toLocaleString("default", {
    month: "short",
  })} ${startDate.getFullYear()} - ${
    endDate === "Current"
      ? "Present"
      : `${normalizedEndDate.toLocaleString("default", {
          month: "short",
        })} ${normalizedEndDate.getFullYear()}`
  } (${
    differenceInMonths < 12
      ? `${differenceInMonths} month${differenceInMonths === 1 ? "" : "s"}`
      : `${differenceInYears} year${differenceInYears === "1" ? "" : "s"}`
  })`;
}
