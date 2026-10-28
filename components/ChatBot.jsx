"use client";
import { useEffect, useRef, useState } from "react";
import { services, site } from "../lib/config";
const steps = [
  { key: "service", ask: "أهلًا بك في الدلتا 👋 تحب نساعدك في إيه؟", options: services.map((s) => s.title).concat("استفسار آخر") },
  { key: "location", ask: "ممتاز. موقع المشروع فين؟ (المنطقة / المدينة)" },
  { key: "area", ask: "تقريبًا مساحة الأرض أو الوحدة كام متر؟" },
  { key: "name", ask: "اسمك إيه؟" },
  { key: "phone", ask: "رقم التليفون اللي نكلمك عليه؟" },
];
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "bot", text: steps[0].ask }]);
  const [i, setI] = useState(0);
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  const done = i >= steps.length;
  const answer = (v) => {
    if (!v.trim() || done) return;
    const d = { ...data, [steps[i].key]: v.trim() };
    const n = i + 1;
    setData(d); setI(n); setText("");
    const next = n < steps.length ? steps[n].ask : "شكرًا لك! اضغط الزر تحت لإرسال طلبك على واتساب وهنرد عليك في أقرب وقت.";
    setMsgs((m) => [...m, { from: "me", text: v }, { from: "bot", text: next }]);
  };
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`طلب جديد من الموقع\nالخدمة: ${data.service}\nالموقع: ${data.location}\nالمساحة: ${data.area}\nالاسم: ${data.name}\nالتليفون: ${data.phone}`)}`;
  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="افتح الشات">{open ? "×" : "اطلب خدمة"}</button>
      {open && (
        <section className="chat" aria-label="شات طلب الخدمات">
          <header>مساعد الدلتا</header>
          <div className="log">
            {msgs.map((m, k) => <p key={k} className={m.from}>{m.text}</p>)}
            {!done && steps[i].options && <div className="opts">{steps[i].options.map((o) => <button key={o} onClick={() => answer(o)}>{o}</button>)}</div>}
            {done && <div className="opts"><a className="btn gold" href={wa} target="_blank" rel="noreferrer">أرسل على واتساب</a><a className="btn line" href={`tel:${site.phones[0]}`}>اتصل الآن</a></div>}
            <div ref={end} />
          </div>
          {!done && !steps[i].options && (
            <form onSubmit={(e) => { e.preventDefault(); answer(text); }}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب هنا..." autoFocus />
              <button>إرسال</button>
            </form>
          )}
        </section>
      )}
    </>
  );
}
