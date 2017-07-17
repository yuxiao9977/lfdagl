<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*,com.yx.sm.frame.util.ImageMarkUtil"%>
<%@ page import="org.apache.commons.fileupload.*"%>
<%@ page import="org.apache.commons.fileupload.disk.*"%>
<%@ page import="org.apache.commons.fileupload.servlet.*"%>
<%@ page import="org.json.simple.*"%>
<%
String fileType = request.getParameter("fileType");

//文件保存目录路径
String savePath = pageContext.getServletContext().getRealPath("/") + "upload\\" + fileType + "\\";
//原文件名
String fn = "";

//定义允许上传的文件扩展名
/* HashMap<String, String> extMap = new HashMap<String, String>();
extMap.put("image", "gif,jpg,jpeg,png,bmp");//图片
extMap.put("video", "mp4,wmv,avi,mpeg");//视频 */

//最大文件大小300M
//long maxSize = 310000000;

response.setContentType("text/html;charset=UTF-8");

FileItemFactory factory = new DiskFileItemFactory();
ServletFileUpload upload = new ServletFileUpload(factory);
upload.setHeaderEncoding("UTF-8");
List items = upload.parseRequest(request);
Iterator itr = items.iterator();
JSONObject all = new JSONObject();//全部集合
JSONArray cgja = new JSONArray();//成功集合
JSONArray sbja = new JSONArray();//失败集合
while (itr.hasNext()) {
	FileItem item = (FileItem) itr.next();
	String fileName = item.getName();
	long fileSize = item.getSize();
	if (!item.isFormField()) {
		
		/* if(item.getSize() > maxSize) {//检查文件大小
			JSONObject obj = new JSONObject();
			obj.put("result", "error");
			obj.put("message", "上传文件大小超过限制");
			out.print(obj.toJSONString());
			return;
		} */
		
		fn = fileName.substring(fileName.lastIndexOf("/") + 1);
		
		//检查扩展名
		String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		/* if(!Arrays.<String>asList(extMap.get(fileType).split(",")).contains(fileExt)) {
			JSONObject obj = new JSONObject();
			obj.put("result", "error");
			obj.put("message", "上传文件扩展名是不允许的扩展名。\n只允许" + extMap.get(fileType) + "格式");
			out.print(obj.toJSONString());
			return;
		} */
		String uuid = UUID.randomUUID().toString();
		String newFileName = uuid + "." + fileExt;
		try{
			File uploadedFile = new File(savePath, newFileName);
			item.write(uploadedFile);
			JSONObject obj = new JSONObject();
			obj.put("url", "/upload/" + fileType + "/" + newFileName);
			if (fileType.equals("image")) {
				String newFileNameSy = uuid + "_sy." + fileExt;
				ImageMarkUtil.addSy(pageContext.getServletContext().getRealPath("/") + "images\\sy.png"
					, savePath + newFileName, savePath + newFileNameSy, 0);
				obj.put("syUrl", "/upload/" + fileType + "/" + newFileNameSy);
				//obj.put("syUrl", "/upload/" + fileType + "/" + newFileName);
			}
			//obj.put("fn", fn);//原文件名
			cgja.add(obj);
		}catch(Exception e){
			JSONObject obj = new JSONObject();
			obj.put("message", fn + " 上传失败");
			sbja.add(obj);
		}
	}
}
all.put("cg", cgja);
all.put("sb", sbja);
out.print(all);
%>