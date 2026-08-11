"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_fallback_secret_key",
);

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

  const token = await new SignJWT({
    userId: user.id,
    phone: user.phone,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, 
  });

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete("admin_token");

  return { success: true };
}


export async function getAuthAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as {
      userId: string;
      phone: string;
      name: string | null;
      role: string;
    };
  } catch {
    return null; 
  }
}