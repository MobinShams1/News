interface DateForm {
  date: Date;
  children?: any;
}

export default function DateFormat({ date, children }: DateForm) {
  if (!date) return null;

  const date1 = new Date(date);

  if (isNaN(date1.getTime())) return null;

  const formattedDate = date1.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      {children}
      <span>{formattedDate}</span>
    </>
  );
}
