import { Sequelize } from 'sequelize';

const db = new Sequelize('heroku_f342d9c2481d6d5', 'babb0e5d93695d', '23002e90', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    query: { raw: true }
    // logging: false,
});

export default db;

