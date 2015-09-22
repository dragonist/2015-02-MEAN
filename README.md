# 2015-02-MEAN
DB_Adv Project

## Service abstraction
- 간단한 게시판 서비스  

## SW functions
- 회원가입, 로그인 하기
- 게시판 & 댓글 구현하기 (1:N)관계 유지
- Sharding 하기

## Operation and Development Env.
- Language : Javascript, NoSQL(mongo)
- Framework : Node, Express, Mongo
- operation Env. : Ubuntu 12.04.5 LTS (GNU/Linux 3.2.0-35-generic x86_64)
- development Env  : Nodejs v0.12.7, Javascript, MongoDb 3.0.5

## Rough data model
````
var user = new Schema({
	email: String,
	password: String,
	fullname: String
});


var post = new Schema({
	title: String,
	content: String,
	author: String,
	postedAt: { type: Date, default: Date.now }
});


var comment = new Schema({
	content: String,
	author: String,
	postedAt: { type: Date, default: Date.now },
	post_id: Schema.Types.ObjectId
})
````
## Schedule
1. 게시판 댓글 기능 넣기
2. 회원가입 로그인 기능 추가하기
3. 샤딩 master slave
4. 마무리 및 시연
