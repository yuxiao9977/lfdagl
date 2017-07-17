package com.yx.sm.frame.xtgl.vo;

import java.io.Serializable;

/**
 * 档案日志
 * @author YX
 */
public class DalogVO implements Serializable {

	private static final long serialVersionUID = -4818519354542281735L;
	
	private String id;
	private String userid;//账号
	private String content;//日志内容
	private String ip;//ip地址
	private String logtime;//日志时间
	private String type;//1注册 2登录 3访问 4登录后台
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getLogtime() {
		return logtime;
	}
	public void setLogtime(String logtime) {
		this.logtime = logtime;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
