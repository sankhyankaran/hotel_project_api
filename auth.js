const Person = require("./models/person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//passport.js middleware authentication
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      // console.log("Received Credential :", `${USERNAME} ${PASSWORD}`);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect Password" });
      // comnpare bcrypt password
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
