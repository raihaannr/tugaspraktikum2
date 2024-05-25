import {Sequelize} from "sequelize";

const db = new Sequelize('pabw-praktikum','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;