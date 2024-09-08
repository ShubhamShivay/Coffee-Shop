import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "3d",
    }
  );
};

export default generateToken;
