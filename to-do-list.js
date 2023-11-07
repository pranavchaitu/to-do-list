const listArray = JSON.parse(localStorage.getItem('listArray')) || [{
  name: 'DOB',
  date: '2005-13-07'
}];

renderTodos();

document.querySelector('.js-add-button')
	.addEventListener('click',()=>{
		addTask();
	});

function addTask(){
	const input = document.querySelector('.js-input-box');
	const inputDate = document.querySelector('.js-date-input-box');
	const name = input.value;
	const date = inputDate.value;
	if(name==''||date==''){
		alert("Oops, something is missing!");
		return;
	}
	listArray.push({name,date});
	input.value = '';
	inputDate.value = '';
	storeTodos();
	renderTodos();
}

function renderTodos(){
	let html = '';
	listArray.forEach((word) => {
		const {name,date} = word;
		const code = `
		<div>${name}</div>
		<div>${date}</div> 
		<button class="delete-button js-delete-button">
			Delete
		</button>
		`;
		html += code;
	});
	/*
	for(let i=0;i<listArray.length;i++){
		const word = listArray[i];
		const {name,date} = word;
		const code = `
		<div>${name}</div>
		<div>${date}</div> 
		<button
			onclick = "
				listArray.splice(${i},1);
				renderTodos();
			" class="delete-button">
			Delete
		</button>
		`;
		html += code;
	}
	*/
	document.querySelector('.js-todos-list').innerHTML = html;

	document.querySelectorAll('.js-delete-button')
	.forEach((deleteButton,index)=>{
		deleteButton.addEventListener('click',()=>{
			listArray.splice(index,1);
			storeTodos();
			renderTodos();
		});
	});
}

function storeTodos(){
	localStorage.setItem('listArray',JSON.stringify(listArray));
}