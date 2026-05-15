// src/modules/destinations/destination.service.js
const DestinationModel = require('./destination.model');

const DestinationService = {

  async getAll(query) {
    const page   = Math.max(1, parseInt(query.page)  || 1);
    const limit  = Math.min(50, parseInt(query.limit) || 9);
    const offset = (page - 1) * limit;
    const search = query.search?.trim() || null;

    const destinations = await DestinationModel.findAll({ search, limit, offset });
    return { destinations, page, limit };
  },

  async getById(id) {
    if (!id || isNaN(id)) {
      throw Object.assign(new Error('ID không hợp lệ.'), { statusCode: 400 });
    }
    const destination = await DestinationModel.findById(parseInt(id));
    if (!destination) {
      throw Object.assign(new Error('Không tìm thấy địa điểm này.'), { statusCode: 404 });
    }
    return destination;
  },

  async create(body) {
    const { name, location, description, image_url, badge, rating } = body;

    if (!name?.trim()) {
      throw Object.assign(new Error('Tên địa điểm không được để trống.'), { statusCode: 400 });
    }
    if (!location?.trim()) {
      throw Object.assign(new Error('Vị trí không được để trống.'), { statusCode: 400 });
    }
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      throw Object.assign(new Error('Rating phải từ 0 đến 5.'), { statusCode: 400 });
    }

    return await DestinationModel.create({
      name: name.trim(), location: location.trim(),
      description, image_url, badge, rating,
    });
  },

  async update(id, body) {
    await DestinationService.getById(id);
    return await DestinationModel.update(parseInt(id), body);
  },

  async delete(id) {
    await DestinationService.getById(id);
    return await DestinationModel.delete(parseInt(id));
  },
};

module.exports = DestinationService;