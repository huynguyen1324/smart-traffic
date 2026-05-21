const pool = require('../src/config/db');

async function run() {
    try {
        console.log('--- CREATING DRIVING TEST CENTERS AND MAP SEARCH TABLES ---');
        
        // 1. Drop existing tables if they exist to be clean
        await pool.query('DROP TABLE IF EXISTS `map_search_data`');
        await pool.query('DROP TABLE IF EXISTS `driving_test_centers`');
        
        // 2. Create driving_test_centers table
        await pool.query(`
            CREATE TABLE \`driving_test_centers\` (
                \`id\` INT PRIMARY KEY AUTO_INCREMENT,
                \`name\` VARCHAR(255) NOT NULL,
                \`address\` VARCHAR(255) NOT NULL,
                \`latitude\` DOUBLE NOT NULL,
                \`longitude\` DOUBLE NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('✅ Created driving_test_centers table.');
        
        // 3. Create map_search_data table referencing driving_test_centers
        await pool.query(`
            CREATE TABLE \`map_search_data\` (
                \`id\` INT PRIMARY KEY AUTO_INCREMENT,
                \`center_id\` INT NULL,
                \`search_query\` VARCHAR(255) NULL,
                \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT \`fk_map_search_center\`
                    FOREIGN KEY (\`center_id\`) REFERENCES \`driving_test_centers\`(\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('✅ Created map_search_data table with Foreign Key.');
        
        // 4. Insert new driving test centers data
        const newCenters = [
            {
                "id": 1,
                "name": "Trung Tâm Đào tạo và Sát Hạch lái xe Hà Nội",
                "address": "7 Ngõ 2, Phố Trung Kính, Yên Hòa, Hà Nội",
                "latitude": 21.0182,
                "longitude": 105.7958
            },
            {
                "id": 2,
                "name": "Trung Tâm Dạy Nghề, Đào Tạo Và Sát Hạch Lái Xe",
                "address": "17, Ngõ 249 Chiến Thắng, Hà Đông, Hà Nội",
                "latitude": 20.9856,
                "longitude": 105.7972
            },
            {
                "id": 3,
                "name": "VP Tuyển Sinh Đào Tạo Lái Xe Số 9",
                "address": "Tầng 3, 8 Ngõ 221 Phố Trung Kính, Yên Hòa, Hà Nội",
                "latitude": 21.0175,
                "longitude": 105.7945
            },
            {
                "id": 4,
                "name": "Trường CĐ Cảnh sát nhân dân 1 - Trung tâm đào tạo & sát hạch lái xe",
                "address": "234 Ngô Quyền, Hà Đông, Hà Nội",
                "latitude": 20.9750,
                "longitude": 105.7725
            },
            {
                "id": 5,
                "name": "Trung Tâm Thi Bằng Lái Xe Thanh Xuân HN",
                "address": "Khương Đình, Thanh Xuân, Hà Nội",
                "latitude": 20.9985,
                "longitude": 105.8152
            }
        ];
        
        for (const center of newCenters) {
            await pool.query(
                'INSERT INTO `driving_test_centers` (id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
                [center.id, center.name, center.address, center.latitude, center.longitude]
            );
        }
        console.log('✅ Inserted 5 driving test centers successfully.');
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to run map migration:', err);
        process.exit(1);
    }
}

run();
