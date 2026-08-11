"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateArticle } from "@/lib/articles";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface ArticleData {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  coverImage: string | null;
  isBreaking: boolean;
  categoryId: string;
}

export default function EditArticleForm({
  article,
  categories,
}: {
  article: ArticleData;
  categories: Category[];
}) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(article.coverImage);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateArticle(article.id, formData);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("تغییرات خبر با موفقیت ذخیره شد.");
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
          defaultValue={article.title}
          required
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
            defaultValue={article.categoryId}
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
            تغییر تصویر شاخص (اختیاری)
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

      {imagePreview && (
        <div className="space-y-2">
          <span className="text-xs text-slate-400">
            تصویر فعلی / پیش‌نمایش تصویر جدید:
          </span>
          <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <img
              src={imagePreview}
              alt="Cover Preview"
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
          defaultValue={article.summary || ""}
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
          defaultValue={article.content}
          required
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm leading-relaxed"
        ></textarea>
      </div>

      <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <input
          type="checkbox"
          id="isBreaking"
          name="isBreaking"
          value="true"
          defaultChecked={article.isBreaking}
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
          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-8 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm"
        >
          {loading ? "در حال ذخیره تغییرات..." : "ذخیره تغییرات"}
        </button>
      </div>
    </form>
  );
}