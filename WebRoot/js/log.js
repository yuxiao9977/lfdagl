var log = {};
//查询日志
log.showLogs = function() {
	$("#logDlg").dialog("open");
	$('#logList').datagrid({
		 url:path+"/xtgl/getLogByPage.action",
		 method:"post",
		 striped:true,
		 singleSelect:true,
		 pagination:true,
		 width:"100%",
		 height:600-104,
		 pageSize:50,
		 queryParams:{},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
			 {field:'userid',title:'登录账号',align:'left',width:100},
		     {field:'type',title:'日志类型',align:'left',width:100,formatter:function(value, rowData, rowIndex){
		    	 if (value == "1") {
		    		 return "注册提交";
		    	 } else if (value == "2") {
		    		 return "前台登录";
		    	 } else if (value == "3") {
		    		 return "浏览首页";
		    	 } else {
		    		 return "后台登录";
		    	 }
		     }},
		     {field:'content',title:'日志详情',align:'left',width:200},
		     {field:'ip',title:'IP地址',align:'left',width:200},
		     {field:'logtime',title:'日志时间',align:'left',width:150}
		 ]]
	});
};
//搜索日志
log.search = function() {
	var loguserid = $.trim($("#loguserid").val());
	var logtype = $("#logtype").val();
	var logcontent = $.trim($("#logcontent").val());
	var logip = $.trim($("#logip").val());
	var logkssj = $("#logkssj").datetimebox("getValue");
	var logjssj = $("#logjssj").datetimebox("getValue");
	$('#logList').datagrid("load", {
		userid:loguserid,content:logcontent,ip:logip,type:logtype,kssj:logkssj,jssj:logjssj
	});
};