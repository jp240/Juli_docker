import crypto from 'crypto';
class maquillajes {
    constructor(database) {
        this.database = database;
    }

    async getproductosm() {
        const query = 'SELECT * FROM productosm';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getproductosm:', err);
            throw err;
        }
    }

    async getproductosmById(id) {
        const query = 'SELECT * FROM productosm WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getproductosmById:', err);
            throw err;
        }
    }

    async deleteproductosm(id) {
        const query = 'DELETE FROM productosm WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteproductosm:', err);
            throw err;
        }
    }

    async updateproductosm(id, nombre, marca, cantidad) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(nombre, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE productosm SET nombre = ?, marca = ?, cantidad = ? WHERE id = ?';
            const [result] = await this.database.query(query, [`${salt}:${hash}`, marca,cantidad , id]);
            return result;
        } catch (err) {
            console.error('Error en updateproductosm:', err);
            throw err;
        }
    }

    async addproductosm(nombre, marca, cantidad) {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(nombre, salt, 1000, 64, 'sha512').toString('hex'); 

        try {
            const query = 'INSERT INTO productosm (nombre, marca, cantidad) VALUES (?, ?, ?)';
            const [result] = await this.database.query(query, [`${salt}:${hash}`, marca,cantidad]);
            return result;
        } catch (err) {
            console.error('Error en addproductosm:', err);
            throw err;
        }
    }
}

export default maquillajes;
