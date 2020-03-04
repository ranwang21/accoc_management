const ErrorResponse = require('../utils/ErrorResponse')
const Role = require('../models/Role')

// @desc     Get all roles
// @route    GET /roles
// @access   Private
exports.getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find()
    res.status(200).json(roles)
  } catch (err) {
    next(err)
  }
}

// @desc    Get single role
// @route   GET /routes/:id
// @access  Private
exports.getRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id)

    if (!role) {
      return next(
        new ErrorResponse(`Role not found with ID: ${req.params.id}`, 404)
      )
    }

    res.status(200).json(role)
  } catch (err) {
    next(err)
  }
}

// @desc    Create new role
// @route   POST /routes
// @access  Private
exports.createRole = async (req, res, next) => {
  try {
    const role = await Role.create(req.body)
    res.status(201).json(role)
  } catch (err) {
    next(err)
  }
}

// @desc    Update role
// @route   PUT /routes/:id
// @access  Private
exports.updateRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!role) {
      return next(
        new ErrorResponse(`Role not found with ID: ${req.params.id}`, 404)
      )
    }

    res.status(200).json(role)
  } catch (err) {
    next(err)
  }
}

// @desc    Delete role
// @route   DELETE /routes/:id
// @access  Private
exports.deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id)

    if (!role) {
      return next(
        new ErrorResponse(`Role not found with ID: ${req.params.id}`, 404)
      )
    }

    res.status(200).json(role)
  } catch (err) {
    next(err)
  }
}
