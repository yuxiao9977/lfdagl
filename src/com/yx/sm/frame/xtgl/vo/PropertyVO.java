package com.yx.sm.frame.xtgl.vo;

import java.io.Serializable;

/**
 * 属性实体类
 * @author yx
 */
public class PropertyVO implements Serializable {

	private static final long serialVersionUID = 8456719951067220058L;
	
	private String id;//ID UUID
	private String pname;//属性名称
	private int wz;//位置
	private String mid;//模块id
	private int zdwz;//字段位置
	private String zdmc;//字段名称
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public int getWz() {
		return wz;
	}
	public void setWz(int wz) {
		this.wz = wz;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	public int getZdwz() {
		return zdwz;
	}
	public void setZdwz(int zdwz) {
		this.zdwz = zdwz;
	}
	public String getZdmc() {
		return zdmc;
	}
	public void setZdmc(String zdmc) {
		this.zdmc = zdmc;
	}

}
