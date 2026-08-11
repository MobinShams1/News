"use client";

import { useState } from "react";
import { createCategory } from "@/lib/categories";
import { toast } from "sonner";

export default function CreateCategoryForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await createCategory(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("دسته‌بندی جدید با موفقیت اضافه شد.");
      form.reset();
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 sticky top-24"
    >
      <h2 className="text-base font-bold text-white mb-1">افزودن دسته‌بندی جدید</h2>
      <p className="text-xs text-slate-400 mb-4">
        مشخصات دسته را وارد کرده و ثبت کنید.
      </p>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-2">
          عنوان دسته‌بندی (فارسی) *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="مثال: هوش مصنوعی"
          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-2">
          نام انگلیسی / Slug *
        </label>
        <input
          type="text"
          name="slug"
          required
          placeholder="مثال: ai"
          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm dir-ltr text-left"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm cursor-pointer mt-2"
      >
        {loading ? "در حال ثبت..." : "افزودن دسته‌بندی"}
      </button>
    </form>
  );
}