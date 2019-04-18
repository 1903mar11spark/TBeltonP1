package com.revature.beans;

public class Login {

	int id;
	String uName;
	String pass;

	
	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Login(int id, String uName, String pass) {
		super();
		this.id = id;
		this.uName = uName;
		this.pass = pass;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getuName() {
		return uName;
	}
	public void setuName(String uName) {
		this.uName = uName;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	@Override
	public String toString() {
		return "Login [id=" + id + ", uName=" + uName + ", pass=" + pass + "]";
	}
	
	
}
