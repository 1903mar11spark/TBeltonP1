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

function newRequest(){
    console.log("new Request");
}

function viewAll(){
    input.innerHTML="all";
 
}

function viewPending(){
    input.innerHTML="pending";
}

function viewResolved(){
    input.innerHTML="resolved";
}

function viewInfo(){
    console.log("before da fetch");
    //add the reqTyp param to the url for all fetches
	fetch ("http://localhost:8084/Project1/session?reqTyp=viewInfo").then(function(response){
        console.log("how far?");
        console.log(response);
       // console.log(response.json());
        return response.json();
	}).then(function(data){
    
            console.log("did it fetch?");

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
    input.innerHTML="update";
}

function logOut(){
    console.log("logOut");
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