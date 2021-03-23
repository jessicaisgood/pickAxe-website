import React from 'react';
import PropTypes from "prop-types";
import styles from '../../styles/modal/login-modal.module.scss';
import 'antd/dist/antd.css';
import {Modal, Input, Alert, Button, message, Icon} from 'antd';
import CommonUtils from "../../tools/CommonUtils";
import StorageUtils from "../../tools/StorageUtils";
import WebServerRestClient from "../../tools/WebServerRestClient";

export default class LoginRegisterModal extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        loginCallback: PropTypes.func,
        onRequestClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            email: '',
            password: '',
            showMessageDialog: false
        }
    }

    componentDidMount() {

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleInputFocus(event) {
        const target = event.target;
        if (target.type === 'text' || target.type === 'password') {
            this.setState({showMessageDialog: false});
        }
    }

    login() {
        this.setState({showMessageDialog: false});
        let email = this.state.email;
        let password = this.state.password;
        if (email == '') {
            this.setState({showMessageDialog: true, message: "Please enter the email address"});
            return false;
        }
        if(!CommonUtils.checkEmail(email)){
            this.setState({showMessageDialog: true, message: "Invalid email address format"});
            return false;
        }
        if (password == '') {
            this.setState({showMessageDialog: true, message: "please enter the password"});
            return false;
        }
        this.setState({processing: true});
        new WebServerRestClient().POST('/open/web/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log("login response -> " + JSON.stringify(response));
            this.setState({processing: false});
            if (response.code == 200) {
                let userInfo = {
                    userId: response.data.userId,
                    email: response.data.email,
                    ethAddress: response.data.ethAddress,
                    token: response['msg']
                };
                StorageUtils.saveUser(userInfo);
                window.CurrentUser = userInfo;
                this.props.loginCallback();
                message.success({content: window.language.login_success});
            } else {
                this.setState({showMessageDialog: true, message: response['msg']});
            }
        }).catch(err => {
            this.setState({processing: false});
            message.error("Error: " + err.message);
        });
    }

    render() {
        return (
            <Modal
                closable={false}
                keyboard={true}
                maskClosable={true}
                destroyOnClose={true}
                footer={null}
                visible={this.props.visible}
                onCancel={() => this.props.onRequestClose()}>
                <div className="modal_close">
                    <Icon type="close-circle" onClick={() => this.props.onRequestClose()}/>
                </div>
                <div className={styles.login} style={{display: this.state.isLogin ? 'block' : 'none'}}>
                    <img className={styles.logo_image} src={require('../../images/logo.png')}/>
                    <div className={styles.logo_title}>SquirrelVPN</div>
                    <div className={styles.form_item}>
                        <Input type={'text'} name={'email'} className={styles.form_input}
                               placeholder={'someone@gmail.com'}
                               autoCapitalize={'none'}
                               onFocus={this.handleInputFocus.bind(this)}
                               onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div className={styles.form_item}>
                        <Input.Password type={'password'} name={'password'} className={styles.form_input}
                               placeholder={'Password'}
                               onFocus={this.handleInputFocus.bind(this)}
                               onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div className={styles.form_item}>
                        {this.state.showMessageDialog ?
                            <div className="message_box">
                                <Alert message={this.state.message} type="warning" closable={true}
                                       onClose={() => {
                                           this.setState({showMessageDialog: false})
                                       }}/>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className={styles.form_button_row}>
                        <Button className={styles.form_button} loading={this.state.processing}
                                onClick={this.login.bind(this)}>
                            {window.language.login_text}
                        </Button>
                    </div>
                    <div className={styles.link_download}>
                        <span className={styles.link_download}
                              onClick={() => {
                                  // this.setState({isLogin: false})
                                  Modal.info({
                                      content: window.language.register_tip
                                  });
                              }}>
                            {window.language.register_link}
                        </span>
                    </div>
                </div>

                <div className={styles.login} style={{display: this.state.isLogin ? 'none' : 'block'}}>
                    <img className={styles.logo_image} src={require('../../images/logo.png')}/>
                    <div className={styles.logo_title}>SquirrelVPN注册</div>
                    <div className={styles.form_item}>
                        <Input type={'text'} name={'email'} className={styles.form_input}
                               placeholder={'someone@gmail.com'}
                               autoCapitalize={'none'}
                               onFocus={this.handleInputFocus.bind(this)}
                               onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div className={styles.form_item}>
                        <Input.Password  type={'password'} name={'password'} className={styles.form_input}
                               style={{textIndent: 0}}
                               placeholder={'Password'}
                               onFocus={this.handleInputFocus.bind(this)}
                               onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div className={styles.form_item}>
                        <Input type={'text'} name={'email'} className={styles.form_validation_input}
                               placeholder={'Validation Code'}
                               autoCapitalize={'none'}
                               onFocus={this.handleInputFocus.bind(this)}
                               onChange={this.handleInputChange.bind(this)}/>
                        <Button className={styles.form_validation_button} loading={this.state.processing}
                                onClick={this.login.bind(this)}>Send</Button>
                    </div>
                    <div className={styles.form_item}>
                        {this.state.showMessageDialog ?
                            <div className="message_box">
                                <Alert message={this.state.message} type="warning" closable={true}
                                       onClose={() => {
                                           this.setState({showMessageDialog: false})
                                       }}/>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className={styles.form_button_row}>
                        <Button className={styles.form_button} loading={this.state.processing}
                                onClick={this.login.bind(this)}>注册</Button>
                    </div>
                    <div className={styles.link_download}>
                        <span className={styles.link_download} onClick={()=>this.setState({isLogin: true})}>已有账号？登录</span>
                    </div>
                </div>
            </Modal>
        );
    }

}
