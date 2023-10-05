const createClass = async ({
  title,
  subject,
  startTime,
}: {
  title: string
  subject: string
  startTime: Date
}) => {
  const res = await fetch("/api/class/create", {
    method: "POST",

    body: JSON.stringify({
      title,
      subject,
      startTime,
    }),
  })
  const json = await res.json()
  console.log(json)
  return json
}

export default createClass
