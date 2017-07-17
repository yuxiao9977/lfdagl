var data = {};
data.id = null;//数据id
data.mid = "-1";//模块id
data.mmc = null;//模块名称
data.propertyArr = null;//属性集合
data.tpFileRows = new Array();//图片附件集合
data.spFileRows = new Array();//视频附件集合
data.hiddenId = "";
data.fmid = "-1";

//加载数据模块
data.showData = function() {
	manage.hideAll();
	data.mid = "-1";
	data.fmid = "-1";
	$("#dataDiv").show(data.initAll);
};
//初始所有控件
data.initAll = function() {
	data.dataGrid();
	$('#dataMTree').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#dataMTree").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		},
		onSelect:function(record) {
			data.mid = record.id;
			data.mmc = record.text;
			data.getPropertyByMid();
			$("#dataFormDiv").hide();
		}
	});
	$('#pMTree2').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#pMTree2").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		},
		onSelect:function(record) {
			data.fmid = record.id;
			data.searchFile(1);
		}
	});
	$('#vMTree2').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#vMTree2").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		},
		onSelect:function(record) {
			data.fmid = record.id;
			data.searchFile(2);
		}
	});
};
//数据表格
data.dataGrid = function() {
	$('#dataList').datagrid({
		 url:path+"/xtgl/getDataByPage.action",
		 method:"post",
		 striped:true,
		 pagination:true,
		 singleSelect:true,
		 width:"100%",
		 height:parseInt($("#dataDiv").css("height"))-37,
		 queryParams:{mid:"-1"},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[]],
		 toolbar: [{
			 text:"添加",
			 iconCls: 'icon-add',
	         handler: function() {
	        	 if (data.mid == "-1") {
	        		 common.warning("不能选择空模块添加数据!");
	        		 return;
	        	 }
	        	 data.tpFileRows = new Array();
	        	 data.spFileRows = new Array();
	        	 $("#dataFormDiv").html("");
	        	 $("#dataFormDiv").show();
	        	 
	        	 //总行数
	        	 var totalCnt = $('#dataList').datagrid('getPager').data("pagination").options.total;
	        	 
	        	 var dpArr = data.propertyArr;
	        	 for (var i = 0; i < dpArr.length; i++) {
	        		 if (dpArr[i].zdmc != "mc") {
	        			 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">'+dpArr[i].pname+'</label><input id="'+dpArr[i].zdmc+'" name="dpnames"/><a href="#" style="margin-left:5px" onclick=data.openEditor("'+dpArr[i].zdmc+'_")>编辑</a><input type="hidden" id="'+dpArr[i].zdmc+'_"/></div>');
	        		 } else {
	        			 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">'+dpArr[i].pname+'</label><input id="'+dpArr[i].zdmc+'" name="dpnames"/></div>');
	        		 }
	        	 }
	        	 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">顺序</label><input id="wz" value="'+(totalCnt+1)+'"/></div>');
	        	 
	        	 $("#dataFormDiv").append("<hr/>");
	        	 $("#dataFormDiv").append('<a id="dtcjBtn" href="#" onclick="data.cjzb()">地图采集...</a>');
	        	 $("#dataFormDiv").append('<div style="margin-top:10px"><label style="width:60px">经度</label><input id="zbx"/><label style="width:60px;margin-left:10px">纬度</label><input id="zby"/></div>');
	        	 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">坐标位置</label><input id="zbwz"/></div>');
	        	 $("#dataFormDiv").append("<hr/>");
	        	 $("#dataFormDiv").append('<a id="tjtpBtn" href="#" onclick="data.xzTp()">添加图片...</a><div id="tpTable" style="margin-top:5px"></div>');
	        	 $("#dataFormDiv").append("<hr/>");
	        	 $("#dataFormDiv").append('<a id="tjspBtn" href="#" onclick="data.xzSp()">添加视频...</a><div id="spTable" style="margin-top:5px"></div>');
	        	 $("#dataFormDiv").append("<hr/>");
	        	 $("#dataFormDiv").append('<a id="addBtn" href="#" onclick="data.add()" style="width:85px;margin-bottom:10px">添加</a>');
	        	 
	        	 $("input[name='dpnames'],#wz").textbox({width:240});
	        	 $("#zbx,#zby").textbox({width:90});
	        	 $("#zbwz").textbox({width:250});
	        	 $("#dtcjBtn").linkbutton({iconCls:'icon-dtdw'});
	        	 $("#tjtpBtn").linkbutton({iconCls:'icon-tp'});
	        	 $("#tjspBtn").linkbutton({iconCls:'icon-sp'});
	        	 $("#addBtn").linkbutton({iconCls:'icon-add'});
	         }
		 },"-",{
			 text:"删除",
			 iconCls: 'icon-remove',
	         handler: function() {
	        	 var row = $('#dataList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
	        		 common.confirm("确定要删除吗?", function() {
		        		 $.ajax({
	        				type:"post",
	        				url:path + "/xtgl/delData.action",
	        				data:{"id":row.id},
	        				async:true,
	        				dataType:"json",
	        				success:function(d) {
	        					if (d.result == "success") {
	        						common.alert("删除成功");
	        						$('#dataList').datagrid("load",{
	        							mid:data.mid
	        						});
	        						$("#dataFormDiv").hide();
	        					}
	        				}
		        		 });
	        		 });
	        	 }
	         }
		 }],
		 onClickRow:function(index, row) {
			 data.tpFileRows = new Array();
        	 data.spFileRows = new Array();
			 $("#dataFormDiv").html("");
        	 $("#dataFormDiv").show();
        	 
        	 var dpArr = data.propertyArr;
        	 for (var i = 0; i < dpArr.length; i++) {
        		 var val = row[dpArr[i].zdmc].split("####");
        		 var val1 = val[0];
        		 var val2 = "";
        		 if (val.length > 1) {
        			 val2 = val[1];
        		 }
        		 if (dpArr[i].zdmc != "mc") {
        			 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">'+dpArr[i].pname+'</label><input id="'+dpArr[i].zdmc+'" name="dpnames" value="'+val1+'"/><a href="#" style="margin-left:5px" onclick=data.openEditor("'+dpArr[i].zdmc+'_")>编辑</a><input type="hidden" id="'+dpArr[i].zdmc+'_"/></div>');
        			 $("#"+dpArr[i].zdmc+"_").val(val2);
        		 } else {
        			 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">'+dpArr[i].pname+'</label><input id="'+dpArr[i].zdmc+'" name="dpnames" value="'+val1+'"/></div>');
        		 }
        	 }
        	 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">顺序</label><input id="wz" value="'+row.wz+'"/></div>');
        	 
        	 $("#dataFormDiv").append("<hr/>");
        	 $("#dataFormDiv").append('<a id="dtcjBtn" href="#" onclick="data.cjzb()">地图采集...</a>');
        	 $("#dataFormDiv").append('<div style="margin-top:10px"><label style="width:60px">经度</label><input id="zbx" value="'+row.x+'"/><label style="width:60px;margin-left:10px">纬度</label><input id="zby" value="'+row.y+'"/></div>');
        	 $("#dataFormDiv").append('<div style="margin-top:5px"><label style="width:60px">坐标位置</label><input id="zbwz" value="'+row.dz+'"/></div>');
        	 $("#dataFormDiv").append("<hr/>");
        	 $("#dataFormDiv").append('<a id="tjtpBtn" href="#" onclick="data.xzTp()">添加图片...</a><div id="tpTable" style="margin-top:5px"></div>');
        	 $("#dataFormDiv").append("<hr/>");
        	 $("#dataFormDiv").append('<a id="tjspBtn" href="#" onclick="data.xzSp()">添加视频...</a><div id="spTable" style="margin-top:5px"></div>');
        	 $("#dataFormDiv").append("<hr/>");
        	 $("#dataFormDiv").append('<a id="saveBtn" href="#" onclick="data.save()" style="width:85px;margin-bottom:10px">保存</a>');
        	 
        	 $("input[name='dpnames'],#wz").textbox({width:240});
        	 $("#zbx,#zby").textbox({width:90});
        	 $("#zbwz").textbox({width:250});
        	 $("#dtcjBtn").linkbutton({iconCls:'icon-dtdw'});
        	 $("#tjtpBtn").linkbutton({iconCls:'icon-tp'});
        	 $("#tjspBtn").linkbutton({iconCls:'icon-sp'});
        	 $("#saveBtn").linkbutton({iconCls:'icon-save'});
        	 data.id = row.id;
        	 data.getDataFile();
		 }
	});
};
//查询属性ByMid
data.getPropertyByMid = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/getPropertyByMid.action",
		data:{"property.mid":data.mid},
		async:true,
		dataType:"json",
		success:function(returnData) {
			data.propertyArr = returnData;
			var ds1 = [];
			for (var i = 0; i < returnData.length; i++) {
				ds1.push({
					field:returnData[i].zdmc,
					title:returnData[i].pname,
					align:'left',
					width:100,formatter: function(value, row, index){
						return value.split("####")[0]
					}
				});
			}
			var ds2 = [];
			ds2.push(ds1);
			$('#dataList').datagrid({
				columns:ds2,
				queryParams:{mid:data.mid}
			});
		}
	});
};
//添加数据
data.add = function() {
	var x = $.trim($("#zbx").textbox("getValue"));//经度
	var y = $.trim($("#zby").textbox("getValue"));//纬度
	var dz = $.trim($("#zbwz").textbox("getValue"));//坐标位置
	var wz = $.trim($("#wz").textbox("getValue"));//位置
	if (isNaN(wz)) {
		common.error("顺序必须为数字!");
		return;
	}
	var zdmcs = "id,mid,x,y,cjsj,dz,wz";
	var zdvalues = "'" + data.mid + "','" + x + "','" + y + "',now(),'" +dz + "'," + wz;
	var dpArr = data.propertyArr;
	if (dpArr.length > 0) {
		for (var i = 0; i < dpArr.length; i++) {
			zdmcs += "," + dpArr[i].zdmc;
			if (dpArr[i].zdmc == "mc") {
				zdvalues += ",'" + $.trim($("#"+dpArr[i].zdmc).textbox("getValue")) + "'";
			} else {
				zdvalues += ",'" + $.trim($("#"+dpArr[i].zdmc).textbox("getValue")) + "####" + $.trim($("#"+dpArr[i].zdmc+"_").val()) + "'";
			}
		}
	}
	var tpids = "";//图片id集合
	for (var i = 0; i < data.tpFileRows.length; i++) {
		tpids += (i == 0) ? data.tpFileRows[i].id : ("," + data.tpFileRows[i].id);
	}
	var spids = "";//视频id集合
	for (var i = 0; i < data.spFileRows.length; i++) {
		spids += (i == 0) ? data.spFileRows[i].id : ("," + data.spFileRows[i].id);
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/addData.action",
		data:{colnames:zdmcs,colvalues:zdvalues,tpids:tpids,spids:spids},
		async:true,
		dataType:"json",
		success:function(d) {
			if (d.result == "success") {
				common.alert("添加成功");
				$('#dataList').datagrid("reload",{
					mid:data.mid
				});
			}
		}
	});
};
//保存数据
data.save = function() {
	var x = $.trim($("#zbx").textbox("getValue"));//经度
	var y = $.trim($("#zby").textbox("getValue"));//纬度
	var dz = $.trim($("#zbwz").textbox("getValue"));//坐标位置
	var wz = $.trim($("#wz").textbox("getValue"));//位置
	var setValues = "x='" + x + "',y='" + y + "',dz='" + dz + "',wz=" + wz;
	var dpArr = data.propertyArr;
	if (dpArr.length > 0) {
		for (var i = 0; i < dpArr.length; i++) {
			if (dpArr[i].zdmc == "mc") {
				setValues += "," + dpArr[i].zdmc + "='" + $.trim($("#"+dpArr[i].zdmc).textbox("getValue")) + "'";
			} else {
				setValues += "," + dpArr[i].zdmc + "='" + $.trim($("#"+dpArr[i].zdmc).textbox("getValue")) + "####" + $.trim($("#"+dpArr[i].zdmc+"_").val()) + "'";
			}
		}
	}
	var tpids = "";//图片id集合
	for (var i = 0; i < data.tpFileRows.length; i++) {
		tpids += (i == 0) ? data.tpFileRows[i].id : ("," + data.tpFileRows[i].id);
	}
	var spids = "";//视频id集合
	for (var i = 0; i < data.spFileRows.length; i++) {
		spids += (i == 0) ? data.spFileRows[i].id : ("," + data.spFileRows[i].id);
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/updData.action",
		data:{id:data.id,setValues:setValues,tpids:tpids,spids:spids},
		async:true,
		dataType:"json",
		success:function(d) {
			if (d.result == "success") {
				common.alert("保存成功");
				$('#dataList').datagrid("reload", {
					mid:data.mid
				});
			}
		}
	});
};
//采集坐标
data.cjzb = function() {
	$("#mapWin").dialog("open");
	var zbx = $.trim($("#zbx").textbox("getValue"));
	var zby = $.trim($("#zby").textbox("getValue"));
	$("#mapCj").attr("src", path+"/jsp/map.jsp?x="+zbx+"&y="+zby);
};
//选择图片
data.xzTp = function() {
	$("#tpListWin").window("open");
	$('#tpList').datagrid({
		 url:path+"/xtgl/getFJByPage.action",
		 method:"post",
		 striped:true,
		 pagination:true,
		 singleSelect:false,
		 width:"100%",
		 height:parseInt($("#tpListWin").css("height"))-40,
		 queryParams:{"dafilevo.type":"1","dafilevo.mid":"-1"},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
		     //{field:'id',checkbox:true},
			 {field:'fname',title:'图片名称',align:'left',width:150},
		     {field:'ms',title:'图片描述',align:'left',width:200},
		     {field:'cjr',title:'创建人',align:'left'},
		     {field:'cjsj',title:'创建时间',align:'left'},
		     {field:'fpath',title:'缩略图',align:'left',formatter:function(value, rowData, rowIndex){
		    	 return "<img src='" + path + value + "' width='100px' height='100px'/>";
		     }}
		]]
	});
};
//选择视频
data.xzSp = function() {
	$("#spListWin").window("open");
	$('#spList').datagrid({
		 url:path+"/xtgl/getFJByPage.action",
		 method:"post",
		 striped:true,
		 pagination:true,
		 singleSelect:false,
		 width:"100%",
		 height:parseInt($("#spListWin").css("height"))-40,
		 queryParams:{"dafilevo.type":2,"dafilevo.mid":"-1"},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
		     //{field:'id',checkbox:true},
			 {field:'fname',title:'视频名称',align:'left',width:150},
		     {field:'ms',title:'视频描述',align:'left',width:200},
		     {field:'cjr',title:'创建人',align:'left'},
		     {field:'cjsj',title:'创建时间',align:'left'},
		     {field:'fpath',title:'视频',align:'left',formatter:function(value, rowData, rowIndex){
		    	 return common.video(value, 200, 120);
		     }}
		 ]]
	});
};
//选择文件
data.searchFile = function(type) {
	if (type == 1) {
		$('#tpList').datagrid('load', {
			"dafilevo.fname":$.trim($("#tpname").val()),
			"dafilevo.type":1,
			"dafilevo.mid":data.fmid
	   	});
	} else {
		$('#spList').datagrid('load', {
			"dafilevo.fname":$.trim($("#spname").val()),
			"dafilevo.type":2,
   			"dafilevo.mid":data.fmid
   	 	});
	}
};
data.confirmFile = function(type) {
	if (type == 1) {
		var rows = $('#tpList').datagrid("getSelections");
	   	if (rows.length == 0) {
	   		common.warning("请至少选择一个图片");
	   		return;
	   	}
	   	data.tpFileRows = data.tpFileRows.concat(rows);
	   	var filesTable = "<table class='fileTable'>";
	   	for (var i = 0; i < data.tpFileRows.length; i++) {
	   		filesTable += "<tr><td><a href='"+path+data.tpFileRows[i].fpath+"' target='_blank'>" + data.tpFileRows[i].fname + "</a></td><td style='width:50px;text-align:center'><a href='#' onclick='data.delFile(1,"+i+")'>删除</a></td></tr>";
	   	}
	   	filesTable += "</table>";
	   	$("#tpTable").html(filesTable);
	   	$("#tpListWin").window("close");
	} else {
		var rows = $('#spList').datagrid("getSelections");
	   	if (rows.length == 0) {
	   		common.warning("请至少选择一个视频");
	   		return;
	   	}
	   	data.spFileRows = data.spFileRows.concat(rows);
	   	var filesTable = "<table class='fileTable'>";
	   	for (var i = 0; i < data.spFileRows.length; i++) {
	   		filesTable += "<tr><td><a href='"+path+data.spFileRows[i].fpath+"' target='_blank'>" + data.spFileRows[i].fname + "</a></td><td style='width:50px;text-align:center'><a href='#' onclick='data.delFile(2,"+i+")'>删除</a></td></tr>";
	   	}
	   	filesTable += "</table>";
	   	$("#spTable").html(filesTable);
	   	$("#spListWin").window("close");
	}
};
//删除附件
data.delFile = function(type, index) {
	if (type == 1) {
		data.tpFileRows.splice(index, 1);
		var filesTable = "<table class='fileTable'>";
	   	for (var i = 0; i < data.tpFileRows.length; i++) {
	   		filesTable += "<tr><td><a href='"+path+data.tpFileRows[i].fpath+"' target='_blank'>" + data.tpFileRows[i].fname + "</a></td><td style='width:50px;text-align:center'><a href='#' onclick='data.delFile(1,"+i+")'>删除</a></td></tr>";
	   	}
	   	filesTable += "</table>";
	   	$("#tpTable").html(filesTable);
	} else {
		data.spFileRows.splice(index, 1);
		var filesTable = "<table class='fileTable'>";
   	 	for (var i = 0; i < data.spFileRows.length; i++) {
   	 		filesTable += "<tr><td><a href='"+path+data.spFileRows[i].fpath+"' target='_blank'>" + data.spFileRows[i].fname + "</a></td><td style='width:50px;text-align:center'><a href='#' onclick='data.delFile(2,"+i+")'>删除</a></td></tr>";
   	 	}
   	 	filesTable += "</table>";
   	 	$("#spTable").html(filesTable);
	}
};
//查询数据附件
data.getDataFile = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/getDataFile.action",
		data:{"dfrvo.dataid":data.id},
		async:true,
		dataType:"json",
		success:function(d) {
			data.tpFileRows = data.tpFileRows.concat(d.tpRows);
			data.spFileRows = data.spFileRows.concat(d.spRows);
			//图片加载
			var filesTable = "<table class='fileTable'>";
	       	for (var i = 0; i < data.tpFileRows.length; i++) {
	       		filesTable += "<tr><td><a href='"+path+data.tpFileRows[i].fpath+"' target='_blank'>" + data.tpFileRows[i].fname + "</a></td><td style='width:50px;text-align:center'><a href='#' onclick='data.delFile(1,"+i+")'>删除</a></td></tr>";
	       	}
	       	filesTable += "</table>";
	       	$("#tpTable").html(filesTable);
	       	//视频加载
	       	filesTable = "<table class='fileTable'>";
	   	 	for (var i = 0; i < data.spFileRows.length; i++) {
	   	 		filesTable += "<tr><td><a href='"+path+data.spFileRows[i].fpath+"' target='_blank'>" + data.spFileRows[i].fname + "</a></td><td style='width:50px;text-align:center'><a href='#' onclick='data.delFile(2,"+i+")'>删除</a></td></tr>";
	   	 	}
	   	 	filesTable += "</table>";
	   	 	$("#spTable").html(filesTable);
		}
	});
};
//打开编辑器
data.openEditor = function(hiddenId) {
	$("#textEditWin").dialog("open");
	kindeditor.html($("#"+hiddenId).val());
	data.hiddenId = hiddenId;
};
//保存编辑器文本
data.textEditSave = function() {
	$("#"+data.hiddenId).val(kindeditor.html());
	$("#textEditWin").dialog("close");
};