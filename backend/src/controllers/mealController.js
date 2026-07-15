const pool = require('../config/db');

// 급식 정보 조회
exports.getMeal = async (req, res) => {
  try {
    const { office_code, school_code } = req.query;

    if (!school_code) {
      return res.status(400).json({ message: '학교 코드가 필요합니다.' });
    }

    // 오늘 날짜의 급식 정보 조회
    const today = new Date().toISOString().split('T')[0];
    
    const result = await pool.query(
      `SELECT menu, calories FROM meals 
       WHERE school_code = $1 AND meal_date = $2 
       LIMIT 1`,
      [school_code, today]
    );

    if (result.rows.length === 0) {
      // 테스트용 더미 데이터
      return res.status(200).json({
        meal: '🍚 쌀밥\n🥘 된장찌개\n🍗 치킨너겟\n🥬 오이지\n🍌 바나나',
        calories: '750kcal'
      });
    }

    res.status(200).json({
      menu: result.rows[0].menu,
      calories: result.rows[0].calories ? `${result.rows[0].calories}kcal` : ''
    });
  } catch (error) {
    console.error('급식 정보 조회 에러:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};
