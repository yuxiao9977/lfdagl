package com.yx.sm.frame.xtgl.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yx.sm.frame.xtgl.dao.XtDao;
import com.yx.sm.frame.xtgl.vo.DafileVO;
import com.yx.sm.frame.xtgl.vo.DalogVO;
import com.yx.sm.frame.xtgl.vo.DataVO;
import com.yx.sm.frame.xtgl.vo.DatafileRelVO;
import com.yx.sm.frame.xtgl.vo.ModuleVO;
import com.yx.sm.frame.xtgl.vo.PropertyVO;
import com.yx.sm.frame.xtgl.vo.UserVO;

/**
 * 系统管理Service
 * @author yx
 */
@Service
public class XtService {
	
	private Logger logger = Logger.getLogger(XtService.class);

	@Autowired
	private XtDao xtDao;
	
	/**
	 * 用户名密码查询用户
	 * @return
	 */
	public UserVO getUserByNamePwd(Map<String, Object> map) {
		return xtDao.getUserByNamePwd(map);
	}
	
	/**
	 * 查询用户分页
	 * @return
	 */
	public Map<String, Object> getUserByPage(Map<String, Object> map) {
		List<UserVO> list = xtDao.getUserByPage(map);
		int total = xtDao.getUserByPageTotal(map);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("rows", list);
		m.put("total", total);
		return m;
	}
	
	/**
	 * userid查询用户
	 * @return
	 */
	public UserVO getUserByUserid(UserVO user) {
		return xtDao.getUserByUserid(user);
	}
	
	/**
	 * 添加用户
	 * @return
	 */
	public void addUser(UserVO user) {
		xtDao.addUser(user);
	}
	
	/**
	 * 更新用户
	 * @return
	 */
	public void updUser(UserVO user) {
		xtDao.updUser(user);
	}
	
	/**
	 * 更新用户密码
	 * @param map
	 */
	public void updUserPwd(Map<String, Object> map) {
		xtDao.updUserPwd(map);
	}
	
	/**
	 * 更新用户状态
	 * @param map
	 */
	public void updUserState(UserVO user) {
		xtDao.updUserState(user);
	}
	
	/**
	 * 删除用户 By Id
	 * @return
	 */
	public void delUserById(UserVO user) {
		xtDao.delUserById(user);
	}
	
	/**
	 * 查询模块数据 ById
	 * @return
	 */
	public ModuleVO getModuleById(ModuleVO module) {
		return xtDao.getModuleById(module);
	}

	/**
	 * 查询模块数据
	 * @return
	 */
	public List<ModuleVO> getModuleByParentid(ModuleVO module) {
		List<ModuleVO> list =  xtDao.getModuleByParentid(module);
		for (ModuleVO vo : list) {
			vo.setState("closed");
		}
		return list;
	}
	
	/**
	 * 查询所有模块
	 * @return
	 */
	public String getAllModule(String id) {
		ModuleVO module = new ModuleVO();
		module.setParentid(id);
		List<ModuleVO> list1 = xtDao.getModuleByParentid(module);
		String mstr = "";
		int cnt = 0;
		for (ModuleVO vo1 : list1) {
			if (cnt == 0) {
				mstr += "<li class='active'>";
			} else {
				mstr += "<li>";
			}
			module.setParentid(vo1.getId());
			List<ModuleVO> list2 = xtDao.getModuleByParentid(module);
			if (list2.size() > 0) {
				mstr += "<a href='#'><span class='glyphicon glyphicon-th-large'></span> " + vo1.getMname() + "<span class='glyphicon arrow'></span></a>";
				mstr += "<ul>";
				for (ModuleVO vo2 : list2) {
					mstr += "<li>";
					module.setParentid(vo2.getId());
					List<ModuleVO> list3 = xtDao.getModuleByParentid(module);
					if (list3.size() > 0) {
						mstr += "<a href='#'><span class='glyphicon glyphicon-th-list'></span> " + vo2.getMname() + "<span class='glyphicon arrow'></span></a>";
						mstr += "<ul>";
						for (ModuleVO vo3 : list3) {
							String dhlj = vo1.getMname() + "," + vo2.getMname() + "," + vo3.getMname();
							mstr += "<li onclick=index.selectLi(this,'" + vo3.getId() + "','" + dhlj + "')><a href='#'><span class='glyphicon glyphicon-stats'></span> " + vo3.getMname() + "</a></li>";
						}
						mstr += "</ul>";
					} else {
						mstr += "<a href='#'><span class='glyphicon glyphicon-th-list'></span> " + vo2.getMname() + "</a>";
					}
					mstr += "</li>";
				}
				mstr += "</ul>";
			} else {
				mstr += "<a href='#'><span class='glyphicon glyphicon-th-large'></span> " + vo1.getMname() + "</a>";
			}
			mstr += "</li>";
			cnt++;
		}
		return mstr;
	}
	
