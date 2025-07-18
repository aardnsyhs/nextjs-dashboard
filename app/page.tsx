import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { poppins } from "@/app/ui/fonts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6">
      <div className="flex h-16 md:h-32 items-end rounded-lg bg-primary p-4">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <Card className="flex flex-col justify-center gap-6 md:w-2/5">
          <CardHeader>
            <div className="h-8 w-8 bg-primary rounded-sm" />
            <CardTitle
              className={`${poppins.className} text-xl md:text-3xl mt-4`}
            >
              Welcome to Acme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-muted-foreground text-lg md:text-xl">
              This is the example for the{" "}
              <Link href="https://nextjs.org/learn/" passHref>
                <Badge
                  variant="outline"
                  className="text-blue-600 hover:text-blue-600"
                >
                  Next.js Learn Course
                </Badge>
              </Link>
              , brought to you by Vercel.
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link href="/login" className="gap-2">
                <span>Log in</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center p-6 md:w-3/5">
          <Card className="overflow-hidden border-none shadow-none">
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              className="hidden md:block rounded-lg"
              alt="Dashboard desktop version"
              priority
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="md:hidden rounded-lg"
              alt="Dashboard mobile version"
              priority
            />
          </Card>
        </div>
      </div>
    </main>
  );
}
