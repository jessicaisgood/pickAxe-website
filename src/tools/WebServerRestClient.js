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
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with the Wallchain library. If not, see <http://www.gnu.org/licenses/>.
 */
import StorageUtils from "./StorageUtils";

export default class WebServerRestClient {

    constructor () {
        this.baseUrl = "https://www.callpanda.net";
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: StorageUtils.hasToken()
        };
    }

    _fullRoute (url) {
        return `${this.baseUrl}${url}`;
    }

    _fetch (route, method, body, isQuery = false) {
        if (!route) throw new Error('Route is undefined');
        let fullRoute = this._fullRoute(route);
        if (isQuery && body) {
            const qs = require('qs');
            const query = qs.stringify(body);
            fullRoute = `${fullRoute}?${query}`;
            body = undefined;
        }
        let opts = {
            method,
            headers: this.headers
        };
        if (body) {
            Object.assign(opts, { body: JSON.stringify(body) });
        }
        const fetchPromise = () => fetch(fullRoute, opts);  //instead of fetch
        return fetchPromise()
            .then(response => response.json());
    }

    GET (route, query) { return this._fetch(route, 'GET', query, true); }
    POST (route, body) { return this._fetch(route, 'POST', body); }
    PUT (route, body) { return this._fetch(route, 'PUT', body); }
    DELETE (route, query) { return this._fetch(route, 'DELETE', query, true); }
}
