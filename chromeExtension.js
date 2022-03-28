let myLeads=[];
const inputEl=document.getElementById('input-el');
const inputBtn=document.getElementById('input-btn');
const ulEl=document.getElementById('ul-el');
let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn=document.getElementById('delete-btn');
const tabBtn=document.getElementById('tab-btn');
//console.log(leadsFromLocalStorage);
if (leadsFromLocalStorage) {
	myLeads= leadsFromLocalStorage;
	render(myLeads);
}
function render(leads) {
	// body...
	let listItems="";
for (var i = 0; i < leads.length; i++) {
	listItems += //"<li><a target='_blank' href='" +  myLeads[i] + "'>"+myLeads[i] + "</a></li>";
					`
					<li>
						<a target='_blank' href='${leads[i]}'>${leads[i]}
						</a>
					</li>
					`;
}
ulEl.innerHTML =listItems;
}
tabBtn.addEventListener('click', function () {
	chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	})
	// body...
	//console.log(tabs[0].url);
	
})
deleteBtn.addEventListener('click', function() {
	localStorage.clear();
	myLeads=[];
	render(myLeads);
})
inputBtn.addEventListener("click", function () {
	// body...
	var leadsFromLocalStorage=	JSON.parse(localStorage.getItem("myLeads"));
	if (inputEl.value === "") {
		document.getElementById('alert').innerHTML=`<b>please Input leads</b>`;
		setTimeout(function () {
			// body...
			document.getElementById('alert').innerHTML='';
		}, 1000);
	}else if (leadsFromLocalStorage === null){
			console.log(leadsFromLocalStorage)
			myLeads.push(inputEl.value)
			inputEl.value="";
			localStorage.setItem("myLeads", JSON.stringify(myLeads));
			render(myLeads)
	}else{
 			console.log(leadsFromLocalStorage)	
			let check = checkDoubleLeads(leadsFromLocalStorage);
			console.log(check)
			if (check === true) {
				document.getElementById('alert').innerHTML=`<b>lead already saved</b>`;
				setTimeout(function () {
				// body...
				document.getElementById('alert').innerHTML='';
				}, 1000);
			 }else{
				myLeads.push(inputEl.value)
				inputEl.value="";
				localStorage.setItem("myLeads", JSON.stringify(myLeads));
				render(myLeads)
			 }
		}
})

//const li=document.createElement('li')
	//li.textContent=myLeads[i]
	//ulEl.append(li);
function checkDoubleLeads(leadsArray) {
	// body...
	console.log(inputEl.value)
	if (leadsArray.includes(inputEl.value)) {
		return true;
	}else{
		return false;
	}
}