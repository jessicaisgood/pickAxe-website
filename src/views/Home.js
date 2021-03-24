import React from 'react';
import styles from '../styles/home.module.scss';
import 'antd/dist/antd.css';
import {Menu, Layout, Popover, Avatar, Switch, Button, Modal} from 'antd';
import BaseComponent from "../components/BaseComponent"
import LoginRegisterModal from "./modal/LoginRegisterModal"
import PaymentModal from "./modal/PaymentModal"
import CreditCardModal from "./modal/CreditCardModal"
import StorageUtils from "../tools/StorageUtils";

const { Header, Footer, Content } = Layout;

export default class Home extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            showLoginRegisterModal: false,
            showPaymentModal: false,
            showCreditCardModal: false,
            selectedPackage: {},
            isLogin: false,
            appStoreModalVisible: false,
            linuxTooltipModalVisible: false
        }
    }

    scrollToAnchor(id) {
        document.getElementById(id).scrollIntoView({block: "start", behavior: "smooth"});
    };

    isWeChat = function () {
        const browser = {
            versions: function () {
                const u = navigator.userAgent, app = navigator.appVersion;
                return {         //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };

        const ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        return (browser.versions.mobile && ua.match(/MicroMessenger/i) == "micromessenger");
    };

    // downloadAndroid = function () {
    //     const apkURL = window.downloads.Android + '?t=' + new Date().getTime();
    //     window.location.href = apkURL;
    // };

    // downloadWindows = function () {
    //     const fileURL = window.downloads.Windows+ '?t=' + new Date().getTime();
    //     window.location.href = fileURL;
    // };

    // downloadLinux = function () {
    //     const fileURL = window.downloads.Linux+ '?t=' + new Date().getTime();
    //     window.location.href = fileURL;
    // };

    // downloadMac = function () {
    //     const fileURL = window.downloads.MacOS + '?t=' + new Date().getTime();
    //     window.location.href = fileURL;
    // };

    openTestFlight = function () {
        setTimeout('window.open(window.downloads.TestFlight);', 310);
    };

    openAppStore = function () {
        setTimeout('window.open(window.downloads.AppStore);', 310);
    };
    
    // Start: app store popup handlers
    showAppStoreModal = () => {
        this.setState({
            appStoreModalVisible: true,
        });
    };

    handleOk = () => {
        this.setState({ appStoreModalVisible: false });
        this.openAppStore();
    };
  
    handleCancel = () => {
        this.setState({ appStoreModalVisible: false });
    };
    // End: app store popup handlers

    // Start: linux tooltip popup handlers
    showlinuxTooltipModal = () => {
        this.setState({
            linuxTooltipModalVisible: true,
        });
    };

    handleLinuxModalOk = () => {
        this.setState({ linuxTooltipModalVisible: false });
    };

    handleLinuxModalCancel = () => {
        this.setState({ linuxTooltipModalVisible: false });
    };
    // End: linux tooltip popup handlers

    
    render() {
        let isChinese = StorageUtils.getLanguage() === window.constants.LANGUAGE_CN;
        
        return (
            <div id="container" className={styles.container}>
                <Layout className={styles.content_container}>
                    <Header id="Header" className={styles.header}>
                        <div className={styles.app_info}  onClick={() =>this.scrollToAnchor('product_section')}>
                            <img className={styles.logo} src={require('../images/logo.png')}/>
                            <label className={styles.name}>PickAxe</label>
                        </div>

                        <div className={styles.language_switch_section}>
                            <Switch checkedChildren="中文" unCheckedChildren="EN"
                                    defaultChecked={StorageUtils.getLanguage() === window.constants.LANGUAGE_CN}
                                    className={styles.language_switch}
                                    onChange={(value) => {
                                        this.switchLanguage(value);
                                    }}/>
                        </div>

                        <Menu mode="horizontal" theme="dark" className={styles.main_menu}>
                            <Menu.Item key="home">
                                <a href="javascript:;" rel="noopener noreferrer"
                                   onClick={() => this.scrollToAnchor('product_section')}>
                                    {window.language.menus.home}
                                </a>
                            </Menu.Item>
                            <Menu.Item key="join">
                                <a href="javascript:;" rel="noopener noreferrer"
                                   onClick={() => this.scrollToAnchor('join_section')}>
                                    {window.language.menus.join}
                                </a>
                            </Menu.Item>
                            <Menu.Item key="services" className={styles.hidden_on_mobile}>
                                <a href="javascript:;" rel="noopener    noreferrer"
                                   onClick={() => this.scrollToAnchor('features_section')}>
                                    {window.language.menus.service}
                                </a>
                            </Menu.Item>
                            <Menu.Item key="support">
                                <a href="javascript:;" rel="noopener noreferrer"
                                   onClick={() => this.scrollToAnchor('support_section')}>
                                    {window.language.menus.support}
                                </a>
                            </Menu.Item>
                        </Menu>

                    </Header>

                    <Content>
                    <div className={styles.website_title} id="product_section">
                        <h1>{window.language.product_section.title1}</h1>
                        <h1 className={styles.no_padding}>{window.language.product_section.title2}</h1>
                        <h3>{window.language.product_section.subtitle}</h3>
                        <button className={styles.btn_main}
                                onClick={() => this.scrollToAnchor('join_section')}>{window.language.product_section.btn_join}
                        </button>
                        <button className={styles.btn_secondary}
                                onClick={() => this.scrollToAnchor('features_section')}>{window.language.product_section.btn_more}
                        </button> 
                        <div className={styles.app_concept_image}></div>
                    </div>

                    <div className={styles.technology_section} id="technology_section">
                        <h1>{window.language.technology_section.title}</h1>
                        <br/><br/>
                        <h3> {window.language.technology_section.text1} </h3>
                        <h3> {window.language.technology_section.text2} </h3>
                        <div className={styles.app_intro_image}></div>
                        <h3> {window.language.technology_section.text3} </h3>
                    </div>

                    <div className={styles.features_section} id="features_section">
                        <h4>{window.language.feature_section.title}</h4>
                        <div className={styles.app_why_us_image}></div>
                        {/* <div className={styles.app_why_us_table_image}></div> */}
                    </div>
                    

                    {/* hardware advantages */}
                    <div className={styles.feature_section_small}>
                        <div className={styles.box_left}>
                            <h1>{window.language.feature_section.burn_title}</h1>
                            <p className={styles.feature_details}>
                                {window.language.feature_section.burn_text1} <br/>   <br/>
                                <h2>{window.language.feature_section.burn_subtitle1}</h2>
                                {window.language.feature_section.burn_text2} <br/>    
                                {window.language.feature_section.burn_text3} <br/>                         ​
                            </p>              
                        </div>
                        <div className={styles.box_right_burn}>
                        </div>
                    </div>

                    {/* fast sealing*/}
                    <div className={styles.feature_section}>
                        <div className={styles.box_left}>
                            <h1>{window.language.feature_section.join_title}</h1>
                            <p className={styles.feature_details}>
                            <h2>{window.language.feature_section.join_subtitle1}</h2>
                                {window.language.feature_section.join_text2} <br/><br/>
                            <h2>{window.language.feature_section.join_subtitle2}</h2>
                                {window.language.feature_section.join_text3}
                                <br/>
                                {window.language.feature_section.join_text4}                                 ​
                            </p>              
                        </div>
                        <div className={styles.box_right_join}>
                        </div>
                    </div>
                    {/* storage */}
                    <div className={styles.feature_section_large}>
                        <div className={styles.box_left}>
                            <h1>{window.language.feature_section.invitation_title}</h1>
                            <p className={styles.feature_details}>
                                {window.language.feature_section.invitation_text1} <br/><br/>
                                <h2>{window.language.feature_section.invitation_subtitle1}</h2>
                                {window.language.feature_section.invitation_text2}
                                <br/><br/>
                                <h2>{window.language.feature_section.invitation_subtitle2}</h2>
                                {window.language.feature_section.invitation_text3}
                                <br/>
                                {window.language.feature_section.invitation_text4}                                ​
                            </p>              
                        </div>
                        <div className={styles.box_right_invitation}>
                        </div>
                    </div>
                    {/* CP  */}
                    <div className={styles.feature_section_large}>
                        <div className={styles.box_left}>
                            <h1>{window.language.feature_section.holding_title}</h1>
                            <p className={styles.feature_details}>
                            <h2>{window.language.feature_section.holding_subtitle1}</h2>
                                {window.language.feature_section.holding_text1} <br/>
                                {window.language.feature_section.holding_text2} <br/> <br/>    
                                {window.language.feature_section.holding_text3}                              ​
                            </p>              
                        </div>
                        <div className={styles.box_right_holding}>
                        </div>
                    </div>
                    

                    <div className={styles.join_section} id="join_section">
                        <h1>{window.language.join_section.title}</h1>
                        <div className={styles.join_panel}>
                            <h4>Minimum Cluster Solution Cluster</h4>
                            <p>1. PickAxe provides pre-staked tokens</p>
                            <p>2. The sealing efficiency is 1.5T/day </p>
                            <p>3. The effective computing power reaches 450T </p>
                            <p>4. High rate of return with great flexibility and scalability</p>
                            <button className={styles.btn_join}>Consult Now
                            </button>
                            ​<p className={styles.light}>{window.language.join_section.size}</p>
                        </div>
                        <div className={styles.join_panel}>
                            <h4>Flexible Expansion Cluster Solution Cluster</h4>
                            <p>1. PickAxe provides pre-staked tokens</p>
                            <p>2. The computing power machine and storage machine can be expanded freely at any time </p>
                            <p>3. National level of IDC computer room </p>
                            <p>4. Stable operation and maintenance</p>
                            <button className={styles.btn_join}>Consult Now
                            </button>
                            ​<p className={styles.light}>{window.language.join_section.size}</p>
                            
                        </div>    
                    </div>

                    
                    <div className={styles.support_section} id="support_section">
                        <div className={styles.box_left}>
                            <h1>{window.language.support_section.title}</h1>
                            <p className={styles.support_details}>
                                <h2>{window.language.support_section.subtitle1}</h2>
                                <br/>
                                ​{window.language.support_section.email} contact@pickaxe.sh
                                <br/>
                            </p>
                            <p className={styles.support_details}>
                                <h2>{window.language.support_section.subtitle2}</h2>
                                <a href="https://filecoin.io/" target="_blank">{window.language.support_section.tutorial1}</a><br/>
                                <a href="https://docs.filecoin.io/" target="_blank">{window.language.support_section.tutorial2}</a><br/>
                            </p>
                        </div>
                        <div className={styles.box_right}>
                        </div>
                    </div>
                    </Content>

                    <Footer id="Footer" className={styles.footer}>
                        <p><a href="." target="_blank"> Privacy Policy</a></p>
                        <p><a href="." target="_blank">Terms Of Service</a></p>
                        <p>PickAxe©{new Date().getFullYear()} All Rights Reserved</p>
                    </Footer>

                </Layout>
                
                <div>
                  <Modal
                    visible={this.state.appStoreModalVisible}
                    title={window.language.join_section.modal_title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        {window.language.join_section.modal_cancel}
                      </Button>,
                             <Button key="submit" type="primary" onClick={this.handleOk}>
                        {window.language.join_section.modal_ok}
                      </Button>,
                    ]}
                  >
                    <p>{window.language.join_section.modal_body}</p>
                    <p>{window.language.join_section.modal_body2}</p>
                  </Modal>
                </div>

                <div>
                  <Modal
                    visible={this.state.linuxTooltipModalVisible}
                    title={window.language.join_section.linux_tooltip_title}
                    onOk={this.handleLinuxModalOk}
                    onCancel={this.handleLinuxModalCancel}
                    footer={[
                       <Button key="submit" type="primary" onClick={this.handleLinuxModalOk}>
                        OK
                       </Button>
                    ]}
                  >
                    <p>{window.language.join_section.linux_tooltip_body}</p>
                  </Modal>
                </div>

                <LoginRegisterModal visible={this.state.showLoginRegisterModal}
                                    loginCallback={(from) => {
                                        this.setState({showLoginRegisterModal: false, isLogin: true});
                                        if (from === 'payment'){
                                            this.setState({showPaymentModal: true});
                                        }
                                    }}
                                    onRequestClose={() => this.setState({showLoginRegisterModal: false})}/>
                <PaymentModal visible={this.state.showPaymentModal}
                              productDetail={this.state.selectedPackage}
                              loginCallback={() => {
                                  this.setState({
                                      showPaymentModal: false,
                                      showLoginRegisterModal: true
                                  });
                              }}
                              selectionCallback={(method) => {
                                  // close payment modal
                                  this.setState({showPaymentModal: false});

                                  // open target payment method modal
                                  if(method == 'credit'){
                                      this.setState({showCreditCardModal: true});
                                  }
                              }}
                              onRequestClose={() => this.setState({showPaymentModal: false})}/>
                <CreditCardModal visible={this.state.showCreditCardModal}
                                 productDetail={this.state.selectedPackage}
                                 onRequestClose={() => this.setState({showCreditCardModal: false})}/>

                <div id="bg_animation_container" className={styles.bg_animation_container}>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>
                    <div className={styles.circle_container}>
                        <div className={styles.circle}></div>
                    </div>


                </div>
            </div>
        );
    }


    openPaymentModal(selectedPackage){
        this.setState({
            selectedPackage: window.products[selectedPackage],
            showPaymentModal: true
        })
    }

}


