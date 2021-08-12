export const userSignupValidator = (req, res, next) => {
  req.check("name", "name is required").notEmpty();
  req
    .check("email", "email must be more than 3 charachters less than 32")
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage("email must be valid")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "password is required").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6,
    })
    .withMessage("password must be more than 6 charachters ")
    .matches(/\d/)
    .withMessage("password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
