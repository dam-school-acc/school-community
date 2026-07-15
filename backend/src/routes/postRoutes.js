const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 라우터 경로를 컨트롤러의 함수와 연결
router.get('/', postController.getPosts);
router.post('/', postController.createPost);

module.exports = router;
