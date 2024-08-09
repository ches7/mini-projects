const pool = require('./../lib/db');

let _ = class CartItem {

    static async create(userId, productId, qty=1){
        try {
            // const { cartId, productId, qty } = data;
            const result = await pool.query(`INSERT INTO cartItems (userId, productId, qty) VALUES($1, $2, $3) RETURNING *`, 
                [userId, productId, qty]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async update(id, qty){
        try {
            const result = await pool.query(`UPDATE cartItems SET qty = $1 WHERE id = $2 RETURNING *`, 
                [qty, id]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteOne(userId, productId){
        try {
            const result = await pool.query(`DELETE FROM cartItems WHERE (userid = $1 AND productid = $2) RETURNING *`, 
                [userId, productId]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteAll(userId){
        try {
            const result = await pool.query(`DELETE FROM cartItems WHERE userid = $1 RETURNING *`, 
                [userId]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async find(userId){
        try {
            const result = await pool.query(`SELECT * FROM cartItems WHERE userId = $1`, [userId]);
            if(result.rows?.length){
                return result.rows;
            }
            return [];
        } catch (error) {
            throw new Error(error)
        }
    }

    static async findByProductId(productId, userId){
        try {
            const result = await pool.query(`SELECT * FROM cartItems WHERE (productId = $1 AND userId = $2)`, [productId, userId]);
            if(result.rows?.length){
                return result.rows;
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }
};

module.exports = _;