"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function toEnglishDigits(str: string) {
  return str
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
}

export async function loginAdmin(formData: FormData) {
  const rawPhone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!rawPhone || !password) {
    return { error: "لطفاً شماره تلفن و رمز عبور را وارد کنید." };
  }
 
  const phone = toEnglishDigits(rawPhone.trim());

  const user = await prisma.users.findUnique({
    where: { phone },
  });

  if (!user || user.role !== "ADMIN") {
    return { error: "شماره تلفن یا رمز عبور اشتباه است." };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "شماره تلفن یا رمز عبور اشتباه است." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, 
    path: "/",
  });

  return { success: true };
}