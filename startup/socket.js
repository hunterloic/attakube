const socket = require("socket.io");
const logger = require("../middleware/logger");

module.exports = function(server) {
    const io = socket(server);
    
    io.on("connection", function (socket) {
      logger.info("connected");
    
      socket.on("disconnect", function () {
        logger.info("DISCONNECTED");
      });
    });
}