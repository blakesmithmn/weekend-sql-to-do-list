
console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  fetchTasks();
}); // end doc ready

function clickHandlers() {
  
};


////////////////////////////////
// example task {
//   id: set by DB,
//   name: task name,
//   notes: some stuff we said,
//   complete: t/f
// }
//////////////////////////////


// add task function

// render tasks function
function renderTasks(tasksRes){
  console.log('tasks rendered');
  $('.tasksList').empty()
  for (let task of tasksRes){
    $('.tasksList').append(`
    <li class="list-group-item px-3 m">
        <input type="checkbox" id="checkbox1" class="m-4"> <label for="checkbox1"><h4>${task.name}</h4></label>
        <button type="button" class="btn btn-danger m-2 deleteBtn" style="float:right;">Delete</button>          
    </li>
    `)
  }
};

// GET function
function fetchTasks(){
  console.log('fetching tasks!');
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then((tasksRes) => {
    console.log('got a response from server for get request:', tasksRes);
    renderTasks(tasksRes);
  }).catch((tasksErr) =>{
    console.log('there seems to be an error in the GET:', tasksErr);
  })
};
// delete task function

// mark complete task function

// 