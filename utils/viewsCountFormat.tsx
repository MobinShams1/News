interface ViewsCountForm {
  viewsCount: number;
  children?: any;
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
