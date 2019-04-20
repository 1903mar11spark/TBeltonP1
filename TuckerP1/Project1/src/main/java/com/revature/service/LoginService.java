package com.revature.service;

import com.revature.beans.Employees;
import com.revature.beans.Login;
import com.revature.dao.PoneDAOImpl;

public class LoginService {
	
	PoneDAOImpl pd = new PoneDAOImpl();

	public Employees checkLogin(Login log) {
		Employees e =null;
		String pass = log.getPass();
		String user =log.getuName();
		if (pd.login( user,pass)!=0) {
			int userId = pd.login(user, pass);
			e = pd.myInfo(userId);
		}return e;
		
	}
	
	public boolean isManager(int id) {
		if(pd.myEmployees(id).size()>0) {
			return true;
		}else return false;
	}


	
	
	
}
