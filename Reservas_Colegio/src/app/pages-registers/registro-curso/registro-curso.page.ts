import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {message_curse} from '../../moldeos/message_curse'
import { ModalController, IonInput } from '@ionic/angular';


@Component({
  selector: 'app-registro-curso',
  templateUrl: './registro-curso.page.html',
  styleUrls: ['./registro-curso.page.scss'],
})
export class RegistroCursoPage implements OnInit {
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;
public name:string="";
public uid:string="";
public message_curse:message_curse;
public uid_generate:string="";

public al_nega:string="0";
public al_posi:string="0";
public al_posi1:string="0";
public ci1:string="0";

  constructor(
    private authService:AuthService,
    private route:Router,
    private chatService:ChatService,
    private bd:AngularFirestore,
    private modalCtrl:ModalController,
    

  ) { 
    
  }
  ngOnInit() {

  }
  close(){
    this.modalCtrl.dismiss();
  }
  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus());
  }
  public inputValidator(event: any) {
    this.al_posi="0";
    this.al_posi1="0";
    this.al_nega="0";
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9 ]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
      this.ci1= this.ci1.substr(0,this.ci1.length-1);
      
      // invalid character, prevent input

    }
  }

  registrar()
  {
    this.al_nega="0";
    this.al_posi1="0";
    this.al_posi="0";
    if(this.name!="")
    {
      this.uid_generate= this.bd.createId();
      //alert(this.name)
      
      const mensaje:message_curse={
      id:this.uid_generate,
      name:this.name,
      content: "Bienvenidos",
      type:'Text',
      date:new Date(),
      fecha:new Date().toString(),
      }
      this.authService.buscar_curso_mysql(this.name).then(bus=>{
        //alert(JSON.stringify(bus));
        if(bus==false)
        {
          this.chatService.set_chatrooms_curse(mensaje,this.uid_generate,this.name).then(res=>{
          //console.log(res);
          this.uid=JSON.stringify(res);
          this.authService.register_course_mysql(res,this.name).then(curse=>{
                if(curse!=false)
                {
                  console.log("Curso registrado correctamente");
                  this.route.navigate(['/folder/Cursos']);
                  //this.close();
                  this.al_posi1="1";
                  
                  //this.name="";
                }
            });
          });
        }
        else
        {
          this.al_posi="1";}
      });
      /**/
    }
    else{
      this.al_nega="1";

    }
    

    //this.authService.register_course_mysql(this.name).then(curse=>{

    //});
  }

}
