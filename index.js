const express = require("express");
express()
  .use(express.json())
  .use("/api/register", require("./routers/register"))
  .use("/api/login", require("./routers/login"))
  .listen(3000, () => console.log("Listening on port: 3000"));
