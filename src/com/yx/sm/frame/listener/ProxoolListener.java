package com.yx.sm.frame.listener;

import java.io.File;
import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.logicalcobwebs.proxool.ProxoolException;
import org.logicalcobwebs.proxool.configuration.JAXPConfigurator;
import org.logicalcobwebs.proxool.configuration.PropertyConfigurator;

public class ProxoolListener implements ServletContextListener {
	private static final Logger logger = Logger.getLogger(ProxoolListener.class);
	private static final String XML_FILE_PROPERTY = "xmlFile";  
	private static final String PROPERTY_FILE_PROPERTY = "propertyFile";  

	public void contextDestroyed(ServletContextEvent arg0) {
	}

	public void contextInitialized(ServletContextEvent contextEvent) {
		ServletContext context = contextEvent.getServletContext();
		String appDir = contextEvent.getServletContext().getRealPath("/");
		Enumeration<?> names = context.getInitParameterNames();
		while (names.hasMoreElements()) {
			String name = (String) names.nextElement();
			String value = context.getInitParameter(name);
			if (name.equals(XML_FILE_PROPERTY)) {
				try {
					File file = new File(value);
					if (file.isAbsolute()) {
						logger.info("Loading proxool setting:" + value);
						JAXPConfigurator.configure(value, false);
					} else {
						logger.info("Loading proxool setting:" + appDir + value);
						JAXPConfigurator.configure(appDir + value, false);
					}
				} catch (ProxoolException e) {
					logger.error("Proxool has problem configuring " + value, e);
					e.printStackTrace();
				}
			} else if (name.equals(PROPERTY_FILE_PROPERTY)) {
				try {
					File file = new File(value);
					if (file.isAbsolute()) {
						logger.info("Loading proxool setting:" + value);
						PropertyConfigurator.configure(value);
					} else {
						logger.info("Loading proxool setting:" + appDir + value);
						PropertyConfigurator.configure(appDir + value);
					}
				} catch (ProxoolException e) {
					logger.error("Proxool has problem configuring " + value, e);
					e.printStackTrace();
				}
			}
		}

	}
}