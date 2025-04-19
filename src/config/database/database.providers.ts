
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: Number(process.env.DB_PORT),
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
            });
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
