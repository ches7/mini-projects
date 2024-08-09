const pool = require('./../lib/db');
const OrderItem = require('./orderItem');
const moment = require('moment');

let _ = class Order {

    constructor(data = {}){
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.userId = data.userId || null;
    }

    async create() {
        try {
            const newOrder = await pool.query("INSERT INTO orders (created, modified, status, total, userId) VALUES($1, $2, $3, $4, $5) RETURNING *",
                 [this.created, this.modified, this.status, this.total, this.userId]);
            if(newOrder.rows?.length) {
                Object.assign(this, newOrder.rows[0])
                return newOrder.rows[0]
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(data) {
        try {
            const updatedOrder = await pool.query(`UPDATE orders SET status = $1 WHERE id = ${this.id} RETURNING *`,
                 [data.status]);
            if(updatedOrder.rows?.length) {
                return updatedOrder.rows[0]
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(orderId){
        try {
            const result = await pool.query("SELECT * FROM orders WHERE id = $1",
                [orderId]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async findByUser(userId){
        try {
            const result = await pool.query("SELECT * FROM orders WHERE userId = $1",
                [userId]);
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