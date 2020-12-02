import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType, HttpResponse, HttpRequest, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError, BehaviorSubject } from "rxjs";
import { map, tap, delay, shareReplay, catchError } from 'rxjs/operators';
import { Channel } from '../model/channel/channel.model';
import { Live } from '../model/live/createLive.model';
import { Video } from '../model/video/video.model';
import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiUrl
@Injectable()
export class DashboardService {
    public uploadProgress$: Subject<Number | boolean>
    public downloadProgress$ : Subject<Number | boolean>
    public downloadedFile$ : Subject<Blob>;
    public isLivestreaStarted$: Subject<boolean>
    public uploadId : Subject<number> = new BehaviorSubject<number>(0);
    constructor(private http: HttpClient) {

    }


    uploadVideo(method: string, url: string, body: FormData, options: any) {
        this.uploadProgress$ = new Subject<Number>();
        const request = new HttpRequest<FormData>(method, url, body, options);

        this.http.request<FormData | Number>(request).pipe(
            shareReplay()
        ).subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
                const uploadProgress = Math.round((event.loaded / event.total) * 100)
                this.uploadProgress$.next(uploadProgress);
            }
            else if (event instanceof HttpResponse) {
                 this.uploadId.next(event.body as number)
                this.uploadProgress$.complete();
            }
           else{

            this.uploadProgress$.next(false)
           }
        })

        return this.uploadProgress$.asObservable();
    }

    downloadVideo(method : string , url : string  , options : any){
        this.downloadedFile$ = new Subject<Blob>();
      this.downloadProgress$ = new Subject<Number | boolean>()
      var downloadRequest  = new HttpRequest(method , url  ,  options)
      this.http.request<Blob>(downloadRequest).subscribe(event =>{
          if(event.type == HttpEventType.DownloadProgress){
              console.log('loaded' , event.loaded);
              console.log('total', event.total);
              var percentCompleted = Math.round((event.loaded/event.total) * 100)
              this.downloadProgress$.next(percentCompleted)
          }
          else if(event instanceof HttpResponse){
               this.downloadedFile$.next(event.body)
               this.downloadedFile$.complete();

             this.downloadProgress$.complete()
          }
          else{
           this.downloadProgress$.next(false);
          }
      })
      return this.downloadProgress$.asObservable();
    }


    startLiveStream(method: string, url: string, options: Object): Observable<Live> {
        this.isLivestreaStarted$ = new Subject<boolean>();
        return this.sendRequest<Live>(method, url, options)
            .pipe(
                delay(5000),
            )
        // ).subscribe(response => {
        //     if (response) {
        //         this.isLivestreaStarted$.next(true);
        //     }
        //     else {
        //         this.isLivestreaStarted$.next(false);
        //     }
        // }, error => {
        //     console.log(error)
        // })
        // return this.isLivestreaStarted$.asObservable();
    }


    stopLvieStream(method: string, url: string, options): Observable<Video> {
        return this.sendRequest<Video>(method, url, options)
    }

    createChannel(method: string, url: string, options: Object) {
        return this.sendRequest<Channel>(method, url, options).pipe(
            delay(5)
        )
    }


    getChannelStreamKey(method: string, url: string, options: Object) {
        return this.sendRequest<any>(method, url, options)
    }




    sendRequest<T>(method: string, url: string, options: Object): Observable<T> {
        return this.http.request<T>(method, url.replace('localhost', BACKEND_URL), options)
    }
}

