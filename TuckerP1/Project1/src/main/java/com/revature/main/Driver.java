package com.revature.main;

import com.revature.dao.PoneDAOImpl;
import com.revature.service.EmployeeService;

public class Driver {

	public static void main(String[] args) {
		PoneDAOImpl pd = new PoneDAOImpl();

		EmployeeService es = new EmployeeService();
		
		es.newReq(61, 234, "Construction", "Repairs");
	}

}
