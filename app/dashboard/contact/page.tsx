import { poppins } from "@/app/ui/fonts";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="w-full">
      <h1 className={`${poppins.className} text-2xl font-semibold mb-6`}>
        Contact
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Get in Touch</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 text-sm text-muted-foreground mt-4">
          <div className="flex items-start gap-3">
            <EnvelopeIcon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-gray-800 dark:text-gray-100">Email</p>
              <span className="block text-muted-foreground">
                ardiansyahsulistyo@gmail.com
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PhoneIcon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-gray-800 dark:text-gray-100">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/ardiansyah-sulistyo-832a792b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ardiansyah Sulistyo
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-gray-800 dark:text-gray-100">Location</p>
              <span className="block text-muted-foreground">
                Cimahi, Indonesia
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
