import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import TestForm from "@/components/Forms/TestForm";

export default function Home() {
  return (
    <main
      className={`flex bg-[#141414] min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <TestForm />
    </main>
  );
}
