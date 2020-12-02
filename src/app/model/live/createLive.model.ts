import { CurrentUser } from '../user/currentUser.model';

export interface Live{
    _id : string;
    videoId : string;
    channelId : string;
    tag : string;
    date: Date
    streamKey : string
}


export interface LiveChatData{
    _id?: string
    roomId? : string ; 
    userId? : CurrentUser;
    text? : string;
    image? : string
}