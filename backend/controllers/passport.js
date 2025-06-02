// backend/config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email,
        password: '',
        isAccountVerified: true,
        googleId: profile.id,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      });
    } else {
      user.googleAccessToken = accessToken;
      user.googleRefreshToken = refreshToken;
      user.googleId = profile.id;
      await user.save();
    }
    return done(null, user); // ✅ Pass full user object
  } catch (err) {
    return done(err, null);
  }
}));
