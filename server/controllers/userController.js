const bcrypt = require("bcrypt");
const { signUpRequest, getUserRequest, logoutRequest, updateDeviceDetails, getUserSafe, getAllConnectionsRquest, addRefreshToken, endConnectionRequest, endAllConnectionRequest } = require("../services/userService")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const { accessTokenExpires, refreshTokenExpires } = require("../config.json")

const userCtrl = {
    async signup({ body }, res, next) {
        try {
            body.password = await bcrypt.hash(body.password, 10)
            body.role = "user";
            await signUpRequest(body)

            res.status(201).send("user created successfully");
        }
        catch (error) {
            if (error.errno == 1062) {
                return res.status(409).json({ msg: "user already exist", error });
            }
            res.status(500).send({ msg: "ther is error", error });
        }
    },
    async login({ body }, res, next) {
        try {
            const user = await getUserRequest(body);
            if (!user) return next({ message: "user not found", status: 404 })
            const isCorrect = await bcrypt.compare(body.password, user.password)

            if (!isCorrect) return next({ status: 401, message: "incorrect password" })

            const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: accessTokenExpires });
            const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: refreshTokenExpires });
            res.cookie("accessCookie", "bearer " + accessToken, { sameSite: "None", secure: true })
            res.cookie("refreshCookie", "bearer " + refreshToken, { httpOnly: true, sameSite: "None", secure: true })

            const tokenId = await addRefreshToken({ id: user.id, token: refreshToken })
            await updateDeviceDetails(body, tokenId)
            delete user.password;
            res.status(200).json({ message: "user logged in", user })
        } catch (error) {
            next({ msg: "internal error", stack: error })
        }
    },
    async showAllConnections(req, res, next) {
        try {
            const connections = await getAllConnectionsRquest(req.user.id);
            res.status(200).json(connections)
        } catch (error) {
            next({ msg: "internal error", stack: error });
        }

    },
    async logout(req, res, next) {
        try {
            const refreshCookie = req.cookies.refreshCookie
            const refreshToken = refreshCookie.split(" ")[1];
            const resp = await logoutRequest(refreshToken);
            res.cookie("accessCookie", "", { expires: new Date(0) })
            res.cookie("refreshCookie", "", { expires: new Date(0) })
            return res.status(200).send("user logged out successfully")
        } catch (error) {
            next({ msg: "internal error", stack: error })
        }
    },
    async checkConnection(req, res, next) {
        try {
            const user = await getUserSafe(req.user.id);
            delete user.password
            res.status(200).json({ message: "user connected", user })
        } catch (error) {
            next({ msg: "internal error", stack: error })
        }

    },
    async endConnection(req, res, next) {
        try {
            await endConnectionRequest(req.query.id)
            next();
        } catch (error) {
            next({ msg: "internal error", stack: error })
        }

    },

    async endAllConnectios(req, res, next) {
        try {
            await endAllConnectionRequest(req.user.id)
            next();
        } catch (error) {
            next({ msg: "internal error", stack: error })
        }

    },


}


module.exports = userCtrl


