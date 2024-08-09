const pool = require('./../lib/db');

let _ = class User {

    async findAll(){
        try {
            const result = await pool.query("SELECT * FROM products");
            if(result.rows?.length){
                return result.rows;
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOneById(id){
        try {
            const result = await pool.query("SELECT * FROM products WHERE id = $1",
                [id]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }
};

module.exports = _;