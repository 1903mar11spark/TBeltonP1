package com.revature.service;

import java.util.ArrayList;

import com.revature.beans.Employees;
import com.revature.beans.Requests;
import com.revature.dao.PoneDAOImpl;

public class EmployeeService {

	PoneDAOImpl pd = new PoneDAOImpl();
	
	public Employees viewInfo(int userId) {
		Employees e = pd.myInfo(userId);
	return e;
	}
	
	public ArrayList<Requests> viewAll(int userId){
		return pd.myRequests(userId);
	}
	
	public ArrayList<Requests> viewPending(int userId){ 
		ArrayList<Requests> list =pd.myPendingRequests(userId);
		return list;
	}
	
	public ArrayList<Requests> viewResolved(int userId){
		ArrayList<Requests> list = pd.myResolvedRequests(userId);
		return list;
	}
	public boolean updateInfo(String newFName, String newLName,int userId) {
	pd.updateMyInfo(newFName, newLName, userId); 
	return true;
	}
	public void newReq(int userId, float amt, String cat, String detail) {
		pd.newRequest(pd.myInfo(userId), amt,  cat, detail);
	}
}
