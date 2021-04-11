const Joi = require("joi");
const { formatError } = require("../utils/respFormat");

const postValidationObject = {
    title: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(3).max(30).required(),
    topic: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(30).required(),
    content: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(250).required(),
}
const udpatePostValidationObject = { post_id: Joi.number().min(-1).required() };

const addPostSchema = Joi.object(postValidationObject);
const updatePostSchema = Joi.object(Object.assign(udpatePostValidationObject, postValidationObject));

const addCommentSchema = Joi.object({
    content: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(250).required(),
    post_id: Joi.number().min(0).required(),
});
const updateCommentSchema = Joi.object({
    content: Joi.string().regex(/^[a-zA-Z0-9 ?!.#]*$/).min(1).max(250).required(),
    comment_id: Joi.number().min(0).required(),
});

const accountSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$")).min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
});

const loginSchema = Joi.object({
    password: Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
});

const schemas = {
    'POST/post': addPostSchema,
    'PUT/post': updatePostSchema,
    'POST/comment': addCommentSchema,
    'PUT/comment': updateCommentSchema,
    'POST/account': accountSchema,
    'POST/login': loginSchema,
}

const customErrorMessage = {
    'POST/login': "Minimum eight characters, max thirty characters, at least one letter, one number, and one special character:",
}

function dataValidator(req, res, next) {
    const index = [req.method, req.originalUrl].join('');

    if (!(index in schemas)) {
        console.log("No schema found for given base url and method:", index);
        return next();
    }

    const { error, value } = schemas[index].validate(req.body);

    console.log(value);

    if (error) {
        let message = error.details[0].message; // Just using the first details object for now

        if (index in customErrorMessage)
            message = customErrorMessage[index];

        console.log("Invalid data for", [req.method, req.originalUrl], message);
        return res.status(400).send(formatError(message));
    }

    next();
}

module.exports = dataValidator;