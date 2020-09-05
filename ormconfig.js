module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST || 'localhost',
  "port": process.env.DB_PORT || 5432,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}