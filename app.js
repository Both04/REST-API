const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const users = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@gamil.com"
    },
    {
        "id": 2,
        "name": "William Smith",
        "email": "will.smith@gamil.com"
    },
    {
        "id": 3,
        "name": "Jennifer Lee",
        "email": "jennifer.lee@gmail.com"
    }
];

app.get("/", (req, res) => {
	res.send("Hello World");
})

app.get("/api/users", (req, res) => {
    const result = {
        status:200,
        data: users
    }
    
    return res.json(result)
});

app.get("/api/users/:id", (req, res) => {
    let user = users.find(user => user.id === parseInt(req.params.id));
    if (!user)
        return res.status(400).json({ status: 400, message:"Not found user with the given id" });
    
    res.user = user;
    const result = {
        status: 200,
        data: res.user
    };
    return res.json(result);        
});

app.post("/api/users", (req, res) => {
    let user = {
        "id":users.length+1,
        "name":req.body.name,
        "email":req.body.email
    }
    users.push(user);
    const result = {
        status: 200,
        data: users
    }
    return res.json(result);
});

// app.put("/api/users:id", (req, res) => {
//     let user = users.find( (user) => user.id === parseInt(req.params.id))
//     if (!user)
//         return res.status(400).json({ status: 400, message:"Not found user with the given id" })
    
//     let user_index = users.findIndex( (user) => user.id === parseInt(req.params.id))

//     user = {
//         "id": user.id,
//         "name": req.body.name,
//         "email": req.body.email
//     }

//     users[user_index] = user

//     const result = {
//         "status": 200,
//         "data":user
//     }
//     return res.json(result)
// })

app.put("/api/users/:id", (req, res) => {
    let user = users.find(user => user.id === parseInt(req.params.id));
    if (!user)
        return res.status(400).json({ status: 400, message:"Not found user with the given id" });
    
    let user_index = users.findIndex( (user) => user.id === parseInt(req.params.id))
    user = {
                "id": user.id,
                "name": req.body.name,
                "email": req.body.email
            }

    users[user_index] = user
    const result = {
        status: 200,
        data: user
    };
    return res.json(result);        
});

app.delete("/api/users/:id", (req, res) => {
    let user = users.find(user => user.id === parseInt(req.params.id));
    if (!user)
        return res.status(400).json({ status: 400, message:"Not found user with the given id" });
    
    let user_index = users.findIndex( (user) => user.id === parseInt(req.params.id))
    users.pop(user_index);

    const result = {
        status: 200,
        data: user
    };
    return res.json(result);        
});

app.listen(3000, () => {
    console.log("running server http://localhost:3000")
});