// src/modules/contacts/contact.controller.js
const ContactService      = require('./contact.service');
const { successResponse } = require('../../utils/response');

const ContactController = {

  // GET /api/contacts — lấy tất cả tin nhắn
  async getAll(req, res, next) {
    try {
      const messages = await ContactService.getAll();
      successResponse(res, messages, 'Lấy danh sách tin nhắn thành công');
    } catch (err) { next(err); }
  },

  // GET /api/contacts/:id — lấy 1 tin nhắn
  async getById(req, res, next) {
    try {
      const message = await ContactService.getById(req.params.id);
      successResponse(res, message, 'Lấy tin nhắn thành công');
    } catch (err) { next(err); }
  },

  // POST /api/contacts — gửi tin nhắn từ form liên hệ
  async submit(req, res, next) {
    try {
      const message = await ContactService.submit(req.body);
      successResponse(res, message, 'Gửi tin nhắn thành công!', 201);
    } catch (err) { next(err); }
  },

  // PUT /api/contacts/:id/status — cập nhật trạng thái tin nhắn
  async updateStatus(req, res, next) {
    try {
      const message = await ContactService.updateStatus(req.params.id, req.body.status);
      successResponse(res, message, 'Cập nhật trạng thái thành công');
    } catch (err) { next(err); }
  },

  // DELETE /api/contacts/:id — xóa tin nhắn
  async delete(req, res, next) {
    try {
      await ContactService.delete(req.params.id);
      successResponse(res, null, 'Xóa tin nhắn thành công');
    } catch (err) { next(err); }
  },
};

module.exports = ContactController;