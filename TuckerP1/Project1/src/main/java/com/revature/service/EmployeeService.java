package com.revature.service;

import com.revature.beans.Employees;
import com.revature.dao.PoneDAOImpl;

public class EmployeeService {

	PoneDAOImpl pd = new PoneDAOImpl();
	
	public Employees viewInfo(int userId) {
		Employees e = pd.myInfo(userId);
	return e;
	
	}
	
	
}
