import DeleteCategoryBtn from "./deleteCategoryBtn";
import EditCategoryModal from "./editCategoryModal";
import { CategoryWithCount } from "@/types/category";

export default function CategoriesTable({
  categories,
}: {
  categories: CategoryWithCount[];
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">
        لیست دسته‌بندی‌های موجود ({categories.length.toLocaleString("fa-IR")})
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">عنوان دسته</th>
              <th className="p-4">نام انگلیسی (Slug)</th>
              <th className="p-4">تعداد اخبار</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-500">
                  هیچ دسته‌بندی ثبت نشده است.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 font-medium text-white">{cat.name}</td>
                  <td className="p-4 text-xs font-mono text-slate-400 dir-ltr text-right">
                    {cat.slug || "-"}
                  </td>
                  <td className="p-4">
                    <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg text-xs border border-teal-500/20">
                      {(cat._count?.articles ?? 0).toLocaleString("fa-IR")} خبر
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <EditCategoryModal category={cat} />
                      <DeleteCategoryBtn
                        categoryId={cat.id}
                        categoryName={cat.name}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}