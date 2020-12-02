import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CurrentUser } from "../model/user/currentUser.model";
import { Login } from "../model/user/register.model";
import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiUrl
@Injectable()
export class AuthService {
    authMessage: string = ""
    constructor(private http: HttpClient) {

    }

    signinWithFacebook(method: string, url: string) {
        return this.sendRequest<Response>(method, url);
    }

    signUp(method: string, url: string, body: CurrentUser): Observable<any> {
        return this.sendRequest<any>(method, url, body);
    }

    signin(method: string, url: string, body: Login): Observable<any> {
        return this.sendRequest<any>(method, url, body)
    }

    profile(method : string , url :string , options? : Object){
        return this.sendRequest<CurrentUser>(method , url , options);
    }




    sendRequest<T>(method: string, url: string, body?: any): Observable<T> {
        return this.http.request<T>(method, url.replace('localhost', BACKEND_URL), { body: body })
    }
}
