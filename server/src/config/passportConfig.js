import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envConfig } from "./envConfig.js";
import prisma from "../lib/db.js";
import { ForbiddenExceptions } from "../utils/app.error.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: envConfig.GOOGLE_CONFIG.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CONFIG.GOOGLE_CLIENT_SECRETS,
      callbackURL: "/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const name = profile.displayName;

        const getUser = await prisma.user.findUnique({
          where: { google_id: googleId },
        });

        if (getUser)
          throw new ForbiddenExceptions("User already Register With Google");

        const createUser = prisma.user.create({
          data: {
            email: email,
            google_id: googleId,
            displayName: name,
          },
        });

        return done(null, createUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const res = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, res);
  } catch (error) {
    done(error, null);
  }
});
