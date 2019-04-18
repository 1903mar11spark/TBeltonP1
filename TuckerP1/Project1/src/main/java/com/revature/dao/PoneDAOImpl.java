package com.revature.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


import com.revature.beans.Employees;
import com.revature.beans.Requests;
import com.revature.util.ConnectionUtil;

public class PoneDAOImpl implements PoneDAO{
	
	public int login(String user, String pass) {
		int status =0;
		try(Connection con = ConnectionUtil.getConnection()){
			String sql = "SELECT LOGIN.PASSWORD FROM LOGIN WHERE USERNAME=?";
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setString(1, user);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				String Cpass = rs.getString("UPASSWORD");
				 if (pass.equals(Cpass)) {
					 String sql2 = "SELECT LOGIN.EMP_ID FROM LOGIN WHERE USERNAME=?";
					 PreparedStatement stmt2 = con.prepareStatement(sql2);
					 stmt2.setString(1, user);
					 ResultSet rs2 = stmt.executeQuery();
					 if (rs2.next()) {
						int userId = rs2.getInt("EMP_ID");
						
						 if((myEmployees(userId).size())>0) {
							 status = 3;
							 return status; //employee has subordinates
						 }else {
							 status = 1;	//employee has no subordinates
							 return status;
						 }
					 }
				 }else {
					 status = 0; // bad password
					 return status;
				 }
			}
      } catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
  		return status = 2; //bad username
	}
	

	@Override
	public void newRequest(Employees emp, float amt, String pic, String status, String cat, String details) {
		// create Stored Procedure in DB
		
	}

	@Override
	public ArrayList<Requests> myRequests(int userId) {
		ArrayList<Requests> list = new ArrayList<Requests>();
		
		try (Connection con = ConnectionUtil.getConnection()){
			//remember to change EMT to AMT in the DB
			String sql = "SELECT REQUESTS.REQ_ID,REQUESTS.EMT REQUESTS.IMAGE, REQUESTS.STATUS, REQUESTS.CATAGORY, "
					+ "REQUESTS.DETAILS, FROM REQUESTS WHERE EMP_ID = ?";
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, userId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				int req_id = rs.getInt("REQ_ID");
				float amt = rs.getFloat("EMT");
				String pic= rs.getString("IMAGE");
				String status = rs.getString("STATUS");
				String cat = rs.getString("CATAGORY");
				String detail = rs.getString("DETAILS");
				
				list.add(new Requests (req_id, new Employees(), amt, pic, status, cat, detail ));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	
	}

	@Override
	public ArrayList<Requests> myPendingRequests(int userId) {
		ArrayList<Requests> list = new ArrayList<Requests>();
		
		try (Connection con = ConnectionUtil.getConnection()){
			//remember to change EMT to AMT in the DB
			String sql = "SELECT REQUESTS.REQ_ID,REQUESTS.EMT REQUESTS.IMAGE, REQUESTS.STATUS, REQUESTS.CATAGORY, "
					+ "REQUESTS.DETAILS, FROM REQUESTS WHERE EMP_ID = ? AND STATUS='Pending";
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, userId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				int req_id = rs.getInt("REQ_ID");
				float amt = rs.getFloat("EMT");
				String pic= rs.getString("IMAGE");
				String status = rs.getString("STATUS");
				String cat = rs.getString("CATAGORY");
				String detail = rs.getString("DETAILS");
				
				list.add(new Requests (req_id, new Employees(), amt, pic, status, cat, detail ));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public ArrayList<Requests> myResolvedRequests(int userId) {
		
		
		// change resolved to approved or denied
		
		
		ArrayList<Requests> list = new ArrayList<Requests>();
		
		try (Connection con = ConnectionUtil.getConnection()){
			//remember to change EMT to AMT in the DB
			String sql = "SELECT REQUESTS.REQ_ID,REQUESTS.EMT REQUESTS.IMAGE, REQUESTS.STATUS, REQUESTS.CATAGORY, "
					+ "REQUESTS.DETAILS, FROM REQUESTS WHERE EMP_ID = ? AND STATUS='Resolved";
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, userId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				int req_id = rs.getInt("REQ_ID");
				float amt = rs.getFloat("EMT");
				String pic= rs.getString("IMAGE");
				String status = rs.getString("STATUS");
				String cat = rs.getString("CATAGORY");
				String detail = rs.getString("DETAILS");
				
				list.add(new Requests (req_id, new Employees(), amt, pic, status, cat, detail ));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	

	@Override
	public Employees myInfo(int userId) {
		Employees E = null;
		try (Connection con = ConnectionUtil.getConnection()){
		
			String sql = "SELECT  FROM EMPLOYEES "
					+ "WHERE EMPLOYEES.EMP_ID = ?";
			PreparedStatement pstmt  = con.prepareStatement(sql);
			pstmt.setInt(1, userId); 
			ResultSet rs = pstmt.executeQuery(); 
			
			if (rs.next()) {
				int id = rs.getInt("EMP_ID");
				int boss = rs.getInt("REPORTS_TO");
				String fName=rs.getString("FIRST_NAME");
				String lName = rs.getString("LAST_NAME");
				E = new Employees (id, boss, fName, lName);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return E;
	}

	@Override
	public void updateMyInfo(String newFName, String newLName,int userId) {
		try (Connection con = ConnectionUtil.getConnection()){
			String sql = "UPDATE EMPLOYEES "
					+ "SET FIRST_NAME = ? AND LAST_NAME = ? WHERE ACCOUNT_ID = ?";
			
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setString(1, newFName);
			stmt.setString(2, newLName);
			stmt.setInt(3, userId);
			ResultSet rs = stmt.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	//manager stuff from here down
	
	
	@Override
	public ArrayList<Requests> pendingRequests(int userId) {
	
	ArrayList<Requests> list = new ArrayList<Requests>(); //create new list 
		
	try (Connection con = ConnectionUtil.getConnection()){
				
			String sql = "SELECT EMP_ID FROM EMPLOYEES WHERE REPOPRTS_TO = ?"; //employees who report to user
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, userId);
			ResultSet rs = stmt.executeQuery();
				
			while (rs.next()) { //for all the employees who report to user
					
				int empId = rs.getInt("EMP_ID");
				
				String sql2 = "SELECT REQUESTS.REQ_ID,REQUESTS.EMT REQUESTS.IMAGE, REQUESTS.STATUS, REQUESTS.CATAGORY, "
						+ "REQUESTS.DETAILS, FROM REQUESTS WHERE EMP_ID = ? AND STATUS='Pending";
				PreparedStatement stmt2 = con.prepareStatement(sql2);
				stmt.setLong(1, empId);
				ResultSet rs2 = stmt2.executeQuery();
				while (rs.next()) {
					int req_id = rs2.getInt("REQ_ID");
					float amt = rs2.getFloat("EMT");
					String pic= rs2.getString("IMAGE");
					String status = rs2.getString("STATUS");
					String cat = rs2.getString("CATAGORY");
					String detail = rs2.getString("DETAILS");
					
					list.add(new Requests (req_id, new Employees(), amt, pic, status, cat, detail ));
				}
			}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return list;
		
		
	}

	@Override
	public ArrayList<String> viewReciepts(int userId) {
		// all reciepts from all subordinates
		return null;
	}

	@Override
	public ArrayList<Requests> resolvedRequests(int userId) {

		ArrayList<Requests> list = new ArrayList<Requests>(); //create new list 
		
	try (Connection con = ConnectionUtil.getConnection()){
			
			String sql = "SELECT EMP_ID FROM EMPLOYEES WHERE REPOPRTS_TO = ?"; //employees who report to user
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, userId);
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) { //for all the employees who report to user
				
				int empId = rs.getInt("EMP_ID");
				
				String sql2 = "SELECT REQUESTS.REQ_ID,REQUESTS.EMT REQUESTS.IMAGE, REQUESTS.STATUS, "
						+ "REQUESTS.CATAGORY, "
						+ "REQUESTS.DETAILS, FROM REQUESTS WHERE EMP_ID = ? AND STATUS='Resolved"; 
				//get all of their resolved requests
				PreparedStatement stmt2 = con.prepareStatement(sql2);
				stmt2.setLong(1, empId);
				ResultSet rs2 = stmt.executeQuery(); 
				while (rs2.next()) {
					int req_id = rs2.getInt("REQ_ID");
					float amt = rs2.getFloat("EMT");
					String pic= rs2.getString("IMAGE");
					String status = rs2.getString("STATUS");
					String cat = rs2.getString("CATAGORY");
					String detail = rs2.getString("DETAILS");
					
					list.add(new Requests (req_id, new Employees(), amt, pic, status, cat, detail ));

				}
		
			}
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} return list;
		
	}

	@Override
	public ArrayList<Employees> myEmployees(int userId) {

		ArrayList<Employees> list = new ArrayList<Employees>();
		
		try (Connection con = ConnectionUtil.getConnection()){
			
			String sql = "SELECT * FROM EMPLOYEES WHERE REPOPRTS_TO = ?";
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, userId);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("EMP_ID");
				int boss = rs.getInt("REPORTS_TO");
				String fName=rs.getString("FIRST_NAME");
				String lName = rs.getString("LAST_NAME");
				list.add(new Employees (id, boss, fName, lName));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
	}

	@Override
	public ArrayList<Requests> thierRequests(int userId, int id) {

		try(Connection con = ConnectionUtil.getConnection()){
			
			String sql = "SELECT * FROM EMPLOYEES WHERE EMPLOYEES.EMP_ID=? AND REPORTS_TO=?";
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setLong(1, id);
			stmt.setLong(2, userId);
			ResultSet rs = stmt.executeQuery();
			if(rs.next()) {
				myRequests(id);
			}
			else {
				return null;		//this could cause issues later
				}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void resolveRequests(int reqId) {
		
		//pass in the new request status (either approved or denied)?
		
		// update request status where REQ_ID = reqId
		
	}

	
	
	
}