import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`py-6 ${inter.className} min-w-max`}>
      <div className="w-full grid grid-cols-2">
        <div>hi</div>
        <div>hi</div>
      </div>
    </main>
  );
}
