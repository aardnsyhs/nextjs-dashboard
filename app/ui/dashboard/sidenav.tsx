import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/lib/signout";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col px-3 py-4 md:px-2 bg-white border-r">
      <Link
        href="/"
        className="mb-4 flex h-20 items-center justify-center rounded-lg bg-blue-600 md:h-32"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-muted md:block" />
        <form action={signOutAction} className="mt-2">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-lg px-4 py-3 text-base font-normal hover:bg-muted"
          >
            <PowerIcon className="mr-3 h-5 w-5" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </form>
      </div>
    </aside>
  );
}
