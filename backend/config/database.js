import {Sequelize} from "sequelize";

const conexion = new Sequelize(
    'tinder',
    'postgres',
    '12345',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

export default conexion;