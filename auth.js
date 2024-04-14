const Person = require("./models/person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//passport.js middleware authentication
passport.use(
  new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
      // console.log("Received Credential :", `${USERNAME} ${PASSWORD}`);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "INcorrect Password" });

      const isPasswordMatch = user.password === PASSWORD ? true : false;
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
