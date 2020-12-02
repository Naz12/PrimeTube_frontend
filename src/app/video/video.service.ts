import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Video } from '../model/video/video.model';
import { CurrentUser, channelSubscriptions } from '../model/user/currentUser.model';
import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiUrl
@Injectable()
export class VideoService {
    video$: Subject<Video>
    constructor(private http: HttpClient) {

    }

    getVideo(method: string, url: string, options: Object): Observable<Video> {
        return this.sendRequest<Video>(method, url, options);
    }


    getLiveVideos(method: string, url: string, options: Object): Observable<Video[]> {
        return this.sendRequest<Video[]>(method, url, options);
    }


    subscribeChannel(method: string, url: string, options: Object): Observable<channelSubscriptions> {
        return this.sendRequest<channelSubscriptions>(method, url, options);
    }

    unsubscribeChannel(method : string , url : string  , options : Object) : Observable<string>{
        return this.sendRequest<string>(method , url , options);
    }

    updateWatchCount(method : string , url : string , options? : Object) : Observable<Number>{
        return this.sendRequest<Number>(method , url , options);
    }

    likeVideo(method : string , url : string , options? : Object) : Observable<Response>{
        return this.sendRequest<Response>(method , url , options)
    }

    getPaymentUrl(method : string , url : string , options? : Object): Observable<string>{
        return this.sendRequest<string>(method , url , options);
    }

    sendRequest<T>(method: string, url: string, options: Object): Observable<T> {
      console.log(url);
        return this.http.request<T>(method, url.replace('localhost', BACKEND_URL), options)
      console.log(url);
    }
}

