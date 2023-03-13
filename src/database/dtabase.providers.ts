import { createConnection } from 'typeorm';
import { EnvService } from '../env/env.service';

const config = new EnvService().read();
export const databaseProviders = [
    {

        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: config.DB_TYPE,
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: config.DB_SINCRONIZE
        }),
    },
];