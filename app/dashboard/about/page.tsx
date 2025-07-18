import { poppins } from "@/app/ui/fonts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="w-full">
      <h1 className={`${poppins.className} text-2xl font-semibold mb-4`}>
        About
      </h1>
      <Card className="text-gray-700">
        <CardHeader>
          <CardTitle className="text-lg">Tentang Proyek Ini</CardTitle>
          <Separator className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Project ini dibuat sebagai bagian dari tugas besar saya dalam
            mengikuti program <strong>Jabar Digital Academy (JDA)</strong>.
            Tujuan utamanya adalah untuk memperdalam pemahaman dan pengalaman
            saya dalam membangun aplikasi full-stack modern menggunakan
            teknologi terkini seperti:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Next.js</strong> sebagai framework React modern dengan
              dukungan server components dan routing dinamis
            </li>
            <li>
              <strong>Tailwind CSS</strong> untuk membangun UI yang responsif
              dan efisien
            </li>
            <li>
              <strong>NeonDB</strong> (PostgreSQL on the cloud) sebagai
              penyimpanan data
            </li>
            <li>
              Implementasi <strong>autentikasi dengan Credentials</strong>{" "}
              menggunakan NextAuth
            </li>
            <li>
              Fitur <strong>CRUD</strong> untuk invoice, customer, dan produk
            </li>
            <li>
              Layout dashboard yang terstruktur dengan komponen yang reusable
            </li>
          </ul>
          <p>
            Harapannya, melalui project ini saya dapat meningkatkan keterampilan
            teknis dan kesiapan saya dalam menghadapi tantangan dunia kerja di
            bidang teknologi informasi.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
