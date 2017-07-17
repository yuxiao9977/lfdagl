<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	session.invalidate();
%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>登录</title>
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
    		overflow:hidden;margin-top:120px;
    	}
    	.divBg {
    		margin:auto;width:555px;height:600px;
    	}
    	.divTit {
    		color:#fff;font-size:26px;width:100%;text-align:left;
    		margin-top:20px;margin-bottom:20px;
    	}
    	.inp1 {
    		height:40px;margin-top:18px;
    	}
    	.inp2 {
    		height:40px;margin-top:18px;margin-bottom:18px;
    	}
    </style>
  	<script type="text/javascript">
  		var path = "<%=path%>";
  		var IPADDRESS = returnCitySN["cip"]+'【'+returnCitySN["cname"]+'】';
  		function login() {
  			$("#tip").html("正在登录..");
  			var userid = $.trim($("#userid").val());
  			var password = $.trim($("#password").val());
  			if (userid == "" || password == "") {
  				$("#tip").html("账号或密码不能为空");
  			} else {
  				$.ajax({
  					type:"post",
  					url:path + "/xtgl/getUserByNamePwd.action",
  					data:{userid:userid,password:password},
  					async:true,
  					dataType:"json",
  					success:function(data) {
  						if (data.result == "1") {
  							$("#tip").html("账号或密码错误");
  						} else if (data.result == "2") {
  							$("#tip").html("您的账号尚未审核通过,请通过后再登录");
  						} else {
  							addLog();
  						}
  					}
  				});
  			}
  		}
  		function toRegister() {
  			window.location.href = path + "/register.jsp";
  		}
  		function addLog() {
  			$.ajax({
				type:"post",
				url:path + "/xtgl/addLog.action",
				data:{
					"logvo.userid":$.trim($("#userid").val()),
					"logvo.content":"登录成功",
					"logvo.ip":IPADDRESS,
					"logvo.type":"2"
				},
				async:true,
				dataType:"json",
				success:function(data) {
					if (data.result == "success") {
						window.location.href = path + "/jsp/index.jsp";
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
		  				<h3>系统登录</h3>
		  				<h4>请输入账号和密码</h4>
		  			</td>
		  			<td>
		  				<img src="<%=path%>/images/key.png">
		  			</td>
		  		</tr>
		  		<tr>
		  			<td id="tip" colspan="2" style="color:#ff0000;padding-left:2px"></td>
		  		</tr>
		  	</table>
		  </div>
		  <div class="bpanel-body" style="padding-top:0px">
		    <input id="userid" class="form-control inp1" placeholder="请输入账号" autocomplete="new-password"/>
		    <input id="password" type="password" class="form-control inp2" placeholder="请输入密码" autocomplete="new-password"/>
		    <button class="btn btn-lg btn-primary btn-block" onclick="login()">登录</button>
		    <button class="btn btn-lg btn-success btn-block" onclick="toRegister()">注册</button>
		  </div>
		</div>
  	</div>
  </body>
</html>