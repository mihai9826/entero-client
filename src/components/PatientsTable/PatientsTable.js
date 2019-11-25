import React from 'react';

const patientsTable = (props) => (
    <table>
        <thead>
            <tr>
                <th>SSN</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>City</th>
            </tr>
        </thead>
        <tbody>{props.children}</tbody>

    </table>
);

export default patientsTable;