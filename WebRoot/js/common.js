var common = {};
//弹出消息
common.alert = function(message) {
	$.messager.alert('消息', message, "info");
};
//弹出错误
common.error = function(message) {
	$.messager.alert('错误', message, "error");
};
//弹出警告
common.warning = function(message) {
	$.messager.alert('警告', message, "warning");
};
//确认消息
common.confirm = function(message, callback, prame) {
	$.messager.confirm('消息确认', message, function(r) {
		if (r) {
			if (prame == null) {
				callback();
			} else {
				callback(prame);
			}
		};
	});
};
//得到星期几
common.getZhDay = function(now) {
	var nowArr = now.split(" ");
	var n = parseInt(nowArr[1]);
	var d = "";
	switch(n) {
		case 0 : d = "日";break;
		case 1 : d = "一";break;
		case 2 : d = "二";break;
		case 3 : d = "三";break;
		case 4 : d = "四";break;
		case 5 : d = "五";break;
		case 6 : d = "六";break;
	}
	return nowArr[0] + " 星期" + d;
};
//给日期添加格式化方法
Date.prototype.format = function(format) { 
	var o = { 
		"M+" : this.getMonth()+1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth()+3)/3), // quarter
		"S" : this.getMilliseconds(), // millisecond
		"day" : this.getDay()
	}
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	}
	return format; 
};
//按指定格式得到当前日期
common.nowDate = common.getZhDay((new Date()).format("yyyy年M月d日 day"));
//datapicker设置
common.dateoption = {
	lang:"ch",           //语言选择中文
	format:"Y-m-d",      //格式化日期
	timepicker:false,    //关闭时间选项
	yearEnd:2099        //设置最大年份
};
//随机颜色
common.getRandomColor = function(){
	return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
};
//判断字符串是否为空串
common.isStringNullOrEmpty = function(str){
	if (str != null && str != 'null' && typeof(str) != "undefined") {
		if (str.length > 0) {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
};
//视频控件
common.video = function(url, w, h) {
	return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' + 
	'<embed src="' + path + '/Flvplayer.swf" allowfullscreen="true" flashvars="vcastr_file=' + path + url +
	'" quality="high" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '"></embed></object>';
};