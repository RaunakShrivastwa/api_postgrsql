import passport from 'passport';
import {OAuth2Strategy as GoogleAuthStratgey} from 'passport-google-oauth';
import crypto from 'crypto';
// import User  from '../model/User.js';

passport.use(new GoogleAuthStratgey({
    clientID: '351605689896-8s614l1e19e9k8lek1it5fe79q2gocgf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:4000/user/auth/google/callback'
},
function (accessToken, refreshToken, profile, done) {
    console.log(profile);
}
))
export default passport;
