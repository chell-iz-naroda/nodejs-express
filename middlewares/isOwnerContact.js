const {Contact} = require("../models/contacts")
const {HttpError} = require("../helpers");

const isOwnerContact = async (req, res, next) => {
    const {contactId} = req.params;
    const {_id: owner} = req.user;

    const result = await Contact.findById(contactId);

    console.log(owner.toString() === result.owner.toString());
    if(owner.toString() !== result.owner.toString()) {
        next(HttpError(404 , `Not found`))
    }
    next();
}

module.exports = isOwnerContact;