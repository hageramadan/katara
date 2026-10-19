"use client";
import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import AuthSidebar, { RoleKey } from "@/components/auth/AuthSidebar";

// Forms
import MemberForm from "@/components/auth/forms/MemberForm";
import AgentForm from "@/components/auth/forms/AgentForm";
import TravelCompanyForm from "@/components/auth/forms/TravelCompanyForm";
import BrokerForm from "@/components/auth/forms/BrokerForm";
import CompanyForm from "@/components/auth/forms/CompanyForm";
import PartnerForm from "@/components/auth/forms/PartnerForm";

export default function SignUpPage() {
  const { lang } = useApp();
  const [activeRole, setActiveRole] = useState<RoleKey>("members");

  const renderForm = () => {
    switch (activeRole) {
      case "members":
        return <MemberForm />;
      case "agents":
        return <AgentForm />;
      case "travelCompanies":
        return <TravelCompanyForm />;
      case "brokers":
        return <BrokerForm />;
      case "companies":
        return <CompanyForm />;
      case "partners":
        return <PartnerForm />;
      default:
        return <MemberForm />;
    }
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center bg-[#F7F9FB] px-3 py-6 sm:px-4 sm:py-10 lg:min-h-screen">
      
    

      <div className="relative z-10 container mx-auto w-full">
       <div className="mb-4 flex flex-col items-center gap-2 px-1 text-center sm:mb-6 sm:flex-row sm:justify-between sm:gap-3 sm:px-4 sm:text-start lg:mb-8">
            <h1 className="text-xl font-bold text-[#0D0D0D] sm:text-2xl md:text-3xl lg:text-[32px]">
          {lang === "ar" ? "انضم لمنصة الأفضل" : "Join the Best Platform"}
        </h1>
         {/* Link at top */}
            <p className="text-xs font-semibold text-[#8E8E8E] sm:text-sm md:text-lg">
              {lang === "ar" ? "لدي حساب بالفعل؟" : "Already have an account?"}{" "}
              <Link
                href="/login"
                className="text-[#0D154B] underline"
              >
                {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
              </Link>
            </p>
       </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl sm:rounded-3xl md:grid-cols-12 md:items-stretch">
          
          {/* Sidebar */}
          <AuthSidebar
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            className="md:col-span-3"
          />

          {/* Form */}
          <div className="min-w-0 md:col-span-9 p-3.5 sm:p-5 md:p-8">
          

            {/* Render the form for the active role */}
            <div className="max-w-5xl mx-auto">
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
