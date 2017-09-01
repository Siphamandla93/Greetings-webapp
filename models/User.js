var mongoose = require('mongoose');
module.exports = function(MongoUrl){
mongoose.connect(MongoUrl);
//creating a Schema
  var UserSchema = mongoose.Schema({
    name:String,
    counter:Number
  });

UserSchema.index({name:1}, {unique:true});
  var User = mongoose.model('User', UserSchema);

return {User}
};
