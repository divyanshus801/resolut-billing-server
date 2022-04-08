const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
fullName : {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
}, 
email: {
    type: String,
    required: true,
    trim: true,
    unique: true
},
role: {
    type: String,
    enum: ['user','admin'],
    default: 'admin'
},
hash_password: {
    type: String,
    required: true,
    trim: true
}

},{timestamps: true})

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password);
    }
};

module.exports = mongoose.model('User',userSchema);