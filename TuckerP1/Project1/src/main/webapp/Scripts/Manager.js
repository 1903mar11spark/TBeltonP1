
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

        let form=document.createElement("form");
        form.id="form";     
        form.method="post"
        document.getElementById("id").appendChild(form);

         let reqid=document.createElement("select");
         reqid.id="reqid";
         reqid.className="form-control";
         reqid.innerHTML="Select Employee";
         document.getElementById("form").appendChild(reqid);
 
 
     for(i=0;i<user.length;i++){
 
         let opt = document.createElement("option");
         opt.id=opt+i;
         opt.innerText =user[i].req_id;
          document.getElementById("reqid").appendChild(opt);
     }

     let res=document.createElement("select");
     res.id="res";
     res.className="form-control";
     res.innerHTML="Approve or Deny.";
     document.getElementById("form").appendChild(res);

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
  submit.className="btn btn-primary";
  document.getElementById("form").appendChild(submit);
 
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
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

    user=data;

    let table=document.createElement("table");
    table.id="table";
    table.className="table";
    document.getElementById("id").appendChild(table);

    let header=document.createElement("thead");
    header.id="header";
    document.getElementById("table").appendChild(header);

    let head=document.createElement("tr");
    head.id="head";
    document.getElementById("header").appendChild(head);

    let heading=document.createElement("th");
    heading.scope="col";
    heading.innerHTML="Henchemn ID";
    document.getElementById("head").appendChild(heading);

    let heading2=document.createElement("th");
    heading2.scope="col";
    heading2.innerHTML="First Name";
    document.getElementById("head").appendChild(heading2);

    let heading3=document.createElement("th");
    heading3.scope="col";
    heading3.innerHTML="Last Name";
    document.getElementById("head").appendChild(heading3);

    let tbody=document.createElement("tbody");
    tbody.id="tbody";
    document.getElementById("table").appendChild(tbody);

    for(let i=0;i<user.length;i++){

        let row=document.createElement("tr");
        row.id="row"+i;
        row.class=row;
        document.getElementById("tbody").appendChild(row);

        let eId=document.createElement("td");
        eId.className="eId"
        eId.innerHTML=user[i].id;
        document.getElementById("row"+i).appendChild(eId);
        
        let fName=document.createElement("td");
        fName.className="fName"
        fName.innerText=user[i].fName;
        document.getElementById("row"+i).appendChild(fName);

        let lName=document.createElement("td");
        lName.className="lName"
        lName.innerText=+user[i].lName;
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

   
        let form=document.createElement("form");
        form.id="form";     
        form.method="post"
        document.getElementById("id").appendChild(form);

        empid=document.createElement("select");
        empid.id="empid";
        empid.className="form-control";
        empid.innerHTML="Select Employee";
        document.getElementById("form").appendChild(empid);

        for(i=0;i<user.length;i++){

            let opt = document.createElement("option");
            opt.id=opt+i;
            opt.innerText =user[i].id+"  "+user[i].fName+"  "+user[i].lName;
             document.getElementById("empid").appendChild(opt);
            }
            
            let submit2=document.createElement("button");
            submit2.type="button";
            submit2.innerHTML="Select";
            submit2.className="btn btn-primary";
            document.getElementById("form").appendChild(submit2);
           
            submit2.onclick= function(){ 
               let emp = document.getElementById("empid");
               empid = emp.options[emp.selectedIndex].value;
               empid=empid.substring(0,2);
            
          fetch("http://localhost:8084/Project1/session?reqTyp=viewAllRequests&id="+empid).then(function(response){
            
               return response.json();
           }).then(function(data2){
               
            while (id.firstChild){
                id.removeChild(id.firstChild);
            }
              user=data2;
          
             displayRequests();
          
             });
            }
        })
  
}


function resolve(){
    console.log("resolve"); 
    let fx = true;
    pending(fx);
}

