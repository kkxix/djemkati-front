var common = require('../Common/postgresql');
const Client = require('pg');

exports.func = async (_, {page_id}) => {
    var client = Client  = new Client({
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        database: process.env.DB_NAME,
        user: process.env.USERNAME,
        password: process.env.PASSWORD
    })
    client.connect()
    await common.init(client)
    var resp = await common.getLines(client, page_id);
    client.end()
    return resp;
}