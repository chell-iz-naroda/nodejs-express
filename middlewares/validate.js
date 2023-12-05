const { HttpError } = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            next(HttpError(400, error.message));
        }
        next()
    }

    return func;
}

const validateFile = () => {
    const func = (req, res, next) => {
        if (req.file === undefined) {
            next(HttpError(400, "Avatar is required. Please select file"));
        }
        next()
    }

    return func;
}
const validate = {
    validateFile,
    validateBody
};


module.exports = validate;