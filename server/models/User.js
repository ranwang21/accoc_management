const mongoose = require('mongoose')
const Login = require('./Login')

const UserSchema = new mongoose.Schema({
  id_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  id_child: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  id_parent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  id_collaborater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  id_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  sex: {
    type: String,
    trim: true,
    enum: ['male', 'female', 'non-binary']
  },
  address: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  has_child: Boolean,
  is_subscribed: Boolean,
  contact: [
    {
      title: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      }
    }
  ],
  membership: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  expectation: {
    type: String,
    trim: true
  },
  need: {
    type: String,
    trim: true
  },
  involvement: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  comment: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  motivation: {
    type: String,
    trim: true
  },
  availability: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Day'
    }
  ],
  question: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  interest: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  school_info: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  medical_info: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  authorization: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// CASCADE DELETE LOGIN WHEN USER IS DELETED
UserSchema.post('remove', async (doc, next) => {
  await Login.deleteMany({ id_user: doc._id })
  next()
})

module.exports = mongoose.model('User', UserSchema)
