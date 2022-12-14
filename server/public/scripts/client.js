
console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  fetchTasks();
  clickHandlers();
  updateTime();

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
  const newTask = {
    name: $('#taskInput').val(),
    notes: $('#noteInput').val(),
    complete: false,
  };
  if(newTask.name){
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
  }
  else {
    swal("Oops!", "What do you need to get done!?", "error");
  };
}
// render tasks function
function renderTasks(tasksRes){
  console.log('tasks rendered');
  $('.tasksList').empty()
  for (let i=0; i<tasksRes.length ; i ++){
    let task = tasksRes[i];

    if(!task.complete){
      $('.tasksList').append(`
      <li class="list-group-item px-3 m" data-id="${task.id}">
      <h4>${task.name}</h4>
      <p> ${task.notes} </p>
      <button type="button" class="btn btn-danger m-2 deleteBtn" style="float:right;">Delete</button>
      <button type="button" class="btn btn-outline-success p-1 completeBtn" style="float:left;"> mark complete</button>
      </li>
      `);
    }
    else if (task.complete){
      $('.tasksList').append(`
      <li class="list-group-item px-3 m complete" data-id="${task.id}">
      <h4>${task.name}</h4>
      <p> ${task.notes} </p>
      <button type="button" class="btn btn-danger m-2 deleteBtn" style="float:right;">Delete</button>
      </li>
      `);
    }
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
    text: "Once deleted, you will not be able to recover this task!",
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
      swal("Forget about that Task - It's Gone!", {
        icon: "success",
      });
    } else {
      swal("Cancelled Successfully!");
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
    ////////////////////////////////
    // SWEET ALERTS COMPLETE MESSAGE
    ///////////////////////////////
    
    swal("Another one in the books!", "You've completed a task!", "success");

    $(this).parent().addClass("complete");
    $(this).parent().css("background-color", "#9dFFB0");
    $(this).parent().css("text-decoration", "line-through");
    $(this).remove()
  })
}
// 

function updateTime() {
  let date = new Date();
  $('.time').text(date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
}
updateTime();
setInterval(updateTime, 500);

