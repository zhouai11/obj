var checkPhone = function(a) {
	var patrn = /^((?:13|15|18|14|17)\d{9}|0(?:10|2\d|[3-9]\d{2})[1-9]\d{6,7})$/;
	if(!patrn.exec(a)) return false;
	return true;
};
var sjyzm;
var smsnumber;
$(function() {
	//随机验证码

	 var show_num = [];
        draw(show_num);
        $("#canvas").on('click',function(){
            draw(show_num);
         
        })
	//短信验证码
	shortMessagraxc(); //获取验证码
	// =================================loading控制
	$(window).on("load", function() {
		$("#loading").delay(50).fadeOut()
	});
	$(window).on("load", function() {
		$("#loading").fadeOut();
	})
	// ========================================浮层控制
	$("#tip .pack a").on("click", function() {
		$("#tip").fadeOut()
		$("#tip .pack p").html("")
		$("#submit").css({
			"pointer-events": "auto"
		});
		return false;
	})

	function alerths(str) {
		$("#tip").fadeIn()
		$("#tip .pack p").html(str)
		return false;
	}
	$(".login_icon").on("click", function() {
		var str = $("#iphone").val();//手机号
		var sjy = $("#verify").val();//随机验证码
		var smsnum = $("#smsnumber").val();
		$("#submit").css({
			"pointer-events": "none"
		});
		if(str.length == 11 && checkPhone(str)) {
			if (sjy!=sjyzm) {
				alerths("随机验证码有误！")
				return;
			} else{
				if (smsnum==''||smsnum!=smsnumber) {
					alerths("短信验证码有误！")
					return;
				}else {
					//post提交
					var url = window.location.search;
					$.trim(url);
					if(url == "") {
						url = 0;
					}
					$.post("userregister?Passcode=" + url + "", {"userphone":str}, function(data){
						window.location.href=""+data+"";
					})
				}
			}
			// 判断是不是11位手机号，为真提交
		} else {
			alerths("请正确输入手机号！")
			return;
		}
		return;
	})
	/*登录按钮的颜色*/
	$("input").change(function() {
		var str = $("#iphone").val();
		var pass = $("#btn_yzm").val();

		if(pass != "" || str != "") {
			$(".login_icon").addClass("login_iconon");
		} else {
			$(".login_icon").removeClass("login_iconon");
		}
	})
	/*yanzhengma*/
			function shortMessagraxc(){
				$('#btn_yzm').click(function() {
					var str = $("#iphone").val();//手机号
					var sjy = $("#verify").val();//随机验证码
					if (str!=''&&str.length==11&&checkPhone(str)) {
						if (sjy!=sjyzm) {
							alerths("随机验证码有误！")
							return;
						} else{
							$.get("getusersms",{"userphone":str},function(data){
								if (data.result=="ojbk") {
									smsnumber = data.smsnumber;
								}else {
									alerths("手机号已注册~")
									window.location.href=""+data.result+"";
									return;
								}
							})
							//post提交发送验证码
							var count = 60;
					        var countdown = setInterval(CountDown, 1000);
							return;
						}
					} else{
						alerths("手机号有误！")
						return;
					}
				   //验证码事件
					function CountDown() {
						$("#btn_yzm").attr("disabled", true);
						$("#btn_yzm").val("" + count + "s");
						if (count == 0) {
							$("#btn_yzm").val("重新获取").removeAttr("disabled");
							clearInterval(countdown);
						}
						count--;
					}
				})
			};
})
function draw(show_num) {
        var canvas_width=$('#canvas').width();
        var canvas_height=$('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        sjyzm = show_num.join("");
    }
    function randomColor() {//得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }