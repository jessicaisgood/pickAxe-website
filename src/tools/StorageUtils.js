import {Component} from "react";
import CommonUtils from "./CommonUtils";

export default class StorageUtils extends Component {

    /**
     * save to local storage
     * @param key
     * @param value
     */
    static save(key, value) {

        localStorage.setItem(key, JSON.stringify(value));
    };

    /**
     * load from local storage
     * @param key
     * @returns {any}
     */
    static load(key) {

        return JSON.parse(localStorage.getItem(key));
    };

    /**
     * delete local storage
     * @param key
     */
    static remove(key) {

        localStorage.removeItem(key)
    };

    /**
     * save current user info
     * @param userInfo
     */
    static saveUser(userInfo) {

        this.save(window.constants.CURRENT_USER, CommonUtils.encodeBase64(JSON.stringify(userInfo)))
    };

    /**
     * load current user info
     */
    static loadUser () {
        let userInfo = this.load(window.constants.CURRENT_USER);
        if(!userInfo){
            userInfo = {};
            return userInfo;
        }
        return JSON.parse(CommonUtils.decodeBase64(userInfo));
    };

    /**
     * load current user id
     */
    static getUserId () {
        let userInfo = this.loadUser();
        return userInfo.userId;
    };

    /**
     * load current user email
     */
    static getEmail () {
        let userInfo = this.loadUser();
        return userInfo.email;
    };

    static hasToken() {
        const CurrentUser = StorageUtils.loadUser();
        if (!CurrentUser || !CurrentUser.token) {
            console.log('CurrentUser is NULL');
            return null;
        } else {
            return CurrentUser.token;
        }
    }

    static setLanguage(language){
        localStorage.setItem(window.constants.LANGUAGE_KEY, language);
    }


    static getLanguage(){
        let language = localStorage.getItem(window.constants.LANGUAGE_KEY);
        if (!language)
            language = CommonUtils.getBrowserLanguage();
        return language;
    }

}
