"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuSquareIcon } from "lucide-react";

import { CategoryLinks } from "@/features/category/category-links";

export const NAVBAR_HEIGHT = "50px";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed border-b p-[1.5dvh_2dvh] lg:p-[1.5dvh_1dvw] bg-white w-full top-0 left-0 flex items-center justify-between gap-3"
        style={{
          height: NAVBAR_HEIGHT,
          zIndex: 50,
        }}
      >
        <Link href={"/"} className="text-lg lg:text-2xl font-bold">
          McMaster Imitation
        </Link>

        <MenuSquareIcon
          className="lg:hidden"
          onClick={() => {
            setIsMenuOpen((curr) => !curr);
          }}
        />
      </nav>

      {isMenuOpen && (
        <div
          className="absolute bg-white left-0 right-0 p-[1dvh_3.5dvw]"
          style={{
            top: NAVBAR_HEIGHT,
            zIndex: 40,
            height: `calc(100dvh - 50px)`,
          }}
        >
          <CategoryLinks />
        </div>
      )}
    </>
  );
};
