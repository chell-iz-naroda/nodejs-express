const express = require("express");

const ctrl = require("../../controllers/auth");

const {validate, authenticate, upload} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validate.validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validate.validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

// signin
router.post("/login", validate.validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validate.validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), validate.validateFile(), ctrl.updateAvatar);
module.exports = router;