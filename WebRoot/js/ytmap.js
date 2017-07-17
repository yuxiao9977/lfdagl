/**
 * 地图全局变量,仅适用本类
 */
var _self = null;
/**
 * 易图MAP对象 YTMap
 * @author yuxiao
 * @param id map容器id
 * @param opts 地图加载参数
 */
var YTMap = function(id, opts) {
	_self = this;
	this.mapid = id;//地图容器id
	this.options = opts;//地图初始化参数
	this.map;//地图对象
	this.geometryService;//几何服务
	//this.printService;//打印服务
	this.geometry;//几何
	this.draw;//绘画工具
	this.navToolbar;//导航工具条
	this.init();//地图初始化方法
	return _self;
};
/**
 * 初始化地图
 */
YTMap.prototype.init = function() {
	esriConfig.defaults.io.proxyUrl = mapPath + "/proxy.jsp";
	esriConfig.defaults.io.alwaysUseProxy = false;
	require(["esri/map"
		, "esri/toolbars/draw"
		, "esri/tasks/GeometryService"
		//, "esri/tasks/PrintTask"
		, "esri/toolbars/navigation"
		], 
		function(Map
		, Draw
		, GeometryService
		//, PrintTask
		, Navigation
		) {
			_self.map = new Map(_self.mapid, _self.options);
			_self.draw = new Draw(_self.map);
			_self.geometryService = new GeometryService(mapServerPath + "/arcgis/rest/services/Utilities/Geometry/GeometryServer");
			//_self.printService = new PrintTask(mapServerPath + "/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
			_self.navToolbar = new Navigation(_self.map);
	});
};
/**
 * 地图加载完毕
 */
YTMap.prototype.mapload = function(callback) {
	this.map.on("load", function() {
		callback();
	});
};
/**
 * 放大地图
 */
YTMap.prototype.zoomIn = function() {
	this.navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
};
/**
 * 缩小地图
 */
YTMap.prototype.zoomOut = function() {
	this.navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
};
/**
 * 平移
 */
YTMap.prototype.pan = function() {
	this.navToolbar.activate(esri.toolbars.Navigation.PAN);
};
/**
 * 测距
 */
YTMap.prototype.measure = function() {
	this.pan();
	_self.draw.activate(esri.toolbars.Draw.POLYLINE);
	_self.draw.on("draw-end", function(evt) {
		_self.draw.deactivate();
		_self.geometry = evt.geometry;
		var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, 
			new dojo.Color("#000000"), 2);
		var graphic = new esri.Graphic(_self.geometry, symbol);
		_self.map.graphics.add(graphic);
		
		var lengthParams = new esri.tasks.LengthsParameters();
        lengthParams.polylines = [_self.geometry];
        lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
        lengthParams.geodesic = true;
        lengthParams.polylines[0].spatialReference = new esri.SpatialReference(4326);
        _self.geometryService.lengths(lengthParams);
        dojo.connect(_self.geometryService, "onLengthsComplete", _self.outputMeasure);
	});
};
/**
 * 测面积
 */
YTMap.prototype.measureArea = function() {
	this.pan();
	_self.draw.activate(esri.toolbars.Draw.POLYGON);
	_self.draw.on("draw-end", function(evt) {
		_self.draw.deactivate();
		_self.geometry = evt.geometry;
		var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, 
			new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, 
			new dojo.Color("#ff0000"), 2), new dojo.Color([255, 255, 0, 0.25]));
		var graphic = new esri.Graphic(_self.geometry, symbol);
		_self.map.graphics.add(graphic);
		
		var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();  
	    areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;  
	    areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;  
	    var outSR = new esri.SpatialReference({ wkid: 102113 });  
	    _self.geometryService.project([_self.geometry], outSR, function (geometry) {
	    	_self.geometryService.simplify(geometry, function (simplifiedGeometries) { 
	            areasAndLengthParams.polygons = simplifiedGeometries;  
	            areasAndLengthParams.polygons[0].spatialReference = new esri.SpatialReference(102113);  
	            _self.geometryService.areasAndLengths(areasAndLengthParams);  
	        });  
	    });  
	    dojo.connect(_self.geometryService, "onAreasAndLengthsComplete", _self.outputMeasure);
	});
};
/**
 * 测量结果输出
 */
