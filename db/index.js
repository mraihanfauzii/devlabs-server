const Pool = require("pg").Pool;

const db = new Pool({
    user: "postgres",
    password: "F@rhantk1324",
    host : "localhost",
    port: 5432,
    database: "devlabs"
});
db
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

module.exports = db;