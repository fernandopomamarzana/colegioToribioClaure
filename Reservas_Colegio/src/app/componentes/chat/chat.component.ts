import { Component, OnInit, ViewChild } from '@angular/core';
import {NavParams, ModalController, PopoverController} from '@ionic/angular'
import {message} from '../../moldeos/message'
import { ChatService } from 'src/app/service/chat.service';
import { isNullOrUndefined } from 'util';
import { session } from 'src/app/moldeos/session';
import { EmogisComponent } from '../emogis/emogis.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chat:any;
  @ViewChild("content") content:any;
  public mensajes=[];
  public fechas:Array<any>=[];
  public messages:Array<any>=[];
  public messages1:Array<any>=[];

  public message:message;
  public room:Array<any>=[];
  public room1:any;
  public msg:string="";
  public create:string="";
  public uid_session:string="";
  public uid_chat:string="";
  public uid_envio:string="";
  public uid_generate:string="";
  public tipo:string="";
  public tipo1:string="";

  public fecha:Date;
  currentPopover : any;
  constructor(
    public navparams:NavParams,
    public modalCtrl:ModalController,
    public chatService:ChatService,
    public popoverController: PopoverController,
    private bd:AngularFirestore

  ) {
      this.chat=navparams.get('chat');
      console.log(this.chat);
      this.uid_chat=this.chat.uid;
      
   }

  ngOnInit() 
  {
    
    //console.log(this.chat.uid);
    this.uid_session=session.uid.toString();
    this.chatService.getcharRoots().subscribe(room=>{
      this.messages1=[];
      for(let rom of room)
      {
        /*if(rom.id==this.uid_session || rom.id==this.chat.uid)
        {*/
          if( this.uid_session==rom.uid1 && this.chat.uid==rom.uid2)
          {
            //console.log(item)
            this.create="creado";
              this.uid_envio=rom.id;
              for(let item of rom.messages)
                {
                  var timestamp = item.date.seconds;
                  var myDate = new Date(timestamp*1000);
                  var formatedTime=myDate.toJSON();
                  var fecha=new Date(formatedTime);
                  
                  var date=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();

                    if(this.fechas.indexOf(date)==-1)
                    {
                      //console.log("date: "+date);
                      this.fechas.push(date);
                    }
                  var minutes="";
                  if(fecha.getMinutes()<9){ 
                    if(fecha.getHours()<12)
                    {
                      minutes=fecha.getHours()+":0"+ fecha.getMinutes()+" am";
                    }else{
                      minutes=fecha.getHours()+":0"+ fecha.getMinutes()+" pm";
                    }
                  }
                  else{ 
                    if(fecha.getHours()<12)
                    {
                      minutes=fecha.getHours()+":"+ fecha.getMinutes()+" am";
                    }else{
                      minutes=fecha.getHours()+":"+ fecha.getMinutes()+" pm";
                    }}
                  this.messages1.push({"content":item.content,"id":item.id,"date":minutes,"fecha":date});
                }
          }
          if( this.chat.uid==rom.uid1 && this.uid_session==rom.uid2)
          {
            //console.log(item)
            this.create="creado";
              this.uid_envio=rom.id;
              for(let item of rom.messages)
                {
                  var timestamp = item.date.seconds;
                  var myDate = new Date(timestamp*1000);
                  var formatedTime=myDate.toJSON();
                  var fecha=new Date(formatedTime);
                  
                  var date=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();

                    if(this.fechas.indexOf(date)==-1)
                    {
                      //console.log("date: "+date);
                      this.fechas.push(date);
                    }
                  var minutes="";
                  if(fecha.getMinutes()<9){ 
                    if(fecha.getHours()<12)
                    {
                      minutes=fecha.getHours()+":0"+ fecha.getMinutes()+" am";
                    }else{
                      minutes=fecha.getHours()+":0"+ fecha.getMinutes()+" pm";
                    }
                  }
                  else{ 
                    if(fecha.getHours()<12)
                    {
                      minutes=fecha.getHours()+":"+ fecha.getMinutes()+" am";
                    }else{
                      minutes=fecha.getHours()+":"+ fecha.getMinutes()+" pm";
                    }}
                  this.messages1.push({"content":item.content,"id":item.id,"date":minutes,"fecha":date});
                }
          }
          
        //}
        
      }
      this.messages=this.messages1
      this.content.scrollToBottom();
    });


  }

  closeChat(){
    this.modalCtrl.dismiss();
  }
  async emogis(ev) {
    var popover = await this.popoverController.create({
      component: EmogisComponent,
      event: ev,
      translucent: true,
      mode:"ios",
      cssClass:'pop-over-style',
      showBackdrop:false,
      componentProps:{
        
      },
      
    });
    popover.onDidDismiss()
    .then((result) => {
      
      //
    });

    this.currentPopover = popover;
    return popover.present();

  }
  mandar()
  { 
    if(session.cargo.toString()=="Profesor" )
    {
      this.tipo="Prof."
    }
    if(session.cargo.toString()=="Estudiante")
    {
      this.tipo="Est."
    }
    if(session.cargo.toString()=="Director")
    {
      this.tipo="Dire."
    }
    if(session.cargo.toString()=="Tutor")
    {
      this.tipo="Tutor."
    }


    if(this.chat.tipo_usuario=="Profesor" )
    {
      this.tipo1="Prof."
    }
    if(this.chat.tipo_usuario=="Estudiante")
    {
      this.tipo1="Est."
    }
    if(this.chat.tipo_usuario=="Director")
    {
      this.tipo1="Dire."
    }
    if(this.chat.tipo_usuario=="Tutor")
    {
      this.tipo1="Tutor."
    }
    
    const mensaje:message={
    //uid:"dasdasdasfasfas",
    id:this.uid_session,
    content:this.msg,
    type:'Text',
    date: new Date(),
    fecha:new Date().toString(),
    }
    console.log(this.messages.length);
    if(this.messages.length==0)
    {
      this.uid_generate= this.bd.createId();
      this.chatService.setchatRoots(mensaje,this.uid_generate,this.chat.uid,this.tipo1+" "+this.chat.nombre+" "+this.chat.apellido,session.uid.toString(),this.tipo+" "+session.nombre.toString()+" "+session.apellido.toString())
    }
    else
    {
    //console.log(this.uid_envio);
      
      this.chatService.sendMessageToFirebase(mensaje,this.uid_envio); 
    }
    this.msg="";
    this.messages1=[];
  }
}
