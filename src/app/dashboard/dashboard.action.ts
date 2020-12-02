import { Action } from '@ngrx/store';
import { Live } from '../model/live/createLive.model';


export enum dashboardActionType {
    LiveStartAction = "[LIve Preview Page] Live Start",
    LiveStopAction = "[Live preview Page] Live Stopeed",
    ChannelCreate = "[Dashboard Page] Channel Create",
    ChannelDelete = "[Channels Page] Channel Delete"
}

export class LiveStart implements Action{
    readonly type = dashboardActionType.LiveStartAction
    constructor(public payload : {liveData : Live}){
        
    }
}

export class LiveStop implements Action{
    readonly type = dashboardActionType.LiveStopAction
}

export class ChannelCreate implements Action{
    readonly type = dashboardActionType.ChannelCreate
}

export class ChannelDelete implements Action{
    readonly type = dashboardActionType.ChannelDelete
}


export type dashboardAction = LiveStart | LiveStop | ChannelCreate | ChannelDelete