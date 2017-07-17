package com.yx.sm.frame.xtgl.vo;

import java.io.Serializable;

/**
 * 档案数据与文件关联实体类
 * @author yx
 */
public class DatafileRelVO implements Serializable {
	
	private static final long serialVersionUID = 6172928444659480418L;
	
	private String id;
	private String dataid;//数据id
	private String fileid;//文件id
	private String ftype;//文件类型 1图片 2视频
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDataid() {
		return dataid;
	}
	public void setDataid(String dataid) {
		this.dataid = dataid;
	}
	public String getFileid() {
		return fileid;
	}
	public void setFileid(String fileid) {
		this.fileid = fileid;
	}
	public String getFtype() {
		return ftype;
	}
	public void setFtype(String ftype) {
		this.ftype = ftype;
	}

}
