import { poppins } from "@/app/ui/fonts";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <div className="w-full">
      <h1 className={`${poppins.className} text-2xl font-semibold mb-4`}>
        Contact
      </h1>
      <div className="rounded-lg bg-white p-6 shadow-sm text-gray-700">
        <p className="mb-4">You can reach me at:</p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
            <span>Email: ardiansyahsulistyo@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-gray-500" />
            <span>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/ardiansyah-sulistyo-832a792b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ardiansyah Sulistyo
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
            <span>Location: Cimahi, Indonesia</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
