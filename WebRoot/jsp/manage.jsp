<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="includePage.jsp"%>
<title>临汾市城建服务管理系统后台</title>
<script type="text/javascript" src="<%=path%>/js/manage.js"></script>
<script type="text/javascript" src="<%=path%>/js/property.js"></script>
<script type="text/javascript" src="<%=path%>/js/picture.js"></script>
<script type="text/javascript" src="<%=path%>/js/video.js"></script>
<script type="text/javascript" src="<%=path%>/js/data.js"></script>
<script type="text/javascript" src="<%=path%>/js/log.js"></script>
<!-- kindeditor -->
<link rel="stylesheet" type="text/css" href="<%=path%>/kindeditor/themes/default/default.css">
<script type="text/javascript" src="<%=path%>/kindeditor/kindeditor-all.js"></script>
<script type="text/javascript" src="<%=path%>/kindeditor/zh-CN.js"></script>
<style type="text/css">
	.a1 {
		color:#fff;text-decoration:none;
	}
	.a1:hover,.a1:FOCUS {
		color:#fff;text-decoration:underline;
	}
	.fileTable {
		border-collapse: collapse;width:320px
	}
	.fileTable td {
		border:1px solid #d1d1d1;height:20px;
	}
</style>
<script type="text/javascript">
var kindeditor = null;
KindEditor.ready(function(K) {
	kindeditor = K.create('#kindcontent', {
		allowFileManager : true,
		cssPath:"<%=path%>/kindeditor/themes/default/default.css",
		filterMode:true,
		themeType:"default",
		uploadJson:"<%=path%>/kindeditor/jsp/upload_json.jsp",
		fileManagerJson:"<%=path%>/kindeditor/jsp/file_manager_json.jsp"
	});
});
</script>
</head>
<body onload="manage.init()" style="overflow:hidden">
	<div class="easyui-layout" style="width:100%;height:100%;">
	    <div data-options="region:'north',split:true" style="height:80px;background:#558b88;overflow:hidden">
	    	<table style="width:100%">
	    		<tr>
	    			<td style="padding-left:10px;width:50%;height:80px;line-height:80px;font-size:25px;color:#fff">临汾市城建服务管理系统后台</td>
	    			<td style="width:50%;height:80px;color:#fff;text-align:right;font-size:14px;padding-top:16px;padding-right:10px">
	    				<%=uservo.getUsername()%> | <a class="a1" href="<%=path%>/jsp/index.jsp">返回首页</a> | <a class="a1" href="javascript:manage.logout()">退出</a>
	    			</td>
	    		</tr>
	    	</table>
	    </div>
	    <div data-options="region:'west',title:'管理目录',split:true,iconCls:'icon-guanli',collapsible:false" style="width:200px">
	    	<ul class="easyui-datalist" style="width:100%;height:100%;" data-options="lines:true">
	    		<c:if test="${uservo != null && uservo.id == '10000'}">
			    	<li><div onclick="manage.showUser()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/group.png"/> 账户管理</div></li>
			    </c:if>
			    <li><div onclick="manage.showModule()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/note.png"/> 模块管理</div></li>
			    <li><div onclick="property.showProperty()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/page_white_code.png"/> 属性管理</div></li>
			    <li><div onclick="data.showData()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/database_add.png"/> 资源管理</div></li>
			    <li><div onclick="picture.showPicture()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/photo.png"/> 影像管理</div></li>
			    <li><div onclick="video.showVideo()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/monitor.png"/> 视频管理</div></li>
			    <c:if test="${uservo != null && uservo.id == '10000'}">
			    	<li><div onclick="log.showLogs()" style="font-size:15px;padding:5px"><img src="<%=path%>/images/icons/page_white_text.png"/> 日志管理</div></li>
				</c:if>
			</ul>
	    </div>
	    <div data-options="region:'center',title:'功能设置',iconCls:'icon-gnsz'" style="padding:10px;background:#f5f5f5">
	    	<div id="mainDiv" style="width:100%;height:100%">
	    		<div id="cc" class="easyui-layout" style="width:100%;height:100%;">
				    <div data-options="region:'center',split:true,title:'列表查询',iconCls:'icon-gnlb'">
				    	<!-- 用户列表 -->
				    	<div id="yhListDiv" style="width:100%;height:100%;display:none">
				    		<table id="userList"></table>
				    	</div>
				    	<!-- 模块树 -->
				    	<div id="mkTreeDiv" style="width:100%;height:100%;display:none">
				    		<ul id="moduleTree"></ul>
				    	</div>
				    	<!-- 属性面板 -->
				    	<div id="propertyDiv" style="width:100%;height:100%;display:none">
				    		<ul id="moduleTree2"></ul>
				    	</div>
				    	<!-- 图片面板 -->
				    	<div id="pictureDiv" style="width:100%;height:100%;display:none">
				    		<div class="easyui-panel" style="padding:5px;width:99%;border:none">
				    			<input id='pMTree' style="width:200px"/>
				    			<input id='fname' class="easyui-textbox"/>
				    			<a href="#" onclick="picture.search()" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
				    			<a href="#" onclick="picture.upd()" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">修改</a>
				    			<a href="#" onclick="picture.del()" class="easyui-linkbutton" data-options="iconCls:'icon-remove'">删除</a>
							</div>
				    		<ul id="pictureList"></ul>
				    	</div>
				    	<!-- 视频面板 -->
				    	<div id="videoDiv" style="width:100%;height:100%;display:none">
				    		<div class="easyui-panel" style="padding:5px;width:99%;border:none">
				    			<input id='vMTree' style="width:200px"/>
				    			<input id='spfname' class="easyui-textbox"/>
				    			<a href="#" onclick="video.search()" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
				    			<a href="#" onclick="video.upd()" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">修改</a>
				    			<a href="#" onclick="video.del()" class="easyui-linkbutton" data-options="iconCls:'icon-remove'">删除</a>
							</div>
				    		<ul id="videoList"></ul>
				    	</div>
				    	<!-- 数据面板 -->
				    	<div id="dataDiv" style="width:100%;height:100%;display:none">
				    		<div class="easyui-panel" style="padding:5px;width:99%;border:none">
				    			<input id='dataMTree' style="width:200px"/>
							</div>
				    		<ul id="dataList" style="border:none"></ul>
				    	</div>
				    	
				    </div>
				    <div data-options="region:'east',iconCls:'icon-gnbj',split:true,title:'功能编辑'" style="width:400px">
				    	<!-- 用户编辑表单 -->
				    	<div id="yhBjDiv" style="width:100%;height:100%;padding:10px;display:none">
				    		<form id="yhForm" method="post">
				    			<input type="hidden" name="user.id"/>
							    <div>
							        <label style="width:60px">用户名</label>
							        <input class="easyui-textbox" id="userid" name="user.userid" data-options="width:240,required:true,validType:'qxuseridwy'" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">密码</label>
							        <input class="easyui-passwordbox" id="password" name="user.password" data-options="width:240,required:true" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">姓名</label>
							        <input class="easyui-textbox" id="username" name="user.username" data-options="width:240,required:true" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">性别</label>
							        <select class="easyui-combobox" id="xb" name="user.xb" style="width:240px;" data-options="editable:false">
									    <option value="0">男</option>
									    <option value="1">女</option>
									</select>
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">单位</label>
							        <input class="easyui-textbox" id="dw" name="user.dw" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">部门</label>
							        <input class="easyui-textbox" id="bm" name="user.bm" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">职位</label>
							        <input class="easyui-textbox" id="zw" name="user.zw" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">办公电话</label>
							        <input class="easyui-textbox" id="bgdh" name="user.bgdh" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">联系电话</label>
							        <input class="easyui-textbox" id="lxdh" name="user.lxdh" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">电子邮箱</label>
							        <input class="easyui-textbox" id="email" name="user.email" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">联系地址</label>
							        <input class="easyui-textbox" id="lxdz" name="user.lxdz" data-options="width:240" />
							    </div>
							    <div style="margin-top:5px;margin-bottom:15px;">
							        <label style="width:60px">权限</label>
							        <select class="easyui-combobox" id="isgly" name="user.isgly" style="width:240px;" data-options="editable:false">
									    <option value="1">其他</option>
									    <option value="0">管理员</option>
									</select>
							    </div>
							    <a href="#" onclick="manage.saveUser()" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="width:85px;margin-right:22px">保存</a>
							</form>
				    	</div>
				    	<!-- 模块节点 -->
				    	<div id="mkTreeChildDiv" style="width:100%;height:100%;display:none">
				    		<table id="mkTreeChildList"></table>
				    	</div>
				    	<!-- 属性列表 -->
				    	<div id="propertyListDiv" style="width:100%;height:100%;display:none">
				    		<table id="propertyList"></table>
				    	</div>
				    	<!-- 图片上传表单 -->
				    	<div id="pictureFormDiv" style="width:100%;height:100%;display:none;padding:10px">
				    		<form id="pictureForm" enctype="multipart/form-data">
				    			<div>
							        <label style="width:60px">图片名称</label>
							        <input class="easyui-textbox" id="fnames" data-options="width:350,height:80,multiline:true" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">图片描述</label>
							        <input class="easyui-textbox" id="fmss" data-options="width:350,height:200,multiline:true" />
							    </div>
							    <div style="margin-top:5px;margin-bottom:10px">
							    	<label style="width:60px">图片位置</label>
							        <input id="file1" name="file1" class="easyui-filebox" data-options="width:350,height:80,buttonText:'选择图片',multiple:true,separator:'#',multiline:true" />
							    </div>
							    <a href="#" onclick="picture.upload()" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="width:85px;margin-right:12px">上传图片</a>
							    <a href="#" onclick="picture.clear()" class="easyui-linkbutton" data-options="iconCls:'icon-qk'" style="width:85px">清空</a>
							    <p id="pz" style="color:#0000ff;margin-top:10px">可批量选择多个图片上传,文件名称和描述须与选择文件一一对应,以"#"号隔开</p>
				    		</form>
				    	</div>
				    	<!-- 视频上传表单 -->
				    	<div id="videoFormDiv" style="width:100%;height:100%;display:none;padding:10px">
				    		<form id="videoForm" enctype="multipart/form-data">
				    			<div>
							        <label style="width:60px">视频名称</label>
							        <input class="easyui-textbox" id="spfnames" data-options="width:350,height:80,multiline:true" />
							    </div>
							    <div style="margin-top:5px">
							        <label style="width:60px">视频描述</label>
							        <input class="easyui-textbox" id="spfmss" data-options="width:350,height:200,multiline:true" />
							    </div>
							    <div style="margin-top:5px;margin-bottom:10px">
							    	<label style="width:60px">视频位置</label>
							        <input id="file2" name="file2" class="easyui-filebox" data-options="width:350,height:80,buttonText:'选择视频',multiple:true,separator:'#',multiline:true" />
							    </div>
							    <a href="#" onclick="video.upload()" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="width:85px;margin-right:12px">上传视频</a>
							    <a href="#" onclick="video.clear()" class="easyui-linkbutton" data-options="iconCls:'icon-qk'" style="width:85px">清空</a>
							    <p style="color:#0000ff;margin-top:10px">可批量选择多个视频上传,文件名称和描述须与选择文件一一对应,以"#"号隔开</p>
				    		</form>
				    	</div>
				    	<!-- 数据表单 -->
				    	<div id="dataFormDiv" style="width:100%;height:100%;padding:10px;display:none"></div>
				    	
				    </div>
				</div>
	    	</div>
	    </div>
	</div>
	
	<!-- 模块节点弹出窗口 -->
	<div id="mkjdWin" class="easyui-dialog" style="padding:20px" title='模块编辑窗口' data-options="iconCls:'icon-mk',width:400,height:220,closed:true,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){manage.saveMk();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#mkjdWin').dialog('close');}
		}]">
		<div style="margin-top:5px">
	        <label style="width:60px">节点名称</label>
	        <input class="easyui-textbox" id="mkjdmc" data-options="width:240" />
	    </div>
	    <div style="margin-top:5px">
	        <label style="width:60px">节点顺序</label>
	        <select class="easyui-combobox" id="mkjdwz" style="width:240px;" 
	        data-options="editable:false,url:'<%=path%>/json/wz.json',valueField:'id',textField:'text'">
			</select>
	    </div>
	</div>
	
	<!-- 属性弹出窗口 -->
	<div id="sxWin" class="easyui-dialog" style="padding:20px" title='属性编辑窗口' data-options="iconCls:'icon-sx',width:400,height:240,closed:true,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){property.saveSx();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#sxWin').dialog('close');}
		}]">
		<div style="margin-top:5px">
	        <label style="width:60px">属性名称</label>
	        <input class="easyui-textbox" id="sxmc" data-options="width:240" />
	    </div>
	    <div style="margin-top:5px">
	        <label style="width:60px">属性顺序</label>
	        <select class="easyui-combobox" id="sxwz" style="width:240px;" 
	        data-options="editable:false,url:'<%=path%>/json/wz.json',valueField:'id',textField:'text'">
			</select>
	    </div>
	    <div style="margin-top:5px;color:#ff0000;font-weight:bold">
	    	注："坐标位置、经度、纬度、图片、视频"这五个属性系统已存在，无需新增。请新增或修改这五个属性以外的其他属性。
	    </div>
	</div>
	
	<!-- 文件弹出窗口 -->
	<div id="wjWin" class="easyui-dialog" style="padding:20px" title='图片编辑窗口' data-options="width:400,height:280,closed:true,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){picture.saveData();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#wjWin').dialog('close');}
		}]">
		<div style="margin-top:5px">
	        <label style="width:60px">所属模块</label>
	        <input id='win_pMTree' style="width:240px"/>
	    </div>
		<div style="margin-top:5px">
	        <label style="width:60px">图片名称</label>
	        <input class="easyui-textbox" id="wjmc" data-options="width:240" />
	    </div>
	    <div style="margin-top:5px">
	        <label style="width:60px">图片描述</label>
	        <input class="easyui-textbox" id="wjms" data-options="width:240,height:80,multiline:true"/>
	    </div>
	</div>
	
	<!-- 视频弹出窗口 -->
	<div id="spWin" class="easyui-dialog" style="padding:20px" title='视频编辑窗口' data-options="width:400,height:280,closed:true,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){video.saveData();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#spWin').dialog('close');}
		}]">
		<div style="margin-top:5px">
	        <label style="width:60px">所属模块</label>
	        <input id='win_vMTree' style="width:240px"/>
	    </div>
		<div style="margin-top:5px">
	        <label style="width:60px">视频名称</label>
	        <input class="easyui-textbox" id="spmc" data-options="width:240" />
	    </div>
	    <div style="margin-top:5px">
	        <label style="width:60px">视频描述</label>
	        <input class="easyui-textbox" id="spms" data-options="width:240,height:80,multiline:true"/>
	    </div>
	</div>
	
	<!-- 地图弹出窗口 -->
	<div id="mapWin" class="easyui-dialog" style="padding:0px;overflow:hidden" title='坐标采集窗口' 
	data-options="modal:true,width:600,height:600,closed:true,buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){mapCj.cjZb();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#mapWin').dialog('close');}
		}]">
		<iframe id="mapCj" name="mapCj" height="100%" width="100%" frameborder="0"></iframe>
	</div>
	
	<!-- 选择图片列表窗口 -->
	<div id="tpListWin" class="easyui-window" title='选择图片' data-options="width:750,height:500,closed:true">
		<div class="easyui-panel" style="padding:5px;width:700px;border:none">
   			<input id='pMTree2' style="width:200px"/>
   			<input id='tpname' class="easyui-textbox"/>
   			<a href="#" onclick="data.searchFile(1)" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
   			<a href="#" onclick="data.confirmFile(1)" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">确定</a>
		</div>
		<ul id="tpList" style="border:none"></ul>
	</div>
	
	<!-- 选择视频列表窗口 -->
	<div id="spListWin" class="easyui-window" title='选择视频' data-options="width:750,height:500,closed:true">
		<div class="easyui-panel" style="padding:5px;width:700px;border:none">
   			<input id='vMTree2' style="width:200px"/>
   			<input id='spname' class="easyui-textbox"/>
   			<a href="#" onclick="data.searchFile(2)" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
   			<a href="#" onclick="data.confirmFile(2)" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">确定</a>
		</div>
		<ul id="spList" style="border:none"></ul>
	</div>
	
	<!-- 日志窗口 -->
	<div id="logDlg" class="easyui-dialog" title='日志查看' data-options="width:900,height:600,closed:true,modal:true">
		<div class="easyui-panel" style="padding:5px;width:99%;border:none">
			<div>
	   			<label style="margin-right:5px">登录账号</label><input id='loguserid' style="margin-right:5px;height:25px"/>
	   			<label style="margin-right:5px">日志类型</label>
	   			<select id="logtype" style="margin-right:5px;height:25px">
	   				<option value="">全部</option>
	   				<option value="1">注册提交</option>
	   				<option value="2">前台登录</option>
	   				<option value="3">浏览首页</option>
	   				<option value="4">后台登录</option>
	   			</select>
	   			<label style="margin-right:5px">日志详情</label><input id='logcontent' style="margin-right:5px;height:25px"/>
	   			<label style="margin-right:5px">IP地址</label><input id='logip' style="margin-right:5px;height:25px"/>
			</div>
			<div style="margin-top:5px">
				<label>日志时间</label>
				<input id="logkssj" class="easyui-datetimebox"/> -- <input id="logjssj" class="easyui-datetimebox"/>
				<a href="#" onclick="log.search()" class="easyui-linkbutton" data-options="iconCls:'icon-search'" style="width:132px;margin-left:4px">查询</a>
			</div>
		</div>
		<ul id="logList"></ul>
	</div>
	<!-- 文本编辑窗口 -->
	<div id="textEditWin" class="easyui-dialog" style="padding:0px;overflow:hidden" title='文本编辑窗口' 
	data-options="modal:true,width:685,height:600,closed:true,buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){data.textEditSave();}
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){$('#textEditWin').dialog('close');}
		}]">
		<textarea id="kindcontent" style="width:100%;height:536px"></textarea>
	</div>
	
</body>
</html>