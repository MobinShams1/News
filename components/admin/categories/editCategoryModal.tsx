"use client";

import { useState } from "react";
import { updateCategory } from "@/lib/categories";
import { toast } from "sonner";
import { Category } from "@/types/category";


export default function EditCategoryModal({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateCategory(category.id, formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("دسته‌بندی با موفقیت ویرایش شد.");
      setIsOpen(false);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
        title="ویرایش دسته‌بندی"
      >
        ✏️
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <h3 className="text-lg font-bold text-white">ویرایش دسته‌بندی</h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                نام فارسی *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={category.name}
                required
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                نام انگلیسی (Slug) *
              </label>
              <input
                type="text"
                name="slug"
                defaultValue={category.slug}
                required
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm dir-ltr text-left"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}