import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Video } from './model/video/video.model';
import { Channel } from './model/channel/channel.model';
import { channelSubscriptions, CurrentUser } from './model/user/currentUser.model';
import * as io  from "socket.io-client"
import {environment} from '../environments/environment';
const BACKEND_URL = environment.apiUrl
@Injectable()
export class AppService {

    subscriptions$? : Subject<channelSubscriptions[]> = new Subject<channelSubscriptions[]>()
    currentUser$? : Subject<CurrentUser>

    public socket
    public socketServerUrl : string = "http://localhost:3000"

    constructor(private http : HttpClient){

    }

    getHome(method : string , url : string , options : Object) : Observable<Video[]>{
        return this.sendRequest<Video[]>(method , url , options);
    }
  getLibrary(method : string , url : string , options : Object) : Observable<CurrentUser>{
    return this.sendRequest<CurrentUser>(method , url , options);
  }


    getSubscribedChannel(method : string , url : string , options : Object):Observable<channelSubscriptions[]>{
        return this.sendRequest<channelSubscriptions[]>(method , url , options);
    }

    sendRequest<T>(method: string, url: string, options : Object): Observable<T> {
        this.socket.connec
        return this.http.request<T>(method, url.replace('localhost', BACKEND_URL) , options)

    }

    connectToSocket(data? : {}){
        this.socket = io.connect(this.socketServerUrl , data);
        this.socket.emit('clientmessage' , "connection from client");
    }
}


@Injectable()
export class MessageService{
    message$ : Observable<string>
    constructor(){

    }

    errorMessage(message){
        return
    }
}
