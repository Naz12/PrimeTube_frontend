import {Video} from "./video/video.model";
import {Channel} from "./channel/channel.model";

export interface IPlaylist{
  playlistId? : String,
  playlistName? : String,
  dateCreated? : Date | String
  videoIds : String[] | Video[]
  channelIds? : String | Channel
}
