import { ReactNode } from "react";

export default function FormConfirmation({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#141414] p-[1.6rem] text-white z-10 w-full flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
}
