export function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0);
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);

  const oneDay = 24 * 60 * 60 * 1000;
  const diffInDays: number = Math.round(
    (date.getTime() - now.getTime()) / oneDay
  );

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Tomorrow";
  } else if (diffInDays === -1) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }
}
