const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get('/', mealController.getMeal);

module.exports = router;
