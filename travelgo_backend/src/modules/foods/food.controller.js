// src/modules/foods/food.controller.js
const FoodService         = require('./food.service');
const { successResponse } = require('../../utils/response');

const FoodController = {

  async getAll(req, res, next) {
    try {
      const foods = await FoodService.getAll();
      successResponse(res, foods, 'Lấy danh sách món ăn thành công');
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const food = await FoodService.getById(req.params.id);
      successResponse(res, food, 'Lấy thông tin món ăn thành công');
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const food = await FoodService.create(req.body);
      successResponse(res, food, 'Tạo món ăn thành công', 201);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const food = await FoodService.update(req.params.id, req.body);
      successResponse(res, food, 'Cập nhật món ăn thành công');
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await FoodService.delete(req.params.id);
      successResponse(res, null, 'Xóa món ăn thành công');
    } catch (err) { next(err); }
  },
};

module.exports = FoodController;