import React from 'react';
import PropTypes from "prop-types";
import styles from '../../styles/modal/credit-card-modal.module.scss';
import 'antd/dist/antd.css';
import {Modal,Icon} from 'antd';
import {Elements, StripeProvider} from 'react-stripe-elements';

import CreditCardForm from "./CreditCardForm";

export default class CreditCardModal extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        productDetail: PropTypes.object,
        onRequestClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            isLogin: true,
            email: '',
            password: '',
            showMessageDialog: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Modal
                bodyStyle={{padding: 0}}
                closable={false}
                keyboard={false}
                maskClosable={false}
                destroyOnClose={true}
                footer={null}
                visible={this.props.visible}
                onCancel={() => this.props.onRequestClose()}>
                <div className={styles.modal_close}>
                    <Icon type="close-circle" onClick={() => this.props.onRequestClose()} style={{marginTop: 10,marginRight: 5}}/>
                </div>
                <div className={styles.container}>
                    <label>
                        <StripeProvider apiKey={window.constants.PUBLISH_KEY} >
                            <Elements>
                                <CreditCardForm productDetail={this.props.productDetail}/>
                            </Elements>
                        </StripeProvider>
                    </label>
                </div>
            </Modal>
        );
    }

}
