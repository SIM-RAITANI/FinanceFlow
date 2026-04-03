import { body, validationResult } from 'express-validator';


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    status: 'fail',
    errors: extractedErrors,
  });
};


export const registerValidationRules = () => {
  return [
    body('username').notEmpty().withMessage('Username is required').trim(),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ];
};


export const recordValidationRules = () => {
  return [
    body('amount').isNumeric().withMessage('Amount must be a number').custom(value => value > 0).withMessage('Amount must be greater than 0'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be either income or expense'),
    body('category').notEmpty().withMessage('Category is required').trim(),
    body('date').optional().isISO8601().withMessage('Please provide a valid date'),
  ];
};

export { validate };