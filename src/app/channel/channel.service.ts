import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../model/video/video.model';
import { Channel } from '../model/channel/channel.model';
import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiUrl
@Injectable()
export class ChannelService {
    constructor(private http: HttpClient) {

    }

    getChannel(method: string, url: string, options: Object): Observable<Channel> {
        return this.sendRequest<Channel>(method, url, options);
    }


    subscribeChannel(method: string, url: string, options: Object): Observable<boolean> {
        return this.sendRequest<boolean>(method, url, options);
    }

    getChannelHome(method: string, url: string, options: Object): Observable<Video[]> {
        return this.sendRequest<Video[]>(method, url, options);
    }

    sendRequest<T>(method: string, url: string, options: Object): Observable<T> {
        return this.http.request<T>(method, url.replace('localhost', BACKEND_URL), options)
    }

}
