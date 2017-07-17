var picture = {};
picture.id = null;//图片id
picture.type = "1";
picture.mid = "-1";
//加载图片模块
picture.showPicture = function() {
	picture.mid = "-1";
	manage.hideAll();
	$("#pictureDiv").show(picture.list);
	$("#pictureFormDiv").show();
};
picture.list = function() {
	$('#pMTree').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#pMTree").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		},
		onSelect:function(record) {
			picture.mid = record.id;
			picture.search();
		}
	});
	$('#win_pMTree').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#win_pMTree").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		}
	});
	$('#pictureList').datagrid({
		 url:path+"/xtgl/getFJByPage.action",
		 method:"post",
		 striped:true,
		 pagination:true,
		 singleSelect:true,
		 width:"100%",
		 height:parseInt($("#pictureDiv").css("height"))-37,
		 queryParams:{"dafilevo.type":picture.type,"dafilevo.mid":picture.mid},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
		     //{field:'id',checkbox:true},
			 {field:'fname',title:'图片名称',align:'left'},
		     {field:'ms',title:'图片描述',align:'left'},
		     {field:'cjr',title:'创建人',align:'left'},
		     {field:'cjsj',title:'创建时间',align:'left'},
		     {field:'fpath',title:'缩略图',align:'left',formatter:function(value, rowData, rowIndex){
		    	 return "<img src='" + path + value + "' width='100px' height='100px'/>";
		     }}
		 ]]
	});
};
picture.search = function() {
	$('#pictureList').datagrid('load', {
		"dafilevo.fname":$.trim($("#fname").val()),
		"dafilevo.type":picture.type,
		"dafilevo.mid":picture.mid
	});
};
picture.upd = function() {
	var row = $('#pictureList').datagrid("getSelected");
	if (row == null) {
		common.warning("请先选择一条记录");
	} else {
		$("#wjWin").dialog("open");
		$("#wjmc").textbox("setValue", row.fname);
		$("#wjms").textbox("setValue", row.ms);
		picture.id = row.id;
		$.ajax({
			type:"post",
			url:path + "/xtgl/getModuleById.action",
			data:{"module.id":row.mid},
			async:true,
			dataType:"json",
			success:function(data) {
				$('#win_pMTree').combotree("setValue", data.id).combotree("setText", data.mname);
			}
		});
	}
};
picture.del = function() {
	var row = $('#pictureList').datagrid("getSelected");
	if (row == null) {
		common.warning("请先选择一条记录");
	} else {
		common.confirm("确定要删除吗?", function() {
			picture.delData(row.id,row.fpath,row.syfpath);
		});
	}
};
//清空表单
picture.clear = function() {
	$("#fnames,#fmss,#file1").textbox("setValue", "");
};
//图片上传
picture.upload = function() {
	var fnames = $.trim($("#fnames").textbox("getValue"));
	var fmss = $.trim($("#fmss").textbox("getValue"));
	if (fnames == "") {
		common.warning("文件名称不能为空");
		return;
	}
	if (picture.mid == "-1") {
		common.warning("请选择所属模块!");
		return;
	}
	$.messager.progress();
	$("#pictureForm").ajaxSubmit({
		url:path + "/jsp/upload.jsp?fileType=image",
		type:'post',
        dataType:'json',//返回数据类型
        beforeSend:function() {
        	//上传中...
        },
        uploadProgress:function(event,position,total,percentComplete) {
        	//进度更新
        },
        success:function(data) {
        	$.messager.progress("close");
        	var cgArr = data.cg;
        	var sbArr = data.sb;
        	if (sbArr.length > 0) {
        		var msg = "";
        		for (var i = 0; i < sbArr.length; i++) {
	        		msg += "," + sbArr[i].message;
	        	}
        		common.error("请检查文件格式和大小!" + msg.substr(1));
        	} else {
	        	var fpaths = "";
	        	var syfpaths = "";
	        	for (var i = 0; i < cgArr.length; i++) {
	        		fpaths += "#" + cgArr[i].url;
	        		syfpaths += "#" + cgArr[i].syUrl;
	        	}
	        	fpaths = fpaths.substr(1);
	        	syfpaths = syfpaths.substr(1);
	        	picture.addData(fnames, fmss, fpaths, syfpaths, picture.type);
        	}
        },
        error:function(xhr) {
        	$.messager.progress("close");
        	common.error("上传失败");
            //上传失败
        }
    });
};
//添加数据
picture.addData = function(fnames, fmss, fpaths, syfpaths, type) {
	$.ajax({
		type:"post",
		url:path + "/xtgl/addFJ.action",
		data:{"fnames":fnames,"fmss":fmss,"fpaths":fpaths,"syfpaths":syfpaths,"type":type,"mid":picture.mid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				common.alert("成功上传");
				picture.search();
			}
		}
	});
};
//保存数据
picture.saveData = function() {
	var fname = $.trim($("#wjmc").textbox("getValue"));
	var ms = $.trim($("#wjms").textbox("getValue"));
	if (fname == "") {
		common.warning("文件名称不能为空!");
		return;
	}
	var mid = $("#win_pMTree").combotree("getValue");
	if (mid == "") {
		common.warning("所属模块不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/updFJ.action",
		data:{"dafilevo.fname":fname,"dafilevo.ms":ms,"dafilevo.id":picture.id,"dafilevo.mid":mid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#wjWin").dialog("close");
				common.alert("保存成功");
				picture.search();
			}
		}
	});
};
//删除数据
picture.delData = function(id,fpath,syfpath) {
	$.ajax({
		type:"post",
		url:path + "/xtgl/delFJ.action",
		data:{"dafilevo.id":id,"dafilevo.fpath":fpath,"dafilevo.type":picture.type,"dafilevo.syfpath":syfpath},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#wjWin").dialog("close");
				common.alert("删除成功");
				picture.search();
			}
		}
	});
};