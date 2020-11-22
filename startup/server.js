const logger = require("../middleware/logger");

const port = process.env.PORT || 3000;

module.exports = function(app) {
    return app.listen(port, () => {
        logger.info(`App listening at http://localhost:${port}`);
    });
}