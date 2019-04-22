package com.revature.main;

import com.revature.dao.PoneDAOImpl;

public class Driver {

	public static void main(String[] args) {
		PoneDAOImpl pd = new PoneDAOImpl();
		//System.out.println(pd.myRequests(61));
		System.out.println(pd.myInfo(62));
	}

}
