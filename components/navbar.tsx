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
        className="border-b"
        style={{
          position: "fixed",
          padding: "1.5dvh 2dvh",
          backgroundColor: "#fff",
          width: "100%",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          height: NAVBAR_HEIGHT,
          zIndex: 50,
        }}
      >
        <h1
          style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
          }}
        >
          <Link href={"/"}>McMaster Imitation</Link>
        </h1>

        <MenuSquareIcon
          className="lg:hidden"
          onClick={() => {
            setIsMenuOpen((curr) => !curr);
          }}
        />
      </nav>

      {isMenuOpen && (
        <div
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            left: 0,
            right: 0,
            top: NAVBAR_HEIGHT,
            zIndex: 40,
            height: `calc(100dvh - 50px)`,
            padding: "1dvh 3.5dvw",
          }}
        >
          <CategoryLinks />
        </div>
      )}
    </>
  );
};
