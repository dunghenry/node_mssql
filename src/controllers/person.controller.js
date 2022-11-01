const { config, sql } = require('../configs/connect.db');
const Person = require('../models/person.model');
const bcrypt = require('bcrypt');
class personController {
    static async #getConnect() {
        const pool = await sql.connect(config);
        return pool;
    }
    static async createPerson(req, res) {
        const { username, email, age } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newPerson = new Person(username, email, age, hashedPassword);
            const pool = await personController.#getConnect();
            const insertPerson = await pool
                .request()
                .input('username', sql.NVarChar, newPerson.username)
                .input('email', sql.NVarChar, newPerson.email)
                .input('age', sql.Int, newPerson.age)
                .input('password', sql.NVarChar, newPerson.password)
                .query(
                    'insert into Person(username, email, age, password) values(@username, @email, @age, @password)',
                );
            if (insertPerson.rowsAffected[0] == 0) {
                return res.status(200).json({ message: 'Insert person failed.' });
            } else {
                return res.status(200).json({ message: 'Insert person successfully.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async getPersons(req, res) {
        try {
            const pool = await personController.#getConnect();
            const rs = await pool.request().query('SELECT * FROM Person');
            return res.json(rs.recordset);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async getPerson(req, res) {
        const id = req.params.id;
        try {
            const pool = await personController.#getConnect();
            const rs = await pool.request().query(`SELECT * FROM Person WHERE id=${id}`);
            if (rs.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'Person not found' });
            }
            return res.json(rs.recordset[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async deletePerson(req, res) {
        const id = req.params.id;
        try {
            const pool = await personController.#getConnect();
            const rs = await pool.request().query(`DELETE FROM Person WHERE id=${id}`);
            if (rs.rowsAffected[0] == 0) {
                return res.status(400).json({ message: 'Deleted person failed.' });
            } else {
                return res.status(200).json({ message: 'Deleted person successfully.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async updatePerson(req, res) {
        const { username, email, age } = req.body;
        const id = req.params.id;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newPerson = new Person(username, email, age, hashedPassword);
            const pool = await personController.#getConnect();
            const updatePerson = await pool
                .request()
                .input('username', sql.NVarChar, newPerson.username)
                .input('email', sql.NVarChar, newPerson.email)
                .input('age', sql.Int, newPerson.age)
                .input('password', sql.NVarChar, newPerson.password)
                .query(`UPDATE Person SET username = @username WHERE id = ${id}`);
            if (updatePerson.rowsAffected[0] == 0) {
                return res.status(400).json({ message: 'Updated person failed.' });
            } else {
                return res.status(200).json({ message: 'Updated person successfully.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = personController;
