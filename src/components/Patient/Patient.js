import React from 'react';

import Aux from '../../hoc/Auxiliary';

const patient = (props) => {
    if (!props.showDetails) {
        return (
            <tr>
                <td>{props.ssn}</td>
                <td>{props.firstName}</td>
                <td>{props.lastName}</td>
                <td>{props.details.phone}</td>
                <td>{props.details.city}</td>
                <td><button onClick={props.clicked}>Details</button></td>
            </tr>
        );
    } else {

        const addRows = (props.details.appointments) ? props.details.appointments.patientAppointments.map(appointment => {
            return (
                <tr key={appointment.id}>
                    <td>{appointment.area}</td>
                    <td>{appointment.physician.firstName}</td>
                    <td>{appointment.physician.lastName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                </tr>
            );

        }) : (
                <tr key={props.details.appointment.id}>
                    <td>{props.details.appointment.area}</td>
                    <td>{props.details.appointment.physician.firstName}</td>
                    <td>{props.details.appointment.physician.lastName}</td>
                    <td>{props.details.appointment.date}</td>
                    <td>{props.details.appointment.time}</td>
                </tr>
            );

        return (
            <Aux>
                <tr>
                    <td>{props.ssn}</td>
                    <td>{props.firstName}</td>
                    <td>{props.lastName}</td>
                    <td>{props.details.phone}</td>
                    <td>{props.details.city}</td>
                    <td><button onClick={props.clicked}>Details</button></td>
                </tr>
                {addRows}
            </Aux>
        );

    }
}


export default patient;