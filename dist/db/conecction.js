"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_1.Sequelize('node', 'postgres', String(process.env.PASSWORD_POSTGRES), {
    host: 'localhost',
    dialect: 'postgres',
    port: 5000
    //logging:false
});
exports.default = db;
//# sourceMappingURL=conecction.js.map