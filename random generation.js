/* playlist.js */

var i, numbers, random, n ;
var grid1, grid2, grid3, grid4;
var b0, b1, b2, b3;
var details, question, suggestion;
var selection=0;

//grids
window.onload = startup;

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function startup() {
	//load all objects
	grid1 = document.getElementById("game1");
	grid2 = document.getElementById("game2");
	grid3 = document.getElementById("game3");
	grid4 = document.getElementById("game4");

	//buttons
	b0 = document.getElementById("button0");
	b1 = document.getElementById("button1");
	b2 = document.getElementById("button2");
  b3 = document.getElementById("button3");


	//text at the top
	details = document.getElementById("details");
	question = document.getElementById("question");
	suggestion = document.getElementById("suggestion");
	//////
	cleanup(1);
	cleanup(2);
	//hide
	grid1.style.display = "none";
	grid2.style.display = "none";
	grid3.style.display = "none";
	grid4.style.display = "none";

	b0.style.visibility = "visible";
	b1.style.visibility = "visible";
	b2.style.visibility = "visible";
  b3.style.visibility="hidden";

	b0.innerHTML = "sum";
	b1.innerHTML = "subtraction";
	b2.innerHTML = "mix";

	details.style.display = "block";
	question.style.display = "block";
	suggestion.style.display = "block";


	details.innerHTML = "This game will generate numbers between 0 and 20";
	question.innerHTML = "Bingo";
	suggestion.innerHTML = "Choose between these three options";

	numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18 , 19, 20];
	random = shuffle(numbers);
	n=numbers.length;

  selection=0;
	i=0;
}



function unhide() {
		grid1.style.display = "block";
		grid2.style.display = "block";
		grid3.style.display = "block";
		grid4.style.display = "block";
		b1.style.visibility="hidden";
		b2.style.visibility="hidden";
		b0.style.visibility="hidden";
    b3.style.visibility="visible";

}


function displayEquation() {
	details.innerHTML="";
	b3.innerHTML = "Continue";
	b3.onclick = update4;

	if (i<n) { question.innerHTML=addition(random[i]); suggestion.innerHTML="";i=i+1;}
	else {
		suggestion.innerHTML="End of the game, press r or the button below to restart";
    question.innerHTML = "";
    b3.innerHTML = "Restart";
		b3.onclick = startup;


	}

}



function addition(num) {
	zz=0
	if (selection==2) {zz=getRandomInt(2,3);
									}



	if (selection==0 || zz==2) {
				if (num>0) { rand=	Math.floor(Math.random() * (num-1));
											equation=rand.toString().concat("+") ;
											rand2_n=(num-rand);
											rand2=(num-rand).toString();
											equation=equation.concat(rand2) ;
										}
				else { equation="0+0";rand=0;rand2_n=0;}
			}

	if (selection==1 || zz==3) {
			 rand=	getRandomInt(num,n-1);
													equation=rand.toString().concat("-") ;
													rand2_n=(rand-num);
													rand2=(rand-num).toString();
													equation=equation.concat(rand2) ;

					}


	var prefix = '1_';

	for(var s = 1; s<=rand; s++) {
			var prefix2=prefix.concat(s.toString());
			el=document.getElementById(prefix2);
		  el.innerHTML = "x";
		}

		var prefix = '2_';

		for(var s = 1; s<=rand2_n; s++) {
				var prefix2=prefix.concat(s.toString());
				el=document.getElementById(prefix2);
			  el.innerHTML = "o";
			}

	return equation;
}


function cleanup(n) {
	var prefix = n.toString().concat("_");
	for(var s = 1; s<=20; s++) {
			var prefix2=prefix.concat(s.toString());
			el=document.getElementById(prefix2);
		  el.innerHTML = "";
		}
}


function update(t) {
	selection=t;
	cleanup(1);
	cleanup(2);
	unhide();
	displayEquation();
}

function update4() {
	cleanup(1);
	cleanup(2);
	unhide();
  displayEquation();
}


document.addEventListener("keyup", function(e) {
	if (e.which === 32) {
    if (i<n+1) {
	update4();}
}

if (e.which === 82) {startup();}

});
