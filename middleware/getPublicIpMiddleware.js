const axios = require('axios');

// Middleware to retrieve the public IP address using ipinfo.io
const getPublicIpMiddleware = async (req, res, next) => {
  try {
    const response = await axios.get('https://ipinfo.io/ip');
    req.publicIp = response.data.trim(); // Trim to remove any whitespace
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving public IP');
  }
};


exports.getPublicIpMiddleware = getPublicIpMiddleware;
