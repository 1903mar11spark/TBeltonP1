package com.revature.servlets;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.Employees;
import com.revature.beans.Requests;
import com.revature.dao.PoneDAOImpl;
import com.revature.service.EmployeeService;
import com.revature.service.ManagerService;

/**
 * Servlet implementation class SessionServlet
 */
@WebServlet("/Session")
public class SessionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	
	private EmployeeService es = new EmployeeService();
	private ManagerService ms= new ManagerService();
	
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
		System.out.println();
		if ( session !=null && session.getAttribute("userId")!=null) {
			try {
				int userId = Integer.parseInt(session.getAttribute("userId").toString());
				switch (req) {
				case("viewInfo"):{
					Employees e = (es.viewInfo(userId));
					String resp = new ObjectMapper().writeValueAsString(e);					
					response.getWriter().write(resp);
					break;
				}case("viewAll"):{
					ArrayList<Requests> list = es.viewAll(userId);
					String resp = new ObjectMapper().writeValueAsString(list);
					response.getWriter().write(resp);
					break;
				}case("viewPending"):{
					ArrayList<Requests> list = es.viewPending(userId);
					String resp = new ObjectMapper().writeValueAsString(list);
					response.getWriter().write(resp);
					break;
				}case("viewResolved"):{
					ArrayList<Requests> list = es.viewResolved(userId);
					String resp = new ObjectMapper().writeValueAsString(list);
					response.getWriter().write(resp);
					break;
				}case("updateInfo"):{
					String fName = request.getParameter("fName");
					String lName = request.getParameter("lName");
					boolean update = es.updateInfo(fName, lName, userId);
					String resp = new ObjectMapper().writeValueAsString(update);
					response.getWriter().write(resp);
					break;
				}case("newRequest"):{
					String amt = request.getParameter("amt");
					String cat = request.getParameter("cat");
					String detail = request.getParameter("detail");
					float amount;
					try{
						amount = Float.valueOf(amt);
						es.newReq(userId, amount, cat, detail);
					}catch(Exception e) {
						e.printStackTrace();
					}
					break;
				}
				//manager only cases
				case("viewMyPending"):{
					ArrayList<Requests> list = ms.viewPending(userId);
					String resp = new ObjectMapper().writeValueAsString(list);
					response.getWriter().write(resp);
					break;
				}
				case("resolved"):{
					ArrayList<Requests> list = ms.resolved(userId);
					String resp = new ObjectMapper().writeValueAsString(list);
					response.getWriter().write(resp);
					break;
				}case("myEmps"):{
					ArrayList<Employees> list = ms.myEmps(userId);
					String resp = new ObjectMapper().writeValueAsString(list);
					response.getWriter().write(resp);
					break;
				}case("viewAllRequests"):{
					String amt = request.getParameter("id");
					int id;
					try{ 
						id = Integer.valueOf(amt);
						ArrayList<Requests> list = ms.thiers(userId,id);
						String resp = new ObjectMapper().writeValueAsString(list);
						response.getWriter().write(resp);
					}catch(Exception e) {
						e.printStackTrace();
					}break;
				}case("updateRequest"):{
					
					String res = request.getParameter("status");
					String amt = request.getParameter("id");
					int id;
					try{
						id = Integer.valueOf(amt);
						ms.resolve(id, res);
				}catch(Exception e) {
					e.printStackTrace();
				}break;
				}
				default: {
					System.out.println("nope");
					break;
				}
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
