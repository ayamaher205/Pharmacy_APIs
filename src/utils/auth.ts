import * as Jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => new Promise((resolve, reject) => {
    Jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            reject(err);
        } else {
            resolve(decoded);
        }
    });
});

const generateAccessToken = (userId:number, email: string) => {
    const token = Jwt.sign({ userId, email }, process.env.SECRET_KEY!, { expiresIn: "4h" });
    return token;
};
const generateRefreshToken = (userId:number, email: string) => {
    const refreshToken = Jwt.sign({ userId, email }, process.env.REFRESH_SECRET_KEY!, { expiresIn: "4d" });
    return refreshToken;
};

export default { verifyToken, generateAccessToken, generateRefreshToken };
