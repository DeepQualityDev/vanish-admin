'use client'
import { NavMenu } from "@/components/NavMenu";
import Link from "next/link";
import Image from "next/image";
import MobileNavBar from "@/components/MobileNavBar"; // import the MobileNavBar component


export function NavBar() {

  return (
    <>
      <div className="top-0 sticky z-50 bg-blue-600">
        <div className="py-2 px-5 flex flex-row justify-between border border-color-black w-full sticky top-0">
          <div className="flex h-16 items-center">
            <Link href="/">
              <h1 className="text-[23px] font-bold font-serif text-center">Vanish-Admin</h1>
            </Link>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <NavMenu />
            <MobileNavBar />
          </div>
        </div>
      </div>
    </>
  );
}
