require("dotenv").config();
const sequelize = require("../config/database");

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Kết nối database thành công!");
        
        // Kiểm tra các bảng đã tạo
        const [results] = await sequelize.query("SHOW TABLES");
        console.log("\n📋 Các bảng trong database:");
        results.forEach(table => {
            console.log(`  - ${Object.values(table)[0]}`);
        });
        
        // Kiểm tra số lượng records trong một số bảng chính
        const tables = ['role', 'user', 'language', 'category', 'post', 'comment'];
        console.log("\n📊 Số lượng records:");
        
        for (const table of tables) {
            try {
                const [countResult] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
                console.log(`  - ${table}: ${countResult[0].count} records`);
            } catch (error) {
                console.log(`  - ${table}: Bảng không tồn tại hoặc lỗi`);
            }
        }
        
        await sequelize.close();
        console.log("\n✅ Test hoàn thành!");
        
    } catch (error) {
        console.error("❌ Lỗi kết nối database:", error.message);
        process.exit(1);
    }
}

testConnection();
