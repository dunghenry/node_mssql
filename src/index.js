const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();
const { connectDB, config, sql } = require("./configs/connect.db");
const app = express();
const port = process.env.PORT;
connectDB();
app.get("/", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let rs = await pool.request().query("SELECT *  FROM SanPham");
    return res.status(200).json(rs.recordset);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
app.listen(port, () =>
  console.log(colors.green(`Server listening on http://localhost:${port}`))
);
