// BOILERPLATE
const express = require('express');
const tasksRouter = express.Router();

// connecting to the database
const pool = require('../modules/pool.js');

// GET
tasksRouter.get('/', (req,res) =>{
    const sqlQuery = `
        SELECT * FROM "tasks"
        ORDER BY "id" DESC;
    `

pool.query(sqlQuery)
    .then((dbRes) =>{
        let tasks = dbRes.rows;
        res.send(tasks);
    })
    .catch((dbErr) =>{
        console.log('error in GET /tasks error:', dbErr);
        res.sendStatus(500);
    })
})
// POST
tasksRouter.post('/', (req,res)=>{
    //variables 
    let newTask = req.body;
    let name = req.body.name;
    let notes = req.body.notes;
    let complete = req.body.complete;

    console.log('adding a new task:', newTask);
    let sqlQuery = `
        INSERT INTO "tasks"
        ("name", "notes", "complete")
        VALUES
        ($1, $2, $3);
    `

    let sqlValues = [name,notes,complete];

    pool.query(sqlQuery,sqlValues)
        .then((poolRes)=>{
            res.sendStatus(201);
        })
        .catch((poolErr)=>{
            console.log('error in pool query POST:', poolErr);
            res.sendStatus(500);
        })

})
// PUT / UPDATE
tasksRouter.put('/:idToUpdate', (req,res)=> {
    console.log(req.params);
    let idToUpdate = req.params.idToUpdate;
    let sqlQuery = `
        UPDATE "tasks"
        SET complete = TRUE
            WHERE id = $1;
    `
    let sqlValues = [idToUpdate];

    pool.query(sqlQuery,sqlValues)
        .then((poolRes)=>{
                res.sendStatus(200);
        })
        .catch((poolErr)=>{
            res.sendStatus('error is', poolErr);
        })
})
// DELETE


module.exports = tasksRouter;