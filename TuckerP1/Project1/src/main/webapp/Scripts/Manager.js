
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

function pending(){
    console.log("pending");

    
    fetch("http://localhost:8084/Project1/session?reqTyp=viewMyPending").then(function(response){
     
     return response.json();
 }).then(function(data){
     
    user=data;
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }
    displayRequests();

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


    //add a place for managers to select employees and add IDs to the url


    fetch("http://localhost:8084/Project1/session?reqTyp=viewAllRequests").then(function(response){
     
        return response.json();
    }).then(function(data){
        
       user=data;
      
       while (id.firstChild){
           id.removeChild(id.firstChild);
       }
   
      displayRequests();
   
       });
}

function resolve(){
    console.log("resolve"); 
}

