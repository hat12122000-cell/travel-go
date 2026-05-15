// src/modules/destinations/destination.controller.js
const DestinationService  = require('./destination.service');
const { successResponse } = require('../../utils/response');

const DestinationController = {

  async getAll(req, res, next) {
    try {
      const result = await DestinationService.getAll(req.query);
      successResponse(res, result, 'Lấy danh sách địa điểm thành công');
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const destination = await DestinationService.getById(req.params.id);
      successResponse(res, destination, 'Lấy thông tin địa điểm thành công');
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const destination = await DestinationService.create(req.body);
      successResponse(res, destination, 'Tạo địa điểm thành công', 201);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const destination = await DestinationService.update(req.params.id, req.body);
      successResponse(res, destination, 'Cập nhật thành công');
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await DestinationService.delete(req.params.id);
      successResponse(res, null, 'Xóa địa điểm thành công');
    } catch (err) { next(err); }
  },
};

module.exports = DestinationController;