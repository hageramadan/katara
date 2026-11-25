import { redirect } from "next/navigation";

export default async function NotificationsPage({ searchParams }: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  redirect(tab === "offers" ? "/#notification-offers" : "/#notifications");
}
