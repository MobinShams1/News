"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) {
    return { error: "لطفاً نام و نام انگلیسی (Slug) را وارد کنید." };
  }

  try {
    await prisma.category.create({
      data: { name: name.trim(), slug: slug.trim().toLowerCase() },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/articles/create");
    return { success: true };
  } catch {
    return { error: "دسته‌بندی با این نام یا نام انگلیسی قبلاً وجود دارد." };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/articles/create");
    return { success: true };
  } catch {
    return { error: "امکان حذف دسته‌بندی دارای مقاله وجود ندارد." };
  }
}