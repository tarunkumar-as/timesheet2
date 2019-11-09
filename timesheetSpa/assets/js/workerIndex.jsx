import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_tasks } from './ajax';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

function state2props(state) {
	return {data: state.forms.taskList};
}

class WorkerIndex extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			path: null
		}
		
		list_tasks();
	}
	
	handleCreateTask() {
		this.setState({path: "/createTask"});
	}
	
	render() {
		let cards = [];
		let {data, dispatch} = this.props;
		
		if (this.state.path != null)
			return <Redirect to={this.state.path}/>;
		
		if (data.size > 8)
		 	console.log("handle error");
		
		for (const [key, value] of data.entries()) {
			cards.push(
						<tr>
    						<td>{value.id}</td>
    						<td>{value.hours}</td>
    						<td>{value.note}</td>
    						<td>{value.status ? <span>Approved</span> : <span>Pending Approval</span>}</td>
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
      		<Button variant="primary" onClick={() => this.handleCreateTask(data)}>Create Task</Button>
    		</div>
  		);
	}
}

/*let WorkerIndex = connect(({data}) => ({data}))(({data}) => {
  if (data == null || data.size < 9) {
    list_tasks();
  }
  
  // restrict to only 8 entries

  let cards = data != null ? _.map([...data], ([_, cardData]) => {
    return <tr>
    			<td>{cardData.id}</td>
    			<td>{cardData.hours}</td>
    			<td>{cardData.description}</td>
    			<td>{cardData.status}</td>
    		</tr>
  }) : null ;

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
});*/

export default connect(state2props)(WorkerIndex);
