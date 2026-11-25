import { redirect } from "next/navigation";
import { Suspense } from "react";

type NotificationsPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default function NotificationsPage({ searchParams }: NotificationsPageProps) {
  return (
    <Suspense fallback={<div aria-busy="true" className="min-h-[70vh]" />}>
      <NotificationsRedirect searchParams={searchParams} />
    </Suspense>
  );
}

async function NotificationsRedirect({ searchParams }: NotificationsPageProps) {
  const { tab } = await searchParams;
  redirect(tab === "offers" ? "/#notification-offers" : "/#notifications");
  return null;
}
