const express = require('express');
const router = express.Router();
const scpController = require('../controllers/scpController');
const auth = require('../middleware/authMiddleware');

router.use(auth); // Appliquer auth à toutes les routes SCP
router.get('/', scpController.getAll);
router.get('/:id', scpController.getOne);
router.post('/', scpController.create);
router.put('/:id', scpController.update);
router.delete('/:id', scpController.delete);

module.exports = router;
