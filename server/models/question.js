const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Question title is required']
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    tags: {
        type: Array
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture:{
        type: String
    },
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes:[{type: Schema.Types.ObjectId, ref: 'User'}]
},{timestamps: true})


const Question = mongoose.model('Question', questionSchema)

module.exports = Question