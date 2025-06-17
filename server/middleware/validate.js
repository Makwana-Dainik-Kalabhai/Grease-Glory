const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    res.body = parseBody;
    next();
    //
  } catch (err) {
    console.error(err.errors[0].message);
    res.status(400).send(err.errors[0].message);
  }
};

module.exports = validate;
