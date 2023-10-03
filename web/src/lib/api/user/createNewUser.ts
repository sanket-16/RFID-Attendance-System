const createNewUser = async ({
  firstName,
  middleName,
  lastName,

  email,
}: {
  firstName: string
  middleName: string
  lastName: string
  email: string
}) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",

    body: JSON.stringify({
      firstName,
      middleName,
      lastName,
      email,
    }),
  })
  const json = await res.json()
  console.log(json)
  return json
}

export default createNewUser
