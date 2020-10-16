const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// app에 mongodb 연결하기
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI , {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify : false
})
.then(() => console.log("Mongoose Connected"))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello world');
})

// 회원가입  기능 구현
app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err){
            return res.json({ success : false, err});
        }
        return res.status(200).json({
            success : true
        });
    })
  
})

//  로그인 기능 구현
app.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다
    User.findOne({ email : req.body.email }, (err, user) => { // email의 값이 req.body.email와 같다면 user에는 검색 결과의 단 하나의 객체가 들어있다.
        // 요청된 이메일이 데이터베이스에 없다면
        if(!user){
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는  유저가 없습니다"
            })
        }

        //  요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
        // comparePassword 메서드는 user.js 파일에서 만든다
        user.comparePassword(req.body.passsword, (err, isMatch) => {
            console.log(isMatch);
            // 비밀번호가 다르다면
            if(!isMatch){
                return res.json({
                    loginSuccess : false,
                    message : "비밀번호가 틀렸습니다"
                })
            }

            // 비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if(err){
                    return res.status(400).send(err);
                }

                // 토큰을 저장한다 어디에? 쿠키, 로컬스토리지
                // 여기서는 쿠키에 저장한다
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId : user._id
                })
            })
        })
    })
})


app.listen(port, () => { console.log(`app listening on port ${port}`)});


