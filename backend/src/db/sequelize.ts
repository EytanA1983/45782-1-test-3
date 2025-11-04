import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Team from "../models/Team";
import Meeting from "../models/Meeting";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [Team, Meeting],
    logging: console.log
})

export default sequelize