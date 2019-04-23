package com.revature.service;

import java.util.ArrayList;

import com.revature.beans.Employees;
import com.revature.beans.Requests;
import com.revature.dao.PoneDAOImpl;

public class ManagerService {
	

	PoneDAOImpl pd = new PoneDAOImpl();
	
	public ArrayList<Requests> viewPending(int userId){ 
		ArrayList<Requests> list =pd.pendingRequests(userId);
		return list;
	}
	public ArrayList<Requests> resolved(int userId){
		ArrayList<Requests> list =pd.resolvedRequests(userId);
		return list;
	}
	public ArrayList<Employees> myEmps(int userId){
		ArrayList<Employees> list = pd.myEmployees(userId);
		return list;
	}
	public ArrayList<Requests> thiers(int userId, int id){
		ArrayList<Requests> list =pd.thierRequests(userId, id);
		return list;
	}

}
