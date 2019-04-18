package com.revature.beans;

public class Requests {

	int req_id;
	Employees emp;
	float amt;
	String pic;
	String status;
	String cat;
	String detail;
	
	public Requests() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Requests(int req_id, Employees emp, float amt, String pic, String status, String cat, String detail) {
		super();
		this.req_id = req_id;
		this.emp = emp;
		this.amt = amt;
		this.pic = pic;
		this.status = status;
		this.cat = cat;
		this.detail = detail;
	}
	public int getReq_id() {
		return req_id;
	}
	public void setReq_id(int req_id) {
		this.req_id = req_id;
	}
	public Employees getEmp() {
		return emp;
	}
	public void setEmp(Employees emp) {
		this.emp = emp;
	}
	public float getAmt() {
		return amt;
	}
	public void setAmt(float amt) {
		this.amt = amt;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCat() {
		return cat;
	}
	public void setCat(String cat) {
		this.cat = cat;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	@Override
	public String toString() {
		return "Requests [req_id=" + req_id + ", emp=" + emp + ", amt=" + amt + ", pic=" + pic + ", status=" + status
				+ ", cat=" + cat + ", detail=" + detail + "]";
	}
	
	
	
	
}
