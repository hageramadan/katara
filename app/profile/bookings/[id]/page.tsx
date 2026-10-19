import type { Metadata } from "next";
import { Suspense } from "react";
import TicketDetailsClient from "@/components/profile/bookings/ticket-details/TicketDetailsClient";

type TicketPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: TicketPageProps): Promise<Metadata> {
  const { id } = await params;
  const title = `تفاصيل تذكرة الطيران رقم ${id} | كتارا جو`;
  const description = "راجع تفاصيل رحلتك، بيانات المسافرين، المقاعد، الأمتعة، ومواعيد السفر من صفحة تذكرة الطيران في كتارا جو.";

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ar_QA",
      siteName: "كتارا جو",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function TicketDetailsPage({ params }: TicketPageProps) {
  return (
    <Suspense
      fallback={
        <div aria-busy="true" className="mx-auto min-h-96 max-w-5xl rounded-2xl border border-[#E8ECF1] bg-white" />
      }
    >
      {params.then(({ id }) => <TicketDetailsClient ticketNumber={id} />)}
    </Suspense>
  );
}
