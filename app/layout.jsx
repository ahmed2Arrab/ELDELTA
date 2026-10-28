import { Cairo } from "next/font/google";
import "./globals.css";
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "600", "800"] });
export const metadata = {
  title: "الدلتا للاستشارات الهندسية والمقاولات العامة",
  description: "تصميم وإشراف وإنشاء وتراخيص بناء — القاهرة، بدر، العبور الجديدة",
};
export default function RootLayout({ children }) {
  return (<html lang="ar" dir="rtl"><body className={cairo.className}>{children}</body></html>);
}
