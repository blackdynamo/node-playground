var Pipeline = require("./pipeline");

module.exports = function (context, next) {
    new Pipeline(context)
        .execute(function(err, context){
            if(err) return next(err);

            next();
        });
};