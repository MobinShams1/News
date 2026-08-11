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

  const formattedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

  try {
    await prisma.category.create({
      data: { name: name.trim(), slug: formattedSlug },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/articles/create");
    return { success: true };
  } catch {
    return { error: "دسته‌بندی با این نام یا نام انگلیسی قبلاً وجود دارد." };
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const count = await prisma.article.count({
      where: { categoryId },
    });

    if (count > 0) {
      return {
        error: `این دسته‌بندی دارای ${count} خبر ثبت‌شده است و قابل حذف نیست.`,
      };
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/articles/create");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { error: "خطا در حذف دسته‌بندی." };
  }
}

export async function updateCategory(categoryId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) {
    return { error: "نام و Slug نمی‌توانند خالی باشند." };
  }

  const formattedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: name.trim(),
        slug: formattedSlug,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/articles");
    return { success: true };
  } catch {
    return { error: "خطا در ویرایش دسته‌بندی (احتمال تشابه Slug با دسته دیگر)." };
  }
}