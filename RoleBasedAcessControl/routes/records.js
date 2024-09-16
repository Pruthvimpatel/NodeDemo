const express = require("express");
const router = express.Router();

const middleware = require('../middleware/middleware');  // Ensure the correct path and export

const recordsController = require('../controllers/recordsController');

router.post("/records", middleware.checkPermission('read_record'), recordsController.registerUser);
router.post('/records', middleware.checkPermission('create_record'), recordsController.loginUser);
// router.put('/records/:id', middleware.checkPermission('update_record'), recordsController.updateRecord);
// router.delete('/records/:id', middleware.checkPermission('delete_record'), recordsController.deleteRecord);

module.exports = router;