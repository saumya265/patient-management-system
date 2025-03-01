const loggerMiddleware = (req, res, next) => {
    console.log('[${new Date().toISOString()}] ${req.method} ${req.url} (${req.user?.role || })');
    next();
  };
  
  module.exports = loggerMiddleware;