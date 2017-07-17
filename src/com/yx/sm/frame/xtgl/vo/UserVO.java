package com.yx.sm.frame.xtgl.vo;

import java.io.Serializable;

/**
 * 用户实体类
 * @author yx
 */
public class UserVO implements Serializable {
	
	private static final long serialVersionUID = -2930072303705204130L;
	
	private String id;//ID
	private String userid;//用户名
	private String password;//密码
	private String username;//姓名
	private String dw;//单位
	private String bm;//部门
	private String zw;//职位
	private String bgdh;//办公电话
	private String lxdh;//联系电话
	private String lxdz;//联系地址
	private String isgly;//是否管理员 0是 1否
	private String email;//邮箱
	private String xb;//性别 0男 1女
	private String state;//状态 0审核通过 1不通过
	
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getDw() {
		return dw;
	}
	public void setDw(String dw) {
		this.dw = dw;
	}
	public String getBm() {
		return bm;
	}
	public void setBm(String bm) {
		this.bm = bm;
	}
	public String getZw() {
		return zw;
	}
	public void setZw(String zw) {
		this.zw = zw;
	}
	public String getBgdh() {
		return bgdh;
	}
	public void setBgdh(String bgdh) {
		this.bgdh = bgdh;
	}
	public String getLxdh() {
		return lxdh;
	}
	public void setLxdh(String lxdh) {
		this.lxdh = lxdh;
	}
	public String getLxdz() {
		return lxdz;
	}
	public void setLxdz(String lxdz) {
		this.lxdz = lxdz;
	}
	public String getIsgly() {
		return isgly;
	}
	public void setIsgly(String isgly) {
		this.isgly = isgly;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getXb() {
		return xb;
	}
	public void setXb(String xb) {
		this.xb = xb;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
}
