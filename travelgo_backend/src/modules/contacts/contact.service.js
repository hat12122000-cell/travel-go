// src/modules/contacts/contact.service.js
const ContactModel = require('./contact.model');

const ContactService = {

  async getAll() {
    return await ContactModel.findAll();
  },

  async getById(id) {
    if (!id || isNaN(id)) {
      throw Object.assign(new Error('ID không hợp lệ.'), { statusCode: 400 });
    }
    const message = await ContactModel.findById(parseInt(id));
    if (!message) {
      throw Object.assign(new Error('Không tìm thấy tin nhắn.'), { statusCode: 404 });
    }
    return message;
  },

  async submit({ full_name, email, message }) {
    // Validate họ tên
    if (!full_name?.trim() || full_name.trim().length < 2) {
      throw Object.assign(new Error('Họ tên phải có ít nhất 2 ký tự.'), { statusCode: 400 });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw Object.assign(new Error('Email không hợp lệ.'), { statusCode: 400 });
    }

    // Validate nội dung
    if (!message?.trim() || message.trim().length < 10) {
      throw Object.assign(new Error('Nội dung phải có ít nhất 10 ký tự.'), { statusCode: 400 });
    }

    return await ContactModel.create({
      full_name: full_name.trim(),
      email:     email.trim(),
      message:   message.trim(),
    });
  },

  async updateStatus(id, status) {
    // Chỉ cho phép 3 trạng thái hợp lệ
    const validStatuses = ['pending', 'read', 'replied'];
    if (!validStatuses.includes(status)) {
      throw Object.assign(new Error('Trạng thái không hợp lệ.'), { statusCode: 400 });
    }
    await ContactService.getById(id);
    return await ContactModel.updateStatus(parseInt(id), status);
  },

  async delete(id) {
    await ContactService.getById(id);
    return await ContactModel.delete(parseInt(id));
  },
};

module.exports = ContactService;