	/**
	 * 查询所有模块树
	 * @return
	 */
	public List<ModuleVO> getAllModuleTree(String id) {
		ModuleVO module = new ModuleVO();
		module.setParentid(id);
		List<ModuleVO> list1 = xtDao.getModuleByParentid(module);
		for (ModuleVO vo1 : list1) {
			List<ModuleVO> list = getAllModuleTree(vo1.getId());
			if (list.size() > 0) {
				vo1.setNodes(list);
			} else {
				//vo1.setIcon("glyphicon glyphicon-stop");
				vo1.setSelectedIcon("glyphicon glyphicon-hand-right");
			}
			PropertyVO pvo = new PropertyVO();
			pvo.setMid(vo1.getId());
			List<PropertyVO> plist = this.getPropertyByMid(pvo);
			String properties = "";
			String allProperties = "";
			int i = 0;
			for (PropertyVO propertyvo : plist) {
				if (i < 5) {
					properties += ",'" + propertyvo.getZdmc() + "':'" + propertyvo.getPname() + "'";
				}
				allProperties += ",'" + propertyvo.getZdmc() + "':'" + propertyvo.getPname() + "'";
				i++;
			}
			properties = properties == "" ? "{}" : "{" + properties.substring(1) + "}";
			allProperties += ",'dz':'坐标位置'";
			allProperties = "{" + allProperties.substring(1) + "}";
			vo1.setProperties(properties);
			vo1.setAllProperties(allProperties);
		}
		return list1;
	}
	
	/**
	 * 添加模块
	 * @return
	 */
	public void addModule(ModuleVO module) {
		xtDao.addModule(module);
	}
	
	/**
	 * 更新模块
	 * @return
	 */
	public void updModuleById(ModuleVO module) {
		xtDao.updModuleById(module);
	}
	
	/**
	 * 删除模块 By Id
	 * @return
	 */
	public void delModuleById(ModuleVO module) {
		xtDao.delModuleById(module);
	}
	
	/**
	 * 查询属性数据
	 * @return
	 */
	public List<PropertyVO> getPropertyByMid(PropertyVO vo) {
		return xtDao.getPropertyByMid(vo);
	}
	
