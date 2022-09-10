// BOILERPLATE
const express = require('express');
const tasksRouter = express.Router();

// connecting to the database
const pool = require('../modules/pool.js');

// GET
tasksRouter.get('/', (req,res) =>{
    const sqlQuery = `
        SELECT * FROM "tasks"
        ORDER BY "id";
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

// PUT / UPDATE

// DELETE


module.exports = tasksRouter;