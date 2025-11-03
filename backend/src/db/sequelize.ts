import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Region from "../models/Region";
import HikingSite from "../models/HikingSite";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [Region, HikingSite],
    logging: console.log
})

export default sequelize