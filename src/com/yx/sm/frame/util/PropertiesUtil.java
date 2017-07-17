package com.yx.sm.frame.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

public class PropertiesUtil {
	private static String sysPath = System.getProperty("java.class.path");
	/**
	 * 根据key获取properties配置文件值
	 * @param key
	 * @return
	 */
	public static String getProperty(String key){
		Properties prop = new Properties();
		InputStream in = PropertiesUtil.class.getResourceAsStream("/config.properties");
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return prop.getProperty(key);
	}
	
	/**
	 * 设置属性
	 * @param key
	 * @param value
	 * @return
	 */
	public static boolean setProperty(String key, String value){
		boolean r = false;
		Properties prop = new Properties();
		InputStream in = PropertiesUtil.class.getResourceAsStream("config.properties");
		OutputStream out = null;
		try {
			prop.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			out = new FileOutputStream(sysPath + "/config.properties");
			prop.setProperty(key, value);
			prop.store(out,"已经修改了属性" + key);
			r = true;
		} catch (Exception e) {
			r = false;
			e.printStackTrace();
		}
		return r;
	}
}
