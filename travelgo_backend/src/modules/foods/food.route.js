// src/modules/foods/food.route.js
const express    = require('express');
const router     = express.Router();
const controller = require('./food.controller');

router.get   ('/',    controller.getAll);    // GET    /api/foods
router.get   ('/:id', controller.getById);  // GET    /api/foods/1
router.post  ('/',    controller.create);   // POST   /api/foods
router.put   ('/:id', controller.update);   // PUT    /api/foods/1
router.delete('/:id', controller.delete);   // DELETE /api/foods/1

module.exports = router;