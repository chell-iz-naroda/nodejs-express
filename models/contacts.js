const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  }
}, { versionKey: false, timestamps: true });

contactsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema
}

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
  schemas
}
