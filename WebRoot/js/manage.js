var manage = {};
manage.flag = 1;//标志 1添加 2修改
manage.mtreeid = null;//模块树id
manage.mid = null;//模块id
manage.init = function() {
	manage.extendValidator();
	manage.addLog();
};
//退出登录
manage.logout = function() {
	common.confirm("您确定要退出系统吗?", function(){
		window.location.href = path + '/login.jsp';
	});
};
//表单自定义扩展验证
manage.extendValidator = function() {
	$.extend($.fn.validatebox.defaults.rules, {
        //权限userid唯一
		qxuseridwy: {
			validator: function(value, param) {
				return manage.queryUserWyByUserid(value);
			},
			message: '用户名已存在'
		}
    });
};
//查询用户唯一BY Userid
manage.queryUserWyByUserid = function(userid) {
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
	return bool;
};
//用户列表
manage.userDataGrid = function() {
	$('#userList').datagrid({
		 url:path+"/xtgl/getUserByPage.action",
		 method:"post",
		 striped:true,
		 pagination:true,
		 singleSelect:true,
		 width:"100%",
		 height:"100%",
		 queryParams:{},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
		     //{field:'id',checkbox:true},
			 {field:'state',title:'审核状态',align:'center',formatter:function(value, rowData, rowIndex){
		    	 return value == "0" ? 
		    		"<img src='"+path+"/images/icons/accept.png'/>" : 
		    		"<img src='"+path+"/images/icons/delete.png'/>";
		     }},
			 {field:'userid',title:'用户名',align:'left'},
		     {field:'username',title:'姓名',align:'left'},
		     {field:'xb',title:'性别',align:'left',formatter:function(value, rowData, rowIndex){
		    	 return value == "0" ? "男" : "女";
		     }},
		     {field:'dw',title:'单位',align:'left'},
		     {field:'bm',title:'部门',align:'left'},
		     {field:'zw',title:'职位',align:'left'},
		     {field:'bgdh',title:'办公电话',align:'left'},
		     {field:'lxdh',title:'联系电话',align:'left'},
		     {field:'email',title:'邮箱',align:'left'},
		     {field:'isgly',title:'管理员',align:'left',formatter:function(value, rowData, rowIndex){
		    	 return value == "0" ? "是" : "否";
		     }}
		 ]],
		 toolbar: [{
			 text:"<input id='yhInput' style='height:20px'/>"
		 },{
			 text:"查询",
			 iconCls: 'icon-search',
	         handler: function() {
	        	 $('#userList').datagrid('load', {
	        		 uid: $.trim($("#yhInput").val())
	        	 });
	         }
		 },"-",{
			 text:"添加",
			 iconCls: 'icon-add',
	         handler: function() {
	        	 manage.flag = 1;//添加
	        	 $('#yhForm').form('load',{
	        		"user.id":"",
	 				"user.userid":"",
	 				"user.password":"",
	 				"user.username":"",
	 				"user.xb":0,
	 				"user.dw":"",
	 				"user.bm":"",
	 				"user.zw":"",
	 				"user.bgdh":"",
	 				"user.lxdh":"",
	 				"user.email":"",
	 				"user.lxdz":"",
	 				"user.isgly":1
	 			});
	        	$("#userid").textbox({
	 				disabled:false
	 			});
	         }
		 },"-",{
			 text:"删除",
			 iconCls: 'icon-remove',
	         handler: function() {
	        	 var row = $('#userList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
		        	 common.confirm("确定要删除吗?", function() {
		        		 $.ajax({
	        				type:"post",
	        				url:path + "/xtgl/delUserByUserid.action",
	        				data:{"user.id":row.id},
	        				async:true,
	        				dataType:"json",
	        				success:function(data) {
	        					if (data.result == "success") {
	        						common.alert("删除成功");
	        						manage.flag = 1;//添加
	        			        	 $('#yhForm').form('load',{
	        			        		"user.id":"",
	        			        		"user.userid":"",
	        			 				"user.password":"",
	        			 				"user.username":"",
	        			 				"user.xb":0,
	        			 				"user.dw":"",
	        			 				"user.bm":"",
	        			 				"user.zw":"",
	        			 				"user.bgdh":"",
	        			 				"user.lxdh":"",
	        			 				"user.email":"",
	        			 				"user.lxdz":"",
	        			 				"user.isgly":1
	        			 			});
	        			        	$("#userid").textbox({
	        			 				disabled:false
	        			 			});
	        			        	$('#userList').datagrid('load', {
	        				    		uid:$.trim($("#yhInput").val())
	        			       	 	});
	        					} else {
	        						common.error("删除失败");
	        					}
	        				}
	        			});
		        	 });
	        	 }
	         }
		 },"-",{
			 text:"通过审核",
			 iconCls: 'icon-shtg',
	         handler: function() {
	        	 var row = $('#userList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
		        	 $.ajax({
	     				type:"post",
	     				url:path + "/xtgl/updUserState.action",
	     				data:{"user.id":row.id,"user.state":"0"},
	     				async:true,
	     				dataType:"json",
	     				success:function(data) {
	     					if (data.result == "success") {
	     						 manage.flag = 1;//添加
	       			        	 $('#yhForm').form('load',{
	       			        		"user.id":"",
	       			        		"user.userid":"",
	       			 				"user.password":"",
	       			 				"user.username":"",
	       			 				"user.xb":0,
	       			 				"user.dw":"",
	       			 				"user.bm":"",
	       			 				"user.zw":"",
	       			 				"user.bgdh":"",
	       			 				"user.lxdh":"",
	       			 				"user.email":"",
	       			 				"user.lxdz":"",
	       			 				"user.isgly":1
	       			 			});
	       			        	$("#userid").textbox({
	       			 				disabled:false
	       			 			});
	       			        	$('#userList').datagrid('load', {
	       				    		uid:$.trim($("#yhInput").val())
	       			       	 	});
	     					}
	     				}
		        	 });
	        	 }
	         }
		 },"-",{
			 text:"审核不通过",
			 iconCls: 'icon-shbtg',
	         handler: function() {
	        	 var row = $('#userList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
		        	 $.ajax({
	     				type:"post",
	     				url:path + "/xtgl/updUserState.action",
	     				data:{"user.id":row.id,"user.state":"1"},
	     				async:true,
	     				dataType:"json",
	     				success:function(data) {
	     					if (data.result == "success") {
	     						 manage.flag = 1;//添加
	       			        	 $('#yhForm').form('load',{
	       			        		"user.id":"",
	       			        		"user.userid":"",
	       			 				"user.password":"",
	       			 				"user.username":"",
	       			 				"user.xb":0,
	       			 				"user.dw":"",
	       			 				"user.bm":"",
	       			 				"user.zw":"",
	       			 				"user.bgdh":"",
	       			 				"user.lxdh":"",
	       			 				"user.email":"",
	       			 				"user.lxdz":"",
	       			 				"user.isgly":1
	       			 			});
	       			        	$("#userid").textbox({
	       			 				disabled:false
	       			 			});
	       			        	$('#userList').datagrid('load', {
	       				    		uid:$.trim($("#yhInput").val())
	       			       	 	});
	     					}
	     				}
		        	 });
	        	 }
	         }
		 }],
		 onClickRow:function(index,row){
			 manage.flag = 2;//修改
			$('#yhForm').form('load',{
				"user.id":row.id,
				"user.userid":row.userid,
				"user.password":row.password,
				"user.username":row.username,
				"user.xb":row.xb,
				"user.dw":row.dw,
				"user.bm":row.bm,
				"user.zw":row.zw,
				"user.bgdh":row.bgdh,
				"user.lxdh":row.lxdh,
				"user.email":row.email,
				"user.lxdz":row.lxdz,
				"user.isgly":row.isgly
			});
			$("#userid").textbox({
				disabled:true
			});
		 }
	});
};
//加载用户模块
manage.showUser = function() {
	manage.hideAll();
	$("#yhListDiv").show(manage.userDataGrid);
	$("#yhBjDiv").show();
	manage.flag = 1;
};
//添加用户
manage.addUser = function() {
	$.messager.progress();
	$('#yhForm').form('submit', {
	    url:path+"/xtgl/addUser.action",
	    onSubmit: function(param) {
	    	var isValid = $(this).form('validate');
	    	if (!isValid) {
	    		$.messager.progress('close');
	    	}
			return isValid;
	    },
	    success:function(data) {
	    	$.messager.progress('close');
	    	common.alert("保存成功");
	    	$('#userList').datagrid('load', {
	    		uid:$.trim($("#yhInput").val())
       	 	});
	    }
	});
};
//修改用户
manage.updUser = function() {
	$.messager.progress();
	$('#yhForm').form('submit', {
	    url:path+"/xtgl/updUser.action",
	    onSubmit: function(param) {
	    	var isValid = $(this).form('validate');
	    	if (!isValid) {
	    		$.messager.progress('close');
	    	}
			return isValid;
	    },
	    success:function(data) {
	    	$.messager.progress('close');
	    	common.alert("保存成功");
	    	$('#userList').datagrid('load', {
	    		uid:$.trim($("#yhInput").val())
       	 	});
	    }
	});
};
//保存用户
manage.saveUser = function() {
	if (manage.flag == 1) {
		manage.addUser();
	} else {
		manage.updUser();
	}
};
///////////////////////////////////////////////////////////////
//加载模块管理
manage.showModule = function() {
	manage.hideAll();
	$("#mkTreeDiv").show(manage.moduleTree);
	manage.flag = 1;
};
//模块管理tree
manage.moduleTree = function() {
	$("#moduleTree").tree({
		url:path+"/xtgl/getModuleByParentid.action?module.parentid=-1",
		method:"post",
		lines:true,
		animate:true,
		onBeforeExpand:function(node, param) {
			$("#moduleTree").tree("options").url = 
				path+"/xtgl/getModuleByParentid.action?module.parentid=" + node.id
		},
		onDblClick:function(node){
			$('#moduleTree').tree('toggle', node.target);
		},
		onClick:function(node){
			manage.mtreeid = node.id;
			$("#mkTreeChildDiv").show(manage.mkTreeChildList);
		}
	});
};
//模块节点列表
manage.mkTreeChildList = function() {
	$('#mkTreeChildList').datagrid({
		 url:path+"/xtgl/getModuleByParentid.action",
		 method:"post",
		 striped:true,
		 singleSelect:true,
		 width:"100%",
		 height:"100%",
		 queryParams:{"module.parentid":manage.mtreeid},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
			 {field:'mname',title:'模块节点',align:'left'},
		     {field:'wz',title:'顺序',align:'left'}
		 ]],
		 toolbar: [{
			 text:"添加",
			 iconCls: 'icon-add',
	         handler: function() {
	        	 $("#mkjdmc").textbox("setValue", "");
	        	 $("#mkjdwz").combobox("setValue", "1");
	        	 $("#mkjdWin").dialog("open");
	        	 manage.flag = 1;
	         }
		 },"-",{
			 text:"修改",
			 iconCls: 'icon-edit',
	         handler: function() {
	        	 var row = $('#mkTreeChildList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
	        		 manage.flag = 2;
	        		 $("#mkjdmc").textbox("setValue", row.mname);
		        	 $("#mkjdwz").combobox("setValue", row.wz);
		        	 $("#mkjdWin").dialog("open");
		        	 manage.mid = row.id;
	        	 }
	         }
		 },"-",{
			 text:"删除",
			 iconCls: 'icon-remove',
	         handler: function() {
	        	 var row = $('#mkTreeChildList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
	        		 common.confirm("确定要删除吗?", function() {
		        		 $.ajax({
	        				type:"post",
	        				url:path + "/xtgl/delModuleById.action",
	        				data:{"module.id":row.id},
	        				async:true,
	        				dataType:"json",
	        				success:function(data) {
	        					if (data.result == "success") {
	        						common.alert("删除成功");
	        						$('#mkTreeChildList').datagrid("load");
	        						var node = $('#moduleTree').tree('find',manage.mtreeid);
	        						$("#moduleTree").tree("reload",node.target);
	        					}
	        				}
		        		 });
	        		 });
	        	 }
	         }
		 }]
	});
};
//添加模块
manage.addMk = function() {
	var mc = $.trim($("#mkjdmc").textbox("getValue"));
	var wz = $("#mkjdwz").combobox("getValue");
	if (mc == "") {
		common.warning("模块节点名称不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/addModule.action",
		data:{"module.mname":mc,"module.wz":wz,"module.parentid":manage.mtreeid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#mkjdWin").dialog("close");
				common.alert("添加成功");
				$('#mkTreeChildList').datagrid("load");
				var node = $('#moduleTree').tree('find',manage.mtreeid);
				$("#moduleTree").tree("reload",node.target);
			}
		}
	});
};
//修改模块节点
manage.updMk = function() {
	var mc = $.trim($("#mkjdmc").textbox("getValue"));
	var wz = $("#mkjdwz").combobox("getValue");
	if (mc == "") {
		common.warning("模块节点名称不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/updModuleById.action",
		data:{"module.mname":mc,"module.wz":wz,"module.id":manage.mid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#mkjdWin").dialog("close");
				common.alert("修改成功");
				$('#mkTreeChildList').datagrid("load");
				var node = $('#moduleTree').tree('find',manage.mtreeid);
				$("#moduleTree").tree("reload",node.target);
			}
		}
	});
};
//保存模块
manage.saveMk = function() {
	if (manage.flag == 1) {
		manage.addMk();
	} else {
		manage.updMk();
	}
};
//隐藏所有面板
manage.hideAll = function() {
	//用户
	$("#yhListDiv").hide();
	$("#yhBjDiv").hide();
	//模块
	$("#mkTreeDiv").hide();
	$("#mkTreeChildDiv").hide();
	//属性
	$("#propertyDiv").hide();
	$("#propertyListDiv").hide();
	//图片
	$("#pictureDiv").hide();
	$("#pictureFormDiv").hide();
	//视频
	$("#videoDiv").hide();
	$("#videoFormDiv").hide();
	//数据
	$("#dataDiv").hide();
	$("#dataFormDiv").hide();
};
//添加日志
manage.addLog = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/addLog.action",
		data:{
			"logvo.userid":USERID,
			"logvo.content":"后台访问",
			"logvo.ip":IPADDRESS,
			"logvo.type":"4"
		},
		async:true,
		dataType:"json",
		success:function(data) {}
	});
};