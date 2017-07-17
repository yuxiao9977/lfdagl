var property = {};
property.flag = 1;//1添加 2修改
property.mtreeid = null;//模块树id
property.pid = null;//属性id
//加载属性管理
property.showProperty = function() {
	manage.hideAll();
	$("#propertyDiv").show(property.moduleTree);
	property.flag = 1;
};
//模块tree
property.moduleTree = function() {
	$("#moduleTree2").tree({
		url:path+"/xtgl/getModuleByParentid.action?module.parentid=-1",
		method:"post",
		lines:true,
		animate:true,
		onBeforeExpand:function(node, param) {
			$("#moduleTree2").tree("options").url = 
				path+"/xtgl/getModuleByParentid.action?module.parentid=" + node.id
		},
		onDblClick:function(node){
			$('#moduleTree2').tree('toggle', node.target);
		},
		onClick:function(node){
			property.mtreeid = node.id;
			$("#propertyListDiv").show(property.propertyList);
		}
	});
};
//属性列表
property.propertyList = function() {
	$.ajax({
		type:"post",
		url:path + "/xtgl/addPropertyName.action",
		data:{"property.mid":property.mtreeid},
		async:false,
		dataType:"json",
		success:function(data) {}
	});
	$('#propertyList').datagrid({
		 url:path+"/xtgl/getPropertyByMid.action",
		 method:"post",
		 striped:true,
		 singleSelect:true,
		 width:"100%",
		 height:"100%",
		 queryParams:{"property.mid":property.mtreeid},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
			 {field:'pname',title:'属性名称',align:'left'},
		     {field:'zdmc',title:'字段名称',align:'left'},
		     {field:'wz',title:'顺序',align:'left'}
		 ]],
		 toolbar: [{
			 text:"添加",
			 iconCls: 'icon-add',
	         handler: function() {
	        	 $("#sxmc").textbox("setValue", "");
	        	 $("#sxwz").combobox("setValue", "1");
	        	 $("#sxWin").dialog("open");
	        	 property.flag = 1;
	         }
		 },"-",{
			 text:"修改",
			 iconCls: 'icon-edit',
	         handler: function() {
	        	 var row = $('#propertyList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
	        		 property.flag = 2;
	        		 $("#sxmc").textbox("setValue", row.pname);
		        	 $("#sxwz").combobox("setValue", row.wz);
		        	 $("#sxWin").dialog("open");
		        	 property.pid = row.id;
	        	 }
	         }
		 },"-",{
			 text:"删除",
			 iconCls: 'icon-remove',
	         handler: function() {
	        	 var row = $('#propertyList').datagrid("getSelected");
	        	 if (row == null) {
	        		 common.warning("请先选择一条记录");
	        	 } else {
	        		 common.confirm("确定要删除吗?", function() {
		        		 $.ajax({
	        				type:"post",
	        				url:path + "/xtgl/delPropertyById.action",
	        				data:{"property.id":row.id},
	        				async:true,
	        				dataType:"json",
	        				success:function(data) {
	        					if (data.result == "success") {
	        						common.alert("删除成功");
	        						$('#propertyList').datagrid("load");
	        					}
	        				}
		        		 });
	        		 });
	        	 }
	         }
		 }]
	});
};
//添加属性
property.addSx = function() {
	var mc = $.trim($("#sxmc").textbox("getValue"));
	var wz = $("#sxwz").combobox("getValue");
	if (mc == "") {
		common.warning("属性名称不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/addProperty.action",
		data:{"property.pname":mc,"property.wz":wz,"property.mid":property.mtreeid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#sxWin").dialog("close");
				common.alert("添加成功");
				$('#propertyList').datagrid("load");
			}
		}
	});
};
//修改属性
property.updSx = function() {
	var mc = $.trim($("#sxmc").textbox("getValue"));
	var wz = $("#sxwz").combobox("getValue");
	if (mc == "") {
		common.warning("属性名称不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/updPropertyById.action",
		data:{"property.pname":mc,"property.wz":wz,"property.id":property.pid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#sxWin").dialog("close");
				common.alert("修改成功");
				$('#propertyList').datagrid("load");
			}
		}
	});
};
//保存属性
property.saveSx = function() {
	if (property.flag == 1) {
		property.addSx();
	} else {
		property.updSx();
	}
};