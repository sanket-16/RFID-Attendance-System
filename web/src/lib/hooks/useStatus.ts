import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { verifyUser } from "../api"

export const useStatus = () => {
  const [role, setRole] = useState("")
  const router = useRouter()
  const { data, status } = useSession()
  const mutate = useMutation({
    mutationKey: ["verifyUser"],
    mutationFn: verifyUser,
    onSuccess: (userData) => {
      localStorage.setItem("role", String(userData.role))
    },
  })
  useEffect(() => {
    const temp = localStorage.getItem("role")
    if (temp !== null) {
      setRole(temp)
      console.log(temp)
    }
    if (status !== "loading") {
      // if (status === "authenticated") {
      //   verifyMutatation.mutateAsync({ id: data?.user?.id });
      // }
      if (status === "authenticated") {
        mutate.mutateAsync({ id: data.user.id })
      }
      if (status === "unauthenticated") {
        localStorage.removeItem("role")
        router.push("/")
      }
    }
  }, [status])

  return { role }
}
