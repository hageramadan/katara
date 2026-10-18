"use client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[#F7F9FB] py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </section>
  );
}