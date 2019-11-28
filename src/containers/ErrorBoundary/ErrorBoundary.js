import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {

        console.log('[ErrorBoundary.js] did catch');

        return { hasError: true };
    }


    componentDidMount = () => {

        console.log('[ErrorBoundary.js] did mount');
    }

    componentDidUpdate = () => {

        console.log('[ErrorBoundary.js] did update');
    }

    componentWillUnmount = () => {

        console.log('[ErrorBoundary.js] will unmount');
    }



    render() {
        if (this.state.hasError) {
            return <h3>Patients not found</h3>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;