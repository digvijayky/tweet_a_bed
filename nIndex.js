var tracker = 0;
var parag = document.getElementById("para");
var okStart = 0;

function addMe(button_id){
	while(tracker ==0){
	var test1 = document.getElementById("test1");
	var test2 = document.getElementById("test2");
	var test3 = document.getElementById("test3");
	var test4 = document.getElementById("test4");
	var test5 = document.getElementById("test5");
	var test6 = document.getElementById("test6");
	var test7 = document.getElementById("test7");
	var test8 = document.getElementById("test8");
	var test9 = document.getElementById("test9");
	var test10 = document.getElementById("test10");
	var test11 = document.getElementById("test11");
	var test12 = document.getElementById("test12");
	var test13 = document.getElementById("test13");
	var test14 = document.getElementById("test14");
	var test15 = document.getElementById("test15");
	var test16 = document.getElementById("test16");
	var test17 = document.getElementById("test17");
	var test18 = document.getElementById("test18");
	
	var numy = [test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12, test13, test14, test15, test16, test17, test18];
	/*for( var i = 1; i < 19; i++ ) {
    numy[i] = document.getElementById("test" ).value;
    console.log(numy[i]);
	}*/
	var num =0;
	for(var n = 0; n < 18; n++){
		if(numy[n].checked == true){
			//num++;
			console.log(num++);
			num=num;
		}
	}tracker++;	
}
console.log(tracker);
console.log(okStart);
okStart++;	
	if(tracker == 1 && okStart == 1){
		var fnam = document.getElementById("firstname");
		var lnam = document.getElementById("lastname");
		var div = (num/18)*100
		var uusa = document.getElementById('us');
		//uusa.innerHTML= "Thank you! You qualify for "+div+"% of benifits."
		//alert("Thank you! You rank for the"+Math.round(div)+"th percentaile. If you are below 75, you are at risk of chronic homelessness!")
		//$("#para").text();

		//var tush = document.getElementByTagName("para").innerHTML = "Thank you, "+fnam+" "+lnam+", you qualify for "+div+"% of benifits.";
	}
	
}
