"use client";
import { useState } from "react";
import { services } from "../lib/config";
export default function ServiceTabs() {
  const [active, setActive] = useState(services[0].id);
  const s = services.find((x) => x.id === active);
  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="خدمات المكتب">
        {services.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === active} className={x.id === active ? "tab on" : "tab"} onClick={() => setActive(x.id)}>{x.title}</button>
        ))}
      </div>
      <div className="panel" role="tabpanel" key={s.id}>
        <h3>{s.title}</h3>
        <p className="lead">{s.lead}</p>
        <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
        <a className="btn gold" href="#request" onClick={() => window.dispatchEvent(new CustomEvent("pick-service", { detail: s.title }))}>اطلب خدمة {s.title}</a>
      </div>
    </div>
  );
}
