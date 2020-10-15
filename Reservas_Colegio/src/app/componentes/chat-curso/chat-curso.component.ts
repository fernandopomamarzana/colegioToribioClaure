import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, PopoverController } from '@ionic/angular';
import { ChatService } from 'src/app/service/chat.service';
import {message_curse} from '../../moldeos/message_curse'
import { session } from 'src/app/moldeos/session';
import { EmogisComponent } from '../emogis/emogis.component';

@Component({
  selector: 'app-chat-curso',
  templateUrl: './chat-curso.component.html',
  styleUrls: ['./chat-curso.component.scss'],
})
export class ChatCursoComponent implements OnInit {
  @ViewChild("content") content:any
  chat:any;
  public room:any;
  currentPopover : any;
  
  public mensajes=[];
  public fechas:Array<any>=[];
  public messages:Array<any>=[];
  public message_curse:message_curse;
  public room1:any;
  public msg:string;
  public create:string="";
  public uid_session:string="";
  public uid_chat:string="";
  public uid_envio:string="";
  public tipo:string="";
  public fecha:Date;
  constructor(
    public navparams:NavParams,
    public modalCtrl:ModalController,
    public chatService:ChatService,
    public popoverController: PopoverController,

  ) { 
    this.chat=navparams.get('chat');
    console.log(this.chat.id);
    this.uid_session=session.uid.toString();
  }

  ngOnInit() 
  {
    this.chatService.getChatRoom_curso(this.chat.id).subscribe(room=>{
          console.log(room);
          this.room=room;
          this.uid_envio=this.chat.id;
            for(let item of this.room.messages)
              {
                console.log(item)
                
                var timestamp = item.date.seconds;
                var myDate = new Date(timestamp*1000);
                var formatedTime=myDate.toJSON();
                var fecha=new Date(formatedTime);
                
                var date=fecha.getFullYear()+"/"+(fecha.getMonth()+1)+"/"+fecha.getDate();

                  if(this.fechas.indexOf(date)==-1)
                  {
                    console.log("date: "+date);
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
                this.messages.push({"name":item.name,"content":item.content,"id":item.id,"date":minutes,"fecha":date});
              
              }
        this.content.scrollToBottom();
    });
  }
  async emogis(ev) {
    var popover = await this.popoverController.create({
      component: EmogisComponent,
      event: ev,
      translucent: true,
      mode:"ios",
      cssClass:'pop-over',
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
  { this.fechas=[];
    this.messages=[];
    this.mensajes=[];
    //var tipo="";
    if(session.cargo.toString()=="Profesor")
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
    const mensaje:message_curse={
    //uid:"dasdasdasfasfas",
    id:session.uid.toString(),
    name:this.tipo+" "+session.nombre.toString()+" "+session.apellido.toString(),
    content: this.msg,
    type:"Text",
    date: new Date(),
    fecha:new Date().toString(),
    }
    //alert(session.cargo.toString());
    this.chatService.sendMessageToFirebase(mensaje,this.uid_envio); 
    
    this.msg="";
  }
  
  closeChat(){
    this.modalCtrl.dismiss();
  }
}
