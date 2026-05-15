// src/middleware/errorHandler.js
const { errorResponse } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err.message);

  if (err.number === 2627) {
    return errorResponse(res, 'Dữ liệu đã tồn tại.', 409);
  }

  const statusCode = err.statusCode || 500;
  const message    = err.message || 'Lỗi server, vui lòng thử lại.';

  return errorResponse(res, message, statusCode);
}

module.exports = errorHandler;