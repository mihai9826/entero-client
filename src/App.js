import React, { Component } from 'react';
import Calendar from 'react-calendar';

import Patients from './containers/Patients/Patients';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';

//import './App.css';

class App extends Component {

  state = {
    dateFilter: ''
  }

  dateFilterHandler = (value) => {

    const parsed = value.getFullYear() + '-' + (((value.getMonth() + 1) < 10) ? '0' : '') + (value.getMonth() + 1) + '-' + ((value.getDate() < 10) ? '0' : '') + value.getDate();
    //console.log(parsed);
    this.setState({ dateFilter: parsed });
  }


  clearDate = () => this.setState({ dateFilter: '' });


  render() {
    console.log(this.state.dateFilter);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Entero</h1>
        </header>
        <button onClick={this.clearDate}>Clear Date</button>
        <Calendar
          onClickDay={this.dateFilterHandler}
        />
        {(this.state.dateFilter === '') ? (
          <ErrorBoundary>
            <Patients url={'http://localhost:8081/api/patients'} />
          </ErrorBoundary>
        ) : null}
        {this.state.dateFilter ? (
          <ErrorBoundary>
            <Patients url={'http://localhost:8081/api/patients?date=' + this.state.dateFilter} />
          </ErrorBoundary>
        ) : null}

      </div>
    );
  }
}

export default App;
