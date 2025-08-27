import { CategoryLinks } from "@/features/category/category-links";

export const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        height: "100%",
        flexDirection: "column",
        padding: "1dvh 1dvw",
        gap: "0.25rem",
        overflow: "auto",
      }}
      className="border-r hidden lg:flex"
    >
      <p
        className="border-b border-black/80"
        style={{
          fontSize: "0.875rem",
          padding: "0.2rem 0.1rem",
          userSelect: "none",
        }}
      >
        Choose a Category
      </p>
      <CategoryLinks />
    </aside>
  );
};
