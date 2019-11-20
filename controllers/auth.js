const authService = require("services/auth");
const catchAsync = require("utils/catchAsync");
const JWT_SECRET = require("my_settings");

exports.signup = catchAsync(async (req, res, next) => {
    const result = await authService.signup(req, res);

    if (result === "FILL_ALL_INPUTS") {
        return next({ message: "FILL ALL INPUTS", statusCode: 400 });
    }

    if (result === "EMAIL_ALREADY_EXISTS") {
        return next({ message: "EMAIL ALREADY EXISTS", statusCode: 400 });
    }

    res.status(200).json({
        status: "SUCCESS",
        message: "SUCCESSFULLY CREATED USER"
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const result = await authService.login(req, res, next);

    if (result === "NO_EMAIL_PASSWORD") {
        return next({ message: "INSERT EMAIL AND PASSWORD", statusCode: 401 });
    }

    if (result === "INCORRECT_EMAIL_PASSWORD") {
        return next({ message: "INCORRECT EMAIL OR PASSWORD", statusCode: 401 });
    }

    res.status(200).json({ token: result });
});

exports.loginRequired = catchAsync(async (req, res, next) => {
    const result = await authService.loginRequired(req, res, next);

    if (result === "USER_NOT_LOGGEDIN") {
        return next({ message: "USER NOT LOGGED IN", statusCode: 401 });
    }

    if (result === "USER_DOES_NOT_EXIST") {
        return next({ message: "USER DOES NOT EXIST", statusCode: 401 });
    }
});
