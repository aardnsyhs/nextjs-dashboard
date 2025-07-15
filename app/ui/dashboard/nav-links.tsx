"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Products", href: "/dashboard/products", icon: ArchiveBoxIcon },
  { name: "About", href: "/dashboard/about", icon: InformationCircleIcon },
  { name: "Contact", href: "/dashboard/contact", icon: PhoneIcon },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2 mb-2">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
              {
                "bg-blue-100 text-blue-700": isActive,
                "bg-muted text-foreground hover:bg-muted/60": !isActive,
              }
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
