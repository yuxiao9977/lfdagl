package com.yx.sm.frame.xtgl.vo;

import java.io.Serializable;
import java.util.List;

/**
 * 模块实体类
 * @author yx
 */
public class ModuleVO implements Serializable {
	
	private static final long serialVersionUID = 7344482222363866310L;
	
	private String id;//ID
	private String text;//显示名字
	private List<ModuleVO> nodes;//子模块
	private String mname;//模块名
	private String parentid;//父id
	private int wz;//位置
	private String state;
	private String icon;//图标
	private String properties;
	private String allProperties;//所有属性
	private String selectedIcon;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public int getWz() {
		return wz;
	}
	public void setWz(int wz) {
		this.wz = wz;
	}
	public List<ModuleVO> getNodes() {
		return nodes;
	}
	public void setNodes(List<ModuleVO> nodes) {
		this.nodes = nodes;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getText() {
		return this.mname;
	}
	public void setText(String text) {
		this.text = this.mname;
	}
	public String getProperties() {
		return properties;
	}
	public void setProperties(String properties) {
		this.properties = properties;
	}
	public String getSelectedIcon() {
		return selectedIcon;
	}
	public void setSelectedIcon(String selectedIcon) {
		this.selectedIcon = selectedIcon;
	}
	public String getAllProperties() {
		return allProperties;
	}
	public void setAllProperties(String allProperties) {
		this.allProperties = allProperties;
	}
	
}
