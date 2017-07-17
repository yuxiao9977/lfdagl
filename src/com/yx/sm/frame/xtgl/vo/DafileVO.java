package com.yx.sm.frame.xtgl.vo;

import java.io.Serializable;

/**
 * 档案文件实体类
 * @author yx
 */
public class DafileVO implements Serializable {

	private static final long serialVersionUID = -9220656419811648853L;
	
	private String id;
	private String fname;//文件名称
	private String fpath;//水印路径
	private String syfpath;//水印文件路径
	private String type;//文件类型 1图片 2视频
	private String ms;//描述
	private String cjr;//创建人
	private String cjsj;//创建时间
	private String mid;//模块ID
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getMs() {
		return ms;
	}
	public void setMs(String ms) {
		this.ms = ms;
	}
	public String getFpath() {
		return fpath;
	}
	public void setFpath(String fpath) {
		this.fpath = fpath;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCjr() {
		return cjr;
	}
	public void setCjr(String cjr) {
		this.cjr = cjr;
	}
	public String getCjsj() {
		return cjsj;
	}
	public void setCjsj(String cjsj) {
		this.cjsj = cjsj;
	}
	public String getSyfpath() {
		return syfpath;
	}
	public void setSyfpath(String syfpath) {
		this.syfpath = syfpath;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}

}
