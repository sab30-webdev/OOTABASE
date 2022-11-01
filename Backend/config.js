// const config = {
//   user: "sab",
//   password: "qwerty",
//   server: "localhost",
//   database: "RESTAURANT",
//   synchronize: true,
//   trustServerCertificate: true,
// };

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
