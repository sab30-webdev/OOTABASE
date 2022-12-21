const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB,
  upi_id: process.env.UPI,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
