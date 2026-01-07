import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_HOST || 'postgres',
      password: process.env.DB_PASS,
      database: process.env.DB_NAME || 'trkienblog',
      entities: [path.join(__dirname, '/modules/**/entities/*.entity.{ts,js}')],
      migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
      synchronize: false, // luôn false
});