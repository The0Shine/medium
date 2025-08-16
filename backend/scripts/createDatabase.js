require("dotenv").config();
const mysql = require("mysql2/promise");

async function createDatabase() {
    try {
        // Kết nối MySQL mà không chỉ định database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log("Đã kết nối MySQL thành công!");

        // Tạo database
        await connection.execute(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
        );

        console.log(`Database '${process.env.DB_NAME}' đã được tạo thành công!`);

        await connection.end();
    } catch (error) {
        console.error("Lỗi khi tạo database:", error.message);
        process.exit(1);
    }
}

createDatabase();
