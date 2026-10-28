"use client";
import { useEffect, useState } from "react";
import { services, site } from "../lib/config";
export default function RequestForm() {
  const [f, setF] = useState({ service: services[0].title, name: "", phone: "", location: "", notes: "" });
  useEffect(() => { const h = (e) => setF((p) => ({ ...p, service: e.detail })); window.addEventListener("pick-service", h); return () => window.removeEventListener("pick-service", h); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const t = `طلب خدمة: ${f.service}\nالاسم: ${f.name}\nالتليفون: ${f.phone}\nالموقع: ${f.location}\nملاحظات: ${f.notes}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t)}`, "_blank");
  };
  return (
    <form className="form" onSubmit={send}>
      <label>الخدمة<select value={f.service} onChange={set("service")}>{services.map((s) => <option key={s.id}>{s.title}</option>)}</select></label>
      <label>الاسم<input required value={f.name} onChange={set("name")} /></label>
      <label>رقم التليفون<input required inputMode="tel" value={f.phone} onChange={set("phone")} /></label>
      <label>موقع المشروع<input value={f.location} onChange={set("location")} placeholder="مثال: العبور الجديدة" /></label>
      <label className="wide">تفاصيل الطلب<textarea rows="3" value={f.notes} onChange={set("notes")} /></label>
      <button className="btn gold wide" type="submit">أرسل الطلب على واتساب</button>
    </form>
  );
}
