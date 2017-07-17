<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String mapPath = "http://123.57.18.49:8083";
	String mapServerPath = "http://sampleserver6.arcgisonline.com";
	String x = request.getParameter("x");
	String y = request.getParameter("y");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>map</title>
<style type="text/css">
	html,body {
		margin:0px;padding:0px;height:100%;width:100%;
	}
</style>
<script type="text/javascript">
	var path = "<%=path%>";
	var mapPath = "<%=mapPath%>";
	var mapServerPath = "<%=mapServerPath%>";
	var _MapApp = null;
	var X = 111.51266;//初始化经度
	var Y = 36.08818;//初始化纬度
	var level = 10;//初始化级别
	var zbx = "<%=x%>";
	var zby = "<%=y%>";
	//初始地图
	function init() {
		if (zbx == "" || zby == "") {
			zbx = X;
			zby = Y;
		}
		_MapApp = new YTMap("map", {
			logo:false,
			slider:true,
			autoResize:true,
			center:[zbx, zby],
			zoom:level
		});
		require(["tdtlib/TDTLayer", "tdtlib/TDTYXLayer", "tdtlib/TDTAnnoLayer"],
		    function(TDTLayer, TDTYXLayer, TDTAnnoLayer) {
		        _MapApp.map.addLayer(new TDTLayer());//
		        _MapApp.map.addLayer(new TDTAnnoLayer());//文字
		});
		_MapApp.map.on("dbl-click", function(evt) {
			_MapApp.clear();
			var pImg = _MapApp.PicMarker(Number(evt.mapPoint.x).toFixed(5),
					Number(evt.mapPoint.y).toFixed(5),path+"/img/onePoint.png",26,31,null,null,null);
			_MapApp.addGraphic(pImg);
			zbx = Number(evt.mapPoint.x).toFixed(5);
			zby = Number(evt.mapPoint.y).toFixed(5);
		});
		_MapApp.mapload(function() {
			_MapApp.addGraphic(_MapApp.PicMarker(zbx,zby,path+"/img/onePoint.png",26,31,null,null,null));
		});
	}
	function cjZb() {
		parent.$("#zbx").textbox("setValue", zbx);
		parent.$("#zby").textbox("setValue", zby);
		parent.$("#mapWin").dialog("close");
	}
</script>
<script type="text/javascript" src="<%=path%>/js/arcgis.js"></script>
<script type="text/javascript" src="<%=path%>/js/ytmap.js"></script>
</head>
<body onload="init()">
	<div id="map" style="padding:0px;width:100%;height:100%"></div>
</body>
</html>