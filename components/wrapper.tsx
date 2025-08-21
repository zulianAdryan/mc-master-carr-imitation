import { Navbar, NAVBAR_HEIGHT } from "./navbar";
import { Sidebar } from "./sidebar";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-[100dvh]">
      <Navbar />
      <div
        className="flex size-full overflow-hidden"
        style={{
          marginTop: NAVBAR_HEIGHT,
        }}
      >
        <Sidebar />

        <main className="p-[2dvh_4dvw] xl:p-[1dvh_1dvw] w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
