package com.yx.sm.frame.xtgl.action;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.yx.sm.frame.base.action.BaseAction;
import com.yx.sm.frame.xtgl.service.XtService;
import com.yx.sm.frame.xtgl.vo.DafileVO;
import com.yx.sm.frame.xtgl.vo.DalogVO;
import com.yx.sm.frame.xtgl.vo.DataVO;
import com.yx.sm.frame.xtgl.vo.DatafileRelVO;
import com.yx.sm.frame.xtgl.vo.ModuleVO;
import com.yx.sm.frame.xtgl.vo.PropertyVO;
import com.yx.sm.frame.xtgl.vo.UserVO;

import net.sf.json.JSONObject;

/**
 * 系统管理
 * @author yuxiao
 */
@Namespace("/xtgl")
public class XtAction extends BaseAction {
	
	private static final long serialVersionUID = 5714364771227197377L;

	private Logger logger = Logger.getLogger(XtAction.class);
	
	@Autowired
	private XtService xtService;
	
	private String id;//ID
	
	private UserVO user;//用户
	private ModuleVO module;//模块
	private PropertyVO property;//属性
	private DafileVO dafilevo;//附件
	private DataVO datavo;//数据
	private DatafileRelVO dfrvo;//数据文件关联对象
	private DalogVO logvo;//日志
	
	private String fnames;//文件名#隔开
	private String fmss;//文件描述#隔开
	private String fpaths;//文件路径#隔开
	private String syfpaths;//水印文件路径#隔开
	
