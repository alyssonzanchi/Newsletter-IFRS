const mongoose = require('mongoose')

const Mail = mongoose.model('Mail', {
    email: String
})

module.exports = Mail
