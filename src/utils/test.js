const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
require('dotenv').config();

passport.use(new SamlStrategy(
  {
    entryPoint: process.env.SAML_ENTRY_POINT,  // Okta SAML Login URL
    issuer: process.env.SAML_ISSUER,          // Your Entity ID
    callbackUrl: process.env.SAML_CALLBACK,   // ACS URL (Your backend SAML callback)
    cert: process.env.SAML_CERT,              // Okta Certificate
    passReqToCallback: true
  },
  (req, profile, done) => {
    console.log("SAML Profile:", profile);
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;