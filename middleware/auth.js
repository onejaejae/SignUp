const { User } = require('../models/User');

let auth = (req, res, next) => {
     // 인증 처리 하는 곳
     
     // 클라이언트 쿠키에서 토큰을 가져온다.
      let token = req.cookies.x_auth;
    
     // 토큰을 복호화 한 후 유저를 찾는다.
     User.findByToken(token, (err, user)=>{
         if(err) throw err;
         if(!user) return res.json({
             isAuth : false,
             error : true
         })
        
         //  index 파일에 app.get('/api/users/auth') 함수에서 req.token과 req.user를 사용할 수 있도록 하기 위해서 값을 넣어줌
         req.token = token;
         req.user = user;

         //  app.get('/api/users/auth', auth, (req, res)=>{}) 에서 auth 미들웨어에서 다음으로 넘어가게 하기 위해 next()를 넣어줘야 함
         next();
     }) 
}

module.exports = { auth };