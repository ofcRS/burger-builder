import React, {Component} from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        _isMounted = false;

        componentWillMount() {
            this._isMounted = true;

            this.reqInterceptor = axios.interceptors.request.use(req => {
                if (this._isMounted) {
                    this.setState({
                        error: null
                    });
                    return req;
                }
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                if (this._isMounted) {
                    this.setState({
                        error: error
                    })
                }
            });
        }

        componentWillUnmount() {
            this._isMounted = false;
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        };

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
};

export default withErrorHandler;
