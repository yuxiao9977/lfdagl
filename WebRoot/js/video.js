var video = {};
video.id = null;//图片id
video.type = "2";
video.mid = "-1";
//加载视频模块
video.showVideo = function() {
	video.mid = "-1";
	manage.hideAll();
	$("#videoDiv").show(video.list);
	$("#videoFormDiv").show();
};
video.list = function() {
	$('#vMTree').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#vMTree").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		},
		onSelect:function(record) {
			video.mid = record.id;
			video.search();
		}
	});
	$('#win_vMTree').combotree({
		url:path + "/xtgl/getModuleByParentid.action?module.parentid=10000",
		method:"post",
		onBeforeExpand:function(node, param) {
			$("#win_vMTree").combotree("tree").tree("options").url = 
			path + "/xtgl/getModuleByParentid.action?module.parentid=" + node.id;
		}
	});
	$('#videoList').datagrid({
		 url:path+"/xtgl/getFJByPage.action",
		 method:"post",
		 striped:true,
		 pagination:true,
		 singleSelect:true,
		 width:"100%",
		 height:parseInt($("#videoDiv").css("height"))-37,
		 queryParams:{"dafilevo.type":video.type,"dafilevo.mid":video.mid},
		 rownumbers:true,
		 loadMsg:"数据加载中...",
		 columns:[[
		     //{field:'id',checkbox:true},
			 {field:'fname',title:'视频名称',align:'left'},
		     {field:'ms',title:'视频描述',align:'left'},
		     {field:'cjr',title:'创建人',align:'left'},
		     {field:'cjsj',title:'创建时间',align:'left'},
		     {field:'fpath',title:'视频',align:'left',formatter:function(value, rowData, rowIndex){
		    	 return common.video(value, 200, 120);
		     }}
		 ]]
	});
};
video.search = function() {
	$('#videoList').datagrid('load', {
		"dafilevo.fname":$.trim($("#spfname").val()),
		"dafilevo.type":video.type,
		"dafilevo.mid":video.mid
	});
};
video.upd = function() {
	var row = $('#videoList').datagrid("getSelected");
	if (row == null) {
		common.warning("请先选择一条记录");
	} else {
		$("#spWin").dialog("open");
		$("#spmc").textbox("setValue", row.fname);
		$("#spms").textbox("setValue", row.ms);
		video.id = row.id;
		$.ajax({
			type:"post",
			url:path + "/xtgl/getModuleById.action",
			data:{"module.id":row.mid},
			async:true,
			dataType:"json",
			success:function(data) {
				$('#win_vMTree').combotree("setValue", data.id).combotree("setText", data.mname);
			}
		});
	}
};
video.del = function() {
	var row = $('#videoList').datagrid("getSelected");
	if (row == null) {
		common.warning("请先选择一条记录");
	} else {
		common.confirm("确定要删除吗?", function() {
			video.delData(row.id,row.fpath);
		});
	}
};
//清空表单
video.clear = function() {
	$("#spfnames,#spfmss,#file2").textbox("setValue", "");
};
//视频上传
video.upload = function() {
	var fnames = $.trim($("#spfnames").textbox("getValue"));
	var fmss = $.trim($("#spfmss").textbox("getValue"));
	if (fnames == "") {
		common.warning("文件名称不能为空");
		return;
	}
	if (video.mid == "-1") {
		common.warning("请选择所属模块!");
		return;
	}
	$.messager.progress();
	$("#videoForm").ajaxSubmit({
		url:path + "/jsp/upload.jsp?fileType=video",
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
	        	for (var i = 0; i < cgArr.length; i++) {
	        		fpaths += "#" + cgArr[i].url;
	        	}
	        	fpaths = fpaths.substr(1);
	        	video.addData(fnames, fmss, fpaths, video.type);
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
video.addData = function(fnames, fmss, fpaths, type) {
	$.ajax({
		type:"post",
		url:path + "/xtgl/addFJ.action",
		data:{"fnames":fnames,"fmss":fmss,"fpaths":fpaths,"syfpaths":fpaths,"type":type,"mid":video.mid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				common.alert("成功上传");
				video.search();
			}
		}
	});
};
//保存数据
video.saveData = function() {
	var fname = $.trim($("#spmc").textbox("getValue"));
	var ms = $.trim($("#spms").textbox("getValue"));
	if (fname == "") {
		common.warning("文件名称不能为空!");
		return;
	}
	var mid = $("#win_vMTree").combotree("getValue");
	if (mid == "") {
		common.warning("所属模块不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:path + "/xtgl/updFJ.action",
		data:{"dafilevo.fname":fname,"dafilevo.ms":ms,"dafilevo.id":video.id,"dafilevo.mid":mid},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#spWin").dialog("close");
				common.alert("保存成功");
				video.search();
			}
		}
	});
};
//删除数据
video.delData = function(id,fpath) {
	$.ajax({
		type:"post",
		url:path + "/xtgl/delFJ.action",
		data:{"dafilevo.id":id,"dafilevo.fpath":fpath,"dafilevo.type":video.type},
		async:true,
		dataType:"json",
		success:function(data) {
			if (data.result == "success") {
				$("#spWin").dialog("close");
				common.alert("删除成功");
				video.search();
			}
		}
	});
};