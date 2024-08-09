const validate = require("validate.js");
const constraints = require('../lib/constraints');
const bcrypt = require('bcrypt');
const pool = require('./../lib/db')

let _ = class User {

    constructor(){
        this.created = Date.now();
        this.name = {
            first: null,
            last: null
        };
        this.email = null,
        this.security = {
            passwordHash: null
        };
    }

    async create(google=null, facebook=null) {
        try {
            const newUser = await pool.query("INSERT INTO users (email, firstname, lastname, password, google, facebook) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
                 [this.email, this.name.first, this.name.last, this.security.passwordHash, google, facebook]);
            return newUser.rows[0];
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(id) {
        try {
            const updatedUser = await pool.query(`UPDATE users SET email = $1, firstname = $2, lastname = $3, password = $4 WHERE id = ${id} RETURNING *`,
                 [this.email, this.name.first, this.name.last, this.security.passwordHash]);
            return updatedUser.rows[0];
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOneByEmail(email){
        try {
            const result = await pool.query("SELECT * FROM users WHERE email = $1",
                [email]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOneByGoogle(id){
        try {
            console.log('looking in db for google account')
            const result = await pool.query("SELECT * FROM users WHERE google ->> 'id' = $1",
                [id]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOneByFacebook(id){
        try {
            const result = await pool.query("SELECT * FROM users WHERE facebook ->> 'id' = $1",
                [id]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOneById(id){
        try {
            const result = await pool.query("SELECT * FROM users WHERE id = $1",
                [id]);
            if(result.rows?.length){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(error)
        }
    }

    setFirstName(firstName) {
        try {
            if(firstName){
                firstName = firstName.trim().replace(/  +/g, ' ');
            };
            let msg = validate.single(firstName, constraints.name);
            if(msg){
                return msg;
            } else {
                this.name.first = firstName;
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    setLastName(lastName) {
        try {
            if(lastName){
                lastName = lastName.trim().replace(/  +/g, ' ');
            };
            let msg = validate.single(lastName, constraints.name);
            if(msg){
                return msg;
            } else {
                this.name.last = lastName;
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    setEmail(email) {
        try {
            let msg = validate.single(email, constraints.email);
            if(msg){
                return msg;
            } else {
                this.email = email;
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async setPassword(password){
        try {
            let msg = validate.single(password, constraints.password)
            if(msg){
                return msg;
            } else {
                this.security.passwordHash = await bcrypt.hash(password, 10);
                return;
            }
        } catch (error) {
            throw new Error(error)
        }
    }
};

module.exports = _;