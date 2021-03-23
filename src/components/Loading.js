import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Spin, Icon} from 'antd';

const antIcon = <Icon type="loading" style={{fontSize: 24,color: '#4471b7'}} spin/>;

export class EasyLoading {
    constructor() {
    }

    static bind(loading, key = 'default') {
        loading && (this.map[key] = loading);
    }

    static unBind(key = 'default') {
        this.map[key] = null;
        delete this.map[key];
    }

    static show(text = 'Loading...', timeout = -1, key = 'default') {
        this.map[key] && this.map[key].setState({"isShow": true, "text": text, "timeout": timeout});
    }

    static close(key = 'default') {
        this.map[key] && this.map[key].setState({"isShow": false});
    }
}

EasyLoading.map = {};

export class Loading extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        color: PropTypes.string,
        textStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
    };

    constructor(props) {
        super(props);
        let handle = 0;
        this.state = {
            isShow: false,
            timeout: -1,
            text: "Loading..."
        };
        EasyLoading.bind(this, this.props.type || 'default');
    }

    componentWillUnmount() {
        clearTimeout(this.handle);
        EasyLoading.unBind(this.props.type || 'default');
    }

    render() {
        clearTimeout(this.handle);
        (this.state.timeout != -1) && (this.handle = setTimeout(() => {
            EasyLoading.close(this.props.type || 'default');
        }, this.state.timeout));


        return (
            <Modal
                mask={false}
                closable={false}
                footer={null}
                width={80}
                visible={true}
                bodyStyle={{textAlign: 'center', backgroundColor: '#efefef'}}
                >
                <div className='loading_box'>
                    <Spin indicator={antIcon}/>
                </div>
            </Modal>

        );
    }
}
