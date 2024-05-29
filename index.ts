#!/usr/bin/env node

import inquirer from "inquirer";



let todos = [];
let condition = true;

while (condition) {
    const todoquest = await inquirer.prompt([
        {
            name: "category",
            type: "list",
            message: "Please Select The Category",
            choices: ["Work", "Home Chores", "Cleaning"],
        },
        {
            name: "Q1",
            type: "input",
            message: "What Would You like To Add In Your To Do List?",
        },
        {
            name: "Q2",
            type: "confirm",
            message: "Would You Like To Add More In Your To Do List?",
            default: false,
        },
    ]);

    todos.push({ task: todoquest.Q1, category: todoquest.category });

    if (!todoquest.Q2) {
        const del = await inquirer.prompt([
            {
                name: "delete",
                type: "confirm",
                message: "Do You Want To Delete Anything From Your To Do List?",
                default: false,
            }
        ]);

        if (del.delete) {
            const Delete = await inquirer.prompt([
                {
                    name: "Q4",
                    type: "list",
                    message: "Please Select The To Do You Want To Delete From Your To Do List",
                    choices: todos.map(todo => `${todo.task} [${todo.category}]`),
                }
            ]);

            const taskToDelete = Delete.Q4.split(" [")[0];
            const index = todos.findIndex(todo => todo.task === taskToDelete);
            if (index !== -1) {
                todos.splice(index, 1);
            } else {
                console.log('Element not found in the array.');
            }
        }

        const updateelement = await inquirer.prompt([
            {
                name: "update",
                type: "confirm",
                message: "Do You Want To Update Any Of Your To Dos?",
                default: false,
            }
        ]);

        if (updateelement.update) {
            const choose = await inquirer.prompt([
                {
                    name: "chooseelement",
                    type: "list",
                    message: "Please Select The To Do You Want To Update:",
                    choices: todos.map(todo => `${todo.task} [${todo.category}]`),
                }
            ]);

            const taskToUpdate = choose.chooseelement.split(" [")[0];
            const index = todos.findIndex(todo => todo.task === taskToUpdate);
            if (index !== -1) {
                const newTask = await inquirer.prompt([
                    {
                        name: "newTask",
                        type: "input",
                        message: "Enter the updated task:",
                    }
                ]);

                todos[index].task = newTask.newTask;
            } else {
                console.log('Element not found in the array.');
            }
        }
    }

    condition = todoquest.Q2;
    console.log("Your To-Do List:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.task} [${todo.category}]`);
    });
}



