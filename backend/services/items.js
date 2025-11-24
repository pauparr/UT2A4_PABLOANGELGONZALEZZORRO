const db = require('./db')
const helper = require('../helper')

async function insertData(req) {
    const data = req.query
    const result = await db.query(
        `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`,
        [data.nombre, data.marca, data.tipo, data.precio]
    )
    return result.affectedRows
}

async function getData() {
    const rows = await db.query(
        `SELECT * FROM coleccion`
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req) {
    const data = req.query
    const result = await db.query(
        `DELETE FROM coleccion WHERE id = ?`,
        [data.id]
    )
    return result.affectedRows
}

module.exports = {
    getData,
    insertData,
    deleteData
}
