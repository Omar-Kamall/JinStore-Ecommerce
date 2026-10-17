import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dbConfig = {
  type: (`${process.env.DB_TYPE}` as 'postgres') || 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(process.env.DB_PORT || '8000', 10),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

const testDataSource = new DataSource(dbConfig);

export const connectionDB = async () => {
  try {
    await testDataSource.initialize();
    console.log('Database connection successful');
  } catch (error) {
    throw new Error(`Failed to connection database: ${error}`);
  }
};
