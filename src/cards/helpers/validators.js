const EMAIL = {
    type: String,
    required: true,
    match: RegExp(/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?<!\.)@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/),
    trim: true,
    unique: true,
};

const URL = {
    type: String,
    required: true,
    match: RegExp(/^(https?:\/\/)(localhost|((?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?$/),
    trim: true,
};

const NUMBER = {
    type: Number,
    min: 0,
    required: true,
};

const DEFAULT_VALIDATOR = {
    type: String,
    minLength: 2,
    maxLength: 288,
    required: true,
    trim: true,
    lowercase: true,
};

module.exports = {EMAIL, URL, NUMBER, DEFAULT_VALIDATOR}