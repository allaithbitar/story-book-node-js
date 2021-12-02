import { RequestHandler } from "express";

export const ensureAuth: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  next();
};

export const ensureGuest: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  } else return next();
};
