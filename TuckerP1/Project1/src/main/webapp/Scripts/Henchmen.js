let user = {};
window.onload = function() {
    viewInfo();

    document.getElementById("new").onclick= newRequest;
    document.getElementById("all").onclick= viewAll;
    document.getElementById("pending").onclick = viewPending;
    document.getElementById("resolved").onclick= viewResolved;

    document.getElementById("info").onclick= viewInfo;
    document.getElementById("update").onclick= updateInfo;
    document.getElementById("logout").onclick= logOut;
}

function displayRequests(){
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

    let empty=document.createElement("th");
    empty.scope="col";
    empty.innerHTML="";
    document.getElementById("head").appendChild(empty);

    let heading=document.createElement("th");
    heading.scope="col";
    heading.innerHTML="Request ID";
    document.getElementById("head").appendChild(heading);

    let heading2=document.createElement("th");
    heading2.scope="col";
    heading2.innerHTML="Amount";
    document.getElementById("head").appendChild(heading2);

    let heading3=document.createElement("th");
    heading3.scope="col";
    heading3.innerHTML="Image";
    document.getElementById("head").appendChild(heading3);

    let heading4=document.createElement("th");
    heading4.scope="col";
    heading4.innerHTML="Status";
    document.getElementById("head").appendChild(heading4);

    let heading5=document.createElement("th");
    heading5.scope="col";
    heading5.innerHTML="Catagory";
    document.getElementById("head").appendChild(heading5);

    let heading6=document.createElement("th");
    heading6.scope="col";
    heading6.innerHTML="Detail";
    document.getElementById("head").appendChild(heading6);

    let tbody=document.createElement("tbody");
    tbody.id="tbody";
    document.getElementById("table").appendChild(tbody);

    for(let i=0;i<user.length;i++){

        let row=document.createElement("tr");
        row.id="row"+i;
        row.className="row";
        document.getElementById("tbody").appendChild(row);

        let rId=document.createElement("td");
        rId.className="rId"
        rId.innerHTML=user[i].req_id;
        document.getElementById("row"+i).appendChild(rId);
    
        let amt=document.createElement("td");
        amt.className="amt"
        amt.innerText=user[i].amt;
        document.getElementById("row"+i).appendChild(amt);
        
        let pic=document.createElement("td");
        pic.className="pic"
        pic.innerText=""+user[i].pic;
        document.getElementById("row"+i).appendChild(pic);

        let status=document.createElement("td");
        status.className="status"
        status.innerText=""+user[i].status;
        document.getElementById("row"+i).appendChild(status);

        let cat=document.createElement("td");
        cat.className="cat"
        cat.innerText=""+user[i].cat;
        document.getElementById("row"+i).appendChild(cat);

        let details=document.createElement("td");
        details.className="details"
        details.innerText=""+user[i].detail;
        document.getElementById("row"+i).appendChild(details);
    }

}



function newRequest(){
    console.log("new Request");


    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

    let form=document.createElement("form");
    form.id="form";     
    form.method="post"
    document.getElementById("id").appendChild(form);

    let divClass=document.createElement("div")
    divClass.id="divClass";
    divClass.className="form-group"
    document.getElementById("form").appendChild(divClass);

    let divClass2=document.createElement("div")
    divClass2.id="divClass2";
    divClass2.className="form-group"
    document.getElementById("form").appendChild(divClass2);

    let divClass3=document.createElement("div")
    divClass3.id="divClass3";
    divClass3.className="form-group"
    document.getElementById("form").appendChild(divClass3);

    let label=document.createElement("label");
    label.id="label";
    label.innerHTML="Request Amount";
    document.getElementById("divClass").appendChild(label);

    let label2=document.createElement("label");
    label2.id="label2";
    label2.innerHTML="Request Type";
    document.getElementById("divClass2").appendChild(label2);    

    let select=document.createElement("select");
    select.id="select";
    select.className="form-control";
    select.innerHTML="Request Catagory";
    document.getElementById("divClass2").appendChild(select);

                let opt2 = document.createElement("option");
                opt2.innerText = "Weapons";
            document.getElementById("select").appendChild(opt2);

            let opt3 = document.createElement("option");
            opt3.innerText = "Construction";
            document.getElementById("select").appendChild(opt3);

            let opt1 = document.createElement("option");
            opt1.innerText = "Medical";
           document.getElementById("select").appendChild(opt1);

           let opt4 = document.createElement("option");
           opt4.innerText = "Other";
          document.getElementById("select").appendChild(opt4);
    
    let label3=document.createElement("label");
    label3.id="label3";
    label3.innerHTML="Request Details";
    document.getElementById("divClass3").appendChild(label3);

    let input=document.createElement("input");
    input.id="input";
    input.name="amt";
    input.className="form-control"
    document.getElementById("divClass").appendChild(input);
   
    let input2=document.createElement("input");
    input2.id="input2";
    input2.name="detail";
    input2.className="form-control"
    document.getElementById("divClass3").appendChild(input2);
    
    let submit=document.createElement("button");
    submit.type="button";
    submit.innerHTML="Send Request";
    submit.className="btn btn-primary";
    document.getElementById("form").appendChild(submit);
   
    submit.onclick= function(){

        let cat = document.getElementById("label2");
        label2 = cat.options[cat.selectedIndex].value;

        amt=document.getElementById("input").value;
        detail=document.getElementById("input2").value;
        console.log("amt "+amt+" detail: "+detail+" cat "+label2);
        fetch("http://localhost:8084/Project1/session?reqTyp=newRequest&amt="+amt+"&cat="+label2+"&detail="+detail)
        viewAll();
    }


}

