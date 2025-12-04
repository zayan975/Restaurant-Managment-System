const express = require('express');
const { addTable, getTableById, updateTable } = require('../controllers/tableController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const router = express.Router();

router.post('/',isVerifiedUser,addTable);
router.get('/',isVerifiedUser,getTableById);
router.put('/:id',isVerifiedUser,updateTable);

module.exports = router;