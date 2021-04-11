const Joi = require("joi");
const { formatError } = require("../utils/respFormat");

const addPostValidationObject = {
    title: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(3).max(30).required(),
    topic: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(30).required(),
    content: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(250).required(),
}
const udpatePostValidationObject = { post_id: Joi.number().min(-1).required() };

const addPostSchema = Joi.object(addPostValidationObject);
const updatePostSchema = Joi.object(Object.assign(udpatePostValidationObject, addPostValidationObject));

const addCommentSchema = Joi.object({
    content: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(250).required(),
    post_id: Joi.number().min(0).required(),
});
const updateCommentSchema = Joi.object({
    content: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(250).required(),
    comment_id: Joi.number().min(0).required(),
});

const accountSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}$")),
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(3).max(30),
});

// Attempts to use schema mapped to method + url, request will go through with no validation if not present
const schemas = {
    'POST/post': addPostSchema,
    'PUT/post': updatePostSchema,
    'POST/comment': addCommentSchema,
    'PUT/comment': updateCommentSchema,
    'POST/account': accountSchema,
    'POST/login': loginSchema,
}

// Custom error message will be used insted of the default Joi ones if found in this object. When a 
// validation error occurs, the only the fields with invalid values will have the error message.
const customErrorMessage = {
    'POST/login': {
        email: "Must be a valid email address, for example test@forum.com",
        password: "Password must be have a eight to thirty characters with at least one letter, one number, and one special character",
    },
    'POST/account': {
        email: "Must be a valid email address, for example test@forum.com",
        password: "Password must be have a eight to thirty characters with at least one letter, one number, and one special character",
    },
}

function dataValidator(req, res, next) {
    const index = [req.method, req.path].join('');

    if (!(index in schemas)) {
        console.log("No schema found for given base url and method:", index);
        return next();
    }

    const { error } = schemas[index].validate(req.body);

    if (error) {
        let message = error.details[0].message; // Just using the first details object for now
        let errorPath = error.details[0].path;

        if (index in customErrorMessage && errorPath in customErrorMessage[index])
            message = {
                [errorPath]: customErrorMessage[index][errorPath]
            };

        console.log("Invalid data for", [req.method, req.path], message);
        return res.status(400).json(formatError(message));
    }

    next();
}

module.exports = dataValidator;