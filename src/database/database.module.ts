import { Module, Global, DynamicModule } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { TypeOrmModule } from '@nestjs/typeorm';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();

  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: config.DB_SINCRONIZE
  });
}

@Global()
@Module({
  imports: [
    EnvModule,
    DatabaseOrmModule(),
  ],

  exports: [],
})
export class DatabaseModule { }
