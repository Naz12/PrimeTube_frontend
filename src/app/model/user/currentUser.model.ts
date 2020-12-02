import { Channel } from '../channel/channel.model';
import {Video} from "../video/video.model";
import {IPlaylist} from "../playlist.model";


export interface CurrentUser {
    _id? : string;
    firstName? : string;
    lastName? : string,
    username? :string ,
    email? : string,
    password? : string,
    profileImagePath? : string

    favorites? : string[]
    createdChannel? : Channel[]
    subscriptions? : channelSubscriptions[]
    likedVideoId? : String[] | Video[]
    watchLaterVideoIds : String[] | Video[]
    playlist? : IPlaylist[],
    notificationId? : String[],
    purchasedContent? : {videoId? : String | Video , datePurchased? : Date}[]
}

export interface channelSubscriptions{
    _id? : string
    allowNotification? : boolean,
    channelId? : Channel
}
