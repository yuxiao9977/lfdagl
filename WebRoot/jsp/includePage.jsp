<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.yx.sm.frame.xtgl.vo.UserVO" %>
<%
	String path = request.getContextPath();
	String mapPath = "http://123.57.18.49:8083";
	String mapServerPath = "http://sampleserver6.arcgisonline.com";
	UserVO uservo = (UserVO)request.getSession(false).getAttribute("uservo");
%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<!-- easyui 自定义图标 -->
<link rel="stylesheet" type="text/css" href="<%=path%>/css/easy-icon.css">
<%-- jquery 1.11.3 --%>
<script type="text/javascript" src="<%=path%>/jquery/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/jquery/jquery.form.js"></script>
<%-- bootstrap3.3.5 本地 --%>
<link rel="stylesheet" type="text/css" href="<%=path%>/bootstrap/css/mybootstrap.css">
<script type="text/javascript" src="<%=path%>/bootstrap/js/mybootstrap.js"></script>
<%-- bootstrap treeview --%>
<link rel="stylesheet" type="text/css" href="<%=path%>/bootstrap/css/bootstrap-treeview.css">
<script type="text/javascript" src="<%=path%>/bootstrap/js/bootstrap-treeview.js"></script>
<%-- bootstrap table --%>
<link rel="stylesheet" type="text/css" href="<%=path%>/bootstrap/table/bootstrap-table.css">
<script type="text/javascript" src="<%=path%>/bootstrap/table/bootstrap-table.js"></script>
<script type="text/javascript" src="<%=path%>/bootstrap/table/bootstrap-table-zh-CN.js"></script>
<%-- easyui1.5 --%>
<link rel="stylesheet" type="text/css" href="<%=path%>/easyui1.5/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=path%>/easyui1.5/themes/icon.css">
<script type="text/javascript" src="<%=path%>/easyui1.5/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path%>/easyui1.5/locale/easyui-lang-zh_CN.js"></script>
<%-- 搜狐IP接口 --%>
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<%-- logo设置 --%>
<link rel="Shortcut Icon" type="image/x-icon" href="<%=path%>/images/logo3.png">
<%-- 全局 JS --%>
<script type="text/javascript">
	var path = "<%=path%>";
	var mapPath = "<%=mapPath%>";
	var mapServerPath = "<%=mapServerPath%>";
	var _MapApp = null;
	var isLogin = '<%=(uservo == null) ? "no" : "yes"%>';
	var USERID = '<%=(uservo == null) ? "-1" : uservo.getUserid()%>';
	var IPADDRESS = returnCitySN["cip"]+'【'+returnCitySN["cname"]+'】';
</script>
<%-- 全局CSS --%>
<style type="text/css">
	* {
		font-family: '宋体';
	}
	html,body {
		margin:0px;padding:0px;height:100%;width:100%;
	}
	.clearSpace {
		margin:0px;padding:0px;
	}
	video::-webkit-media-controls-enclosure {
    	overflow:hidden;
	}
	video::-webkit-media-controls-panel {
	     width: calc(100% + 40px);
	}
</style>
<%-- 通用JS --%>
<script type="text/javascript" src="<%=path%>/js/common.js"></script>