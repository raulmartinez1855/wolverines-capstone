import Link from "next/link";

export function NavBar() {
  const linkStyle =
    "text-[1.4rem] opacity-100 hover:opacity-75 ease-in transition-all ";
  return (
    <nav className="py-[1.6rem]  px-[2.4rem] bg-white rounded-full text-[#141414] w-full flex justify-between">
      <Link className={linkStyle} href={"/"}>
        Wolverines Capstone
      </Link>
      <div className="flex gap-[1.6rem]">
        <Link className={linkStyle} href={"/"}>
          Player Model
        </Link>
        <Link className={linkStyle} href={"/manual"}>
          Manual Model
        </Link>
        <Link className={linkStyle} href={"/team"}>
          Team
        </Link>
        <Link className={linkStyle} href={"/whitepaper"}>
          White Paper
        </Link>
      </div>
    </nav>
  );
}
