// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { sessions, currentId } = require('../data/store');
const { generateDiceResult, generatePattern, predict } = require('../services/gameService');

// GET /api/taixiumd5/lc79
router.get('/taixiumd5/lc79', (req, res) => {
    const lastSession = sessions[sessions.length - 1];
    const phien_truoc = lastSession ? lastSession.phien_hien_tai : 0;
    const phien_hien_tai = lastSession ? lastSession.phien_hien_tai + 1 : 1;
    
    // Lấy lịch sử 15 phiên gần nhất để tạo pattern
    const history = sessions.slice(-15);
    const pattern = generatePattern(history);
    const prediction = predict(history);
    const dice = generateDiceResult();
    
    const sessionData = {
        id: currentId++,
        phien_hien_tai,
        phien_truoc,
        xuc_xac1: dice.xuc_xac[0],
        xuc_xac2: dice.xuc_xac[1],
        xuc_xac3: dice.xuc_xac[2],
        tong: dice.tong,
        ket_qua: dice.ket_qua,
        pattern,
        du_doan: prediction.du_doan,
        do_tin_cay: prediction.do_tin_cay
    };
    
    sessions.push(sessionData);
    res.json(sessionData);
});

// GET /api/taixiumd5/history - lấy lịch sử
router.get('/taixiumd5/history', (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const history = sessions.slice(-limit);
    res.json(history);
});

module.exports = router;
