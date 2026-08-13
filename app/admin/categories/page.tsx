import { getCategories } from "@/lib/categories";
import CategoriesHeader from "@/components/admin/categories/categoriesHeader";
import CreateCategoryForm from "@/components/admin/categories/createCategoryForm";
import CategoriesTable from "@/components/admin/categories/categoriesTable";
import type { Metadata } from "next";
import { CategoryWithCount } from "@/types/category";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت دسته‌بندی‌ها",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  const totalCount = categories.length;
  const emptyCount = categories.filter(
    (c: CategoryWithCount) => (c._count?.articles ?? 0) === 0,
  ).length;
  return (
    <div className="space-y-6 dir-rtl max-w-6xl mx-auto">
      <CategoriesHeader totalCount={totalCount} emptyCount={emptyCount} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <CreateCategoryForm />
        </div>

        <div className="lg:col-span-2">
          <CategoriesTable categories={categories} />
        </div>
      </div>
    </div>
  );
}
