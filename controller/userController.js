const getAll = async (req, res, next) => {
  return res.status(200).json({ msg: "hello there" });
};

export default { getAll };
