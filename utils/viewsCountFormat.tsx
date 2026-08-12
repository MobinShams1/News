interface ViewsCountForm {
  viewsCount?: number;
  children?: React.ReactNode;
}

export default function ViewsCountFormatted({
  viewsCount,
  children,
}: ViewsCountForm) {
  if (typeof viewsCount !== "number") return null;

  const viewsCountFormatted = viewsCount.toLocaleString("fa-IR");

  return (
    <>
      {children}
      <span>{viewsCountFormatted}</span>
    </>
  );
}
