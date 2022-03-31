export interface ProgressStatus {
    status : ProgressStatusEnum;
    percentage?: number;
}

export interface MyFileName{
    name:string;
    myFilename:string;
}

export enum ProgressStatusEnum{
    START,
    COMPLETE,
    IN_PROGRESS,
    ERROR
}
