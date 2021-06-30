const { response } = require("express");
const { Task } = require("../models/index");

class TaskController {
    static findAll(req, res, next){
        Task.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        .then(response => {
            res.status(200).json({
                status: 200,
                msg: "success Find All",
                response
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next){
        console.log(req.body, "<<<<< req.body controller");
        const {
            title, description, deadline, signature,
            category
        } = req.body
        Task.create({
            title, description, deadline, signature,
            category,
            UserId: req.userData.id
        })
        .then(response =>{
            console.log(response, "<<<<< ini response");
            res.status(201).json({
                response
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next){
        let id = req.params.id
        console.log(id, "<<<<<< ini id");
        Task.findByPk(id)
        .then(response => {
            if (!response) throw {
                msg: "Task Not Found"
            }
            response.destroy()
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next){
        const {id} = req.params
        const { title, description, deadline, category, signature } = req.body
        Task.findByPk(id)
        .then(response=> {
            if (!response) throw {
                msg: "Task Not Found"
            }
            return response.update({
                title,
                description, category,
                deadline, signature
            })
        })
        .then(response => {
            res.status(200).json({
                status: 200,
                msg: `Task ${id} updated `,
                response
            })
        })
        .catch(err =>{
            next(err)
        })
    }
}
module.exports = TaskController;
