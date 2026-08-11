"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    return await prisma.users.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
        _count: {
          select: { articles: true },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}



export async function deleteUser(userId: string) {
  try {
    await prisma.users.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "امکان حذف ادمینی که نویسنده اخبار است وجود ندارد." };
  }
}


export async function createAdmin(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!phone || !password) {
    return { error: "وارد کردن شماره تلفن و رمز عبور الزامی است." };
  }

  if (password.length < 6) {
    return { error: "رمز عبور باید حداقل ۶ کاراکتر باشد." };
  }

  const existingUser = await prisma.users.findUnique({
    where: { phone: phone.trim() },
  });

  if (existingUser) {
    return { error: "کاربری با این شماره تلفن قبلاً در سیستم ثبت شده است." };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        name: name ? name.trim() : null,
        phone: phone.trim(),
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error creating admin:", error);
    return { error: "خطا در ایجاد ادمین جدید." };
  }
}