export interface Channel {
    _id? : string
    channelName?: string
    channelDescription?: string
    channelImagePath?: string
    dateCreated?: Date
    streamKey?: string
    creatorIds?: string
    adminIds?: string[]
    pinnedVideoId?: string

    channelPlaylist: channelPlaylist[]
    subscribers: string[]
}

export interface channelPlaylist {
    playlistName?: string
    dateCreated?: Date
    VideoIds: string[]
}



