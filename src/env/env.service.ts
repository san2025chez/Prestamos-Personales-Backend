// import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
    // application
    APP_ENV: string;
    APP_DEBUG: boolean;
    //firebase
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_DATABASE_URL: string;

    //mercado pago
    MERCADO_PAGO_PUBLIC_KEY: string;
    MERCADO_PAGO_ACCESS_TOKEN: string;
    URL_API: string;
    APP_ID: number;
    URL_FRONT: string;
    MERCADO_PAGO_REDIRECT_URI: string;





    // database
    DB_TYPE: 'postgres';
    DB_HOST?: string;
    DB_NAME: string;
    DB_PORT?: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_ENTITIES: string;
    DB_MIGRATIONS_DIR: string;
    DB_MIGRATIONS: string;
    DB_SINCRONIZE: boolean;
    TOKEN: number;
}

export class EnvService {
    private vars: EnvData;

    constructor() {
        // const environment = process.env.NODE_ENV || 'development'
        let data: any;
        if (process.env.NODE_ENV === 'production') {
            data = dotenv.parse(fs.readFileSync(`${'production'}.env`));
        } else {
            data = dotenv.parse(fs.readFileSync(`${'development'}.env`));
        }
        //  data = dotenv.parse(fs.readFileSync(`${'porcentaje'}.env`))
        data.APP_ENV = process.env.NODE_ENV;
        data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false;
        // tslint:disable-next-line: radix
        data.DB_PORT = parseInt(data.DB_PORT);
        //data.PORCENTAJE = parseInt(data.PORCENTAJE);
        //console.log("el valor porcentaje es:", data.PORCENTAJE);



        this.vars = data as EnvData;
    }

    read(): EnvData {
        return this.vars;
    }

    isDev(): boolean {
        return (this.vars.APP_ENV === 'development');
    }

    isProd(): boolean {
        return (this.vars.APP_ENV === 'production');
    }
}

/* @Injectable()
export class EnvService {} */
