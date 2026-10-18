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
    <section className="relative lg:min-h-screen flex items-center justify-center px-4 py-10">
      
    

      <div className="relative z-10 container mx-auto">
       <div className="flex flex-wrap gap-3 justify-center items-center lg:justify-between mb-8 px-4">
            <h1 className="text-2xl md:text-3xl lg:text-[32px] text-[#0D0D0D] font-bold text-center">
          {lang === "ar" ? "انضم لمنصة الأفضل" : "Join the Best Platform"}
        </h1>
         {/* Link at top */}
            <p className=" text-base md:text-lg text-[#8E8E8E] font-semibold">
              {lang === "ar" ? "لدي حساب بالفعل؟" : "Already have an account?"}{" "}
              <Link
                href="/login"
                className="text-[#0D154B] underline"
              >
                {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
              </Link>
            </p>
       </div>

        <div className=" w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 md:items-stretch">
          
          {/* Sidebar */}
          <AuthSidebar
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            className="md:col-span-3"
          />

          {/* Form */}
          <div className="md:col-span-9 p-5 md:p-8">
          

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