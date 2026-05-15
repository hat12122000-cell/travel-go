// src/modules/foods/food.service.js
const FoodModel = require('./food.model');

const FoodService = {

  async getAll() {
    return await FoodModel.findAll();
  },

  async getById(id) {
    if (!id || isNaN(id)) {
      throw Object.assign(new Error('ID không hợp lệ.'), { statusCode: 400 });
    }
    const food = await FoodModel.findById(parseInt(id));
    if (!food) {
      throw Object.assign(new Error('Không tìm thấy món ăn.'), { statusCode: 404 });
    }
    return food;
  },

  async create(body) {
    if (!body.name?.trim()) {
      throw Object.assign(new Error('Tên món ăn không được để trống.'), { statusCode: 400 });
    }
    return await FoodModel.create(body);
  },

  async update(id, body) {
    await FoodService.getById(id);
    return await FoodModel.update(parseInt(id), body);
  },

  async delete(id) {
    await FoodService.getById(id);
    return await FoodModel.delete(parseInt(id));
  },
};

module.exports = FoodService;