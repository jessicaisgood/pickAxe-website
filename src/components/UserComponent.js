import React from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "./BaseComponent";
import StorageUtils from "../tools/StorageUtils";

export default class UserComponent extends BaseComponent {

    constructor (props) {
        super(props);
        const CurrentUser = StorageUtils.loadUser();
        if(!CurrentUser || !CurrentUser.token){
            console.log('CurrentUser is NULL');
        }
        window.CurrentUser = CurrentUser;
    }
}
