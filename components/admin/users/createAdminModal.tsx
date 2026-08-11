"use client";

import { useState } from "react";
import { createAdmin } from "@/lib/users";
import { toast } from "sonner";

export default function CreateAdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await createAdmin(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("ادمین جدید با موفقیت اضافه شد.");
      form.reset();
      setIsOpen(false);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span>➕</span>
        <span>افزودن ادمین جدید</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 dir-rtl"
          >
            <h3 className="text-lg font-bold text-white">افزودن ادمین جدید</h3>
            <p className="text-xs text-slate-400">
              مشخصات و رمز عبور مدیر جدید را وارد کنید.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                نام و نام خانوادگی (اختیاری)
              </label>
              <input
                type="text"
                name="name"
                placeholder="مثال: مبین شمسی"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                شماره تلفن (موبایل) *
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="09123456789"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm dir-ltr text-right font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                رمز عبور *
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="حداقل ۶ کاراکتر"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm dir-ltr text-right"
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
                {loading ? "در حال ثبت..." : "ثبت ادمین"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}