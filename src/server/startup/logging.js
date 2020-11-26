const logger = require("../middleware/logger");

module.exports = function() {
  
  //todo: handle unhandle rejections

  process.on('unhandledRejection', (ex) => {
    logger.error(ex)
  });
  
}