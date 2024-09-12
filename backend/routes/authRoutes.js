const express = require('express');
const { signup, login , Index , updateMaxScore , getTop10Users, getUserByEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', Index)

// Route for updating maxScore
router.post('/updateMaxScore', updateMaxScore);

router.get('/user/:email', getUserByEmail);

// Route to get the top 10 users with the highest maxScore
router.get('/top10Users', getTop10Users);


module.exports = router;
