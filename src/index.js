const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
dotenv.config();
const { connectDB, config, sql } = require('./configs/connect.db');
const routes = require('./routes');
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
connectDB();
routes(app);
//Test SQL Server
app.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const rs = await pool.request().query('SELECT *  FROM SanPham');
        return res.status(200).json(rs.recordset);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
app.listen(port, () =>
    console.log(colors.green(`Server listening on http://localhost:${port}`)),
);
