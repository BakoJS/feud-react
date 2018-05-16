import React, { Component } from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import { Panel, Loader } from './components/common/';
import API from './services/api';

class App extends Component {
  state = {
    questions: null,
    modalOpen: false,
    text: '',
    api: null
  };

  componentDidMount() {
    const api = new API();
    this.setState({ api });
    api.questions().then(questions => this.refreshList(questions));
  }

  getValidationState() {
    const { length } = this.state.text.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleSave = () => {
    this.state.api.saveQuestion(this.state.text);
    this.setState({ modalOpen: false, text: '' });
    setTimeout(() => {
      this.state.api.questions().then(questions => this.refreshList(questions));
    }, 1000);
  };

  handleDelete = id => {
    this.state.api.deleteQuestion(id);
    setTimeout(() => {
      this.state.api.questions().then(questions => this.refreshList(questions));
    }, 1000);
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  refreshList = questions => {
    this.setState({ questions });
  };

  renderQuestions = () => {
    if (this.state.questions === null) {
      return (
        <tr>
          <td>
            <Loader />
          </td>
        </tr>
      );
    }

    return this.state.questions.map(question => {
      return (
        <tr key={question._id}>
          <th>{question._id}</th>
          <td>{question.text}</td>
          <td className="col-lg-1">
            <Button bsStyle="default">Edit</Button>
          </td>
          <td className="col-lg-1">
            <Button
              bsStyle="default"
              onClick={() => this.handleDelete(question._id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Panel>
        <h1 className="text-left">Questions List</h1>
        <div className="text-right">
          <Button bsStyle="success" onClick={this.handleOpen}>
            Create
          </Button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th>Text</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody className="text-left">{this.renderQuestions()}</tbody>
        </table>

        <Modal show={this.state.modalOpen}>
          <Modal.Header>
            <Modal.Title>Create question</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Your clever programming question</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.text}
                  placeholder="Enter question"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSave}>
              Save question
            </Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }
}

export default App;
