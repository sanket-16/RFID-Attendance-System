import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { verifyUser } from "../api";

export const useStatus = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const verifyMutatation = useMutation({
    mutationKey: ["verifyUser"],
    mutationFn: verifyUser,
    onSuccess: (data) => {
      if (data.role === "Teacher") {
        router.push("/teacher/dashboard");
      }
      router.push("/student/dashboard");
    },
  });
  useEffect(() => {
    if (status === "authenticated") {
      verifyMutatation.mutateAsync({ id: data?.user?.id });
    }
  }, []);
};
