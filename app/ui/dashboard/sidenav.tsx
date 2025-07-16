import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/lib/signout";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col border-r bg-white px-3 py-4 md:px-2">
      <Card className="mb-4 flex h-20 items-center justify-center rounded-lg bg-primary md:h-32">
        <Link href="/" className="w-32 text-white md:w-40">
          <AcmeLogo />
        </Link>
      </Card>
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
