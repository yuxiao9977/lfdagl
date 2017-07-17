var index = {};
index.X = 111.51266;//初始化经度
index.Y = 36.08818;//初始化纬度
index.level = 10;//初始化级别
index.mapLayer = null;//矢量图层
index.wxMapLayer = null;//卫星图层
index.wzLayer = null;//文字图层
index.layer1 = null;//图层1 全局数据
index.layer2 = null;//图层2 查询数据
index.dttc = 0;//地图图层
index.li = null;//目录列表项
index.headli = null;//头目录项

index.mid = null;//模块id
index.headliId = 4;//头id 地图
index.dhlj = new Array();//导航路径
index.propertyArr = new Array();//列表属性集合
index.propertyAllArr = new Array();//所有属性集合
index.zyMap = new Array();

index.fjpage = 1;//附件当前页数
index.fjrows = 40;//附件每页个数

index.mapTotal = 1000;//地图上最大显示1000个点
index.mapRows = 9;//地图列表每页个数

//创建地图并加载
index.onload = function() {
	index.createMap();
	_MapApp.mapload(index.init);
};

//初始化
index.init = function() {
	$("button[data-toggle='tooltip']").btooltip();
	$("#mapLevel").html(_MapApp.map.getZoom() + "/" + _MapApp.map.getMaxZoom());
	$("#mainPanel").css({"height":($(window).height()-$("#navDiv").height()-80)});
	$("#leftPanel").css({"height":($(window).height()-$("#navDiv").height()-80)});
	$("#xyDiv").html("X:"+index.X+" Y:"+index.Y);
	$("#xtdate").html(common.nowDate);
	index.getMkTree();
	index.headli = $("#sya");//首页选中
	index.addLog();//添加访问日志
};
//初始化模块树数据
index.getMkTree = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/getAllModuleTree.action",
		data:{"id":"10000"},
		async:false,
		dataType:"json",
		success:function(data) {
			$('#mkTree').treeview({//初始化模块树
				data: data,
				backColor: '#184967',
				color:"#fff",
				borderColor:"#656565",
				onhoverColor:"#355d76",
				selectedBackColor:"#003654",
				levels:2,
				onNodeSelected: function(event, data) {
					index.mid = data.id;
					index.dhlj = new Array();
					var node = $('#mkTree').treeview('getParent', data);
					while (node.id != undefined) {
						index.dhlj.splice(0, 0, node.text);
						node = $('#mkTree').treeview('getParent', node);
					}
					index.dhlj.push(data.text);
					index.propertyArr = new Array();
					index.propertyArr.push({title:'序号',formatter:function(value,row,index){return index+1;}});
					var pArr = eval("(" + data.properties + ")");
					for (var key in pArr) {
						index.propertyArr.push({field:key,title:pArr[key],align:'left',formatter:function(value,row,index){
							return value.split("####")[0];
						}});
					}
					index.propertyArr.push({field:'id',title:'操作',align:'center',formatter:function(value,row,index) {
							return '<a href="#">详情</a>';
					}});
					index.propertyAllArr = eval("(" + data.allProperties + ")");
					if (index.headliId == 1) {
						index.hideAll();
						index.showDh("档案信息", "daxxDiv");
						index.showData();
					} else if (index.headliId == 2) {
						index.hideAll();
						index.showDh("照片影像", "tpxxDiv");
						index.showPicture(1);
					} else if (index.headliId == 3) {
						index.hideAll();
						index.showDh("视频资源", "spxxDiv");
						index.showVideo(1);
					}
				}
			});
			
		}
	});
};
//初始化地图
index.createMap = function() {
	_MapApp = new YTMap("map", {
		logo:false,
		slider:true,
		autoResize:true,
		center:[index.X, index.Y],
		zoom:index.level
	});
	require(["tdtlib/TDTLayer", "tdtlib/TDTYXLayer", "tdtlib/TDTAnnoLayer"],
	    function(TDTLayer, TDTYXLayer, TDTAnnoLayer) {
			index.mapLayer = new TDTLayer();//矢量
	        _MapApp.map.addLayer(index.mapLayer);
	        //var MyTiledMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mapServerPath + "/arcgis/rest/services/YituSsgl_hlj/MapServer");
	    	//_MapApp.map.addLayer(MyTiledMapServiceLayer);
	    	index.wzLayer = new TDTAnnoLayer();//文字
	        _MapApp.map.addLayer(index.wzLayer);
	        index.wxMapLayer = new TDTYXLayer();

	        index.layer1 = new esri.layers.GraphicsLayer();
	        _MapApp.map.addLayer(index.layer1);
	        index.layer2 = new esri.layers.GraphicsLayer();
	        _MapApp.map.addLayer(index.layer2);
	        
	});
	index.addMapEvents();
	index.dttc = 1;
};
//切换卫星地图
index.changeWXMap = function() {
	if (index.dttc != 2) {
		_MapApp.map.removeLayer(index.mapLayer);
		_MapApp.map.addLayer(index.wxMapLayer, 0);
		index.dttc = 2;
	}
};
//切换地图
index.changeMap = function() {
	if (index.dttc != 1) {
		_MapApp.map.removeLayer(index.wxMapLayer);
		_MapApp.map.addLayer(index.mapLayer, 0);
		index.dttc = 1;
	}
};
//切换地图图层
index.changeMapLayer = function(i) {
	if (i == 1) {
		index.changeMap();
	} else {
		index.changeWXMap();
	}
};
//地图操作
index.mapOper = function(p, tit) {
	switch (tit) {
		case "放大" : 
			_MapApp.zoomIn();
			break;
		case "缩小" : 
			_MapApp.zoomOut();
			break;
		case "测距" : 
			_MapApp.measure();
			break;
		case "测面积" : 
			_MapApp.measureArea();
			break;
		case "清除" : 
			_MapApp.clear();
			_MapApp.clearLayer(index.layer1);
			_MapApp.clearLayer(index.layer2);
			$("#zyDiv").html("");
			$("#zyDlg").window("close");
			break;
		case "平移" : 
			_MapApp.pan();
			break;
		/*
		case "打印" : 
			_MapApp.print();
			break;
		*/
		case "返回" : 
			index.mapBack();
			break;
	}
};
//地图返回
index.mapBack = function() {
	_MapApp.pan();
	_MapApp.map.centerAndZoom(_MapApp.Point(index.X, index.Y), index.level);
};
//地图事件
index.addMapEvents = function() {
	_MapApp.map.on("mouse-move", function(evt) {
		$("#xyDiv").html("X:"+Number(evt.mapPoint.x).toFixed(5)+" Y:"+Number(evt.mapPoint.y).toFixed(5));
	});
	_MapApp.map.on("zoom-end", function() {
		$("#mapLevel").html(_MapApp.map.getZoom() + "/" + _MapApp.map.getMaxZoom());
	});
};
//退出登录
index.logout = function() {
	common.confirm("您确定要退出系统吗?", function() {
		window.location.href = path + '/login.jsp';
	});
};
//选中头li
index.selectHeadLi = function(p, i) {
	if ((i == 2 || i == 3) && isLogin != "yes") {
		common.warning("请登录后查看");return;
	}
	if (index.headli != null) {
		$(index.headli).attr("class", "");
	}
	$(p).attr("class", "active");
	index.headli = p;
	index.hideAll();
	if (i == 1) {
		index.showDh("档案信息","daxxDiv");
		index.showData();
	} else if (i == 2) {
		index.showDh("照片影像","tpxxDiv");
		index.showPicture(1);
	} else if (i == 3) {
		index.showDh("视频资源","spxxDiv");
		index.showVideo(1);
	} else if (i == 4) {
		$("#map,#maptoolbar,#xyDiv,#stqhDiv").show();
		if ($("#zyDiv").html() != "") {
			$("#zyDlg").window("open");
		}
	}
	index.headliId = i;
};
//首页刷新
index.refresh = function() {
	window.location.href = path + '/jsp/index.jsp';
};
//隐藏所有
index.hideAll = function() {
	$("#map,#daxxDiv,#daxqDiv,#tpxxDiv,#spxxDiv,#maptoolbar,#xyDiv,#stqhDiv").hide();
	$("#zyDlg").window("close");
};
//显示导航
index.showDh = function(mc, div) {
	var dhxx = '<ol class="breadcrumb" style="color:#336699"><li><span class="glyphicon glyphicon-th-large"></span> ' + mc + '</li>';
	var dhlj = index.dhlj;
	for (var i = 0; i < dhlj.length; i++) {
		dhxx += '<li>' + dhlj[i] + '</li>';
	}
	dhxx += '</ol>';
	$("#"+div).html(dhxx).show();
};
//显示数据
index.showData = function() {
	$("#daxxDiv").append('<table id="btable"></table>');
	index.showDataTable();
};
//显示数据表格
index.showDataTable = function() {
	$("#btable").bootstrapTable({
		method:"post",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		toggle:"table",
		pagination: true,
		url:path+"/xtgl/getDataTableByPage.action",
		pageSize:20,
		striped: true,
		//toolbar:"#toolbar",
		queryParams : function(params) {
            return {
            	sr: params.offset,
            	rows: params.limit,
            	mid: index.mid,
            	mc: $.trim($("#gjzInput").val())
            };
        },
        cache:false,
        sidePagination: "server",
        pageList: [20,50],
		dataType: "json",
		//showColumns: true,
		//showRefresh: true,
		//search: true,
		columns: index.propertyArr,
		onClickCell: function(field, value, row, td) {
			if (field == "id") {
				if (isLogin == "yes") {
					index.showDaxq(row);
				} else {
					common.warning("请登录后查看");
				}
			}
		}
	});
};
//关键字查询
index.search = function() {
	if (isLogin == "yes") {
		if (index.headliId == 1 && index.mid != null) {
			$("#btable").bootstrapTable("refresh",{
				query:{sr:0}
			});
		} else if (index.headliId == 2) {
			index.hideAll();
			index.showDh("照片影像","tpxxDiv");
			index.showPicture(1);
		} else if (index.headliId == 3) {
			index.hideAll();
			index.showDh("视频资源","spxxDiv");
			index.showVideo(1);
		} else if (index.headliId == 4 && index.mid != null) {
			index.searchMapData();
		}
	} else {
		common.warning("请登录后查询");
	}
};
//档案详情
index.showDaxq = function(row) {
	index.hideAll();
	var dhxq = '<ol class="breadcrumb" style="color:#336699"><li><span class="glyphicon glyphicon-th-large"></span> 档案信息</li>';
	for (var i = 0; i < index.dhlj.length; i++) {
		dhxq += '<li>' + index.dhlj[i] + '</li>';
	}
	dhxq += '<li>详情</li></ol>';
	
	var pArr = index.propertyAllArr;
	dhxq += '<h3 style="margin-bottom:35px">'+row.mc+'</h3>';
	for (var key in pArr) {
		if (key == "dz" || key == "mc") {
			continue;
		}
		var val = row[key].split("####");
		var value = $.trim(val[1]) == "" ? val[0] : val[1];
		dhxq += '<div style="margin-top:10px"><label style="width:90px;vertical-align:top;">' + pArr[key] + '</label>'
	         + '<label style="font-weight:normal;width:670px;vertical-align:top;margin-left:10px">' + value + '</label></div>';
	}
	if (row.x != "" && row.y != "") {
		dhxq += '<hr style="border-top:1px solid #d1d1d1"/>';
		dhxq += '<span style="font-size:18px" class="label label-default">地图定位</span><br/>';
		dhxq += '<iframe style="margin-top:20px" height="300px" width="400px" frameborder="0" src="'+path+'/jsp/mapDW.jsp?x='+row.x+'&y='+row.y+'"></iframe>';
		dhxq += '<div style="margin-top:10px"><label style="width:80px;vertical-align:top;">坐标位置</label>'
        + '<label style="font-weight:normal;width:670px;vertical-align:top;">' + row["dz"] + '</label></div>';
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/getDataFile.action",
		data:{"dfrvo.dataid":row.id},
		async:false,
		dataType:"json",
		success:function(d) {
			var tpFileRows = d.tpRows;
			var spFileRows = d.spRows;
			dhxq += '<hr style="border-top:1px solid #d1d1d1"/>';
			dhxq += '<span style="font-size:18px" class="label label-default">照片影像</span><br/>';
			dhxq += '<div class="row" style="margin-top:20px">';
			for (var i = 0; i < tpFileRows.length; i++) {
				dhxq += '<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail" onclick=index.showYx("'+path+tpFileRows[i].syfpath+'","'+tpFileRows[i].fname+'","'+tpFileRows[i].ms+'")>'
					 + '<img src="'+path+tpFileRows[i].syfpath+'" style="height:150px;width:100%"/><div class="caption" style="text-align:center"><p class="letter-short">'+tpFileRows[i].fname+'</p></div></a></div>';
			}
			dhxq += '</div>';
			dhxq += '<hr style="border-top:1px solid #d1d1d1"/>';
			dhxq += '<span style="font-size:18px" class="label label-default">资源视频</span><br/>';
			dhxq += '<div class="row" style="margin-top:20px">';
			for (var i = 0; i < spFileRows.length; i++) {
				dhxq += '<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail">'
					 + common.video(spFileRows[i].fpath, "100%", 150) + '<div class="caption" style="text-align:center"><p class="letter-short">'+spFileRows[i].fname+'</p></div></a></div>';
			}
			dhxq += '</div>';
		}
	});
	$("#daxqDiv").html(dhxq).show();
};
//查看照片
index.showYx = function(syfpath,title,ms) {
	$("#yxImg").attr("src", syfpath);
	$("#img-title").html(title);
	$("#img-ms").html(ms);
	$("#yxModal").modal('show');
};
//查看所有照片     页数     行数
index.showPicture = function(ys) {
	index.fjpage = ys;
	$.ajax({
		type:"post",
		url:path + "/xtgl/getFJByPage.action",
		data:{
			"dafilevo.type":"1",
			"dafilevo.fname":$.trim($("#gjzInput").val()),
			"dafilevo.mid":index.mid,
			"page":ys,
			"rows":index.fjrows
		},
		async:true,
		dataType:"json",
		success:function(d) {
			var data = d.rows;
			var total = d.total;
			var tprow = '<div class="row" style="margin-top:20px">';
			for (var i = 0; i < data.length; i++) {
				tprow += '<div class="col-xs-6 col-md-3" style="height:220px"><a href="#" class="thumbnail" onclick=index.showYx("'+path+data[i].syfpath+'","'+data[i].fname+'","'+data[i].ms+'")>'
					 + '<img src="'+path+data[i].syfpath+'" style="height:150px;width:100%"/><div class="caption" style="text-align:center"><p class="letter-short">'+data[i].fname+'</p></div></a></div>';
			}
			tprow += '</div>';
			tprow += '<ul class="pager" style="text-align:left">'
			    +'<li><a href="#" onclick="index.fjsyy(1)">上一页</a></li>'
			    +'<li style="margin-left:10px"><a href="#" onclick="index.fjxyy(1)">下一页</a></li>'
			    +'<li style="margin-left:10px;color:#336699">共计 '+total+' 张照片</li>'
			    +'</ul>';
			$("#tpxxDiv").append(tprow);
		}
	});
};
//查看所有视频 页数 行数
index.showVideo = function(ys) {
	index.fjpage = ys;
	$.ajax({
		type:"post",
		url:path + "/xtgl/getFJByPage.action",
		data:{
			"dafilevo.type":"2",
			"dafilevo.fname":$.trim($("#gjzInput").val()),
			"dafilevo.mid":index.mid,
			"page":ys,
			"rows":index.fjrows
		},
		async:true,
		dataType:"json",
		success:function(d) {
			var data = d.rows;
			var total = d.total;
			var sprow = '<div class="row" style="margin-top:20px">';
			for (var i = 0; i < data.length; i++) {
				sprow += '<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail">'
					+ common.video(data[i].fpath, "100%", 150) + '<div class="caption" style="text-align:center"><p class="letter-short">'+data[i].fname+'</p></div></a></div>';
			}
			sprow += '</div>';
			sprow += '<ul class="pager" style="text-align:left">'
			    +'<li><a href="#" onclick="index.fjsyy(2)">上一页</a></li>'
			    +'<li style="margin-left:10px"><a href="#"  onclick="index.fjxyy(2)">下一页</a></li>'
			    +'<li style="margin-left:10px;color:#336699">共计 '+total+' 个视频</li>'
			    +'</ul>';
			$("#spxxDiv").append(sprow);
		}
	});
};
//附件上一页
index.fjsyy = function(type) {
	if (index.fjpage > 1) {
		index.hideAll();
		index.fjpage--;
		if (type == 1) {
			index.showDh("照片影像","tpxxDiv");
			index.showPicture(index.fjpage);
		} else {
			index.showDh("视频资源","spxxDiv");
			index.showVideo(index.fjpage);
		}
	}
};
//附件下一页
index.fjxyy = function(type) {
	index.hideAll();
	index.fjpage++;
	if (type == 1) {
		index.showDh("照片影像","tpxxDiv");
		index.showPicture(index.fjpage);
	} else {
		index.showDh("视频资源","spxxDiv");
		index.showVideo(index.fjpage);
	}
};
//查询所有地图资源
index.searchMapData = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/getDataByPage.action",
		data:{
			"mid":index.mid,
			"mc":$.trim($("#gjzInput").val()),
			"page":1,
			"rows":index.mapTotal,
			"map":"map"
		},
		async:true,
		dataType:"json",
		success:function(d) {
			var data = d.rows;
			var total = d.total;
			var pArr = index.propertyAllArr;
			_MapApp.clearLayer(index.layer1);
			for (var i = 0; i < data.length; i++) {
				var xq = "";
				for (var key in pArr) {
					if (key == "mc") {
						continue;
					}
					xq += '<div style="border-bottom:1px dashed #999"><label style="width:70px">' + pArr[key] + '</label>'
				         + '<label style="font-weight:normal">' + data[i][key].split("####")[0] + '</label></div>';
				}
				xq += '<div style="margin-top:10px"><a style="color:#ff0000" href="#" onclick=index.showDtXq("'+data[i].id+'")>点击详情</a></div>';
				_MapApp.addGraphicToLayer(index.layer1,
						_MapApp.PicMarker(data[i].x,data[i].y,path+"/img/min_mark_red.png",12,12,data[i].mc,xq,null));
			}
			index.searchMapDataByPage(1, total);
		}
	});
};
//查看地图详情 dataid
index.showDtXq = function(id) {
	$.ajax({
		type:"post",
		url:path + "/xtgl/getDataById.action",
		data:{"id":id},
		async:true,
		dataType:"json",
		success:function(data) {
			index.showDaxq(data);
		}
	});
};
//查询地图分页资源
index.searchMapDataByPage = function(page, total) {
	$.ajax({
		type:"post",
		url:path + "/xtgl/getDataByPage.action",
		data:{
			"mid":index.mid,
			"mc":$.trim($("#gjzInput").val()),
			"page":page,
			"rows":index.mapRows,
			"map":"map"
		},
		async:true,
		dataType:"json",
		success:function(d) {
			var data = d.rows;
			var total = d.total;
			var pArr = index.propertyAllArr;
			index.zyMap = new Array();
			_MapApp.clearLayer(index.layer2);
			var table = '<table class="zyTable">';
			for (var i = 0; i < data.length; i++) {
				var xq = "";
				for (var key in pArr) {
					if (key == "mc") {
						continue;
					}
					xq += '<div style="border-bottom:1px dashed #999"><label style="width:70px">' + pArr[key] + '</label>'
				         + '<label style="font-weight:normal">' + data[i][key].split("####")[0] + '</label></div>';
				}
				xq += '<div style="margin-top:10px"><a style="color:#ff0000" href="#" onclick=index.showDtXq("'+data[i].id+'")>点击详情</a></div>';
				var marker = _MapApp.PicMarker(data[i].x,data[i].y,path+"/img/onePoint_"+i+".png",26,31,data[i].mc,xq,null);
				_MapApp.addGraphicToLayer(index.layer2, marker);
				table += '<tr onmouseover="index.trOver(this)" onmouseout="index.trOut(this)" onclick=index.zyClick("'+data[i].id+'")><td style="vertical-align:top;width:28px;"><img src="'+path+'/img/onePoint_'+i+'.png"/></td><td><div>'+data[i].mc+'</div><div style="color:#999">'+data[i].dz+'</div></td></tr>';
				index.zyMap[data[i].id] = marker;
			}
			table += '</table>';
			table += '<div style="padding-top:15px;padding-bottom:15px;padding-left:10px;color:#336699">'
				+ '<a href="#" onclick="index.searchMapDataByPage('+(page==1?1:page-1)+','+total+')">上一页</a> '
				+ '<a href="#" onclick="index.searchMapDataByPage('+(page+1)+','+total+')">下一页</a> 共' + total + '条记录</div>';
			$("#zyDiv").html(table);
			$("#zyDlg").window("open");
		}
	});
};
index.trOver = function(tr) {
	$(tr).children().css('background-color', '#f1f1f1');
};
index.trOut = function(tr) {
	$(tr).children().css('background-color', '#ffffff');
};
index.zyClick = function(id) {
	var marker = index.zyMap[id];
	var pt = _MapApp.Point(marker.attributes.x, marker.attributes.y);
	_MapApp.map.infoWindow.show(pt);
	_MapApp.map.infoWindow.setTitle(marker.attributes.title);
	_MapApp.map.infoWindow.setContent(marker.attributes.content);
	_MapApp.map.centerAt(pt);
};
//联系我们
index.showLxwm = function() {
	var body = "<h3>临汾市城市建设档案馆</h3>";
	body += "<p>档案馆联系人：李宏伟</p>";
	body += "<p>档案馆联系电话：18635726071</p>";
	body += "<p>档案馆传真：0357-2012656</p>";
	body += "<p>档案馆地址：山西省临汾市尧都区平阳北街6号</p>";
	body += "<p>档案馆邮箱：lfcjda@163.com</p>";
	body += "<p><img style='border:1px solid #000' src='"+path+"/images/dagwz.jpg'/></p>";
	$("#lxwm-body").html(body);
	$("#lxwmModal").modal('show');
};
//打开个人信息修改
index.showMyInfo = function() {
	$("#myInfoDlg").dialog("open");
	$.ajax({
		type:"post",
		url:path + "/xtgl/getUserByUserid.action",
		data:{"user.userid":USERID},
		async:true,
		dataType:"json",
		success:function(row) {
			$("#myInfoForm").form("load", {
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
			$("#userid").html(row.userid);
		}
	});
};
//保存个人信息
index.updMyInfo = function() {
	$.messager.progress();
	$('#myInfoForm').form('submit', {
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
	    	$("#myInfoDlg").dialog("close");
	    	alert("保存成功,请重新登录");
	    	window.location.href = path + '/login.jsp';
	    }
	});
};
//打开密码修改窗口
index.showPwd = function() {
	$("#myInfoDlg").dialog("close");
	$("#updPwdDlg").dialog("open");
};
//密码修改
index.updPwd = function() {
	var pwd0 = $("#pwd0").textbox("getValue");
	var pwd1 = $("#pwd1").textbox("getValue");
	if (pwd0 == "" || pwd1 == "") {
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/getUserByUserid.action",
		data:{"user.userid":USERID},
		async:true,
		dataType:"json",
		success:function(row) {
			if (row.password != pwd0) {
				$("#mmtip").html("原密码不正确");
			} else {
				$.ajax({
					type:"post",
					url:path + "/xtgl/updUserPwd.action",
					data:{"user.id":row.id,"user.password":pwd1},
					async:true,
					dataType:"json",
					success:function(data) {
						if (data.result == "success") {
							alert("密码修改成功,请重新登录");
							window.location.href = path + '/login.jsp';
						}
					}
				});
			}
		}
	});
};
//添加日志
index.addLog = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/addLog.action",
		data:{
			"logvo.userid":USERID,
			"logvo.content":"浏览访问",
			"logvo.ip":IPADDRESS,
			"logvo.type":"3"
		},
		async:true,
		dataType:"json",
		success:function(data) {}
	});
};
//弹窗显示图片
index.openImg = function(p) {
	window.open(p.src, "_blcnk");
};