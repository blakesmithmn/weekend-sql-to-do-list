
console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  fetchTasks();
  clickHandlers();
}); // end doc ready

function clickHandlers() {
  $(document).on('click', '.deleteBtn', deleteTask);
  $(document).on('click', '.completeBtn', completeTask);
  $('.submitBtn').on('click', addTask);
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
function addTask(){
  console.log('added a task!')
  const newTask = {
    name: $('#taskInput').val(),
    notes: $('#noteInput').val(),
    complete: false,
  };
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newTask
  }).then((tasksRes)=>{
    console.log('Succes on /POST', tasksRes);
    fetchTasks();
    $('#taskInput').val('');
    $('#noteInput').val('');
  })
};
// render tasks function
function renderTasks(tasksRes){
  console.log('tasks rendered');
  $('.tasksList').empty()
  for (let task of tasksRes){
      $('.tasksList').append(`
      <li class="list-group-item px-3 m" data-id="${task.id}">
      <h4>${task.name}</h4>
      <p> ${task.notes} </p>
      <button type="button" class="btn btn-danger m-2 deleteBtn" style="float:right;">Delete</button>
      <button type="button" class="btn btn-outline-success p-1 completeBtn" style="float:left;"> mark complete</button>
          
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
function deleteTask(){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      console.log('it is gone forever');
      let idToDelete = $(this).parent('li').data("id");
      console.log(idToDelete);
      $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
      }).then((response)=>{
        fetchTasks();
        console.log('all done :)');
      })
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}

// mark complete task function
function completeTask(){
  console.log('all done!');
  let idToUpdate = $(this).parent().data('id');
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/tasks/${idToUpdate}`
  }).then((response)=>{
    // fetchTasks();
    $(this).parent().css("background-color", "#9dFFB0");
    $(this).parent().css("text-decoration", "line-through");
  })
}
// 

