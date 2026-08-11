"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/articles";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

export default function CreateArticleForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch {
        console.error("Error loading categories");
      }
    }
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createArticle(formData);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("خبر با موفقیت انتشار یافت.");
      router.push("/admin/articles");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          عنوان خبر *
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="عنوان اصلی خبر را وارد کنید"
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            دسته‌بندی *
          </label>
          <select
            name="categoryId"
            required
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm cursor-pointer"
          >
            <option value="">انتخاب دسته‌بندی...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            تصویر شاخص خبر
          </label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-xs text-slate-400 file:mr-0 file:ml-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-500/10 file:text-teal-400 hover:file:bg-teal-500/20 file:cursor-pointer cursor-pointer bg-slate-950 border border-slate-800 rounded-xl p-1.5"
          />
        </div>
      </div>

      {/* بخش پیش‌نمایش تصویر */}
      {imagePreview && (
        <div className="space-y-2">
          <span className="text-xs text-slate-400">پیش‌نمایش تصویر انتخابی:</span>
          <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          خلاصه خبر (اختیاری)
        </label>
        <input
          type="text"
          name="summary"
          placeholder="توضیح کوتاه خبر..."
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          متن کامل خبر *
        </label>
        <textarea
          name="content"
          rows={10}
          required
          placeholder="متن اصلی خبر را اینجا بنویسید..."
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm leading-relaxed"
        ></textarea>
      </div>

      <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <input
          type="checkbox"
          id="isBreaking"
          name="isBreaking"
          value="true"
          className="w-4 h-4 rounded border-slate-700 text-teal-500 focus:ring-teal-500 bg-slate-900"
        />
        <label
          htmlFor="isBreaking"
          className="text-sm font-medium text-slate-300 cursor-pointer"
        >
          علامت‌گذاری به عنوان «خبر فوری» 🚨
        </label>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-8 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm cursor-pointer"
        >
          {loading ? "در حال آپلود و انتشار..." : "انتشار خبر"}
        </button>
      </div>
    </form>
  );
}