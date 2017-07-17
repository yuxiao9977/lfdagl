package com.yx.sm.frame.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.yx.sm.frame.xtgl.vo.UserVO;

/**
 * 登录过滤器
 * @author yx
 */
@WebFilter(filterName="/LoginFilter", urlPatterns="/jsp/manage.jsp")
public class LoginFilter implements Filter {

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
	    HttpServletResponse response = (HttpServletResponse) res;
	    HttpSession session = request.getSession(false) == null ? request.getSession() : request.getSession(false);
	    UserVO user = (UserVO)session.getAttribute("uservo");
	    if (null != user && user.getIsgly().equals("0")) {
	    	chain.doFilter(req, res);
	    } else {
	    	response.sendRedirect(request.getContextPath() + "/login.jsp");
	    }
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
	}

}
