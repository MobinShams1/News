"use client";

import { useState } from "react";
import { deleteArticle } from "@/lib/articles";
import { toast } from "sonner";

export default function DeleteArticleBtn({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteArticle(articleId);
    setLoading(false);

    if (result.success) {
      toast.success("خبر با موفقیت حذف شد.");
      setIsOpen(false);
    } else {
      toast.error(result.error || "خطایی رخ داد.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
        title="حذف خبر"
      >
        🗑️
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">تأیید حذف خبر</h3>
            <p className="text-sm text-slate-400 mb-6">
              آیا از حذف خبر <span className="text-teal-400 font-semibold">«{articleTitle}»</span> اطمینان دارید؟ این عمل غیرقابل بازگشت است.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "در حال حذف..." : "حذف شود"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}