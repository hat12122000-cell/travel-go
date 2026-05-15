// server.js
require('dotenv').config();

const app           = require('./src/config/app');
const { connectDB } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Test API:   http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();