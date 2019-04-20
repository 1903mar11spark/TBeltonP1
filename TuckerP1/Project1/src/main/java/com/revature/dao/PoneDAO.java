package com.revature.dao;

import java.util.ArrayList;

import com.revature.beans.Employees;
import com.revature.beans.Requests;

public interface PoneDAO {

	public int login(String uName, String pass);
	
	public void newRequest(Employees emp, float amt, String pic, String status, String cat, String details);
	public ArrayList<Requests> myRequests(int userId);
	public ArrayList<Requests> myPendingRequests(int userId);
	public ArrayList<Requests> myResolvedRequests(int userId);
	public Employees myInfo(int userId);
	public void updateMyInfo(String newFName, String newLName, int userId);
	
	public ArrayList<Requests> pendingRequests(int userId);
	public ArrayList<String> viewReciepts(int userId);
	public ArrayList<Requests> resolvedRequests(int userId);
	public ArrayList<Employees> myEmployees(int userId);
	public ArrayList<Requests> thierRequests(int userId, int id);
	public void resolveRequests(int reqId);
	
	
}
