export interface Message {
    id : string,
    fromMessage : string,
    toMessage : string,
    isFile : boolean,
    messageText : string,
    sentTime : string,
    filePath : string
}
