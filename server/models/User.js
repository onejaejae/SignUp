const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // 암호화할 비밀번호 자리수
const jwt =  require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //  공백을 제거한다
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// index.js 파일에 user.save가 실행되기전 실행하고 next를 통해 user.save가 후에 실행
userSchema.pre("save", function (next) {
  var user = this; // this는 index.js파일에 user를 가리킨다

  // password가 변경될때, 혹은 새로 회원가입할때만 실행되도록
  // isModified 메서드는 새로 생성일 경우엔 true이다
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // index.js 파일에 user.save에 if(err)로 들어감.

      // user.password는 원래 비밀번호(즉, 암호화 되지 않은 비밀번호)
      // hash는 암호화된 비밀번호
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }else {
      next();
  }
});

userSchema.methods.comparePassword = function(plainpassword, callbackfunction){
    // plainpassword와 데이터베이스에 있는 암호화된 password를 비교해야함
    // 그러기 위해서는 plainpassword도 암호화한 다음에 데이터베이스에 있는 password와 비교해야함
    // 왜냐하면 데이터베이스에 있는 암호화된 비밀번호를 복구화 할 수 없기 때문
    // 이것을 구하기 위해서는 bcrypr.compare 메서드를 사용한다

    bcrypt.compare(plainpassword, this.password, function(err, isMatch){
       
        // 비밀번호가 다르다면
        // callbackfunction에 err를 넣어 return
        if(err) return callbackfunction(err);

        // 비밀번호가 같다면
        // isMatch는 true값임, err는 없으므로 unll값을 넣는다
        callbackfunction(null, isMatch);
    }) 
}

userSchema.methods.generateToken = function(cd){
    
    var user = this;
    
    // jsonwebtoken을 이용해서 token 생성하기
    // user._id + secretToken = token
    // secretToken을 알아야 user의 id를 알 수 있다
    // 그러므로 secretToken을 기억해야 한다

    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err){
            return cd(err);
        }
        cd(null, user);
    })
    
}

userSchema.statics.findByToken = function(token, cd){
  var user = this;

  //  토큰을 decode 한다.
  //  콜백함수의 매개변수인 decoded는 token을 decode한 user의 id값이 나온다
  //  token을 구성할 때 user._id + secretToken으로 하였으므로
  // 즉, jwt.sign(user._id.toHexString(), 'secretToken')에서 secretToken을 이용해 user._id의 값을 알아낼 수 있다
  jwt.verify(token, 'secretToken', function(err, decoded){
    // 유저 아이디를 이용해서 유저를 찾은 다음에 
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id" : decoded, "token" : token}, function(err, user){
      if(err){
        return cd(err);
      }
      cd(null, user);
    })
  } )

}

const User = mongoose.model("User", userSchema);

module.exports = { User };
