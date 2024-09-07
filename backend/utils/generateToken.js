import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign(
    {
      _id: payload._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "3d",
    }
  );
};

export default generateToken;
