const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    res.body = parseBody;
    next();
    //
  } catch (err) {
    res.status(400).json({ message: err.errors[0].message });
  }
};

module.exports = validate;
