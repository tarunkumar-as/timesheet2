import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';

import { create_task, get_jobs } from './ajax';

import { Redirect } from 'react-router';

function state2props(state) {
  return {data: state.forms.task, jobs: state.forms.jobs};
}

class CreateTask extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        errorFound: false,
        path: null
    }

    this.jobs = null
    this.handleCreateTask = this.handleCreateTask.bind(this);
    get_jobs();
  }

  getJobIds(jobs) {
      let options = ["Job Codes"];
      for (let [key, value] of jobs.entries()) {
          options.push(value.job_code);
      }

      return options.map(op => <option>{op}</option>);
  }

  changed(data) {
      console.log(data);
    this.props.dispatch({
      type: 'CREATE_TASK',
      data: data,
    });
  }

  handleCreateTask(data) {
      console.log(data)
        for (let [key, value] of this.jobs)
            if (value.code == data.job_id) {
                data = Object.assign({}, data, {job_code: value.id})
                break;
            }
        
        
        if (data.hours < 9 && data.hours > 0) {
            create_task();
            this.setState({path: "/workerIndex"});
        }
        else
            this.setState({errorFound: true})
  }

  render() {
      let {data, jobs, dispatch} = this.props;
      this.jobs = jobs;
      let warnings = null;

      if (this.state.errorFound) {
          warnings = <Alert variant="danger">Unable to create task</Alert>;
      }

      if (this.state.path != null) {
          return <Redirect to={this.state.path}/>;
      }

      return (
          <div>
              {warnings}
              <h1>Create Task</h1>
              <br></br>
                <Form.Group controlId="jobCode">
                    <Form.Label>Job ID</Form.Label>
                    <Form.Control as="select" onChange={
                        (ev) => this.changed({job_code: ev.target.value})}>
                            {this.getJobIds(jobs)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="hours">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control type="text" onChange={
                        (ev) => this.changed({hours: parseInt(ev.target.value)})} />
                </Form.Group>
                <Form.Group controlId="Description">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control type="text" onChange={
                        (ev) => this.changed({note: ev.target.value})} />
                </Form.Group>
                <Form.Group controlId="submit">
                    <Button variant="primary" onClick={() => this.handleCreateTask(data)}>
                        Create Task
                    </Button>
                </Form.Group>
          </div>
      );
  }
}

export default connect(state2props)(CreateTask);
