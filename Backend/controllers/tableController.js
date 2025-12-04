const Table = require('../models/tableModel');  
const mongoose = require('mongoose');

const addTable = async (req, res, next) => {
    try {
        const {tableNo,seats} = req.body;

        if(!tableNo){
            return res.status(400).json({success: false, message: "Table number is required"});
        }

        const isTableExist = await Table.findOne({tableNo});
        if(isTableExist){
            return res.status(400).json({success: false, message: "Table already exists"});
        }

        const newTable = new Table({tableNo,seats});
        await newTable.save();

        res.status(201).json({success: true, message: "Table added successfully", data: newTable});

    } catch (error) {
        next(error);
    }
}
const getTableById = async (req,res,next) => {
      try {
        const tables =await Table.find();
        res.status(200).json({success: true, data: tables});
    } catch (error) {
        next(error);
    }
}

const updateTable = async (req,res,next) => {
try {
    const {status, orderId} = req.body;
     const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).json({success: false, message: "Invalid order ID"});
        }
    
    const table = await Table.findByIdAndUpdate(
        id,
        { status, currentOrder: orderId || null },
        { new: true }
    );
    if (!table) {
        return res.status(404).json({ success: false, message: "Table not found" });
    }

    res.status(200).json({ success: true, message: "Table updated successfully", data: table });
} catch (error) {
    next(error);
}
  
}

module.exports = {
    addTable,
    getTableById,
    updateTable
}