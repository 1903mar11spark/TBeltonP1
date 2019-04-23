
window.onload = function() {
    viewInfo();

    
    document.getElementById("new").onclick= newRequest;
    document.getElementById("all").onclick= viewAll;
    document.getElementById("pending").onclick = viewPending;
    document.getElementById("resolved").onclick= viewResolved;

    document.getElementById("info").onclick= viewInfo;
    document.getElementById("update").onclick= updateInfo;
    document.getElementById("logout").onclick= logOut;



    document.getElementById("pend").onclick= pending;
    document.getElementById("reso").onclick= resolved;
    document.getElementById("mine").onclick = myEmp;
    document.getElementById("thiers").onclick= allReqs;
    document.getElementById("resolve").onclick= resolve;
}


function select(){
    console.log("select");
         let reqid=document.createElement("select");
         reqid.id="reqid";
         reqid.innerHTML="Select Employee";
         document.getElementById("id").appendChild(reqid);
 
 
     for(i=0;i<user.length;i++){
 
         let opt = document.createElement("option");
         opt.id=opt+i;
         opt.innerText =user[i].req_id;
          document.getElementById("reqid").appendChild(opt);
     }

     let res=document.createElement("select");
     res.id="res";
     res.innerHTML="Approve or Deny.";
     document.getElementById("id").appendChild(res);

        let appr = document.createElement("option");
        appr.id=appr;
        appr.innerText ="Approved";
        document.getElementById("res").appendChild(appr);

        let deny = document.createElement("option");
        deny.id=deny;
        deny.innerText ="Denied";
        document.getElementById("res").appendChild(deny);

 
  let submit=document.createElement("input");
  submit.type="submit";
  submit.value="Select";
  document.getElementById("id").appendChild(submit);
 
  submit.onclick= function(){
     let emp = document.getElementById("reqid");
     reqid = emp.options[emp.selectedIndex].value;

    let stat = document.getElementById("res");
    res = stat.options[stat.selectedIndex].value;

     console.log("Request "+reqid+" "+res)
     fetch("http://localhost:8084/Project1/session?reqTyp=updateRequest&id="+reqid+"&status="+res);
      resolved();
 }
 }


function pending(fx){
    console.log("pending");

    
    fetch("http://localhost:8084/Project1/session?reqTyp=viewMyPending").then(function(response){
     
     return response.json();
 }).then(function(data){
     
    user=data;
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }
    displayRequests();

    console.log("fx= "+fx);
    if(fx==true){
        select();
    }

});
}

function resolved(){
    console.log("resolved");

    fetch("http://localhost:8084/Project1/session?reqTyp=resolved").then(function(response){
     
     return response.json();
 }).then(function(data){
     
    user=data;
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }
    displayRequests();



});

}

function myEmp(){
    console.log("myEmp");

    fetch("http://localhost:8084/Project1/session?reqTyp=myEmps").then(function(response){
     
     return response.json();
 }).then(function(data){
     
    user=data;
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }
    let table=document.createElement("table");
    table.id="table";
    document.getElementById("id").appendChild(table);

    for(let i=0;i<user.length;i++){

        let row=document.createElement("tr");
        row.id="row"+i;
        row.class=row;
        document.getElementById("table").appendChild(row);

        let eId=document.createElement("td");
        eId.className="eId"
        eId.innerHTML="Employee Id: " +user[i].id;
        document.getElementById("row"+i).appendChild(eId);
        
        let fName=document.createElement("td");
        fName.className="fName"
        fName.innerText=""+user[i].fName;
        document.getElementById("row"+i).appendChild(fName);

        let lName=document.createElement("td");
        lName.className="lName"
        lName.innerText=""+user[i].lName;
        document.getElementById("row"+i).appendChild(lName);
    }
});

}

function allReqs(){
    console.log("allReqs");  

    
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

    fetch("http://localhost:8084/Project1/session?reqTyp=myEmps").then(function(response){

        return response.json();
    }).then(function(data){
        user = data;


        let empid=document.createElement("select");
        empid.id="empid";
        empid.innerHTML="Select Employee";
        document.getElementById("id").appendChild(empid);

        for(i=0;i<user.length;i++){

            let opt = document.createElement("option");
            opt.id=opt+i;
            opt.innerText =user[i].id+" "+user[i].fName;
             document.getElementById("empid").appendChild(opt);
        }
    })

     let submit=document.createElement("input");
     submit.type="submit";
     submit.value="Select";
     document.getElementById("id").appendChild(submit);
    
     submit.onclick= function(){
        let emp = document.getElementById("empid");
        empid = emp.options[emp.selectedIndex].value;
        empid=empid.substring(0,2);
        console.log("sleeceted id"+empid)

    fetch("http://localhost:8084/Project1/session?reqTyp=viewAllRequests&id="+empid).then(function(response){
     
        return response.json();
    }).then(function(data2){
        
       user=data2;
      
       while (id.firstChild){
           id.removeChild(id.firstChild);
       }
   
      displayRequests();
   
       });
     }
}


function resolve(){
    console.log("resolve"); 
    let fx = true;
    pending(fx);
}

