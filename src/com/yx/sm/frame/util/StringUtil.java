package com.yx.sm.frame.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 字符串操作工具类
 * @author Jie
 *
 */
public class StringUtil {
	/**
	 * 判断一个字符串是否为null或空字符串
	 * 
	 * @param str
	 *            要判断的字符串
	 * @return 如果str是null或空字符串，返回true，否则返回false
	 */
	public static boolean isNullOrEmpty(String str) {
		boolean r = false;
		if (str == null || str.length() < 1) {
			r = true;
		}
		return r;
	}

	/**
	 * 对字符串进行md5加密，常用于对密码加密
	 * 
	 * @param plainText
	 *            加密对象
	 * @return
	 */
	public static String getMd5(String plainText) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			// 32位加密
			return (buf.toString()).toUpperCase();
			// 16位的加密
			// return buf.toString().substring(8, 24);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}
}
