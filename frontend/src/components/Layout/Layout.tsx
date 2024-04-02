import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { NavBar } from "@/components/Layout/NavBar";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={`bg-[#141414] text-white min-h-screen ${inter.className} p-[1.6rem]`}
    >
      <div className="max-w-[102.4rem] mx-auto">
        <NavBar />
        <div className="pt-[8rem] px-[2.4rem]">{children}</div>
      </div>
    </main>
  );
}
