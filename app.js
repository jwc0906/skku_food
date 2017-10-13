var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//port setup
app.set('port', process.env.PORT || 9000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//route

app.get("/keyboard", (req,res)=>{
        const menu = {
                type: 'buttons',
                buttons: ["성대생 5년차의 추천", "모든 주변가게 리스트"]
        };

        res.set({
                'content-type': 'application/json'
        }).send(JSON.stringify(menu));
})

app.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    var result_txt=""
    var result_button=[]
    var message=""
    var ch=1
    console.log(req.body.content)

    if(req.body.content=="처음으로"){
	result_txt="<성대먹거리>\n직접 발로뛰어 258개의 음식점을 정리했습니다.\n(Update: 2017/10/11)"
	result_button=["성대생 5년차의 추천", "모든 주변가게 리스트"]
	ch=1	
    }
    else if(req.body.content=="성대생 5년차의 추천"){
	result_txt="어떤 상황인데?"
 	result_button=["해장!!", "점심", "저녁", "술자리"]
	ch=1
    }
    else if(req.body.content=="모든 주변가게 리스트"){
	result_txt="어떤 종류?"
    	result_button=["식사류", "분식/인스턴트/도시락", "고기(구이)", "치킨/피자", "야식/회/술", "포차/술"]
	ch=1
    }
    else{
	if(req.body.content=="해장!!" || req.body.content=="다시 추천받기(해장!!)"){
		var list_a=["밀알 전복 순대국", "진국", "생각나는 순대국", "할매순대국", "백령도 바지락 칼국수", "청진동 해장국", "낮것상 칼국수"]
		n1=Math.floor(Math.random()*(list_a.length))
		while(1){
			n2=Math.floor(Math.random()*(list_a.length))
			if(n1!=n2){break;}
		}
		result_txt="[해장!!]\n -"+list_a[n1]+"\n -"+list_a[n2]
		result_button=["다시 추천받기(해장!!)", "처음으로"]
		ch=1
	}
        else if(req.body.content=="점심" || req.body.content=="다시 추천받기(점심)"){
                var list_b=["생각나는 순대국", "밀알", "보영만두","성대밥상","한두야","베트남쌀국수","낮것상칼국수","예국향","고씨네","본찌돈까스","왕돈까스","이라면","명동돈까스","매콤돈까스칡불냉면","고아사 밥","미가라멘","콩마을","백령도 바지락칼국수","찌개지존", "GGgo"]
		n1=Math.floor(Math.random()*(list_b.length))
                while(1){
                        n2=Math.floor(Math.random()*(list_b.length))
                        if(n1!=n2){break;}
                }

		result_txt="[점심]\n -"+list_b[n1]+"\n -"+list_b[n2]
                result_button=["다시 추천받기(점심)", "처음으로"]
        	ch=1
	}
        else if(req.body.content=="저녁" || req.body.content=="다시 추천받기(저녁)"){
		list_c=["보영만두","성대밥상","한두야","베트남쌀국수","낮것상칼국수","예국향","일미닭갈비","고씨네","본찌돈까스","왕돈까스","이라면","명동돈까스","매콤돈까스칡불냉면","고아사 밥","미가라멘","콩마을","백령도 바지락칼국수","찌개지존","월매랑 삼겹이랑", "성대 찌개고을", "꾸이꾸이 돼지마을", "한마리 정육식당", "엉터리 생고기", "볏집통삼겹살", "제주도야지", "생각나는 순대국", "밀알전복 순대국", "곱창고"]

                n1=Math.floor(Math.random()*(list_c.length))
                while(1){
                        n2=Math.floor(Math.random()*(list_c.length))
                        if(n1!=n2){break;}
                }

                result_txt="[저녁]\n -"+list_c[n1]+"\n -"+list_c[n2]

                result_button=["다시 추천받기(저녁)", "처음으로"]
		ch=1
        }
        else if(req.body.content=="술자리" || req.body.content=="다시 추천받기(술자리)"){
		list_d=["먹거리고을", "경성주막", "왕빈자 삼파전", "ZAPI", "삼구포차", "양철통", "퓨전포차", "BLUE PUB", "옥집", "전주생막걸리", "성균관 스캔들", "불족발", "히닭발", "태영생막창!!", "맥주광"]

                n1=Math.floor(Math.random()*(list_d.length))
                while(1){
                        n2=Math.floor(Math.random()*(list_d.length))
                        if(n1!=n2){break;}
                }

                result_txt="[술자리]\n -"+list_d[n1]+"\n -"+list_d[n2]


                result_button=["다시 추천받기(술자리)", "처음으로"]
		ch=1
        }

    	else if(req.body.content=="식사류"){
		result_txt="---------[A구역(학교바로앞)]---------\n성대밥상\n한두야\n짱식당\n밀알 전복 순대국\n내찜닭\n\n베트남쌀국수\n배터지는 생돈까스\n낮것상칼국수\n알촌\n예국향\n\n일미닭갈비\n고씨네\n우리집\n본찌돈까스\n왕돈까스\n\n옛이야기\n마루\nBella Tunisia\n이라면\n스테이크덮밥\n\n명동돈까스\n매콤돈까스칡불냉면\n\n---------[B구역(꾸이꾸이쪽)]---------\n민손짜장\n동자설렁탕전문\n고아사 밥\n일품향\nmomo스테이크\n\n원조부대고기\n\n-------[C구역(길건너 메인거리)]-------\n국수나무\n육소단\n국수파동\n유가네\n항아리보쌈\n\n진국\n춘천닭갈비\n미가라멘\n부자국밥\n쉐프의 부대찌개\n\n콩마을\n백령도 바지락칼국수\n매운갈비찜\n찌개지존\n1인자 감자탕뼈해장국\n\n돈정\n청진동 해장국\n청년짬뽕\n본죽\n\n---------[D구역(길건너 역쪽)]---------\n할매순대국\n놀부 부대찌개\n히토리\n박가네 찌개마을\n감동\n\n성대 면 사무소\n김씨화로\n산이야 아귀찜 황소곱창\n쿡감\n드럼 통돌구이\n\n코다리네\n\n--------[E구역(길건너 깊은곳)]--------\n생각나는 순대국\n성대찌개고을\n짬뽕타임\n키와마루아지\n밀겨울\n\n귀신반점"
    		result_button=["처음으로"]
		ch=2
	}
    	else if(req.body.content=="분식/인스턴트/도시락"){
		result_txt="---------[A구역(학교바로앞)]---------\n도스마스\n길거리야\nCUPFUL\n봉구스밥버거\n본도시락\n\n컵닭\n순희네 떡달\n무대뽀핫도그\n이삭토스트\n토마토\n\n김밥천국\nGGgo\n킹고하우스\n배꼽빵빵\n밀플랜비\n\n한솥\n\n---------[B구역(꾸이꾸이쪽)]---------\n맘스터치\n레드홀 즉석떡볶이\nTACO GUYS\n엽기떡볶이\n\n-------[C구역(길건너 메인거리)]-------\n보영만두\n신전떡볶이\n롯데리아\n김밥천국\n자연김밥\n\n청춘 쌀핫도그\nTAKOBI\n\n---------[D구역(길건너 역쪽)]---------\n맥도날드\n먹깨비김밥\n명랑핫도그\n가마로강정\n성대왕김말이\n\n소문난김밥\n\n--------[E구역(길건너 깊은곳)]--------\n황금도너츠\n김밥우동"
    		result_button=["처음으로"]
		ch=2
	}
    	else if(req.body.content=="고기(구이)"){
		result_txt="---------[A구역(학교바로앞)]---------\n\n---------[B구역(꾸이꾸이쪽)]---------\n월매랑 삼겹이랑\n꾸이꾸이돼지마을\n\n-------[C구역(길건너 메인거리)]-------\n칼부삼\n한마리 정육식당\n마포구이촌\n마포갈비\n벌집삼겹살\n\n새마을식당\n\n---------[D구역(길건너 역쪽)]---------\n엉터리생고기\n숯불고기\n쪽갈비전문점 예감\nThe맛 쪽갈비\n\n--------[E구역(길건너 깊은곳)]--------\n볏짚통삼겹살\n생고기제작소\n해품소\n성대목장\n포돈포돈\n\n제주도야지"
    		result_button=["처음으로"]
		ch=2
	}
    	else if(req.body.content=="치킨/피자"){
		result_txt="---------[A구역(학교바로앞)]---------\n피자아이\nBBQ\n지코바\n짱닭치킨\n닭터조\n\n멕시카나치킨\n도미노피자\n\n---------[B구역(꾸이꾸이쪽)]---------\n노랑통닭\n옛날장터치킨\n다사랑치킨\nOUTDARK\n\n-------[C구역(길건너 메인거리)]-------\n보드람치킨\n땅땅치킨\n닭스데이\n\n---------[D구역(길건너 역쪽)]---------\nPIZZERIA\n\n--------[E구역(길건너 깊은곳)]--------\n동네아저씨치킨\n피자스쿨\n썬더치킨\n피자생각\n땡큐맘치킨"
    		result_button=["처음으로"]
		ch=2
	}
    	else if(req.body.content=="야식/회/술"){
		result_txt="---------[A구역(학교바로앞)]---------\n아카미\n일진회\n\n---------[B구역(꾸이꾸이쪽)]---------\n성균관스캔들\n하루에\n\n-------[C구역(길건너 메인거리)]-------\n불족발\n감스시\n오징어바다\n황꼬치\n정든닭발\n\n육회독존\n사랑해\n설가참치\n황금족발\n달봉감자\n\n곱창생각\n독산성 족발&순대국\n빨간석쇠구이\n\n---------[D구역(길건너 역쪽)]---------\n곱창고\n성대수산\n봉구비어\n제주항\n이라부\n\n독도참치\n풍천민물장어\n왕십리 막창&돈까스\n북한산 조개구이\n별난곱창\n\n--------[E구역(길건너 깊은곳)]--------\n히닭발\n태영생막창\n반갑다 친구야\n싱싱회센타\n홍매스시\n\n순풍양꼬치\n경기수산\n다모참치활어회\n상무네닭발집\n짝태&노가리\n\n홍찌개\n명가 양꼬치\n다미\n택이네 조개전골\n푸른바다회\n\n우특심 한우곱창\n청춘쭈꾸미\n슌\n선참치\n이까야\n\n황소마을"
    		result_button=["처음으로"]
		ch=2
	}
    	else if(req.body.content=="포차/술"){
		result_txt="---------[A구역(학교바로앞)]---------\n먹거리고을\n경성주막\n셀프호프\n왕빈자삼파전\n\n---------[B구역(꾸이꾸이쪽)]---------\n라돈\nZAPI\n짜이포차\n땡잡았다\n테라스beer\n\n-------[C구역(길건너 메인거리)]-------\n삼구포차\n맥주광\n양철통\n성대포차\n비어팝\n\n치어스\n맥주클럽\n비어킹\n비어쵸이스\n투다리\n\n주궁\n포차어게인\n스케치라이브7080\n\n---------[D구역(길건너 역쪽)]---------\n포차포차\n퓨전포차\nBLUE PUB\n옥집\n\n--------[E구역(길건너 깊은곳)]--------\n퓨전포차\n전주생막걸리"
    		result_button=["처음으로"]
		ch=2
	}	
    }

    var m1 = {
        "message": {
            "text": result_txt
        },
        "keyboard": {
            "type": "buttons",
            "buttons": result_button
        }
    };


    var m2 = {
        "message": {
            "text": result_txt,
            "photo": {
			"url": "http://postfiles14.naver.net/MjAxNzEwMTBfMTMx/MDAxNTA3NjM3NTY0MDkx.CBbxflp9xWpxq9r_NwBiWGE9tOJ2fIOtVQz2nipWSaIg.53eNJwCk3vEnUye-tro8BPJ9ZBJLDOV2zh9iOd8czmgg.PNG.yhjgoldhair/SKKU_FOOD_MAP.png?type=w3",
			"width": 1287,
			"height": 871
		     },
	    "message_button":{
			"label": "지도 확대",
			"url": "http://blog.naver.com/storyphoto/viewer.jsp?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzEwMTBfMjAw%2FMDAxNTA3NjM4OTAwODg1.1HDrXLWZgnU8FoPuwmtKGocZsGlENUEyRt5BnElawWMg.5e2UbxTQgDcQfbcqZJRYFPOQBBFjpazAczjsCk1T6eYg.PNG.yhjgoldhair%2FSKKU_FOOD_MAP.png"
	    }
        },
        "keyboard": {
            "type": "buttons",
            "buttons": result_button
        }
    };
    if(ch==1){
	message=m1
    }
    else if(ch==2){
	message=m2
    }
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(message))
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//-----------------------create server-------------------------
var server= app.listen(app.get('port'),function(){
	console.log("Express server listening on port"+server.address().port);
});



module.exports = app;
