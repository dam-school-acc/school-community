const pool = require('../config/db');
const bcrypt = require('bcrypt');

// 1. 학교 검색 기능 (DB에서 조회)
exports.searchSchools = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ message: '검색 키워드를 입력해주세요.' });
    }

    // 학교명이나 지역으로 검색
    const query = `
      SELECT id, school_name, location, school_code, office_code 
      FROM schools 
      WHERE school_name ILIKE $1 OR location ILIKE $1
      ORDER BY school_name ASC
      LIMIT 10
    `;
    
    const result = await pool.query(query, [`%${keyword}%`]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('학교 검색 에러:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 2. 회원가입 기능 (DB 학교 정보 사용)
exports.register = async (req, res) => {
  try {
    const { email, password, username, school_code, grade, class_number } = req.body;

    if (!email || !password || !username || !school_code) {
      return res.status(400).json({ message: '모든 필수 항목을 입력해주세요.' });
    }

    // 이미 가입된 이메일인지 확인
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 학교 정보 조회
    const schoolQuery = await pool.query(
      'SELECT school_name, office_code FROM schools WHERE school_code = $1',
      [school_code]
    );

    if (schoolQuery.rows.length === 0) {
      return res.status(400).json({ message: '등록되지 않은 학교입니다.' });
    }

    const { school_name, office_code } = schoolQuery.rows[0];

    // 비밀번호 암호화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // DB에 저장
    const newUser = await pool.query(
      `INSERT INTO users (email, password, username, school_name, office_code, school_code, grade, class_number) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, email, username, school_name, grade, class_number`,
      [email, hashedPassword, username, school_name, office_code, school_code, grade, class_number]
    );

    res.status(201).json({
      message: `${school_name} 학생으로 회원가입이 성공적으로 완료되었습니다!`,
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 3. 안전한 로그인 기능 (SQL Injection 차단 + bcrypt 검증)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    // 매개변수화 쿼리를 사용하여 입력값을 안전하게 격리 처리
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).json({
        message: '로그인 성공!',
        user: { 
          id: user.id, 
          email: user.email, 
          username: user.username, 
          school_name: user.school_name,
          school_code: user.school_code,
          office_code: user.office_code,
          grade: user.grade,
          class_number: user.class_number
        }
      });
    } else {
      res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};
