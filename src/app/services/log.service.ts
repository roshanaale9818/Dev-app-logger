import { Injectable } from '@angular/core';
import {Log} from '../models/log'
import { BehaviorSubject }  from 'rxjs';
import { Observable } from 'rxjs';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {



  //service ma bhayeko update sabailai share garnu parda behaviour subject bhanne use hunx
  //jasle euta ma bhayeko update lai sync garera components haru bich share hunx
  //it should be passed as observable to components
  //Therefor it should be subscribed  from the components
  //changing one from one component will automatically synced to the another components

  //communicating between components via service we use BehaviouSubject from rxjs

  logs:Log[];
  private logSource = new BehaviorSubject<Log>({
    id:null,
    text:null,
    date:null
  });

  selectedLog = this.logSource.asObservable();
  private stateSource = new BehaviorSubject<boolean> (true);
  stateClear = this.stateSource.asObservable();





  constructor() {
    // this.logs = [
    //   {
    //   id : '1',
    //   text:'Generated Components',
    //   date: new Date('12/12/2019')

    //   },
    //   {
    //     id : '2',
    //     text:'added Components Bootstrap',
    //     date: new Date('12/11/2019')
  
    //     },
    //     {
    //       id : '3',
    //       text:'added logs Components',
    //       date: new Date('12/9/2019')
    
    //       }
    // ]
    this.logs=[];
  }

  getLogs():Observable<Log[]>{
    if(localStorage.getItem('logs')=== null){
      this.logs =[];

    }
    else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a,b)=>{
      return b.date = a.date;
    }));
  }
  setFormLog(log:Log){
    this.logSource.next(log);

  }
  addLog(log:Log){
    this.logs.unshift(log);
    //Add to local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));



  }
  updateLog(log:Log){

    this.logs.forEach((cur,index)=>{
      if(log.id == cur.id){
        this.logs.splice(index,1);
      }
      

    })
    this.logs.unshift(log)
    
    //update to local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));


  }
  deleteLog(log:Log){

    this.logs.forEach((cur,index)=>{
      if(log.id == cur.id){
        this.logs.splice(index,1)
      }

    })
    
    //delete to local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));


  }
  clearState(){
    this.stateSource.next(true);
  }
   }

