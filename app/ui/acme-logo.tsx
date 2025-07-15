import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { poppins } from "@/app/ui/fonts";

export default function AcmeLogo() {
  return (
    <div
      className={`${poppins.className} flex items-center gap-2 text-white leading-none`}
    >
      <GlobeAltIcon className="h-10 w-10 rotate-[15deg]" />
      <span className="text-[36px] md:text-[44px] font-semibold">Acme</span>
    </div>
  );
}
