import Layout from "@/components/student/Layout";
import { useStatus } from "@/lib/hooks/useStatus";
import { useSession } from "next-auth/react";
import React from "react";

const StudentDashboard = () => {
  return (
    <Layout>
      <div>StudentDashboard</div>
    </Layout>
  );
};

export default StudentDashboard;
