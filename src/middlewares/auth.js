const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: {
                message: `Unauthorized.Please Send token in request header`,
            },
        });
    }
    try {

        const { email } = jwt.verify(
            req.headers.authorization.split(" ")[1],
            "your_secret_key_here"
        );

        // req.userId = userId;

        // const userValid = await userModel.findById(userId);
        console.log(email);
        // if (!userValid) {
        //     return res
        //         .status(401)
        //         .send({ error: { message: `Unauthorized user not valid` } });
        // }
        next();
    } catch (error) {
        return res
            .status(401)
            .send({
                error: { message: `Unauthorized server error ${(error, token)}` },
            });
    }
};