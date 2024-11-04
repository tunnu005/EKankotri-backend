export const sendToken = (user, res, message, statusCode) => {
    const token = user.generateToken();
    console.log('token generated  ',token);
  
    res
      .cookie("token", token, {
        ...cookieOptions,
        // httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      })
      .json({
        success: true,
        message: message,
        user:user,
        token:token
      });
  };

  export const cookieOptions = {
    secure: process.env.NODE_ENV === "Development" ? false : true,
    httpOnly: process.env.NODE_ENV === "Development" ? false : true,
    sameSite: process.env.NODE_ENV === "Development" ? false : "none",
  };