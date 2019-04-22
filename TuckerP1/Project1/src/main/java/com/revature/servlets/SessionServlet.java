package com.revature.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.Employees;
import com.revature.dao.PoneDAOImpl;
import com.revature.service.EmployeeService;

/**
 * Servlet implementation class SessionServlet
 */
@WebServlet("/Session")
public class SessionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	
	private EmployeeService es = new EmployeeService();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SessionServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String req= request.getParameter("reqTyp");
		HttpSession session = request.getSession(false);
		if ( session !=null && session.getAttribute("userId")!=null) {
			try {
				int userId = Integer.parseInt(session.getAttribute("userId").toString());
				switch (req) {
				case("viewInfo"):{
					Employees e = (es.viewInfo(userId));
					String resp = new ObjectMapper().writeValueAsString(e);					
					response.getWriter().write(resp);
					break;
				}default: break;
				}
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
