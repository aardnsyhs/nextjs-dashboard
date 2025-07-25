"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/app/lib/utils";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const buttonClass = cn(
    "h-10 w-10 rounded-none border text-sm",
    position === "first" || position === "single" ? "rounded-l-md" : "",
    position === "last" || position === "single" ? "rounded-r-md" : "",
    isActive
      ? "bg-primary text-white border-primary"
      : "hover:bg-muted text-muted-foreground",
    position === "middle" ? "pointer-events-none text-muted" : ""
  );

  return isActive || position === "middle" ? (
    <Button className={buttonClass} variant="outline" disabled>
      {page}
    </Button>
  ) : (
    <Button asChild className={buttonClass} variant="outline">
      <Link href={href}>{page}</Link>
    </Button>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4 h-4" />
    ) : (
      <ArrowRightIcon className="w-4 h-4" />
    );

  const baseClass = cn(
    "h-10 w-10 rounded-md border",
    direction === "left" ? "mr-2 md:mr-4" : "ml-2 md:ml-4"
  );

  return isDisabled ? (
    <Button className={baseClass} variant="outline" disabled>
      {icon}
    </Button>
  ) : (
    <Button asChild className={baseClass} variant="outline">
      <Link href={href}>{icon}</Link>
    </Button>
  );
}