YTMap.prototype.outputMeasure = function(result) {
	if (_self.geometry.type == "polyline") {
	    var CurX = _self.geometry.paths[0][_self.geometry.paths[0].length - 1][0];
	    var CurY = _self.geometry.paths[0][_self.geometry.paths[0].length - 1][1];
	    var  CurPos = new esri.geometry.Point(CurX, CurY, _self.map.spatialReference);
	    _self.map.infoWindow.setTitle("距离测量");
	    _self.map.infoWindow.setContent("测 量 长 度： <strong>" + parseInt(String(result.lengths[0])) + "米</strong>");
	    _self.map.infoWindow.show(CurPos);
	} else {
		var CurX = (_self.geometry.cache._extent.xmax + _self.geometry.cache._extent.xmin) / 2;  
	    var CurY = (_self.geometry.cache._extent.ymax + _self.geometry.cache._extent.ymin) / 2  
	    var CurPos = new esri.geometry.Point(CurX, CurY, _self.map.spatialReference);
	    _self.map.infoWindow.setTitle("面积测量");
	    var mj = parseInt(String(result.areas[0]));
	    _self.map.infoWindow.setContent("面积： <strong>" + mj + "平方米</strong>" +
	    		"(" + mj*0.0015 + "亩)<br/>" +
	    "周长：" + parseInt(String(result.lengths[0])) + "米");
	    _self.map.infoWindow.show(CurPos);
	}
};
/**
 * 地图清除
 */
YTMap.prototype.clear = function() {
//	this.pan();
	this.map.graphics.clear();//清除几何图形
	this.map.infoWindow.hide();//隐藏气泡
};
/**
 * 指定地图图层清除
 */
YTMap.prototype.clearLayer = function(graphicLayer) {
	graphicLayer.clear();//清除几何图形
	this.map.infoWindow.hide();//隐藏气泡
};
/**
 * 点对象
 */
YTMap.prototype.Point = function(_x, _y) {
	return new esri.geometry.Point(_x, _y, _self.map.spatialReference);
};
/**
 * 图片注点
 */
YTMap.prototype.PicMarker = function(_x, _y, url, _width, _height, title, content, obj) {
	var pt = this.Point(_x, _y);
	var pms = new esri.symbol.PictureMarkerSymbol(url , _width, _height);
	var gImg = new esri.Graphic(pt, pms);
	gImg.setAttributes({"x":_x,"y":_y,"url":url,"height":_height,
		"width":_width,"title":title,"content":content,"obj":obj
	});
	if (title != null && content != null) {
		gImg.setInfoTemplate(new esri.InfoTemplate(gImg.attributes.title, gImg.attributes.content));
	}
	return gImg;
};
/**
 * 地图默认图层添加几何对象
 */
YTMap.prototype.addGraphic = function(graphic) {
	this.map.graphics.add(graphic);
};
/**
 * 指定地图图层添加几何对象
 * layer：esri.layers.GraphicsLayer
 * graphic：esri.Graphic
 */
YTMap.prototype.addGraphicToLayer = function(layer , graphic){
	layer.add(graphic);
};
/**
 * 地图默认图层删除几何对象
 */
YTMap.prototype.delGraphic = function(graphic) {
	this.map.graphics.remove(graphic);
};
/**
 * 指定地图图层删除几何对象
 * layer：esri.layers.GraphicsLayer
 * graphic：esri.Graphic
 */
YTMap.prototype.delGraphicFromLayer = function(layer , graphic){
	layer.remove(graphic);
};
/**
 * 地图打印
 */
/*YTMap.prototype.print = function() {
    var template = new esri.tasks.PrintTemplate();
    template.exportOptions = {  
        width: 800,  
        height: 600,  
        dpi: Number(300) 
    };  
    template.format = "PDF";
    template.layout = "A3 Portrait";
    template.preserveScale = false;
    var params = new esri.tasks.PrintParameters();
    params.map = _self.map;
    params.template = template;
    alert(_self.printService + "   " + params);
    _self.printService.execute(params, function(evt) {
    	alert(2);
        window.open(evt.url, "_blank");
    });
};*/
/**
 * 线对象
 * 点集合[[x1,y1],[x2,y2],...]
 * color 边框颜色 例:new dojo.Color([0, 0, 255])|new dojo.Color("#0000ff")
 * width 边框宽度 一般设置为2
 */
YTMap.prototype.polyline = function(pintArr, color, width) {
	var geometry = new esri.geometry.Polyline({"paths":[pintArr],"spatialReference":{"wkid":4326}});
	var lineSymbol = new esri.symbol.CartographicLineSymbol(
		esri.symbol.CartographicLineSymbol.STYLE_SOLID, color, width,
		esri.symbol.CartographicLineSymbol.CAP_ROUND,
		esri.symbol.CartographicLineSymbol.JOIN_MITER, 5
	);
	return new esri.Graphic(geometry, lineSymbol);
};
/**
 * 面对象
 * 点集合[[x1,y1],[x2,y2],...]
 * color 边框颜色 例 new dojo.Color("#336699")
 * width 边框宽度 一般设置为2
 * fillColor 填充颜色, 可设置透明度 例 new dojo.Color([0, 0, 255, 0.1])
 */
YTMap.prototype.polygon = function(pintArr, color, width, fillColor) {
	var geometry = new esri.geometry.Polygon({"rings":[pintArr],"spatialReference":{"wkid":4326}});
	var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
		new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, 
		color, width), //边框的颜色
		fillColor //填充颜色
	);
	return new esri.Graphic(geometry, symbol);
};