import { Channel } from '../channel/channel.model';
import { DecimalPipe } from '@angular/common';

export interface Video{
    _id : string
    videoTittle : string
    videoDescription : string
    videoPath : string
    videoVersionPath : string[]
    videoTag : string[]
    channelId? : Channel

    thumbnailPath : string

    videoType : string
    licenseKey : string
    price : number

    isLive : boolean
    livePath : string
    chat : []

 

    watchCount : number
    like? : likeData[]
    dislike? : likeData[]
    comment? : []

    dateCreated : Date

}

interface likeData{
    userId : string 
     date : Date
}



export interface UploadData{
    id? : number
    videoTittle? : string
    channelName? : string
    videoType? : string
    isProcessed : boolean
}

export interface CartItem{
    itemId? : string,
    itemName? : string,
    unitPrice? : number
    quantity? : number
}