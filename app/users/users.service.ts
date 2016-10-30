import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import "rxjs/add/operator/map";

@Injectable()
export class UsersService {
    private _url = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http: Http) {

    }
    public getUsers() {
        return this._http.get(this._url)
            .map(response => response.json());
    }

    public addUser(user) {
        return this._http.post(this._url, JSON.stringify(user))
            .map(res => res.json());
    }

    public updateUser(user) {
        return this._http.put(this._url, JSON.stringify(user))
            .map(res => res.json());
    }

    public getUser(userId: string) {
        return this._http.get(this.getUserUrl(userId))
            .map(response => response.json());
    }

    deleteUser(userId) {
        return this._http.delete(this.getUserUrl(userId))
            .map(res => res.json());
    }

    private getUserUrl(userId) {
        return this._url + "/" + userId;
    }
}