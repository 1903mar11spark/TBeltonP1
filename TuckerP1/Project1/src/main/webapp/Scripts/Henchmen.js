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
    document.getElementById("id").appendChild(table);

    for(let i=0;i<user.length;i++){

        let row=document.createElement("tr");
        row.id="row"+i;
        row.class=row;
        document.getElementById("table").appendChild(row);

        let rId=document.createElement("td");
        rId.className="rId"
        rId.innerHTML="Request Id: " +user[i].req_id;
        document.getElementById("row"+i).appendChild(rId);
    
        let amt=document.createElement("td");
        amt.className="amt"
        amt.innerText="Amount: "+user[i].amt;
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

    let form=document.createElement("newRequest");
    form.id="form";     
    form.action="update";
    form.method="post"
    document.getElementById("id").appendChild(form);

    let fieldset=document.createElement("fieldset");
    fieldset.id="fieldset";
    document.getElementById("form").appendChild(fieldset);

    let fieldset2=document.createElement("fieldset");
    fieldset2.id="fieldset2";
    document.getElementById("form").appendChild(fieldset2);

    let fieldset3=document.createElement("fieldset");
    fieldset3.id="fieldset3";
    document.getElementById("form").appendChild(fieldset3);

    let label=document.createElement("label");
    label.id="label";
    label.innerHTML="Request Amount";
    document.getElementById("fieldset").appendChild(label);

    let label2=document.createElement("select");
    label2.id="label2";
    label2.innerHTML="Request Catagory";
    document.getElementById("fieldset2").appendChild(label2);
    //add drop down to this element

                let opt2 = document.createElement("option");
                opt2.innerText = "Weapons";
            document.getElementById("label2").appendChild(opt2);

            let opt3 = document.createElement("option");
            opt3.innerText = "Construction";
            document.getElementById("label2").appendChild(opt3);

            let opt1 = document.createElement("option");
            opt1.innerText = "Medical";
           document.getElementById("label2").appendChild(opt1);
    
    

    let label3=document.createElement("label");
    label3.id="label3";
    label3.innerHTML="Request Details";
    document.getElementById("fieldset3").appendChild(label3);

    let input=document.createElement("input");
    input.id="input";
    input.name="amt";
    document.getElementById("fieldset").appendChild(input);
   
    let input2=document.createElement("input");
    input2.id="input2";
    input2.name="detail";
    document.getElementById("fieldset3").appendChild(input2);
    
    let submit=document.createElement("input");
    submit.type="submit";
    submit.value="Send Request";
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
            let userId=document.createElement("p");
            userId.id="userId";
            document.getElementById("id").appendChild(userId);

            let boss=document.createElement("p");
            boss.id="boss";
            document.getElementById("id").appendChild(boss)

            let firstName=document.createElement("p");
            firstName.id="firstname";
            document.getElementById("id").appendChild(firstName);
          
            let lastName=document.createElement("p");
            lastName.id="lastname";
            document.getElementById("id").appendChild(lastName);

			userId.innerHTML = "userId: "+user.id;
			firstName.innerHTML = "firstname: "+user.fName;
			lastName.innerHTML = "lastname: "+user.lName;
			boss.innerHTML = "Boss ID: " +user.boss;
		});
    }

function updateInfo(){
    console.log("update info");

    while (id.firstChild){
        id.removeChild(id.firstChild);
    }

    let form=document.createElement("login");
    form.id="form";     
    form.action="update";
    form.method="post"
    document.getElementById("id").appendChild(form);

    let fieldset=document.createElement("fieldset");
    fieldset.id="fieldset";
    document.getElementById("form").appendChild(fieldset);

    let fieldset2=document.createElement("fieldset");
    fieldset2.id="fieldset2";
    document.getElementById("form").appendChild(fieldset2);

    let label=document.createElement("label");
    label.id="label";
    label.innerHTML="New First Name";
    document.getElementById("fieldset").appendChild(label);

    let label2=document.createElement("label");
    label2.id="label2";
    label2.innerHTML="New Last Name";
    document.getElementById("fieldset2").appendChild(label2);

    let input=document.createElement("input");
    input.id="input";
    input.name="newFName";
    document.getElementById("fieldset").appendChild(input);
    fname=document.getElementById("input").value;

    let input2=document.createElement("input");
    input2.id="input2";
    input2.name="newLName";
    document.getElementById("fieldset2").appendChild(input2);
    lname=document.getElementById("input2").value;

    let submit=document.createElement("input");
    submit.type="submit";
    submit.value="update";
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

   let yes = document.createElement('input');
   yes.type="submit";
   yes.value="logout";
   yes.class="btn btn-primary";
   yes.id="yes";
   document.getElementById("logouts").appendChild(yes);
    

}