	/**
	 * 添加属性
	 * @return
	 */
	public void addProperty(PropertyVO vo) {
		Integer maxZdwz = xtDao.getPropertyMaxZdwzByMid(vo);
		if (maxZdwz != null) {
			int zdwz = maxZdwz + 1;
			vo.setZdwz(zdwz);
			vo.setZdmc("col" + zdwz);
		} else {
			vo.setZdwz(1);
			vo.setZdmc("col1");
		}
		xtDao.addProperty(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("setValues", vo.getZdmc() + "=''");
		map.put("mid", vo.getMid());
		xtDao.updDataByMid(map);
	}
	
	/**
	 * 添加属性名称
	 * @return
	 */
	public void addPropertyName(PropertyVO vo) {
		int ncount = xtDao.getPropertyNameCountByMid(vo);//名称数据
		if (ncount == 0) {
			vo.setId(UUID.randomUUID().toString());
			vo.setPname("名称");
			vo.setWz(0);
			vo.setZdwz(0);
			vo.setZdmc("mc");
			xtDao.addProperty(vo);
		}
	}
	
	/**
	 * 更新属性
	 * @return
	 */
	public void updPropertyById(PropertyVO vo) {
		xtDao.updPropertyById(vo);
	}
	
	/**
	 * 删除属性By Id
	 * @return
	 */
	public void delPropertyById(PropertyVO vo) {
		xtDao.delPropertyById(vo);
	}
	
	/**
	 * 查询附件分页
	 * @return
	 */
	public Map<String, Object> getFJByPage(Map<String, Object> map) {
		List<DafileVO> list = xtDao.getFJByPage(map);
		int total = xtDao.getFJByPageTotal(map);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("rows", list);
		m.put("total", total);
		return m;
	}
	
	/**
	 * 添加附件
	 * @return
	 */
	public void addFJ(String fnames, String fmss, String fpaths, String syfpaths, String type, String cjr, String mid) {
		String[] names = fnames.split("#");
		String[] mss = fmss.split("#");
		String[] paths = fpaths.split("#");
		String[] sypaths = syfpaths.split("#");
		for (int i = 0; i < names.length; i++) {
			DafileVO vo = new DafileVO();
			vo.setId(UUID.randomUUID().toString());
			vo.setFname(names[i]);
			if (mss.length > i) {
				vo.setMs(mss[i]);
			} else {
				vo.setMs("");
			}
			vo.setFpath(paths[i]);
			vo.setSyfpath(sypaths[i]);
			vo.setType(type);
			vo.setCjr(cjr);
			vo.setMid(mid);
			xtDao.addFJ(vo);
		}
	}
	
	/**
	 * 修改附件
	 * @param vo
	 */
	public void updFJ(DafileVO vo) {
		xtDao.updFJ(vo);
	}
	
	/**
	 * 删除附件
	 * @param vo
	 */
	public void delFJ(DafileVO vo) {
		xtDao.delFJ(vo);
	}
	
	/**
	 * 查询数据分页
	 * @return
	 */
	public Map<String, Object> getDataByPage(Map<String, Object> map) {
		List<DataVO> list = xtDao.getDataByPage(map);
		int total = xtDao.getDataByPageTotal(map);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("rows", list);
		m.put("total", total);
		return m;
	}
	
	/**
	 * 查询数据ById
	 * @return
	 */
	public DataVO getDataById(Map<String, Object> map) {
		return xtDao.getDataById(map);
	}
	
	/**
	 * 添加数据
	 * @return
	 */
	public void addData(Map<String, Object> map) {
		xtDao.addData(map);
	}
	
	/**
	 * 修改数据
	 * @return
	 */
	public void updData(Map<String, Object> map) {
		xtDao.updData(map);
	}
	
	/**
	 * 删除数据
	 * @return
	 */
	public void delData(Map<String, Object> map) {
		xtDao.delData(map);
	}
	
	/**
	 * 查询数据文件
	 * @return
	 */
	public Map<String, Object> getDataFile(DatafileRelVO vo) {
		List<DafileVO> list = xtDao.getDataFile(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		List<DafileVO> list1 = new ArrayList<DafileVO>();
		List<DafileVO> list2 = new ArrayList<DafileVO>();
		for (DafileVO dfvo : list) {
			if (dfvo.getType().equals("1")) {
				list1.add(dfvo);
			} else {
				list2.add(dfvo);
			}
		}
		map.put("tpRows", list1);
		map.put("spRows", list2);
		return map;
	}
	
	/**
	 * 添加数据文件
	 * @return
	 */
	public void addDataFile(DatafileRelVO vo) {
		xtDao.addDataFile(vo);
	}
	
	/**
	 * 删除数据文件
	 * @return
	 */
	public void delDataFile(DatafileRelVO vo) {
		xtDao.delDataFile(vo);
	}
	
	/**
	 * 删除数据文件by文件id
	 * @return
	 */
	public void delDataFileByFileid(DatafileRelVO vo) {
		xtDao.delDataFileByFileid(vo);
	}
	
	/**
	 * 添加日志
	 * @return
	 */
	public void addLog(DalogVO vo) {
		xtDao.addLog(vo);
	}
	
	/**
	 * 查询日志分页
	 * @return
	 */
	public Map<String, Object> getLogByPage(Map<String, Object> map) {
		List<DalogVO> list = xtDao.getLogByPage(map);
		int total = xtDao.getLogByPageTotal(map);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("rows", list);
		m.put("total", total);
		return m;
	}
	
}
