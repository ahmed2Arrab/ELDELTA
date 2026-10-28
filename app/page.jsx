import Image from "next/image";
import { site } from "../lib/config";
import ServiceTabs from "../components/ServiceTabs";
import RequestForm from "../components/RequestForm";
import ChatBot from "../components/ChatBot";
const steps = ["معاينة وتحديد المتطلبات", "تصميم وعرض التكلفة", "ترخيص وبدء التنفيذ", "إشراف ومتابعة", "تسليم واستلام"];
export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="brand"><Image src="/logo.png" alt="شعار الدلتا" width={48} height={48} /><span>{site.short}</span></a>
        <nav><a href="#services">الخدمات</a><a href="#process">خطوات العمل</a><a href="#request">اطلب خدمة</a><a href="#contact">تواصل</a></nav>
        <a className="btn gold sm" href={`tel:${site.phones[0]}`}>{site.phones[0]}</a>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-txt">
            <p className="kicker">{site.branches.join(" • ")}</p>
            <h1>{site.name}</h1>
            <p className="sub">{site.tagline}</p>
            <div className="row"><a className="btn gold" href="#request">اطلب خدمتك</a>{site.phones.map((p) => <a key={p} className="btn line" href={`tel:${p}`}>{p}</a>)}</div>
          </div>
          <div className="hero-art"><span className="tri t1" /><span className="tri t2" /><Image src="/logo.png" alt="" width={320} height={320} priority /></div>
        </section>
        <section id="services" className="sec"><h2>خدمات المكتب</h2><ServiceTabs /></section>
        <section id="process" className="sec dark"><h2>خطوات العمل</h2>
          <ol className="steps">{steps.map((s) => <li key={s}>{s}</li>)}</ol></section>
        <section id="request" className="sec"><h2>اطلب خدمة</h2><p className="lead">املأ البيانات وهيوصلنا طلبك على واتساب، أو افتح الشات في أسفل الصفحة.</p><RequestForm /></section>
      </main>
      <footer id="contact" className="foot">
        <div><h3>{site.name}</h3><p>{site.address}</p><p>{site.branches.join(" • ")}</p></div>
        <div><h3>تواصل معنا</h3>{site.phones.map((p) => <p key={p}><a href={`tel:${p}`}>{p}</a></p>)}<p><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
        <div><h3>تابعنا</h3><p><a href={site.facebook}>فيسبوك</a></p><p><a href={site.instagram}>إنستجرام</a></p><p><a href={site.tiktok}>تيك توك</a></p></div>
      </footer>
      <a className="wa" href={`https://wa.me/${site.whatsapp}`} aria-label="واتساب">واتساب</a>
      <ChatBot />
    </>
  );
}
