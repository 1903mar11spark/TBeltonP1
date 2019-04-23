package com.revature.dao;

import java.util.ArrayList;

import com.revature.beans.Employees;
import com.revature.beans.Requests;

public interface PoneDAO {

	public int login(String uName, String pass);												//works
	
	public void newRequest(Employees emp, float amt, String cat, String details);				//works
	public ArrayList<Requests> myRequests(int userId);											//works
	public ArrayList<Requests> myPendingRequests(int userId);									//works
	public ArrayList<Requests> myResolvedRequests(int userId);									//works
	public Employees myInfo(int userId);														//works
	public void updateMyInfo(String newFName, String newLName, int userId);						//works
	
	public ArrayList<Requests> pendingRequests(int userId);										//works
	public ArrayList<String> viewReciepts(int userId);
	public ArrayList<Requests> resolvedRequests(int userId);
	public ArrayList<Employees> myEmployees(int userId);										//works
	public ArrayList<Requests> thierRequests(int userId, int id);								//works
	public void resolveRequests(int reqId);
	
	
}
