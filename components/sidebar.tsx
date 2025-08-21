import { CategoryLinks } from "@/features/category/category-links";

export const Sidebar = () => {
  return (
    <aside className="border-r hidden lg:flex flex-col w-[250px] h-full p-[1dvh_1dvw] gap-1 overflow-auto">
      <p className="text-sm border-b border-black/80 p-[0.2rem_0.1rem] select-none">
        Choose a Category
      </p>
      <CategoryLinks />
    </aside>
  );
};
