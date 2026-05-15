// src/modules/drinks/drink.controller.js
const DrinkService        = require('./drink.service');
const { successResponse } = require('../../utils/response');

const DrinkController = {

  async getAll(req, res, next) {
    try {
      const drinks = await DrinkService.getAll();
      successResponse(res, drinks, 'Lấy danh sách đồ uống thành công');
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const drink = await DrinkService.getById(req.params.id);
      successResponse(res, drink, 'Lấy thông tin đồ uống thành công');
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const drink = await DrinkService.create(req.body);
      successResponse(res, drink, 'Tạo đồ uống thành công', 201);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const drink = await DrinkService.update(req.params.id, req.body);
      successResponse(res, drink, 'Cập nhật đồ uống thành công');
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await DrinkService.delete(req.params.id);
      successResponse(res, null, 'Xóa đồ uống thành công');
    } catch (err) { next(err); }
  },
};

module.exports = DrinkController;