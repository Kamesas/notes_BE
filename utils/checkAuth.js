import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secretUserId");

      req.userId = decoded._id;
      next();
    } catch (error) {
      res.status(403).json({ message: "User id not found !!!!" });
    }
  } else {
    return res.status(403).json({ message: "Not found token !" });
  }
};
