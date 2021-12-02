import { Profile, Strategy as googleStrategy } from "passport-google-oauth20";
import User from "../models/user.model";
import passport, { PassportStatic } from "passport";

export default function (passport: PassportStatic) {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          // @ts-ignore: Object is possibly 'null'
          image: profile.photos[0] ? profile.photos[0].value : "alt",
        };
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (!user) {
            return User.create(newUser);
          }
          if (user) {
            return done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
}

passport.serializeUser((user: any, done) => {
  done(null, user.id!);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err: any, user: any) => done(err, user));
});
