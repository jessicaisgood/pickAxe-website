/**
 * Wallchain
 * Copyright 2018-Present The Wallchain Foundation
 *
 * This product includes software developed at The Wallchain Foundation.
 *
 * This file is part of the Wallchain library.
 * The Wallchain library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * The Wallchain library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with the Wallchain library. If not, see <http://www.gnu.org/licenses/>.
 */

import {Component} from "react";
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const base64 = require('base-64');

export default class CommonUtils extends Component{

    static encodeBase64(str){
        return base64.encode(str);
    }

    static decodeBase64(str){
        return base64.decode(str);
    }

    static checkEmail(str) {
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (reg.test(str)) {
            return true;
        } else {
            console.log("invalid email");
            return false;
        }
    }

    static toDecimal(value, length) {
        if(!length)
            length = 2;
        let f = parseFloat(value);
        if (isNaN(f)) {
            return false;
        }
        let x_len = Math.pow(10, length);
        f = Math.round(value * x_len) / x_len;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.'
        }
        while (s.length <= rs + length) {
            s += '0'
        }
        return s;
    }

    static formatDate(originTime, format) {
        let dateTime;
        if(typeof originTime == "string"){
            originTime = originTime.replace(/-/g,"/");
            dateTime = new Date(originTime);
        }else{
            dateTime = originTime;
        }
        let date = {
            "M+": dateTime.getMonth() + 1,
            "d+": dateTime.getDate(),
            "h+": dateTime.getHours(),
            "m+": dateTime.getMinutes(),
            "s+": dateTime.getSeconds(),
            "q+": Math.floor((dateTime.getMonth() + 3) / 3),
            "S+": dateTime.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    /**
     *
     * @param str  (null|undefined|''|'   '|[]|{}) return true
     * @returns {boolean}
     */
    static isEmpty(str) {
        if (!str) {
            return true;
        } else if (typeof str === 'object' && Object.keys(str).length === 0) {
            return true;
        } else if (str.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
            return true;
        }
        return false;
    }

    static generateUUID() {
        let uuidv1_str = uuidv1() + ""; // timestamp ⇨ '3b99e3e0-7598-11e8-90be-95472fb3ecbd'
        let uuidv4_str = uuidv4() + ""; //  Random ⇨ '3a017fc5-4f50-4db9-b0ce-4547ba0a1bfd'
        let uuid = uuidv1_str.replace(/-/g, "");

        return base64.encode(uuid);
    }

    static randomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

    static randomString(length, chars) {
        if(!chars)
            chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    static generateNodeId() {
        return this.encodeBase64(this.randomString(64))
    }

    static cutEthAddress(address){
        if(!address || address.length < 10)
            return '';
        return address.substring(0, 9) + ".........." + address.substring(address.length - 5, address.length);
    }

    static log(message) {
        console.debug(message)
    }

    static getBrowserLanguage() {
        let lang = navigator.language || navigator.userLanguage;
        lang = lang.substr(0, 2);
        if (lang === 'zh') {
            return window.constants.LANGUAGE_CN
        } else {
            return window.constants.LANGUAGE_EN
        }
    }

}
