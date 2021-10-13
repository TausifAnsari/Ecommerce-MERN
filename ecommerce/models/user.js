const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32,
      },
      email: {
        type: String,
        trim: true,
        require: true,
        unique: 32,
      },
      hashed_password: {
        type: String,
        require: true,
      },
      about: {
          type: String,
          trim: true,
      },
      salt: String,
      role: {
          type: Number,
          default: 0,
      },
      history: {
          type: Array,
          default: [],
      }

}, {timestamps: true}
);

const encryptPassword = (password) => {
    if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
}

// virtual field 
// For creating a hashed password or encrypt the password using SHA1 Encryption Algorithm
userSchema.virtual('password')
.set((password) => {
    this._password = password;
    this.salt = uuid.v1();
    this.hashed_password = encryptPassword(password);
})
.get(() => {
    return this._password;
});

/*authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        },*/
userSchema.methods = {
        
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};
    
module.exports = mongoose.model('User', userSchema);