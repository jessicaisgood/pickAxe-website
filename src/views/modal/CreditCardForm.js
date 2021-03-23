import React from 'react';
import PropTypes from "prop-types";
import {Button, message, Result} from 'antd';
import styles from '../../styles/modal/credit-card-modal.module.scss';
import {CardElement, injectStripe} from 'react-stripe-elements';
import WebServerRestClient from "../../tools/WebServerRestClient";
import StorageUtils from "../../tools/StorageUtils";

const style = {
    base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '14px',
        fontSmoothing: 'antialiased',

        ':-webkit-autofill': {
            color: '#fce883',
        },
        '::placeholder': {
            color: '#87BBFD',
        },
    },
    invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
    },
};

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        }
    }
};


class _CardForm extends React.Component {

    static propTypes = {
        productDetail: PropTypes.object
    };

    state = {
        errorMessage: '',
        paymentStatus: 'init'
    };

    handleChange = ({error}) => {
        if (error) {
            this.setState({errorMessage: error.message});
        }
    };

    handleSubmit = (evt) => {
        let thisPage = this;
        this.setState({processing: true});
        evt.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken().then(function (result) {
                if (result.token) {
                    // alert(JSON.stringify(result));
                    thisPage.creditCardPayment(result.token.id);
                } else {
                    // alert(JSON.stringify(result.error));
                    thisPage.setState({processing: false});
                }
            });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
            thisPage.setState({processing: false});
        }
    };

    creditCardPayment(token) {
        let thisPage = this;
        new WebServerRestClient().POST('/user/payment/create-credit-order',{
            purchasePlanId: this.props.productDetail.id,
            paymentWay: 5,
            userId: StorageUtils.getUserId(),
            sourceId: token
        }).then(response => {
            if (response.code === 200) {
                thisPage.setState({paymentStatus: 'success'});
            } else if (response.code === 401 || response.code === 403) {
                message.warn("请登录！")
            } else {
                message.warn(response['msg']);
                thisPage.setState({paymentStatus: 'error'});
            }
        }).catch(err => {
            message.error(err.message);
        });
    }

    render() {
        if (this.state.paymentStatus === 'init') {
            return (
                <form>
                    <CardElement className={styles.MyCardElement} style={style}
                                 onChange={this.handleChange.bind(this)}
                                 {...createOptions()}
                    />
                    <div className={styles.err_message} role="alert">
                        {this.state.errorMessage}
                    </div>
                    <Button onClick={this.handleSubmit.bind(this)} loading={this.state.processing}
                            className={styles.payment_button}>Pay ${this.props.productDetail.amount}</Button>
                </form>
            );
        } else if (this.state.paymentStatus === 'success') {
            return (
                <Result
                    status="success"
                    title= {window.language.payment_results.success}
                    subTitle= {window.language.payment_results.success_details}
                />
            );
        } else if (this.state.paymentStatus === 'error') {
            return (
                <Result
                    status="error"
                    title= {window.language.payment_results.error}
                    subTitle= {window.language.payment_results.error_details}
                />
            );
        }
    }
}

export default injectStripe(_CardForm);
