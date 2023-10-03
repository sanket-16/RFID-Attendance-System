import React, { ReactElement } from "react";
import Sidebar from "./Sidebar";
import { useStatus } from "@/lib/hooks/useStatus";
import { Card } from "../ui/card";
import { useRouter } from "next/router";

export default function Layout({
  children,
}: {
  children: ReactElement | React.ReactNode;
}) {
  const router = useRouter();
  const { role } = useStatus();
  if (role === "Student") {
    router.push("/student/dashboard");
  }
  return (
    <main className="w-full">
      <div className="grid grid-cols-12 gap-4 ">
        <Sidebar />
        <Card className="col-span-9 border p-4">{children}</Card>
      </div>
    </main>
  );
}
