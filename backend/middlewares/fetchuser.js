const jwt = require('jsonwebtoken');
const JWT_SECRET = "IamBatman";

const fetchuser =(req,res,next)=>{
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ errors: ["Access denied. No token provided."] });
    }

    try {
        const decodedData = jwt.verify(token,JWT_SECRET);
        req.user = decodedData.userId; // Attach userId to request
        next();
    } catch (err) {
        res
          .status(400)
          .json({ message: "Some Error Occured", error: err.message });
      }
}

module.exports = fetchuser;