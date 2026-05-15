// src/modules/contacts/contact.route.js
const express    = require('express');
const router     = express.Router();
const controller = require('./contact.controller');

router.get   ('/',           controller.getAll);      // GET    /api/contacts
router.get   ('/:id',        controller.getById);     // GET    /api/contacts/1
router.post  ('/',           controller.submit);      // POST   /api/contacts
router.put   ('/:id/status', controller.updateStatus);// PUT    /api/contacts/1/status
router.delete('/:id',        controller.delete);      // DELETE /api/contacts/1

module.exports = router;