import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

const db = new Sequelize('node','postgres',String(process.env.PASSWORD_POSTGRES),{
    host:'localhost',
    dialect:'postgres',
    port:5000
    //logging:false
});


export default db;