export class EmailExistError extends Error{
    constructor(){
        super('Email exists!')
    }
}