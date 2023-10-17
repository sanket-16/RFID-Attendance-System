import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";
import { useStatus } from "@/lib/hooks/useStatus";
import Sidebar from "./Sidebar";
import { Card } from "../ui/card";

export default function Layout({
  children,
}: {
  children: ReactElement | ReactNode;
}) {
  const router = useRouter();
  const { role, status } = useStatus();
  if (role === "Teacher") {
    router.push("/teacher/dashboard");
  }
  return (
    <main className="w-full">
      <div className="grid grid-cols-12 gap-4">
        <Sidebar />
        <Card className="col-span-9 h-[80vh] overflow-y-scroll rounded-md border p-4">
          {children}
        </Card>
      </div>
    </main>
  );
}
