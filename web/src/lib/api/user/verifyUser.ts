type VerifyUserResponse = {
  role: "Student" | "Teacher" | undefined
}
const verifyUser = async ({
  id,
}: {
  id: string
}): Promise<VerifyUserResponse> => {
  const res = await fetch("/api/auth/verify", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  })
  const json = await res.json()
  console.log("here")
  return json
}

export default verifyUser
