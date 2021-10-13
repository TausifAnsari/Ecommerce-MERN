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

// virtual field 
// For creating a hashed password or encrypt the password using SHA1 Encryption Algorithm
userSchema
    .virtual('password')
    .set((password) => {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    });

userSchema.methods = {
        /*authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        },*/
    
        encryptPassword: (password) => {
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