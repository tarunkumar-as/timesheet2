import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = "";
  if (state.session != null)
  	token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = "";
  if (state.session != null)
  	token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function submit_worker_login(form) {
  let state = store.getState();
  let data = state.forms.workerLogin;

  post('/workerSessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN_WORKER',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}

export function submit_manager_login(form) {
  let state = store.getState();
  let data = state.forms.managerLogin;

  post('/managerSessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN_MANAGER',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}

export function list_tasks() {
	get("/tasksList")
		.then((resp) => {
			console.log(resp);
			store.dispatch({
				type: 'TASK_LIST',
				data: resp.data
			});
		});
}



export function get_jobs() {
  get('/getjobs')
    .then((resp) => {
      console.log(resp);
      localStorage.setItem('jobs', JSON.stringify(resp));
      store.dispatch({
        type: 'JOBS',
        data: resp.data,
      });
  });
}

export function create_task() {
  let state = store.getState();
  let data = state.forms.task;
  
  post('/createTask', data)
  .then((resp) => {
    localStorage.setItem('createTask', JSON.stringify(resp));
      store.dispatch({
        type: 'CREATE_TASK',
        data: resp.data,
      });
  });
}

export function update_task(data) {
  console.log(data);
  post('/updateTask', data)
  .then((resp) => {
    console.log(resp);
    localStorage.setItem('updateTask', JSON.stringify(resp));
      store.dispatch({
        type: 'UPDATE_TASK',
        data: resp.data,
      });
  });
}
