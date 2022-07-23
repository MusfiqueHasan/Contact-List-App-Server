const mongoose = require('mongoose')

const uri = "mongodb+srv://todoList:HCEFDWSO0FWfrP1X@cluster0.xjofx.mongodb.net/contacts?retryWrites=true&w=majority";
const connectDb = async () => {

    mongoose.connect(uri)
        .then(() => { console.log(" mongodb connected") })
        .catch(err => console.log(err))
}
module.exports = connectDb 