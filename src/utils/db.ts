import { Sequelize } from 'sequelize';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,    // Database name
  process.env.DB_USER!,    // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',   // Use PostgreSQL as the database
    logging: false,        // Disable SQL query logging
  }
);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
