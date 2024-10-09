import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_todolist_fullstack"
})

app.use(express.json());
app.use(cors());

app.listen(8800, () => {
    console.log("connected to backend.")
})


// Get All todo list
app.get("/all", (req, res) => {
    const q = "SELECT * FROM tbl_todo_list"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else
        {
            return res.json(data);
        }
    })
})

// Get a specific todo item
app.get("/todo/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM tbl_todo_list WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.send(err);
        }
        else
        {
            return res.json(data);
        }
    })
})


// add an item
app.post("/todo", (req, res) => {
    const q = "INSERT INTO tbl_todo_list (`title`, `desc`) VALUES (?)";
    
    const values = [
        req.body.title,
        req.body.desc,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.send(err);
        }
        else
        {
            return res.json(data);
        }
    })
})


// delete an item
app.delete("/todo/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM tbl_todo_list WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.send(err);
        }
        else
        {
            return res.json(data);
        }
    })
})


// update an item
app.put("/todo/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE tbl_todo_list SET `title`=?, `desc`= ? WHERE id=?";

    const values = [
        req.body.title,
        req.body.desc
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) {
            return res.send(err);
        }
        else
        {
            return res.json(data);
        }
    })
})