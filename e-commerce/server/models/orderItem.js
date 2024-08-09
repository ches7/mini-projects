const pool = require('./../lib/db');

let _ = class OrderItem {

    static async create(orderid, qty, price, productid, name, description, created) {
        try {
            const orderItem = await pool.query(`INSERT INTO orderitems (orderid, qty, price, productid, name, description, created) 
                VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                 [orderid, qty, price, productid, name, description, created]);
            return orderItem;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async findById(orderId){
        try {
            const result = await pool.query("SELECT * FROM orderitems WHERE orderid = $1",
                [orderId]);
            if(result.rows?.length){
                return result.rows;
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = _;