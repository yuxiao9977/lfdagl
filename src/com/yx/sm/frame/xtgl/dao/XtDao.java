package com.yx.sm.frame.xtgl.dao;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yx.sm.frame.xtgl.vo.DafileVO;
import com.yx.sm.frame.xtgl.vo.DalogVO;
import com.yx.sm.frame.xtgl.vo.DataVO;
import com.yx.sm.frame.xtgl.vo.DatafileRelVO;
import com.yx.sm.frame.xtgl.vo.ModuleVO;
import com.yx.sm.frame.xtgl.vo.PropertyVO;
import com.yx.sm.frame.xtgl.vo.UserVO;

/**
 * 系统管理DAO
 * @author yx
 */
@Repository
public class XtDao {
	private Logger logger = Logger.getLogger(XtDao.class);
	
	@Autowired
	protected SqlSessionTemplate sqlTemplate;
	
	/**
	 * 用户名密码查询用户
	 * @return
	 */
	public UserVO getUserByNamePwd(Map<String, Object> map) {
		return sqlTemplate.selectOne("xtglMapper.getUserByNamePwd", map);
	}
	
	/**
	 * 查询用户分页
	 * @return
	 */
	public List<UserVO> getUserByPage(Map<String, Object> map) {
		return sqlTemplate.selectList("xtglMapper.getUserByPage", map);
	}
	
	/**
	 * 查询用户分页总数
	 * @return
	 */
	public int getUserByPageTotal(Map<String, Object> map) {
		return sqlTemplate.selectOne("xtglMapper.getUserByPageTotal", map);
	}
	
	/**
	 * userid查询用户
	 * @return
	 */
	public UserVO getUserByUserid(UserVO user) {
		return sqlTemplate.selectOne("xtglMapper.getUserByUserid", user);
	}
	
	/**
	 * 添加用户
	 * @return
	 */
	public void addUser(UserVO user) {
		sqlTemplate.selectOne("xtglMapper.addUser", user);
	}
	
	/**
	 * 更新用户
	 * @return
	 */
	public void updUser(UserVO user) {
		sqlTemplate.selectOne("xtglMapper.updUser", user);
	}
	
	/**
	 * 更新用户密码
	 * @param map
	 */
	public void updUserPwd(Map<String, Object> map) {
		sqlTemplate.selectOne("xtglMapper.updUserPwd", map);
	}
	
	/**
	 * 更新用户状态
	 * @param map
	 */
	public void updUserState(UserVO user) {
		sqlTemplate.selectOne("xtglMapper.updUserState", user);
	}
	
	/**
	 * 删除用户 By Id
	 * @return
	 */
	public void delUserById(UserVO user) {
		sqlTemplate.selectOne("xtglMapper.delUserById", user);
	}
	
	/**
	 * 查询模块数据
	 * @return
	 */
	public ModuleVO getModuleById(ModuleVO module) {
		return sqlTemplate.selectOne("xtglMapper.getModuleById", module);
	}
	
	/**
	 * 查询模块数据
	 * @return
	 */
	public List<ModuleVO> getModuleByParentid(ModuleVO module) {
		return sqlTemplate.selectList("xtglMapper.getModuleByParentid", module);
	}
	
	/**
	 * 添加模块
	 * @return
	 */
	public void addModule(ModuleVO module) {
		sqlTemplate.selectOne("xtglMapper.addModule", module);
	}
	
	/**
	 * 更新模块
	 * @return
	 */
	public void updModuleById(ModuleVO module) {
		sqlTemplate.selectOne("xtglMapper.updModuleById", module);
	}
	
	/**
	 * 删除模块By Id
	 * @return
	 */
	public void delModuleById(ModuleVO module) {
		sqlTemplate.selectOne("xtglMapper.delModuleById", module);
	}
	
	/**
	 * 查询属性数据
	 * @return
	 */
	public List<PropertyVO> getPropertyByMid(PropertyVO vo) {
		return sqlTemplate.selectList("xtglMapper.getPropertyByMid", vo);
	}
	
	/**
	 * 查询属性名称是否存在By mid
	 * @return
	 */
	public int getPropertyNameCountByMid(PropertyVO vo) {
		return sqlTemplate.selectOne("xtglMapper.getPropertyNameCountByMid", vo);
	}
	
	/**
	 * 查询属性最大字段位置By mid
	 * @return
	 */
	public Integer getPropertyMaxZdwzByMid(PropertyVO vo) {
		return sqlTemplate.selectOne("xtglMapper.getPropertyMaxZdwzByMid", vo);
	}
	
	/**
	 * 添加属性
	 * @return
	 */
	public void addProperty(PropertyVO vo) {
		sqlTemplate.selectOne("xtglMapper.addProperty", vo);
	}
	
	/**
	 * 更新属性
	 * @return
	 */
	public void updPropertyById(PropertyVO vo) {
		sqlTemplate.selectOne("xtglMapper.updPropertyById", vo);
	}
	
	/**
	 * 删除属性By Id
	 * @return
	 */
	public void delPropertyById(PropertyVO vo) {
		sqlTemplate.selectOne("xtglMapper.delPropertyById", vo);
	}
	
	/**
	 * 查询附件分页
	 * @return
	 */
	public List<DafileVO> getFJByPage(Map<String, Object> map) {
		return sqlTemplate.selectList("xtglMapper.getFJByPage", map);
	}
	
	/**
	 * 查询附件分页总数
	 * @return
	 */
	public int getFJByPageTotal(Map<String, Object> map) {
		return sqlTemplate.selectOne("xtglMapper.getFJByPageTotal", map);
	}
	
	/**
	 * 添加附件
	 * @return
	 */
	public void addFJ(DafileVO vo) {
		sqlTemplate.selectOne("xtglMapper.addFJ", vo);
	}
	
	/**
	 * 修改附件
	 * @return
	 */
	public void updFJ(DafileVO vo) {
		sqlTemplate.selectOne("xtglMapper.updFJ", vo);
	}
	
	/**
	 * 删除附件
	 * @return
	 */
	public void delFJ(DafileVO vo) {
		sqlTemplate.selectOne("xtglMapper.delFJ", vo);
		DatafileRelVO dfrvo = new DatafileRelVO();
		dfrvo.setFileid(vo.getId());
		this.delDataFileByFileid(dfrvo);//删除关联文件
	}
	
	/**
	 * 查询数据分页
	 * @return
	 */
	public List<DataVO> getDataByPage(Map<String, Object> map) {
		return sqlTemplate.selectList("xtglMapper.getDataByPage", map);
	}
	
	/**
	 * 查询数据分页总数
	 * @return
	 */
	public int getDataByPageTotal(Map<String, Object> map) {
		return sqlTemplate.selectOne("xtglMapper.getDataByPageTotal", map);
	}
	
	/**
	 * 查询数据ById
	 * @return
	 */
	public DataVO getDataById(Map<String, Object> map) {
		return sqlTemplate.selectOne("xtglMapper.getDataById", map);
	}
	
	/**
	 * 添加数据
	 * @return
	 */
	public void addData(Map<String, Object> map) {
		sqlTemplate.selectOne("xtglMapper.addData", map);
	}
	
	/**
	 * 修改数据
	 * @return
	 */
	public void updData(Map<String, Object> map) {
		sqlTemplate.selectOne("xtglMapper.updData", map);
	}
	
	/**
	 * 修改数据By模块ID
	 * @return
	 */
	public void updDataByMid(Map<String, Object> map) {
		sqlTemplate.selectOne("xtglMapper.updDataByMid", map);
	}
	
	/**
	 * 删除数据
	 * @return
	 */
	public void delData(Map<String, Object> map) {
		sqlTemplate.selectOne("xtglMapper.delData", map);
	}
	
	/**
	 * 查询数据文件
	 * @return
	 */
	public List<DafileVO> getDataFile(DatafileRelVO vo) {
		return sqlTemplate.selectList("xtglMapper.getDataFile", vo);
	}
	
	/**
	 * 添加数据文件
	 * @return
	 */
	public void addDataFile(DatafileRelVO vo) {
		sqlTemplate.selectOne("xtglMapper.addDataFile", vo);
	}
	
	/**
	 * 删除数据文件
	 * @return
	 */
	public void delDataFile(DatafileRelVO vo) {
		sqlTemplate.selectOne("xtglMapper.delDataFile", vo);
	}
	
	/**
	 * 删除数据文件by文件id
	 * @return
	 */
	public void delDataFileByFileid(DatafileRelVO vo) {
		sqlTemplate.selectOne("xtglMapper.delDataFileByFileid", vo);
	}
	
	/**
	 * 添加日志
	 * @return
	 */
	public void addLog(DalogVO vo) {
		sqlTemplate.selectOne("xtglMapper.addLog", vo);
	}
	
	/**
	 * 查询日志分页
	 * @return
	 */
	public List<DalogVO> getLogByPage(Map<String, Object> map) {
		return sqlTemplate.selectList("xtglMapper.getLogByPage", map);
	}
	
	/**
	 * 查询日志总数
	 * @return
	 */
	public int getLogByPageTotal(Map<String, Object> map) {
		return sqlTemplate.selectOne("xtglMapper.getLogByPageTotal", map);
	}
	
}