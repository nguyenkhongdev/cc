const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api', gameRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API Game Tài Xỉu - Phiên bản của bạn' });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});
