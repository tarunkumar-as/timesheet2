import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     new_photo: {...},
 *     edit_photo: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   photos: Map.new(
 *     1 => {id: 1, data: "...", desc: "...", tags: [...]},
 *     ...
 *   ),
 * }
 */

function workerLogin(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function managerLogin(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function task(st0 = {hours: 0, note: "", approval: false, job_code: 1, worker_id: 1}, action) {
    switch(action.type) {
    case 'CREATE_TASK':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function jobs(st0 = new Map(), action) {
    switch(action.type) {
    case 'JOBS':
    	let st1 = new Map(st0);
    	for (let job of action.data)
    		st1.set(job.id, job);
    		
      return st1;
    default:
      return st0;
  }
}

function taskList(st0 = new Map(), action) {
	switch(action.type) {
		case 'TASK_LIST':
			const st1 = new Map(st0);
			for (const task of action.data)
				st1.set(task.id, task);
			
			return st1;
		default:
			return st0;
	}
}

function updateTaskList(st0 = new Map(), action) {
	switch(action.type) {
		case 'UPDATE_TASK':
			const st1 = new Map(st0);
			for (const task of action.data)
				st1.set(task.id, task);
			
			return st1;
		default:
			return st0;
	}
}

function forms(st0, action) {
  let reducer = combineReducers({
    workerLogin,
    managerLogin,
    taskList,
    task,
    jobs,
    updateTaskList
  });
  return reducer(st0, action);
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN_WORKER':
    	action.data.worker = true;
    	return action.data;
    case 'LOG_IN_MANAGER':
    	action.data.worker = false;
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    session
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
