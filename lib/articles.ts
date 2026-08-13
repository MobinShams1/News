"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getAuthAdmin } from "./auth";

function generateSlug(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF\-]/g, "") +
    `-${Date.now().toString().slice(-4)}`
  );
}

export async function deleteArticle(articleId: string) {
  try {
    await prisma.article.delete({
      where: { id: articleId },
    });
    revalidatePath("/admin/articles");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { error: "خطا در حذف خبر" };
  }
}

export async function createArticle(formData: FormData) {
  const currentAdmin = await getAuthAdmin();
  if (!currentAdmin) {
    return { error: "نشست شما منقضی شده است. لطفاً دوباره لاگین کنید." };
  }

  const authorId = currentAdmin.id;

  if (!authorId) {
    return { error: "شما برای ثبت خبر باید وارد حساب کاربری خود شوید." };
  }

  const title = formData.get("title") as string;
  const categoryId = formData.get("categoryId") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const isBreaking = formData.get("isBreaking") === "true";
  const imageFile = formData.get("imageFile") as File;

  if (!title || !categoryId || !content) {
    return { error: "لطفاً تمامی فیلدهای ضروری را پر کنید." };
  }

  const slug = generateSlug(title);
  let coverImage: string | null = null;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExt = path.extname(imageFile.name).toLowerCase() || ".jpg";
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      coverImage = `/api/uploads/${fileName}`;
    } catch (error) {
      console.error("Error saving image:", error);
      return { error: "خطا در ذخیره‌سازی تصویر." };
    }
  }

  try {
    await prisma.article.create({
      data: {
        title,
        slug,
        summary: summary ? summary.trim() : content.slice(0, 100),
        content,
        coverImage: coverImage ?? "",
        status: "PUBLISHED",
        isBreaking,
        author: {
          connect: { id: authorId },
        },
        category: {
          connect: { id: categoryId },
        },
      },
    });

    revalidatePath("/admin/articles");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating article:", error);
    return { error: "خطا در ثبت خبر در دیتابیس." };
  }
}

export async function updateArticle(articleId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const categoryId = formData.get("categoryId") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const isBreaking = formData.get("isBreaking") === "true";
  const imageFile = formData.get("imageFile") as File | null;

  if (!title || !categoryId || !content) {
    return { error: "لطفاً تمامی فیلدهای ضروری را پر کنید." };
  }

  const currentArticle = await prisma.article.findUnique({
    where: { id: articleId },
    select: { coverImage: true },
  });

  if (!currentArticle) {
    return { error: "خبر مورد نظر یافت نشد." };
  }

  let coverImage: string | null = currentArticle.coverImage;

  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExt = path.extname(imageFile.name).toLowerCase() || ".jpg";
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      coverImage = `/uploads/${fileName}`;
    } catch (error) {
      console.error("Error saving image:", error);
      return { error: "خطا در ذخیره‌سازی تصویر جدید." };
    }
  }

  try {
    await prisma.article.update({
      where: { id: articleId },
      data: {
        title,
        summary: summary ? summary.trim() : content.slice(0, 100),
        content,
        coverImage: coverImage ?? undefined,
        isBreaking,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    revalidatePath("/admin/articles");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating article:", error);
    return { error: "خطا در ویرایش خبر در دیتابیس." };
  }
}

export async function getNewsFeedData(categorySlug?: string) {
  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: categorySlug ? { category: { slug: categorySlug } } : {},
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        summary: true,
        coverImage: true,
        isBreaking: true,
        viewsCount: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
  ]);

  return { articles, categories };
}

export async function getArticleSummaryById(id: string) {
  return await prisma.article.findUnique({
    where: { id },
    select: {
      title: true,
      summary: true,
      coverImage: true,
      createdAt: true,
    },
  });
}

export async function getArticle(id: string) {
  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      summary: true,
      content: true,
      coverImage: true,
      isBreaking: true,
      viewsCount: true,
      createdAt: true,
      categoryId: true,
    },
  });

  return article;
}

export async function getArticleAndIncrementViews(id: string) {
  return await prisma.article
    .update({
      where: { id },
      data: {
        viewsCount: { increment: 1 },
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })
    .catch(() => null);
}

export async function getRelatedArticles(
  categoryId: string | null | undefined,
  currentArticleId: string,
) {
  if (!categoryId) return [];

  return await prisma.article.findMany({
    where: {
      categoryId: categoryId,
      NOT: { id: currentArticleId },
    },
    orderBy: { createdAt: "desc" },

    select: {
      id: true,
      title: true,
      coverImage: true,
      createdAt: true,
    },
  });
}

export default async function getArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });

  return articles;
}
