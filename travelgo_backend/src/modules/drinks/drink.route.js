// src/modules/drinks/drink.route.js
const express    = require('express');
const router     = express.Router();
const controller = require('./drink.controller');

router.get   ('/',    controller.getAll);    // GET    /api/drinks
router.get   ('/:id', controller.getById);  // GET    /api/drinks/1
router.post  ('/',    controller.create);   // POST   /api/drinks
router.put   ('/:id', controller.update);   // PUT    /api/drinks/1
router.delete('/:id', controller.delete);   // DELETE /api/drinks/1

module.exports = router;