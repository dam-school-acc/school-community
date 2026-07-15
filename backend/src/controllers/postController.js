const pool = require('../config/db');

// 1. 학교/학년/반별 게시글 가져오기
exports.getPosts = async (req, res) => {
  try {
    const { school_code, grade, class_number } = req.query;
    
    let query = 'SELECT * FROM posts ORDER BY created_at DESC';
    let params = [];

    // 로그인한 사용자의 반별 게시판
    if (school_code && grade && class_number) {
      query = `
        SELECT * FROM posts 
        WHERE school_code = $1 AND grade = $2 AND class_number = $3 
        ORDER BY created_at DESC
      `;
      params = [school_code, grade, class_number];
    }

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('글 가져오기 에러:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 2. 새로운 게시글 작성하기 (반별 게시판)
exports.createPost = async (req, res) => {
  try {
    const { title, content, username, school_code, grade, class_number } = req.body;

    if (!title || !content || !username || !school_code || !grade || !class_number) {
      return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
    }

    const result = await pool.query(
      `INSERT INTO posts (title, content, username, school_code, grade, class_number) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [title, content, username, school_code, grade, class_number]
    );

    res.status(201).json({
      message: '게시글이 작성되었습니다!',
      post: result.rows[0]
    });
  } catch (error) {
    console.error('글 작성 에러:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};
