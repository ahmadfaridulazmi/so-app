const JoiError = require('joi/lib/errors').ValidationError;
const { ApplicationError } = require('../../utils/errors');

exports.exists = (Model, label = '', column = 'id') => {
    return async (value) => {
        let records = null;
        if (Array.isArray(value)) {
            records = await Model.query().whereIn(column, value).whereNull('deleted_at');
            let difference = value.filter(val => !records.includes(val));
            if (difference.length) {
                throw new JoiError('Error, something went wrong', [{
                    message: `resource "${difference.toString()}" don't exist in relation ${Model.name}`,
                    type: 'any.exist',
                    context: {
                        label: label,
                        value: value,
                        key: label
                    }
                }]);
            }
        } else {
            records = await Model.query().findOne(column, value).whereNull('deleted_at');
            if (!records) {
                throw new JoiError('Error, something went wrong', [{
                    message: `resource "${value}" doesn't exist in relation ${Model.name}`,
                    type: 'any.exist',
                    context: {
                        label: label,
                        value: value,
                        key: label
                    }
                }]);
            }
        }
    };
};

exports.validator = async (schema, body, queryParams = false) => {
    try {
        return await schema.schema().validateAsync(body, { abortEarly: false });
    } catch (e) {
        let error = e.details;
        let errorArray = [];
        let existsNot = error[0].type === 'any.exist';
        error.map(error => {
            errorArray.push({
                code: 10001,
                title: existsNot ? 'Resource Not Found' : 'Validation Error',
                source: queryParams ?
                    { source: { parameter: error.context.key } }
                    : { pointer: error.context.key },
                details: error.message
            });
        });
        let errorCode = existsNot ? 404 : 400;
        throw new ApplicationError(errorArray, 10001, errorCode);
    }
};
