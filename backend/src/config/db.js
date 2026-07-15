const { Pool } = require('pg');
require('dotenv').config();

// .env 파일에 적어둔 정보를 바탕으로 데이터베이스 연결 바구니(Pool)를 만듭니다.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 데이터베이스와 연결이 잘 되었는지 테스트해 보는 코드입니다.
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ 데이터베이스 연결 실패:', err.stack);
  }
  console.log('✅ PostgreSQL 데이터베이스 연결 성공!');
  release();
});

module.exports = pool;
