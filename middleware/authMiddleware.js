import { verifyToken } from "../utils/jwt.js";

const isAuthenticated = (request, response, next) => {
  try {
    const token = request.cookies.accessToken;
    if (!token) throw new Error("Token not provided");

    const decoded = verifyToken(token);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      data: null,
      message: "Authentication failed",
    });
  }
};

const isAuthorizedUser = (roles) => {
  return (request, response, next) => {
    const userRole = request.user.role;
    if (!roles.includes(userRole)) {
      return response
        .status(403)
        .json({ success: false, data: null, error: "Forbidden" });
    }
    if (request.user.isApproved === false) {
      return response
        .status(403)
        .json({
          success: false,
          data: null,
          error: "The admin did not accept you yet",
        });
    }
    next();
  };
};

export { isAuthenticated, isAuthorizedUser };