function viewAll(){
    console.log("view all requests");

 fetch("http://localhost:8084/Project1/session?reqTyp=viewAll").then(function(response){
     
     return response.json();
 }).then(function(data){
     
    user=data;
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

   displayRequests();

    });
}

function viewPending(){
    console.log("view pending request");

    fetch("http://localhost:8084/Project1/session?reqTyp=viewPending").then(function(response){
     
     return response.json();
 }).then(function(data){
     
    user=data;
   
    while (id.firstChild){
        id.removeChild(id.firstChild);
    }
    displayRequests();

});

}

function viewResolved(){
    console.log("view resolved request");

    fetch("http://localhost:8084/Project1/session?reqTyp=viewResolved").then(function(response){
     
        return response.json();
    }).then(function(data){
        
       user=data;
      
       while (id.firstChild){
           id.removeChild(id.firstChild);
       }
       displayRequests();
   
   });
}

function viewInfo(){

	fetch ("http://localhost:8084/Project1/session?reqTyp=viewInfo").then(function(response){
      
        return response.json();
	}).then(function(data){

            let id = document.getElementById("id");
            while (id.firstChild){
                id.removeChild(id.firstChild);
            }

            user = data;

            let vInfo=document.createElement("div");
            vInfo.id="vInfo";
            vInfo.className="col col-sm-6";
            document.getElementById("id").appendChild(vInfo);

            let table=document.createElement("table");
            table.id="table";
            table.className="table";
            document.getElementById("vInfo").appendChild(table);

            let userR=document.createElement("tr");
            userR.id="userR";
            userR.className="eRow";
            document.getElementById("table").appendChild(userR);

            let bossR=document.createElement("tr");
            bossR.id="bossR";
            bossR.className="eRow";
            document.getElementById("table").appendChild(bossR);

            let fNameR=document.createElement("tr");
            fNameR.id="fNameR";
            fNameR.className="eRow";
            document.getElementById("table").appendChild(fNameR);

            let lNameR=document.createElement("tr");
            lNameR.id="lNameR";
            lNameR.className="eRow";
            document.getElementById("table").appendChild(lNameR);

            let user1=document.createElement("th");
            user1.innerHTML="User ID";
            user1.scope="row";
            document.getElementById("userR").appendChild(user1);

            let user2=document.createElement("td");
            user2.innerHTML=user.id;
            document.getElementById("userR").appendChild(user2);

            let boss1=document.createElement("th");
            boss1.innerHTML="Boss ID";
            boss1.scope="row";
            document.getElementById("bossR").appendChild(boss1);

            let boss2=document.createElement("td");
            boss2.innerHTML=user.boss;
            document.getElementById("bossR").appendChild(boss2);

            let fname1=document.createElement("th");
            fname1.innerHTML="First Name";
            fname1.scope="row";
            document.getElementById("fNameR").appendChild(fname1);

            let fname2=document.createElement("td");
            fname2.innerHTML=user.fName;
            document.getElementById("fNameR").appendChild(fname2);

            let lname1=document.createElement("th");
            lname1.innerHTML="Last Name";
            lname1.scope="row";
            document.getElementById("lNameR").appendChild(lname1);

            let lname2=document.createElement("td");
            lname2.innerHTML=user.lName;
            document.getElementById("lNameR").appendChild(lname2);

		});
    }

function updateInfo(){
    console.log("update info");

    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

    let form=document.createElement("form");
    form.id="form";     
    form.method="post"
    document.getElementById("id").appendChild(form);

    let divClass=document.createElement("div");
    divClass.id="divClass";
    divClass.className="form-group"
    document.getElementById("form").appendChild(divClass);

    let divClass2=document.createElement("div");
    divClass2.id="divClass2";
    divClass2.className="form-group"
    document.getElementById("form").appendChild(divClass2);

    let label=document.createElement("label");
    label.id="label";
    label.innerHTML="New First Name";
    document.getElementById("divClass").appendChild(label);

    let label2=document.createElement("label");
    label2.id="label2";
    label2.innerHTML="New Last Name";
    document.getElementById("divClass2").appendChild(label2);

    let input=document.createElement("input");
    input.id="input";
    input.name="newFName";
    input.className="form-control"
    document.getElementById("divClass").appendChild(input);
    fname=document.getElementById("input").value;

    let input2=document.createElement("input");
    input2.id="input2";
    input2.name="newLName";
    input2.className="form-control"
    document.getElementById("divClass2").appendChild(input2);
    lname=document.getElementById("input2").value;

    let submit=document.createElement("button");
    submit.type="submit";
    submit.innerHTML="Update";
    submit.className="btn btn-primary";
    document.getElementById("form").appendChild(submit);
   
    submit.onclick= function(){
        fname=document.getElementById("input").value;
        lname=document.getElementById("input2").value;
        console.log("lname = "+lname);
        fetch("http://localhost:8084/Project1/session?reqTyp=updateInfo&fName="+fname+"&lName="+lname)
        viewInfo();
    }

 
}

function logOut(){
    console.log("logOut");

    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

   let logout = document.createElement("form");
   logout.action="logout";
   logout.method="post";
   logout.id="logouts";
   document.getElementById("id").appendChild(logout);

   let submit=document.createElement("button");
   submit.type="submit";
   submit.innerHTML="Logout";
   submit.className="btn btn-primary";
   document.getElementById("logouts").appendChild(submit);

}