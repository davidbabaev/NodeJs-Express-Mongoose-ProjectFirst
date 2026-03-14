const passport = require('passport');
// give me the whole package, then gran just .Strategy from it
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../users/models/User');
const {generateUserPassword} = require('../users/helpers/bcrypt');
const crypto = require('crypto');