package com.revature.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.revature.beans.Employees;
import com.revature.beans.Login;
import com.revature.service.LoginService;

/**
 * Servlet implementation class LoginServlet
 */

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private LoginService ls = new LoginService();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("login.html").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		HttpSession session = request.getSession();
		Login log = new Login(request.getParameter("username"), request.getParameter("password"));
		Employees e = ls.checkLogin(log);
	
		if (e != null) {
			
			
			session.setAttribute("userId", e.getId());
			session.setAttribute("boss", e.getBoss());
			session.setAttribute("fName", e.getfName());
			session.setAttribute("lName", e.getlName());
			session.setAttribute("problem", null);
			
			if(ls.isManager(e.getId())) {
				response.sendRedirect("manager"); 
				//this redirects to manager page, which does not exist yet
			}else {
				
				response.sendRedirect("employee");
				//this page redirects to the standard emplyee page which does nto exist yet
			}
			
		}else {
			
			//session.setAttribute("problem", "invalid login attempt");
			response.sendRedirect("login");
		}
		
	}

}
