const sql = require('mssql');
const colors = require('colors');
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    port: +process.env.PORTDB,
};
const connectDB = async () => {
    try {
        let pool = await sql.connect(config);
        console.log(colors.green('SQL Server connected successfully'));
    } catch (error) {
        console.log(colors.red(`Error: ${error}`));
    }
};

module.exports = { connectDB, config, sql };
