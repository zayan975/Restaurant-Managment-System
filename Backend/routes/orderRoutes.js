const express = require ('express');
const router = express.Router();
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const { addOrder, getAllOrders,updateOrder, getOrderById } = require('../controllers/orderController');


router.post('/',isVerifiedUser,addOrder);
router.get('/',isVerifiedUser,getAllOrders);
router.get('/:id',isVerifiedUser,getOrderById);
router.put('/:id',isVerifiedUser,updateOrder);

module.exports = router;