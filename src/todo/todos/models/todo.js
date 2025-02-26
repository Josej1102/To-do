import {v4 as uuid} from 'uuid';
export class Todo{


    constructor (despcription){
        this.id = uuid();
        this.despcription = despcription;
        this.done = false;
        this.createdAt = new Date();
    }
}