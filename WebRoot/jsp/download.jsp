<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*"%>
<%@ page import="javax.servlet.ServletContext"%>
<%@ page import="javax.servlet.ServletOutputStream"%>
<%@ page import="javax.servlet.http.HttpServletResponse"%>
<%@ page import="org.springframework.web.context.ServletContextAware"%>
<%@ page import="java.net.URLEncoder"%>
<%
//获得Jsp传过来的file和url
String file=request.getParameter("file");//文件真实名字
String url=request.getParameter("url");//文件物理名字
//设置编码格式
response.setContentType("text/html;charset=UTF-8"); 
//获取网站部署路径(通过ServletContext对象)，用于确定下载文件位置，从而实现下载  
ServletContext 	servletContext=request.getServletContext();
//获得根路径
String path = servletContext.getRealPath("/");
//设置文件ContentType类型，这样设置，会自动判断下载文件类型  
response.setContentType("multipart/form-data");
//设置URL编码，避免下载中文文件时名称出错  
String downname = URLEncoder.encode(file,"UTF-8");
//2.设置文件头：最后一个参数是设置下载文件名  
response.setHeader("Content-Disposition", "attachment; filename=" + downname); 
//获得输出流 
OutputStream outputStream = response.getOutputStream(); 
//通过文件路径获得File对象
InputStream inputStream = new FileInputStream(path+ url); 
byte[] buffer = new byte[1024]; 
int i = -1; 
while ((i = inputStream.read(buffer)) != -1) { 
	outputStream.write(buffer, 0, i); 
} 
outputStream.flush(); 
outputStream.close(); 
inputStream.close();
outputStream = null;
out.clear();  
out = pageContext.pushBody();
%>