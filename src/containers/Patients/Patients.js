import React, { Component } from 'react';
import axios from 'axios';

import Patient from '../../components/Patient/Patient';
import PatientsTable from '../../components/PatientsTable/PatientsTable';


class Patients extends Component {
    state = {
        patients: [],
        showDetails: [],
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

    static getDerivedStateFromProps(props, state) {
        console.log('[Patients.js] getDerivedStateFromProps');
        console.log(state.patients);
        if (props.searchInput) {
            const bool = state.patients.some(patient => patient.ssn.startsWith(props.searchInput));
            if (props.error !== !bool) {
                return { error: !bool };
            }
        }

        return null;

    }



    componentDidUpdate = () => {

        console.log('[Patients.js] did update');
    }



    showPatientDetails = (patientIndex) => {
        const details = [...this.state.showDetails];
        details[patientIndex] = !details[patientIndex];
        this.setState({ showDetails: details });
    }

    render() {

        let response;
        if (this.state.error) {
            throw new Error('error...');
        } else {
            let patients = this.state.patients.map((patient, index) => {
                if (patient.ssn.startsWith(this.props.searchInput)) {
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
                {response}
            </div>

        );


    }
}

export default Patients;