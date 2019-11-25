import React, { Component } from 'react';
import axios from 'axios';

import Patient from '../../components/Patient/Patient';
import SearchBox from '../../components/SearchBox/SearchBox';
import PatientsTable from '../../components/PatientsTable/PatientsTable';


class Patients extends Component {
    state = {
        patients: [],
        showDetails: [],
        searchBox: '',
        error: false,
    }

    componentDidMount = () => {
        axios.get(this.props.url).then(response => {
            const patients = response.data, details = [];

            patients.forEach(() => {
                details.push(false);
            });
            this.setState({ patients: patients, showDetails: details });
        }).catch(error => {
            console.log('error');
            this.setState({ error: true });

        });
        console.log('[Patients.js] did mount');
    }



    componentDidUpdate = () => {

        console.log('[Patients.js] did update');
    }

    searchEventHandler = (e) => {

        if (e.target.value === '') {
            this.setState({ searchBox: e.target.value, error: false });
        } else {
            const bool = this.state.patients.some(patient => patient.ssn.startsWith(e.target.value));
            this.setState({ searchBox: e.target.value, error: !bool });
        }

    }


    showPatientDetails = (patientIndex) => {
        const details = [...this.state.showDetails];
        details[patientIndex] = !details[patientIndex];
        this.setState({ showDetails: details });
    }

    render() {

        let response;
        if (this.state.error) {
            // response = (
            //     <h3>Patients not found</h3>
            // );
            throw new Error('error...');
        } else {
            let patients = this.state.patients.map((patient, index) => {
                if (patient.ssn.startsWith(this.state.searchBox)) {
                    return <Patient
                        key={patient.ssn}
                        ssn={patient.ssn}
                        firstName={patient.firstName}
                        lastName={patient.lastName}
                        details={{ ...patient }}
                        showDetails={this.state.showDetails[index]}
                        clicked={() => this.showPatientDetails(index)
                        } />
                }
                else
                    return null;
            });
            response = (
                <PatientsTable>{patients}</PatientsTable>
            );
        }
        return (
            <div>
                <SearchBox search={this.searchEventHandler} />
                {response}
            </div>
        );
    }
}

export default Patients;