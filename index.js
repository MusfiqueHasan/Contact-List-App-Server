const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// todoList, HCEFDWSO0FWfrP1X

const uri = "mongodb+srv://todoList:HCEFDWSO0FWfrP1X@cluster0.xjofx.mongodb.net/contacts?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // connectDb()
        await client.connect();
        const database = client.db("contacts");
        const userCollection = database.collection("users");

        //   Get user api
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray()
            res.send(users)
        })
        // Get single user api
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.findOne(query)
            res.send(user)
        })

        // post user api
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser)
            console.log(result)
            res.json(result)
        })

        // update user api
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { update: true }
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    phone: updatedUser.phone,
                    email: updatedUser.email,
                    desc: updatedUser.desc,
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })

        // delete user api
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.json(result)

        })

        // app.get('/users/:loggedInUserEmail', async (req, res) => {
        //     const loggedInUserEmail = req.params.loggedInUserEmail
        //     // console.log(loggedInUserEmail)
        //     try {
        //         const user = await Users.findOne({ email: loggedInUserEmail })
        //         if (user) {
        //             console.log(user)
        //             const userList = user.userList
        //             res.status(200).send({userList})

        //         } else {
        //             res.status(404).send('user not find')
        //         }
        //     } catch (error) {
        //         res.status(404).send('user not find')
        //     }
        // })

        // registration api

        // app.post('/registration', async (req, res) => {
        //     // const newUser = req.body;
        //     const { name, email, password } = req.body
        //     const user = new Users({
        //         name,
        //         email,
        //         password
        //     })
        //     try {
        //         await user.save()
        //             .then(data => {
        //                 res.status(200).json({ data })
        //             })
        //             .catch(err => res.status(400).json(" user does not create"))
        //     } catch (error) {
        //         res.status(400).json("user does not create")
        //     }

        // })
        // addContact api
        // app.post('/addContact', async (req, res) => {
        //     // const newUser = req.body;
        //     const { newUser, savedData } = req.body
        //     const loggedInUserEmail = Object.keys(savedData)[0]

        //     try {
        //         const user = await Users.findOne({ email: loggedInUserEmail })
        //         if (user) {

        //             const existingEmail = user.userList.filter(useItem => useItem.email === newUser.email)
        //             if (existingEmail.length === 0) {
        //                 await Users.findOneAndUpdate({ email: loggedInUserEmail }, { $push: { userList: newUser } })
        //                     .then(data => console.log(data))
        //                 res.status(200).send({ user })

        //             } else {
        //                 console.log('user already exist in the contact list ')
        //                 res.status(404).send('user already exist in the contact list ')
        //             }

        //         } else {
        //             res.status(404).send('user not find')
        //         }
        //     } catch (error) {
        //         res.status(404).send('user not find')
        //     }

        // })
        // log in api
        // app.post('/login', async (req, res) => {
        //     const { email, password } = req.body

        //     try {
        //         const user = await Users.findOne({ email })
        //         if (user.email === email && user.password === password) {

        //             res.status(200).send({ user })
        //         } else {
        //             res.status(404).send('user not find')
        //         }
        //     } catch (error) {
        //         res.status(404).send('user not find')
        //     }

        // })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log('server running at port', port)
})