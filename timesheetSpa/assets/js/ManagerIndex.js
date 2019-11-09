import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_tasks,update_task } from './ajax';

function state2props(state) {
	return {data: state.forms.taskList};
}

class ManagerIndex extends React.Component {
	constructor(props) {
		super(props);
		
		this.data = null;
		list_tasks();
	}
	
	handleApproval(jobId) {
	    
		update_task();
	}
	
	render() {
		let cards = [];
		let {data, dispatch} = this.props;
		if (data.size > 8)
		 	console.log("handle error");
		 	
		 	
		this.data = data;
		
		for (const [key, value] of data.entries()) {
			cards.push(
						<tr>
    						<td>{value.id}</td>
    						<td>{value.hours}</td>
    						<td>{value.note}</td>
    						<td>{value.status ? <span>Approved</span> : <a href="#" onClick={() => this.handleApproval(value.id)}>Pending Approval</a>}</td>
    					</tr>
    				);
		}
		
		return (
    		<div>
      		<table className="table table-dark">
      			<thead>
      				<tr>
      					<td>Job Code</td>
      					<td>Hours Spent</td>
      					<td>Description</td>
      					<td>Status</td>
      				</tr>
      			</thead>
      			<tbody>
      				{cards}
      			</tbody>
      		</table>
    		</div>
  		);
	}
}

export default connect(state2props)(ManagerIndex);
