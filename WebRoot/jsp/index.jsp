<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="includePage.jsp"%>
<title>临汾市城市建设公共服务信息与管理系统</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/index.css">
<link rel="stylesheet" type="text/css" href="<%=path%>/bootstrap/css/yxbootstrap.css">
<script type="text/javascript" src="<%=path%>/js/arcgis.js"></script>
<script type="text/javascript" src="<%=path%>/js/ytmap.js"></script>
<script type="text/javascript" src="<%=path%>/js/index.js"></script>
<script type="text/javascript" src="<%=path%>/js/jinyou.js"></script>
<style type="text/css">
	.a1 {
		color:#fff;text-decoration: none;
	}
	.a1:hover,.a1:FOCUS {
		color:#fff;text-decoration: underline;
	}
</style>
</head>
<body onload="index.onload()" style="overflow:hidden;">
	<!-- head -->
	<div id="divhead" class="divheader clearSpace">
		<div class="row clearSpace" style="height:100%;">
			<div id="sysTitle" class="col-md-6 clearSpace" style="height:100%;">
				<img src="<%=path%>/images/dalogo.png"/>
			</div>
			<div class="col-md-6 clearSpace" style="height:100%;padding-right:5px">
				<div id="xtdate" style="height:40px;padding-top:20px;text-align:right;color:#fff"></div>
				<div style="height:40px;line-height:40px;text-align:right;color:#fff">
					<c:if test="${uservo == null}">
						欢迎访问，<a class="a1" href="<%=path%>/login.jsp">登录/注册</a>
					</c:if>
					<c:if test="${uservo != null}">
						<a class="a1" href="#" onclick="index.showMyInfo()"><%=uservo.getUsername()%></a> |
						<a class="a1" href="javascript:void(0)" onclick="index.logout()">退出</a>
					</c:if>
				</div>
			</div>
		</div>
	</div>
	<!-- 导航 -->
	<div id="navDiv" style="background:#000">
		<nav class="navbar navbar-blue clearSpace">
			<div class="navbar-header">
		      <a class="navbar-brand" href="#">
		      	<span class="glyphicon glyphicon-menu-hamburger"></span>
		      </a>
		    </div>
			<div class="collapse navbar-collapse clearSpace">
		      <ul class="nav navbar-nav">
		        <li><a href="#" id="sya" class="active" onclick="index.refresh()"><span class="glyphicon glyphicon-home"></span> 首页</a></li>
		        <li><a href="#" onclick="index.selectHeadLi(this,1)"><span class="glyphicon glyphicon-folder-close"></span> 档案信息</a></li>
		        <li><a href="#" onclick="index.selectHeadLi(this,2)"><span class="glyphicon glyphicon-picture"></span> 照片影像</a></li>
		        <li><a href="#" onclick="index.selectHeadLi(this,3)"><span class="glyphicon glyphicon-facetime-video"></span> 视频资源</a></li>
		        <li><a href="#" onclick="index.selectHeadLi(this,4)"><span class="glyphicon glyphicon-map-marker"></span> 地图定位</a></li>
		        <li><a href="#" onclick="index.showLxwm()"><span class="glyphicon glyphicon-envelope"></span> 联系我们</a></li>
		        <c:if test="${uservo != null && uservo.isgly == 0}">
		        	<li><a href="<%=path%>/jsp/manage.jsp" style="color:#00ffff"><span class="glyphicon glyphicon-cog"></span> 系统管理</a></li>
		      	</c:if>
		      </ul>
		      <div class="nav navbar-nav navbar-right clearSpace">
		        <table style="height:50px">
		        	<tr>
		        		<td>
		        			<div id="maptoolbar">
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px;padding-left:0px"
								 data-toggle="tooltip" data-placement="bottom" title="返回" onclick="index.mapOper(this,'返回')">
									<span class="glyphicon glyphicon-share-alt"></span>
								</button>
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px;"
								 data-toggle="tooltip" data-placement="bottom" title="放大" onclick="index.mapOper(this,'放大')">
									<span class="glyphicon glyphicon-zoom-in"></span>
								</button>
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px"
								 data-toggle="tooltip" data-placement="bottom" title="缩小" onclick="index.mapOper(this,'缩小')">
									<span class="glyphicon glyphicon-zoom-out"></span>
								</button>
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px"
								 data-toggle="tooltip" data-placement="bottom" title="平移" onclick="index.mapOper(this,'平移')">
									<span class="glyphicon glyphicon-move"></span>
								</button>
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px"
								 data-toggle="tooltip" data-placement="bottom" title="测距" onclick="index.mapOper(this,'测距')">
									<span class="glyphicon glyphicon-sort"></span>
								</button>
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px"
								 data-toggle="tooltip" data-placement="bottom" title="测面积" onclick="index.mapOper(this,'测面积')">
									<span class="glyphicon glyphicon-retweet"></span>
								</button>
								<button class="btn btn-link" style="color:#e1e1e1;padding:5px"
								 data-toggle="tooltip" data-placement="bottom" title="清除" onclick="index.mapOper(this,'清除')">
									<span class="glyphicon glyphicon-trash"></span>
								</button>
								<span style="color:#e1e1e1;font-weight:bold" id="mapLevel"></span>
							</div>
		        		</td>
		        		<td>
		        			<div class="input-group" style="padding-right:5px">
								<input id="gjzInput" class="form-control" placeholder="请输入关键字" style="width:200px;border-left:none">
								<span class="input-group-btn">
							        <button class="btn btn-warning active" onclick="index.search()"> 搜索 </button>
							    </span>
							</div>
		        		</td>
		        	</tr>
		        </table>
		      </div>
	      </div>
		</nav>
	</div>
	<!-- 地图面板 -->
	<table style="border-collapse:collapse;width:100%;">
		<tr>
			<td style="vertical-align:top;width:280px;background:#335e76">
				<div id="leftPanel" style="width:100%;height:100%;overflow:auto;">
			        <div id="mkTree"></div>
		        </div>
			</td>
			<td id="mainPanel" style="border-left:1px solid #000">
				<div id="daxxDiv" style="overflow:auto;padding:10px;width:100%;height:100%;display:none;"></div>
				<div id="daxqDiv" style="overflow:auto;padding:10px;width:100%;height:100%;display:none;"></div>
				<div id="tpxxDiv" style="overflow:auto;padding:10px;width:100%;height:100%;display:none;"></div>
				<div id="spxxDiv" style="overflow:auto;padding:10px;width:100%;height:100%;display:none;"></div>
				<div id="map" style="padding:0px;width:100%;height:100%;"></div>
			</td>
		</tr>
	</table>
	
	<!-- 坐标显示开始 -->
	<div id="xyDiv"></div>
	<!-- 坐标显示结束 -->
	
	<!-- 视图切换开始 -->
	<div id="stqhDiv">
		<div class="btn-group" data-toggle="buttons">
		  <label class="btn btn-default active" onclick="index.changeMapLayer(1)">
		    <input type="radio" name="options"> 矢量
		  </label>
		  <label class="btn btn-default" onclick="index.changeMapLayer(2)">
		    <input type="radio" name="options"> 影像
		  </label>
		</div>
	</div>
	<!-- 视图切换结束 -->
	
	<!-- 图片查看 -->
	<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="yxModal">
	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="img-title"></h4>
	      </div>
	      <div class="modal-body">
	        <img id="yxImg" style="width:100%;height:100%;cursor:pointer" onclick="index.openImg(this)"/>
	      </div>
	      <div class="modal-footer" style="text-align:left">
	      	<div id="img-ms"></div>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- 图片查看结束 -->
	
	<!-- 资源分页弹出窗口 -->
	<div id="zyDlg" class="easyui-window" title='查询结果' data-options="width:300,height:500,closed:true,left:300,top:150">
		<div id="zyDiv" style="width:100%;height:100%;overflow:auto;"></div>
	</div>
	
	<!-- 联系我们 -->
	<div id="lxwmModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">联系我们</h4>
	      </div>
	      <div class="modal-body">
	        <div id="lxwm-body"></div>
	      </div>
	      <div class="modal-footer">
	      	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- 联系我们结束 -->
	
	<!-- 个人信息弹出窗口 -->
	<div id="myInfoDlg" class="easyui-dialog" style="padding:20px" title='个人信息修改' data-options="width:400,height:500,closed:true,modal:true,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){index.updMyInfo();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#myInfoDlg').dialog('close');}
		}]">
		<form id="myInfoForm" method="post">
			<input type="hidden" name="user.id"/>
			<input type="hidden" name="user.userid"/>
			<input type="hidden" name="user.password"/>
			<input type="hidden" name="user.isgly"/>
		    <div>
		        <label style="width:60px">用户名</label>
		        <label id="userid" style="color:#336699"></label>
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">姓名</label>
		        <input class="easyui-textbox" name="user.username" data-options="width:240,required:true" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">性别</label>
		        <select class="easyui-combobox" name="user.xb" style="width:240px;" data-options="editable:false">
				    <option value="0">男</option>
				    <option value="1">女</option>
				</select>
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">单位</label>
		        <input class="easyui-textbox" name="user.dw" data-options="width:240" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">部门</label>
		        <input class="easyui-textbox" name="user.bm" data-options="width:240" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">职位</label>
		        <input class="easyui-textbox" name="user.zw" data-options="width:240" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">办公电话</label>
		        <input class="easyui-textbox" name="user.bgdh" data-options="width:240" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">联系电话</label>
		        <input class="easyui-textbox" name="user.lxdh" data-options="width:240,required:true" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">电子邮箱</label>
		        <input class="easyui-textbox" name="user.email" data-options="width:240,required:true,validType:'email'" />
		    </div>
		    <div style="margin-top:5px">
		        <label style="width:60px">联系地址</label>
		        <input class="easyui-textbox" name="user.lxdz" data-options="width:240" />
		    </div>
		    <div style="margin-top:20px">
		    	<a href="#" onclick="index.showPwd()">修改密码</a>
		    </div>
		</form>
	</div>
	
	<!-- 修改密码窗口 -->
	<div id="updPwdDlg" class="easyui-dialog" style="padding:20px" title='修改密码' data-options="width:400,height:240,closed:true,modal:true,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){index.updPwd();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#updPwdDlg').dialog('close');}
		}]">
		<div>
	        <label style="width:60px">原密码</label>
	        <input class="easyui-passwordbox" id="pwd0" data-options="width:240,required:true" />
	    </div>
	    <div style="margin-top:5px">
	        <label style="width:60px">新密码</label>
	        <input class="easyui-passwordbox" id="pwd1" data-options="width:240,required:true" />
	    </div>
	    <div style="margin-top:5px">
	        <label style="width:60px"></label>
	        <label id="mmtip" style="color:#ff0000"></label>
	    </div>
	</div>
</body>
</html>