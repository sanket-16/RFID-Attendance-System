const sendMai = async () => {
  const some = await fetch("https://rfid-system.com/api/attendance-check", {
    method: "GET",
  });
  if (!some.ok) {
    sendMai();
  }
};

setInterval(sendMai, 1000 * 60 * 60 * 24);
