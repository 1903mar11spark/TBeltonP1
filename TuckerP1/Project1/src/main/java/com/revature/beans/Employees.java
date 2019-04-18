package com.revature.beans;

public class Employees {

	int id;
	int boss;
	String fName;
	String lName;
	
	
	public Employees() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Employees(int id, int boss, String fName, String lName) {
		super();
		this.id = id;
		this.boss = boss;
		this.fName = fName;
		this.lName = lName;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getBoss() {
		return boss;
	}


	public void setBoss(int boss) {
		this.boss = boss;
	}


	public String getfName() {
		return fName;
	}


	public void setfName(String fName) {
		this.fName = fName;
	}


	public String getlName() {
		return lName;
	}


	public void setlName(String lName) {
		this.lName = lName;
	}


	@Override
	public String toString() {
		return "Employees [id=" + id + ", boss=" + boss + ", fName=" + fName + ", lName=" + lName + "]";
	}
	
	
	
}
