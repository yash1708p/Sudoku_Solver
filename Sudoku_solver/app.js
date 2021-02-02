var n ;
var arr = new Array(n);
var solve_btn;

window.onload = ()=>{
	var submit_btn = document.getElementById('submit_btn');
	submit_btn.onclick = ()=>{
		n = document.getElementById('grid_size').value;
		// console.log(n);
		CreateFrame(n);
	}

}


function CreateFrame(n) {
	// body...
	for(let i=0 ;i<n ;i++){
		var row = new Array(n);
		for(let j=0 ;j<n ;j++){
			var temp = document.createElement('input');
			temp.value = 0;
			temp.size =2;
			temp.min =0;
			temp.max =n ;
			row[j] = temp;
		}
		arr[i] = row;
	}

	block = document.getElementById("my_div")

	for(let i=0 ;i<n ;i++){
		for(let j=0 ;j<n ;j++){
			block.appendChild(arr[i][j]);
		}
		block.appendChild(document.createElement('br'));
	}

	block.appendChild(document.createElement('br'));
	solve_btn = document.createElement('button');
	solve_btn.innerHTML = 'SOLVE';
	block.appendChild(solve_btn);
	solve_btn.onclick = ()=>{
		SolvePuzz(arr);
	}
}

function point(a){
	return arr[a[0]][a[1]];
}

function SolvePuzz(a){
	var blank_cells = FindAllBlankCells(a);
	for(let i=0 ; i<blank_cells.length ;i++){
		var temp  = FindNextNumber(blank_cells[i]);
		if(temp==false){
			i = i-2;
			if(i == -2){
				alert('no solution');
				break;
			}
		}	
	}
	// console.log(blank_cells);
}

function FindAllBlankCells(a){
	cells = [];
	for(let i=0 ;i<a.length ;i++){
		for(let j=0 ; j<a.length ; j++){
			if(a[i][j].value=="0"){
				a[i][j].style = 'color:coral';
				cells.push([i,j]);
			}
		}
	}
	return cells;
}

function FindNextNumber(c){
	var curr_val = parseInt(point(c).value);
	for(let i= curr_val+1 ; i<=n ;i++){
		if(validRow(c,i) && validColumn(c,i) && validGrid(c,i)){
			point(c).value = i;
			return true
		}
	}
	point(c).value = 0;
	return false;
}

function validRow(c,val){
	var row = c[0];
	var col = c[1];
	for(let i=0 ; i<n ; i++){
		if(point([row,i]).value==val && i!=col){
			return false;
		}
	}
	return true;
}
function validColumn(c,val){
	var row = c[0];
	var col = c[1];
	for(let i=0 ; i<n ; i++){
		if(point([i,col]).value==val && i!=row){
			return false;
		}
	}
	return true;
}
function validGrid(c,val){
	var row = c[0];
	var col = c[1];
	var root_n = Math.sqrt(n);
	var topx = root_n*(Math.floor(row/root_n));
	var topy = root_n*(Math.floor(col/root_n));
	for(let i = topx ;i<topx+root_n ;i++){
		for(let j = topy ;j<topy+root_n ;j++){
			if(i!=row && j!=col){
				if(point([i,j]).value==val){
					return false;
				}
			}
		}
	}
	return true;
}

