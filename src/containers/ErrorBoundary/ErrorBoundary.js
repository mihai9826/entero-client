import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // static getDerivedStateFromError(error) {

    //     return { hasError: true };
    // }

    componentDidCatch = (error, errorInfo) => {
        // Catch errors in any components below and re-render with error message
        this.setState({
            hasError: true
        });
        // You can also log error messages to an error reporting service here
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