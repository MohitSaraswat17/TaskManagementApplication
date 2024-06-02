import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import {Task} from "../models/taskSchema.js";

export const createTask = catchAsyncErrors(async (req,res,next)=>{
    const {title,description} = req.body;
    const createdBy = req.user._id;
    const task = await Task.create({
        title,
        description,
        createdBy
    });
    res.status(201).json({
        success:true,
        task,
        message:"Task created successfully"
    }) 
}); // Create a new task

export const getMyTask = catchAsyncErrors(async (req,res,next)=>{
    const user = req.user._id;
    const tasks = await Task.find({createdBy:user}); 
    res.status(200).json({
        success:true,
        tasks
    });

}); // Get all tasks

export const deleteTask = catchAsyncErrors(async (req,res,next)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found",404));
    }
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message:"Task deleted successfully"
    });
}); // Delete a task

export const updateTask = catchAsyncErrors(async (req,res,next)=>{
    const {id} = req.params;
    let task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found",404));
    }
    task = await Task.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        task,
        message:"Task updated successfully"
    });

}); // Update a task

export const getSingleTask = catchAsyncErrors(async (req,res,next)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found",404));
    }
    res.status(200).json({
        success:true,
        task
    });
}); // Get a single task
