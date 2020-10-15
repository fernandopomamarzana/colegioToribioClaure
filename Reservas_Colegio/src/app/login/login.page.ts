import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../app/service/auth.service';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { ChatService } from '../service/chat.service';
import { fromRef } from '@angular/fire/firestore/public_api';
//import bcryptjs from 'bcrypt';
//import * as bcryptjs from 'bcrypt';
import * as bcryptjs from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;
  @ViewChild("content") content:any;
  
  chats_room:Array<any>=[];
  aux:Array<any>=[];
  cursos_aux:Array<any>=[];
  cursos:Array<any>=[];
  indicador:any;
  username:any;
  password:any;
  constructor(
    private service:AuthService,
    private chatService:ChatService,
    public router:Router,
    public alertCtrl:AlertController
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.content.scrollToBottom();
    setTimeout(() => this.searchbar.setFocus());

  }
  async nologin() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Usuario incorrecto.',
      message: 'Intente nuevamente.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  login(username,password)
  {
    this.service.login(username,password).then(res=>{
      //window.location.reload() 
      //this.router.navigate(['/folder/Menu']);
    }).catch(err=>alert("Los datos no existen"));
    
  }
  formu(username,password)
    { this.indicador=1;
  
      const myPlaintextPassword = password ;
      
      this.service.read_user_mysql().then(res=>{
        if(res!=false)
        {
          //alert(username + "  "+ password);
          for(let item of res)
          {

            
            if(item.username==username && bcryptjs . compareSync ( myPlaintextPassword , item.password )==true)
            {
              this.indicador=0;
                localStorage.setItem("tokem",item.uid);
                localStorage.setItem("user",item.tipo_usuario);
            /** PARA EL TUTOR*/
                if(item.tipo_usuario=="Tutor")
                {
                  this.service.read_user_mysql().then(users=>{
                    this.chatService.getcharRoots().subscribe(chats=>{
                      this.chats_room=[]
                      this.aux=chats;
                      for(let user of users)
                      {
                        if(item.nombre+" "+item.apellido==user.nombre_completo_tutor)
                        {
                          if(this.cursos_aux.indexOf(user.curso)==-1)
                          { 
                            //console.log("=>>>"+user.curso);
                            for(let chat of chats)
                            {
                                if(chat.name==user.curso)
                                {
                                  //console.log(user.curso);
                                  this.chats_room.push(chat);
                                }
                            }
                            this.cursos_aux.push(user.curso);
                          }
                        }
                      }
                      for(let chat of chats)
                      {
                        if(chat.uid1==item.uid || chat.uid2==item.uid)
                        {
                          this.chats_room.push(chat);
                        }
                      }
                      localStorage.setItem("chat",JSON.stringify(this.chats_room));
                      this.router.navigate(['folder/Menu']);
                      //this.router.navigate(['folder/Menu']);
                      window.location.reload();
                  })


                  });
                }
          /** PARA EL TUTOR*/

                if(item.tipo_usuario=="Estudiante")
                {
                  this.chatService.getcharRoots().subscribe(chats=>{
                    this.chats_room=[]
                    this.aux=chats;
                    for(let chat of this.aux)
                    {
                      if(chat.name==item.curso)
                      {
                        this.chats_room.push(chat);
                      }
                    }
                    localStorage.setItem("chat",JSON.stringify(this.chats_room));
                    this.router.navigate(['folder/Menu']);
                      window.location.reload();
                  });
                }


                if(item.tipo_usuario=="Profesor" || item.tipo_usuario=="Profesora")
                {
                  
                    this.service.read_curse_mysql().then(cursos=>{
                      this.chatService.getcharRoots().subscribe(chats=>{
                        if(cursos!=false)
                        {this.chats_room=[]
                          for(let chat of chats)
                          {
                            for(let curso of cursos)
                            {
                              if(curso.nombre_acesor==item.nombre+' '+item.apellido && curso.name==chat.name)
                              {
                                this.chats_room.push(chat);
                              }
                            }
                            if(chat.uid1==item.uid || chat.uid2==item.uid)
                            {
                              this.chats_room.push(chat);
                            }
                          }
                        }
                        //alert(JSON.stringify(this.chats_room));
                        localStorage.setItem("chat",JSON.stringify(this.chats_room));
                        this.router.navigate(['folder/Menu']);
                      window.location.reload();
                      });
                  });
                }

                //alert(item.tipo_usuario);
                if(item.tipo_usuario=="Director" || item.tipo_usuario=="Directora")
                {
                  this.service.read_curse_mysql().then(curses=>{
                        
                        this.chatService.getcharRoots().subscribe(chats=>{
                          this.chats_room=[]
                          this.aux=chats;
                          if(curses!=false)
                          {
                            for(let chat of this.aux)
                            { 
                              for(let curso of curses)
                              {
                                if(curso.name==chat.name)
                                {
                                  //alert(curso.name)
                                  this.chats_room.push(chat);
                                }
                              }
                              if(chat.uid1==item.uid || chat.uid2==item.uid)
                              {
                                this.chats_room.push(chat);
                              }
                            }

                          }
                          localStorage.setItem("chat",JSON.stringify(this.chats_room));
                          this.router.navigate(['folder/Menu']);
                      window.location.reload();
                        })
                      })
                }
                /**FALTA PARA EL PROFESOR */
                
            }
            
          }
          if(this.indicador==1)
          {
            this.nologin();
          }
        }
      }).catch(err => 
        {this.nologin()}
      );
      

      /*this.datos.push({"Nombre":this.nombre,"Telefono":this.telefono,"Username":this.user,"Password":this.pass,"Cargo":this.cargo});  
      localStorage.setItem("usuario",JSON.stringify(this.datos));
      */
    }

 

}