	/**
	 * 用户名密码查询用户
	 * @return
	 */
	@Action("getUserByNamePwd")
	public String getUserByNamePwd() {
		String userid = request.getParameter("userid");
		String password = request.getParameter("password");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userid", userid);
		map.put("password", password);
		UserVO uservo = xtService.getUserByNamePwd(map);
		
		JSONObject jo = new JSONObject();
		if (null != uservo && uservo.getState().equals("0")) {
			sessionMap.put("uservo", uservo);
			jo.put("result", "0");
		} else if (null == uservo) {
			jo.put("result", "1");
		} else if (null != uservo && uservo.getState().equals("1")) {
			jo.put("result", "2");
		}
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 查询用户分页
	 * @return
	 */
	@Action("getUserByPage")
	public String getUserByPage() {
		String uid = request.getParameter("uid");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("startRow", getStartRow());
		map.put("rows", rows);
		jsonData = xtService.getUserByPage(map);
		return SUCCESS;
	}
	
	/**
	 * Userid查询用户
	 * @return
	 */
	@Action("getUserByUserid")
	public String getUserByUserid() {
		jsonData = xtService.getUserByUserid(user);
		return SUCCESS;
	}
	
	/**
	 * 添加用户
	 * @return
	 */
	@Action("addUser")
	public String addUser() {
		user.setId(UUID.randomUUID().toString());
		xtService.addUser(user);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 更新用户
	 * @return
	 */
	@Action("updUser")
	public String updUser() {
		xtService.updUser(user);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 更新用户密码
	 * @return
	 */
	@Action("updUserPwd")
	public String updUserPwd() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", user.getId());
		map.put("password", user.getPassword());
		xtService.updUserPwd(map);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 更新用户状态
	 * @return
	 */
	@Action("updUserState")
	public String updUserState() {
		xtService.updUserState(user);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 删除用户
	 * @return
	 */
	@Action("delUserByUserid")
	public String delUserById() {
		xtService.delUserById(user);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 查询模块By id
	 * @return
	 */
	@Action("getModuleById")
	public String getModuleById() {
		jsonData = xtService.getModuleById(module);
		return SUCCESS;
	}
	
	/**
	 * 查询模块By Parentid
	 * @return
	 */
	@Action("getModuleByParentid")
	public String getModuleByParentid() {
		jsonData = xtService.getModuleByParentid(module);
		return SUCCESS;
	}
	
	/**
	 * 查询所有模块
	 * @return
	 */
	@Action("getAllModule")
	public String getAllModule() {
		jsonData = xtService.getAllModule(request.getParameter("id"));
		return SUCCESS;
	}
	
	/**
	 * 查询所有模块树
	 * @return
	 */
	@Action("getAllModuleTree")
	public String getAllModuleTree() {
		jsonData = xtService.getAllModuleTree(request.getParameter("id"));
		return SUCCESS;
	}
	
	/**
	 * 添加模块
	 * @return
	 */
	@Action("addModule")
	public String addModule() {
		module.setId(UUID.randomUUID().toString());
		xtService.addModule(module);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 更新模块
	 * @return
	 */
	@Action("updModuleById")
	public String updModuleById() {
		xtService.updModuleById(module);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 删除模块
	 * @return
	 */
	@Action("delModuleById")
	public String delModuleById() {
		xtService.delModuleById(module);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 查询属性By mid
	 * @return
	 */
	@Action("getPropertyByMid")
	public String getPropertyByMid() {
		jsonData = xtService.getPropertyByMid(property);
		return SUCCESS;
	}
	
	/**
	 * 添加属性
	 * @return
	 */
	@Action("addProperty")
	public String addProperty() {
		property.setId(UUID.randomUUID().toString());
		xtService.addProperty(property);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 添加属性字段
	 * @return
	 */
	@Action("addPropertyName")
	public String addPropertyName() {
		xtService.addPropertyName(property);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 更新属性
	 * @return
	 */
	@Action("updPropertyById")
	public String updPropertyById() {
		xtService.updPropertyById(property);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 删除属性
	 * @return
	 */
	@Action("delPropertyById")
	public String delPropertyById() {
		xtService.delPropertyById(property);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 查询附件分页
	 * @return
	 */
	@Action("getFJByPage")
	public String getFJByPage() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", dafilevo.getType());
		map.put("mid", dafilevo.getMid());
		map.put("fname", dafilevo.getFname());
		map.put("startRow", getStartRow());
		map.put("rows", rows);
		jsonData = xtService.getFJByPage(map);
		return SUCCESS;
	}
	
	/**
	 * 添加附件
	 * @return
	 */
	@Action("addFJ")
	public String addFJ() {
		String type = request.getParameter("type");
		String mid = request.getParameter("mid");
		UserVO uservo = (UserVO) sessionMap.get("uservo");
		xtService.addFJ(fnames, fmss, fpaths, syfpaths, type, uservo.getUserid(), mid);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 修改附件
	 * @return
	 */
	@Action("updFJ")
	public String updFJ() {
		xtService.updFJ(dafilevo);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 删除附件
	 * @return
	 */
	@Action("delFJ")
	public String delFJ() {
		File file = new File(request.getServletContext().getRealPath("") + dafilevo.getFpath());
		if (file.exists()) {
			file.delete();//删除文件
		}
		if (dafilevo.getType().equals("1")) {
			File file2 = new File(request.getServletContext().getRealPath("") + dafilevo.getSyfpath());
			if (file2.exists()) {
				file2.delete();//删除水印文件
			}
		}
		xtService.delFJ(dafilevo);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 查询数据分页
	 * @return
	 */
	@Action("getDataByPage")
	public String getDataByPage() {
		String mid = request.getParameter("mid");
		String mc = request.getParameter("mc");
		String map = request.getParameter("map");
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("mid", mid);
		m.put("mc", mc);
		m.put("map", map);
		m.put("startRow", getStartRow());
		m.put("rows", rows);
		jsonData = xtService.getDataByPage(m);
		return SUCCESS;
	}
	
	/**
	 * 查询数据ById
	 * @return
	 */
	@Action("getDataById")
	public String getDataById() {
		String id = request.getParameter("id");
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("id", id);
		jsonData = xtService.getDataById(m);
		return SUCCESS;
	}
	
	/**
	 * 查询数据分页Table
	 * @return
	 */
	@Action("getDataTableByPage")
	public String getDataTableByPage() {
		String mid = request.getParameter("mid");
		String sr = request.getParameter("sr");
		String keyword = request.getParameter("mc");
		String order = request.getParameter("order");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("mc", keyword);
		map.put("mid", mid);
		map.put("startRow", sr);
		map.put("rows", rows);
		map.put("order", order);
		jsonData = xtService.getDataByPage(map);
		return SUCCESS;
	}
	
	/**
	 * 查询数据附件
	 * @return
	 */
	@Action("getDataFile")
	public String getDataFile() {
		jsonData = xtService.getDataFile(dfrvo);
		return SUCCESS;
	}
	
	/**
	 * 添加数据
	 * @return
	 */
	@Action("addData")
	public String addData() {
		String uuid = UUID.randomUUID().toString();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("colnames", request.getParameter("colnames"));
		map.put("colvalues", "'" + uuid + "'," + request.getParameter("colvalues"));
		xtService.addData(map);
		
		String[] tpids = request.getParameter("tpids").split(",");//图片ids
		String[] spids = request.getParameter("spids").split(",");//视频ids
		
		for (String tpid : tpids) {
			DatafileRelVO vo = new DatafileRelVO();
			vo.setId(UUID.randomUUID().toString());
			vo.setDataid(uuid);
			vo.setFileid(tpid);
			vo.setFtype("1");
			xtService.addDataFile(vo);
		}
		
		for (String spid : spids) {
			DatafileRelVO vo = new DatafileRelVO();
			vo.setId(UUID.randomUUID().toString());
			vo.setDataid(uuid);
			vo.setFileid(spid);
			vo.setFtype("2");
			xtService.addDataFile(vo);
		}
		
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 修改数据
	 * @return
	 */
	@Action("updData")
	public String updData() {
		String id = request.getParameter("id");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("setValues", request.getParameter("setValues"));
		xtService.updData(map);
		//删除附件
		DatafileRelVO datafilevo = new DatafileRelVO();
		datafilevo.setDataid(id);
		xtService.delDataFile(datafilevo);
		//添加附件
		String[] tpids = request.getParameter("tpids").split(",");//图片ids
		String[] spids = request.getParameter("spids").split(",");//视频ids
		
		for (String tpid : tpids) {
			DatafileRelVO vo = new DatafileRelVO();
			vo.setId(UUID.randomUUID().toString());
			vo.setDataid(id);
			vo.setFileid(tpid);
			vo.setFtype("1");
			xtService.addDataFile(vo);
		}
		
		for (String spid : spids) {
			DatafileRelVO vo = new DatafileRelVO();
			vo.setId(UUID.randomUUID().toString());
			vo.setDataid(id);
			vo.setFileid(spid);
			vo.setFtype("2");
			xtService.addDataFile(vo);
		}
		
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 删除数据
	 * @return
	 */
	@Action("delData")
	public String delData() {
		Map<String, Object> map = new HashMap<String, Object>();
		String id = request.getParameter("id");
		map.put("id", id);
		xtService.delData(map);
		DatafileRelVO vo = new DatafileRelVO();
		vo.setDataid(id);
		xtService.delDataFile(vo);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 添加日志
	 * @return
	 */
	@Action("addLog")
	public String addLog() {
		logvo.setId(UUID.randomUUID().toString());
		xtService.addLog(logvo);
		JSONObject jo = new JSONObject();
		jo.put("result", "success");
		jsonData = jo;
		return SUCCESS;
	}
	
	/**
	 * 查询日志分页
	 * @return
	 */
	@Action("getLogByPage")
	public String getLogByPage() {
		String userid = request.getParameter("userid");
		String content = request.getParameter("content");
		String ip = request.getParameter("ip");
		String type = request.getParameter("type");
		String kssj = request.getParameter("kssj");
		String jssj = request.getParameter("jssj");
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("userid", userid);
		m.put("content", content);
		m.put("ip", ip);
		m.put("type", type);
		m.put("kssj", kssj);
		m.put("jssj", jssj);
		m.put("startRow", getStartRow());
		m.put("rows", rows);
		jsonData = xtService.getLogByPage(m);
		return SUCCESS;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public UserVO getUser() {
		return user;
	}

	public void setUser(UserVO user) {
		this.user = user;
	}

	public ModuleVO getModule() {
		return module;
	}

	public void setModule(ModuleVO module) {
		this.module = module;
	}

	public PropertyVO getProperty() {
		return property;
	}

	public void setProperty(PropertyVO property) {
		this.property = property;
	}

	public DafileVO getDafilevo() {
		return dafilevo;
	}

	public void setDafilevo(DafileVO dafilevo) {
		this.dafilevo = dafilevo;
	}

	public String getFnames() {
		return fnames;
	}

	public void setFnames(String fnames) {
		this.fnames = fnames;
	}

	public String getFmss() {
		return fmss;
	}

	public void setFmss(String fmss) {
		this.fmss = fmss;
	}

	public String getFpaths() {
		return fpaths;
	}

	public void setFpaths(String fpaths) {
		this.fpaths = fpaths;
	}

	public DataVO getDatavo() {
		return datavo;
	}

	public void setDatavo(DataVO datavo) {
		this.datavo = datavo;
	}

	public String getSyfpaths() {
		return syfpaths;
	}

	public void setSyfpaths(String syfpaths) {
		this.syfpaths = syfpaths;
	}

	public DatafileRelVO getDfrvo() {
		return dfrvo;
	}

	public void setDfrvo(DatafileRelVO dfrvo) {
		this.dfrvo = dfrvo;
	}

	public DalogVO getLogvo() {
		return logvo;
	}

	public void setLogvo(DalogVO logvo) {
		this.logvo = logvo;
	}

	
}
