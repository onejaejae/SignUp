if(process.env.NODE_ENV === 'production'){ // 개발 환경이 배포 모드인 경우
    module.exports = require('./prod');
}else{ // 개발 환경이 로컬인 경우
    module.exports = require('./dev');
}