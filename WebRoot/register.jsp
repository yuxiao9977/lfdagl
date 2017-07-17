<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	session.invalidate();
%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>注册</title>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<%-- jquery 1.11.3 --%>
	<script type="text/javascript" src="<%=path%>/jquery/jquery.min.js"></script>
	<%-- bootstrap3.3.5 本地 --%>
	<link rel="stylesheet" type="text/css" href="<%=path%>/bootstrap/css/mybootstrap.css">
	<script type="text/javascript" src="<%=path%>/bootstrap/js/mybootstrap.js"></script>
	<%-- 搜狐IP接口 --%>
	<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
    <%-- logo设置 --%>
	<link rel="Shortcut Icon" type="image/x-icon" href="<%=path%>/images/logo3.png">
    <style type="text/css">
    	body {
    		background:url("<%=path%>/images/loginbg.jpg");
    		overflow:auto;margin-top:40px;
    	}
    	.divBg {
    		margin:auto;width:555px;margin-bottom:40px;
    	}
    	.divTit {
    		color:#fff;font-size:26px;width:100%;text-align:left;
    		margin-top:20px;margin-bottom:20px;
    	}
    	.inp {
    		height:40px;margin-top:10px;
    	}
    </style>
  	<script type="text/javascript">
  		var path = "<%=path%>";
  		var IPADDRESS = returnCitySN["cip"]+'【'+returnCitySN["cname"]+'】';
  		function register() {
  			$("#tip").html("正在登录..");
  			var userid = $.trim($("#userid").val());
  			var pwd1 = $("#pwd1").val();
  			var pwd2 = $("#pwd2").val();
  			var username = $.trim($("#username").val());
  			var xb = $("#xb").val();
  			var dw = $.trim($("#dw").val());
  			var bm = $.trim($("#bm").val());
  			var zw = $.trim($("#zw").val());
  			var bgdh = $.trim($("#bgdh").val());
  			var lxdh = $.trim($("#lxdh").val());
  			var email = $.trim($("#email").val());
  			var lxdz = $.trim($("#lxdz").val());
  			if (userid == "" || pwd1 == "" || pwd2 == "" || username == "" || lxdh == "" || email == "") {
  				$("#tip").html("用户名、密码、姓名、联系电话、电子邮箱不能为空");
  				return;
  			} 
  			if (pwd1 != pwd2) {
  				$("#tip").html("两次密码输入不一致");
  				return;
  			}
  			var bool = false;
  			$.ajax({
  				type:"post",
  				url:path + "/xtgl/getUserByUserid.action",
  				data:{"user.userid":userid},
  				async:false,
  				dataType:"json",
  				success:function(data) {
  					if (data == null) {
  						bool = true;
  					}
  				}
  			});
  			if (!bool) {
  				$("#tip").html("用户名已存在,请重新输入");
  				return;
  			}
			$.ajax({
				type:"post",
				url:path + "/xtgl/addUser.action",
				data:{
					"user.userid":userid,
					"user.password":pwd1,
					"user.username":username,
					"user.xb":xb,
					"user.dw":dw,
					"user.bm":bm,
					"user.zw":zw,
					"user.bgdh":bgdh,
					"user.lxdh":lxdh,
					"user.email":email,
					"user.lxdz":lxdz,
					"user.isgly":"1"
				},
				async:true,
				dataType:"json",
				success:function(data) {
					if (data.result == "success") {
						alert("提交注册成功,通过审核后方可登录");
						addLog();
					}
				}
			});
  		}
  		
  		function addLog() {
  			$.ajax({
				type:"post",
				url:path + "/xtgl/addLog.action",
				data:{
					"logvo.userid":$.trim($("#userid").val()),
					"logvo.content":"提交注册申请",
					"logvo.ip":IPADDRESS,
					"logvo.type":"1"
				},
				async:true,
				dataType:"json",
				success:function(data) {
					if (data.result == "success") {
						window.location.href = path + "/login.jsp";
					}
				}
  			});
  		}
  	</script>
  </head>
  <body>
  	<div class="divBg">
  		<div class="divTit">
  			<table>
  				<TR>
  					<td><img width="35px" height="35px" src="<%=path%>/images/logo.png"/></td>
  					<td style="padding-left:10px">临汾市城市建设公共服务信息与管理系统</td>
  				</TR>
  			</table>
  		</div>
  		<div class="bpanel bpanel-default" style="width:555px;margin:auto;">
		  <div class="bpanel-heading">
		  	<table>
		  		<tr>
		  			<td width="491px">
		  				<h3>系统注册</h3>
		  				<h4>请输入注册信息</h4>
		  			</td>
		  			<td>
		  				<img src="<%=path%>/images/key.png">
		  			</td>
		  		</tr>
		  		<tr>
		  			<td colspan="2" style="color:#336699;padding-left:2px">
		  				*注册信息务必真实，通过审核后会电话或邮件通知
		  			</td>
		  		</tr>
		  		<tr>
		  			<td id="tip" colspan="2" style="color:#ff0000;padding-left:2px"></td>
		  		</tr>
		  	</table>
		  </div>
		  <div class="bpanel-body">
  	  	  	<input id="userid" style="height:40px" class="form-control" placeholder="用户名" autocomplete="new-password">
  	  	  	<input id="pwd1" type="password" class="form-control inp" placeholder="密码" autocomplete="new-password">
  	  	  	<input type="password" id="pwd2" class="form-control inp" placeholder="再次输入密码" autocomplete="new-password">
  	  	  	<input id="username" class="form-control inp" placeholder="姓名" autocomplete="new-password">
  	  	  	<select id="xb" class="form-control inp">
  	  	  		<option value="0">男</option>
  	  	  		<option value="1">女</option>
  	  	  	</select>
  	  	  	<input id="dw" class="form-control inp" placeholder="单位" autocomplete="new-password">
  	  	  	<input id="bm" class="form-control inp" placeholder="部门" autocomplete="new-password">
  	  	  	<input id="zw" class="form-control inp" placeholder="职位" autocomplete="new-password">
          	<input id="bgdh" class="form-control inp" placeholder="办公电话" autocomplete="new-password">
          	<input id="lxdh" class="form-control inp" placeholder="联系电话" autocomplete="new-password">
          	<input id="email" class="form-control inp" placeholder="电子邮箱" autocomplete="new-password">
          	<input id="lxdz" class="form-control inp" placeholder="联系地址" autocomplete="new-password">
          	<button style="margin-top:10px" class="btn btn-lg btn-primary btn-block" onclick="register()">提交注册申请</button>
		  </div>
		</div>
  	</div>
  </body>
</html>