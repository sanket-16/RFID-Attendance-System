export const createNewUser = async ({
  firstName,
  middleName,
  lastName,
  password,
  email,
}: {
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  email: string;
}) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      middleName,
      lastName,
      password,
      email,
    }),
  });
  const json = await res.json();
  console.log(json);
  return json;
};

type VerifyUserResponse = {
  role: "Student" | "Teacher";
};
export const verifyUser = async ({
  id,
}: {
  id: string;
}): Promise<VerifyUserResponse> => {
  const res = await fetch("/api/auth/verify", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  });
  const json = await res.json();
  console.log(json);
  return json;
};
