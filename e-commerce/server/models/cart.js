const pool = require('./../lib/db');

let _ = class Cart {

    constructor(){
        this.created = Date.now();
        this.modified = Date.now();
    }

    async create(userId){
        try {
            const result = await pool.query(`INSERT INTO carts (userId, created, modified) VALUES(${userId} $1, $2) RETURNING *`, 
                [this.created, this.modified]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async findOneByUser(id){
        try {
            const result = await pool.query("SELECT * FROM carts WHERE userId = $1",
                [id]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async findOneById(id){
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