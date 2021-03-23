import React from 'react';
import EN from "../language/EN";
import CN from "../language/CN";
import StorageUtils from "../tools/StorageUtils";

export default class extends React.Component {

    constructor(props) {
        super(props);
        let language = StorageUtils.getLanguage();
        console.log("language = "+language);
        if (language === 'EN')
            window.language = EN;
        else if (language === 'CN')
            window.language = CN;
        else
            window.language = EN;
    }

    switchLanguage(isCN) {
        console.log("isCN = "+isCN);
        if (isCN === true) {
            window.language = CN;
            StorageUtils.setLanguage(window.constants.LANGUAGE_CN);
        } else {
            window.language = EN;
            StorageUtils.setLanguage(window.constants.LANGUAGE_EN);
        }
        setTimeout(()=>{
            window.location.reload();
        }, 300);
    }

    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = this.props.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}
