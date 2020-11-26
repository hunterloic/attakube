
const logger = require("../middleware/logger");

module.exports = function (req, res, next) {
    const { username } = { ...req.session };

    if(username == null || username == '') {
        res.render('error', { error: 'You need to log in'});
    } else {
        next();
    }
  }