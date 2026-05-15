// src/modules/drinks/drink.service.js
const DrinkModel = require('./drink.model');

const DrinkService = {

  async getAll() {
    return await DrinkModel.findAll();
  },

  async getById(id) {
    if (!id || isNaN(id)) {
      throw Object.assign(new Error('ID không hợp lệ.'), { statusCode: 400 });
    }
    const drink = await DrinkModel.findById(parseInt(id));
    if (!drink) {
      throw Object.assign(new Error('Không tìm thấy đồ uống.'), { statusCode: 404 });
    }
    return drink;
  },

  async create(body) {
    if (!body.name?.trim()) {
      throw Object.assign(new Error('Tên đồ uống không được để trống.'), { statusCode: 400 });
    }
    return await DrinkModel.create(body);
  },

  async update(id, body) {
    await DrinkService.getById(id);
    return await DrinkModel.update(parseInt(id), body);
  },

  async delete(id) {
    await DrinkService.getById(id);
    return await DrinkModel.delete(parseInt(id));
  },
};

module.exports = DrinkService;