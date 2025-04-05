import passport from 'passport';
import {Strategy as LinkedInStrategy} from 'passport-facebook';


passport.use(new LinkedInStrategy({
    clientID: '1801515994027291',
    clientSecret: '9c9dfbbfe21fdceb9e3823fef67bc44c',
    callbackURL: 'https://localhost:8000/user/auth/facebook/callback'
}, function (token, tokenSecret, profile, done) {
      console.log(profile)
}));

export default passport;