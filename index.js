const dns = require('dns');
dns.setServers(['8.8.8.8']);
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routers/todoRouter');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-backend3';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('연결성공');
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
    });
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

app.use('/todos', todoRoutes);