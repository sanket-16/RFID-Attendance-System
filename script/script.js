const sendMail = async () => {
  const some = await fetch("https://rfid-system.com/api/attendance-check", {
    method: "GET",
  });
  console.log(some);
  if (!some.ok) {
    sendMai();
  }
};

sendMail();
// setInterval(() => sendMail(), 1000 * 60 * 60 * 24);
