import LoginForm from "@/components/auth/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود به پنل مدیریت",
};
export default function AdminLoginPage() {
  

  return (
   <LoginForm/>
  );
}