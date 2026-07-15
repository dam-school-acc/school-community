const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 라우터 등록
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const mealRoutes = require('./routes/mealRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/meal', mealRoutes);

// 헬스 체크
app.get('/', (req, res) => {
  res.send('🚀 학교 커뮤니티 백엔드 서버가 정상적으로 작동 중입니다!');
});

app.listen(PORT, () => {
  console.log(`🚀 백엔드 서버가 http://localhost:${PORT} 에서 달리는 중입니다.`);
});
