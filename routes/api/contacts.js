const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validate, isValidId, authenticate, isOwnerContact} = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts)

router.get('/:contactId', authenticate, isValidId, isOwnerContact, ctrl.getContactById)

router.post('/', authenticate, validate.validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', authenticate, isValidId, isOwnerContact, ctrl.removeContact)

router.put('/:contactId', authenticate, isValidId, isOwnerContact, validate.validateBody(schemas.addSchema), ctrl.updateContact)

router.patch("/:contactId/favorite", authenticate, isValidId, isOwnerContact, validate.validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
