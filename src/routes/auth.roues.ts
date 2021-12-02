import { Request, RequestHandler, Response, Router } from "express";
import passport from "passport";

const authRouter = Router();

//@desc Auth With Google
//@route GET /auth/google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

//@desc Google Auth Callback
//@route GET /auth/google/callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req: Request, res: Response) => {
    res.redirect("/dashboard");
  }
);

export default authRouter;

//@desc Logout user
//@route /auth/logout
authRouter.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
});
