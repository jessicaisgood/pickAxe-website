import React from 'react';
import PropTypes from "prop-types";
import styles from '../../styles/modal/payment-modal.module.scss';
import 'antd/dist/antd.css';
import {Button, message, Modal, Icon} from 'antd';
import { RiPaypalLine } from 'react-icons/ri';
import WebServerRestClient from "../../tools/WebServerRestClient";
import StorageUtils from "../../tools/StorageUtils";
import CommonUtils from "../../tools/CommonUtils";

export default class PaymentModal extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        productDetail: PropTypes.object,
        loginCallback: PropTypes.func,
        selectionCallback: PropTypes.func,
        onRequestClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            processing: false
        }
    }

    selectPaymentMethod(method) {
        if (!StorageUtils.hasToken()) {
            // need to login
            this.props.loginCallback('payment');
            return;
        }

        if (method == 'credit'){
            this.setState({processing_credit: true});
            new WebServerRestClient().GET('/user/token-validation')
                .then(response => {
                    this.setState({processing_credit: false});
                    if (response.code === 200) {
                        this.props.selectionCallback(method);
                    } else if (response.code === 401 || response.code === 403) {
                        this.props.loginCallback('payment');
                        message.warn("请登录！")
                    } else {
                        message.warn(response['msg']);
                    }
                }).catch(err => {
                message.error(err.message);
                this.setState({processing_credit: false});
            });
        } else if (method === 'alipay') {
            this.setState({processing_alipay: true});
            new WebServerRestClient().POST('/user/payment/create-alipay-order', {
                purchasePlanId: this.props.productDetail.id,
                paymentWay: 6,
                userId: StorageUtils.getUserId()
            }).then(response => {
                CommonUtils.log("create-alipay-order response: " + JSON.stringify(response));
                this.setState({processing_alipay: false});
                if (response.code === 200) {
                    // close this modal
                    this.props.selectionCallback(method);

                    // go to Alipay page
                    window.open(response.data, '_self');
                } else if (response.code === 401 || response.code === 403) {
                    // need to login
                    this.props.loginCallback('payment');
                } else {
                    message.warn(response['msg']);
                }
            }).catch(err => {
                this.setState({processing_alipay: false});
                message.error(err.message);
            });
        } else if (method === 'paypal') {
            this.setState({processing_paypal: true});
            new WebServerRestClient().POST('/user/payment/create-paypal-order', {
                purchasePlanId: this.props.productDetail.id,
                paymentWay: 8,
                userId: StorageUtils.getUserId()
            }).then(response => {
                CommonUtils.log("create-paypal-order response: " + JSON.stringify(response));
                this.setState({processing_paypal: false});
                if (response.code === 200) {
                    // close this modal
                    this.props.selectionCallback(method);

                    // go to PayPal page
                    window.open(response.data, '_self');
                } else if (response.code === 401 || response.code === 403) {
                    // need to login
                    this.props.loginCallback('payment');
                } else {
                    message.warn(response['msg']);
                }
            }).catch(err => {
                this.setState({processing_paypal: false});
                message.error(err.message);
            });
        }
    }


    render() {
        let isChinese = StorageUtils.getLanguage() === window.constants.LANGUAGE_CN;
        return (
            <Modal
                closable={false}
                keyboard={true}
                maskClosable={true}
                destroyOnClose={true}
                footer={null}
                visible={this.props.visible }
                onCancel={() => this.props.onRequestClose()}>
                <div className="modal_close">
                    <Icon type="close-circle" onClick={() => this.props.onRequestClose()}/>
                </div>
                <div className={styles.container}>
                    {isChinese ? (
                      <div  className={styles.product_title}
                      >SquirrelVPN {this.props.productDetail.monthTextCN}</div>
                    ) : (
                      <div  className={styles.product_title}
                      >SquirrelVPN {this.props.productDetail.monthText}</div>
                    )}

                    <br/>

                    {isChinese ? (
                         <div  className={styles.product_details}>
                              <Icon type="check" />{window.language.payment_modal.detail1}<br/>
                              <Icon type="check" />{window.language.payment_modal.detail2}<br/>
                              <Icon type="check" />{window.language.payment_modal.detail3}
                         </div>
                    ) : (
                        <div  className={styles.product_details_en}>
                             <Icon type="check" />{window.language.payment_modal.detail1}<br/>
                             <Icon type="check" />{window.language.payment_modal.detail2}<br/>
                             <Icon type="check" />{window.language.payment_modal.detail3}
                        </div>
                    )}

                    <br/>
                    <div  className={styles.product_price}>
                        <div className={styles.product_price_box}>
                        </div>
                        <div className={styles.product_price_box_filled}> </div>

                        <div className={styles.product_price_text}>
                           ${this.props.productDetail.price} x {this.props.productDetail.month}
                           <span className={styles.text_total}>{window.language.payment_modal.total} ${this.props.productDetail.amount} </span>
                        </div>
                    </div>
                    <div>
                        <br/>
                    <div className={styles.select_method}>{window.language.payment_modal.select}</div>
                    <br/>
                    {StorageUtils.hasToken() ?
                        <div>
                            <Button type="primary" icon="alipay" style={{fontSize: "16px"}}
                                    className={styles.payment_method_item}
                                    loading={this.state.processing_alipay}
                                    onClick={() => this.selectPaymentMethod('alipay')}>{window.language.payment_modal.alipay}</Button>
                            <br/>
                            <br/>
                            <Button type="primary" icon="credit-card" style={{fontSize: "16px"}}
                                    className={styles.payment_method_item}
                                    loading={this.state.processing_credit}
                                    onClick={() => this.selectPaymentMethod('credit')}> {window.language.payment_modal.credit}</Button>
                            <br/>
                            <br/>
                            <Button type="primary" style={{fontSize: "16px"}}
                                    className={styles.payment_method_item}
                                    loading={this.state.processing_paypal}
                                    onClick={() => this.selectPaymentMethod('paypal')}>
                                <RiPaypalLine style={{marginRight: 5}}/>
                                {window.language.payment_modal.paypal}
                            </Button>
                        </div>
                        :
                        <div>
                            <Button type="primary" icon="login" style={{fontSize: "16px"}}
                                    className={styles.payment_method_item}
                                    onClick={() => this.props.loginCallback('payment')}>{window.language.login_text}</Button>
                            <br/>
                        </div>
                    }
                    </div>
                </div>
            </Modal>
        );
    }

}
