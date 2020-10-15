import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//declare let Strophe: any;
import * as Strophe from '../assets/js/strophe/strophe.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AuthService } from './service/auth.service.js';
import {session} from '../app/moldeos/session'
import { ChatService } from './service/chat.service.js';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  public appPages = [{
    title: 'Menu',
    url: '/folder/Menu',
    icon: 'home'
  },
  {
    title: 'Chats',
    url: '/folder/Chats',
    icon: 'chatbubbles'

    //icon: 'paper-plane'
  },
  {
    title: 'Boletín Informativo',
    url: '/folder/Boletín Informativo',
    icon: 'book'

    //icon: 'paper-plane'
  },
  {
    title: 'Boletín Individual',
    url: '/folder/Boletín Individual',
    icon: 'browsers'
  },
  {
    title: 'Cursos',
    url: '/folder/Cursos',
    icon: 'reader'
  },
  {
    title: 'Profesores',
    url: '/folder/Profesores',
    icon: 'people'
  },
  {
    title: 'Reportes',
    url: '/folder/Reportes',
    icon: 'print'
  }
];
public appPages_profesor = [{
  title: 'Menu',
  url: '/folder/Menu',
  icon: 'home'
},
{
  title: 'Chats',
  url: '/folder/Chats',
  icon: 'chatbubbles'

  //icon: 'paper-plane'
},
{
  title: 'Boletín Individual',
  url: '/folder/Boletín Individual',
  icon: 'browsers'
},
{
  title: 'Crear Nuevo Usuario',
  url: '/folder/Crear Nuevo Usuario',
  icon: 'people'
  //person-add
},
{
  title: 'Inscribir Alumno',
  url: '/folder/Inscribir Estudiante',
  icon: 'reader'
},

{
  title: 'Gestión de notas',
  url: '/folder/Gestión de notas',
  icon: 'newspaper'
}
];

public appPages_tutor = [{
  title: 'Menu',
  url: '/folder/Menu',
  icon: 'home'
},
{
  title: 'Chats',
  url: '/folder/Chats',
  icon: 'chatbubbles'

  //icon: 'paper-plane'
},
{
  title: 'Boletín Individual',
  url: '/folder/Boletín Individual',
  icon: 'browsers'
},
{
  title: 'Ver notas',
  url: '/folder/Ver notas',
  icon: 'newspaper'
  //person-add
}
];

public appPages_estudiante = [{
  title: 'Menu',
  url: '/folder/Menu',
  icon: 'home'
},
{
  title: 'Chats',
  url: '/folder/Chats',
  icon: 'chatbubbles'

  //icon: 'paper-plane'
},
{
  title: 'Ver notas',
  url: '/folder/Ver notas estudiante',
  icon: 'newspaper'
  //person-add
}
];
public labels = ['Work', 'Travel', 'Reminders'];

public name:any;
public id:any;
public username:any;
public password:any;
public num_telef:any;
public domicilio:any;
public curso:any;

public apellido:any;
public ci:any;
public cargo:string="";

public selectedIndex = 0;
public state:string="Sin session";

aux_cur:Array<any>=[];
chat_room:Array<any>=[];
aux:Array<any>=[];

aux_local:Array<any>=[];
public chatRooms:any=[];

public notifica_padre:any=[];
public aux_notifica_padre:any=[];

public nombre_completo:any;
clickSub: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    public service:AuthService,
    public loadinCtrl:LoadingController,
    public chatService:ChatService,
    private localNotifocation:LocalNotifications,
    private route:Router,
    private alertController:AlertController
    //private sesion:session,
  ) {
  //this.logout();
    let dat=localStorage.getItem("tokem");
    let us=localStorage.getItem("user");
    if(dat!="" && us!=null)
    {
      //alert(us.tipo_usuario);
      this.cargo=us;
      
      service.buscar_uid_user_mysql(dat).then(user=>{
        
        //alert(user[0].tipo_usuario);
        //this.cargo=item.tipo_usuario;
        this.name=user[0].nombre;
        this.apellido=user[0].apellido;
        this.nombre_completo=this.name+" "+this.apellido;
        this.ci=user[0].ci;

        this.id=user[0].uid;
        this.username=user[0].username;
        this.num_telef=user[0].numero_telefonico;
        this.domicilio=user[0].domicilio;
        this.curso=user[0].curso;
        this.state=user[0].state;
        this.notifi_padre();
        this.notifi();
      });
    }
    else
    {this.cargo=""}
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  unsub(){
    this.clickSub.unsubscribe();
  }
  notifi_padre()
  {
    this.service.getnotifi_firebase().subscribe(notifi=>{
      //this.notifica_padre=notifi;
      this.aux_notifica_padre=[];
      for(let item of notifi)
      {
        //console.log(item.name);
        if(item.id_tutor==this.id)
        {
          this.aux_notifica_padre.push(item);
        }

      }
      this.notifica_padre=this.aux_notifica_padre;
      for(let n of this.notifica_padre)
      {
        if(n.state=="0")
        {
          if (this.platform.is('cordova')) 
          {
            this.clickSub = this.localNotifocation.on('click').subscribe(data => {
              console.log(data);
              this.route.navigate(['folder/Boletín Individual']);
              this.unsub();
            });
            this.localNotifocation.schedule({
    
              id:this.notifica_padre.length+1,
              text: 'Notificación de '+ n.autor,
              sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
              foreground:true,
              icon: 'file://assets/imgs/logo.png',
              vibrate:true,
            });
          }
          else
          {
            alert(n.mesage);
          }
        }
        this.service.update_notifi_tutor_firebase(n.id,n.id_tutor,n.autor,n.curso,n.estudiante,n.name,n.mesage,"1",n.date).then();
          

      }
      //console.log(this.notificaciones);
    });
  }
  notifi()
  { 
    this.service.read_user_mysql().then(users=>{

      this.chatService.getcharRoots().subscribe(chats=>{
        //this.localNotifocation.cancel(1);

        this.chatRooms=chats;
        this.chat_room=[];
        this.aux_local=[];
        
  /**CONVERSACION PARA EL TUTOR */
        if(this.cargo=="Tutor")
        {
          for(let user of users)
          {
            if(this.nombre_completo==user.nombre_completo_tutor)
            {
              if(this.aux_cur.indexOf(user.curso)==-1)
              { 
                //console.log("=>>>"+user.curso);
                for(let chat of this.chatRooms)
                {
                    if(chat.name==user.curso)
                    {
                      //console.log(user.curso);
                      this.chat_room.push(chat);
                    }
                }
                this.aux_cur.push(user.curso);
              }
            }
          }
          for(let chat of this.chatRooms)
          {
            if(chat.uid1==this.id || chat.uid2==this.id)
            {
              this.chat_room.push(chat);
            }
          }

          //////////////////////////////
        // alert(JSON.stringify(this.chat_room));
          /**NOTIFICACION PARA MENSAJES */
          var local=JSON.parse(localStorage.getItem("chat"));
          var ser_res=this.chat_room;
          //alert(local.length+" "+this.chat_room.length);
          /**NOTIFICA PARANUEVO MENSAJE */
          if(local.length==ser_res.length)
          {
            for(let i=0;i<local.length;i++)
            {
              //alert(local[i].messages.length+" "+this.chat_room[i].messages.length);
              //alert(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id + "  "+this.id);
              if(local[i].messages.length<this.chat_room[i].messages.length)
              {
                if(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id != this.id)
                {
                  if (this.platform.is('cordova')) 
                    {
                      this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                        console.log(data);
                        this.route.navigate(['folder/Chats']);
                        this.unsub();
                      });
                      this.localNotifocation.schedule({
              
                        id:this.chat_room[i].messages.length+1,
                        text: 'Tiene un nuevo mensaje: '+ this.chat_room[i].messages[this.chat_room[i].messages.length-1].name+'\n'+this.chat_room[i].messages[this.chat_room[i].messages.length-1].content,
                        sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                        foreground:true,
                        icon: 'file://assets/imgs/logo.png',
                        vibrate:true,
                      });
                    }
                    else
                    {
                    alert("ALERTA: nuevo mensaje: " + this.chat_room[i].messages[this.chat_room[i].messages.length-1].content);
                    }
                  }
                localStorage.removeItem("chat");
                localStorage.setItem("chat",JSON.stringify(this.chat_room));
            
              }
            }
            /**/
          }
          /**ESTE NOTIFICA A NUEVA CONVERSACION */
          if(local.length<ser_res.length)
          {
              for(let item of local)
              {
                this.aux_local.push(item.id);
              }
              for(let i=0;i<ser_res.length;i++)
              {
                //alert(ser_res[i]);
                if(this.aux_local.indexOf(ser_res[i].id)==-1 && ser_res[i].messages[ser_res[i].messages.length-1].id!=this.id)
                {
                  if (this.platform.is('cordova')) 
                  {
                    
                    this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                      console.log(data);
                      this.route.navigate(['folder/Chats']);
                      this.unsub();
                    });
                    this.localNotifocation.schedule({
              
                      id:ser_res.length+1,
                      text: 'Tiene una nueva conversacion: '+ ser_res[i].name1+'\n'+ser_res[i].messages[ser_res[i].messages.length-1].content,
                      sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                      foreground:true,
                      icon: 'file://assets/imgs/logo.png',
                      vibrate:true,
                    });
                  }
                  else
                  {
                      alert("ALERTA: nueva conversación");
                  }  
                }
              localStorage.removeItem("chat");
              localStorage.setItem("chat",JSON.stringify(this.chat_room));
              }
            }
            if(ser_res.length<local.length)
            {
              localStorage.setItem("chat",JSON.stringify(this.chat_room));
            }
        }
  /* Chats PARA EL ESTUDIANTE*/
        if(this.cargo=="Estudiante")
        {
          this.chatService.getcharRoots_name_curso(this.curso).subscribe(chats=>{
            this.aux=chats;
            this.chat_room=[];
            this.aux_local=[];
            for(let chat of this.aux)
            {
              this.chat_room.push(chat);
            }
            var local=JSON.parse(localStorage.getItem("chat"));
                  var ser_res=this.chat_room;
                  //alert(local.length+" "+this.chat_room.length);
                  /**NOTIFICA PARANUEVO MENSAJE */
                  if(local.length==ser_res.length)
                  {
                    for(let i=0;i<local.length;i++)
                    {
                      //alert(local[i].messages.length+" "+this.chat_room[i].messages.length);
                      //alert(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id + "  "+this.id);
                      if(local[i].messages.length<this.chat_room[i].messages.length)
                      {
                        if(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id != this.id)
                        {
                          if (this.platform.is('cordova')) 
                          {
                            this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                              console.log(data);
                              this.route.navigate(['folder/Chats']);
                              this.unsub();
                            });
                            this.localNotifocation.schedule({
              
                              id:this.chat_room[i].messages.length+1,
                              text: 'Tiene un nuevo mensaje: '+ this.chat_room[i].messages[this.chat_room[i].messages.length-1].name,
                              sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                              foreground:true,
                              icon: 'file://assets/imgs/logo.png',
                              vibrate:true,
                            });
                          }
                          else
                          {
                          alert("ALERTA: nuevo mensaje: " + this.chat_room[i].messages[this.chat_room[i].messages.length-1].content);
                          }
                        }
                        localStorage.removeItem("chat");
                        localStorage.setItem("chat",JSON.stringify(this.chat_room));
                    
                      }
                    }
                    /**/
                  }
                  /**ESTE NOTIFICA A NUEVA CONVERSACION */
                  if(local.length<ser_res.length)
                  {
                      for(let item of local)
                      {
                        this.aux_local.push(item.id);
                      }
                      for(let i=0;i<ser_res.length;i++)
                      {
                        //alert(ser_res[i]);
                        if(this.aux_local.indexOf(ser_res[i].id)==-1 && ser_res[i].messages[ser_res[i].messages.length-1].id!=this.id)
                        {
                          if (this.platform.is('cordova')) 
                          {
                            this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                              console.log(data);
                              this.route.navigate(['folder/Chats']);
                              this.unsub();
                            });
                            this.localNotifocation.schedule({
              
                              id:ser_res.length+1,
                              text: 'Tiene una nueva conversacion: '+ ser_res[i].name1,
                              sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                              foreground:true,
                              icon: 'file://assets/imgs/logo.png',
                              vibrate:true,
                            });
                          }
                          else
                          {
                              alert("ALERTA: nueva conversación");
                          } 
                        }
                      localStorage.removeItem("chat");
                      localStorage.setItem("chat",JSON.stringify(this.chat_room));
                      }
                  }
                  if(ser_res.length<local.length)
                  {
                    localStorage.setItem("chat",JSON.stringify(this.chat_room));
                  }
          });
        }
  /** Chats PARA EL PROFESOR*/
        if(this.cargo=="Profesor" || this.cargo=="Profesor")
        {
          this.service.read_curse_mysql().then(curses=>{
            if(curses!=false)
            { 
              for(let curso of curses)
              {
                if(curso.nombre_acesor==this.nombre_completo)
                {
                  for(let chat of this.chatRooms)
                  {
                      if(chat.name==curso.name)
                      {
                        //console.log(user.curso);
                        this.chat_room.push(chat);
                      }
                  }
                }
              }
              var local=JSON.parse(localStorage.getItem("chat"));
              var ser_res=this.chat_room;
              //alert(local.length+" "+this.chat_room.length);
              /**NOTIFICA PARANUEVO MENSAJE */
              if(local.length==ser_res.length)
              {
                for(let i=0;i<local.length;i++)
                {
                  //alert(local[i].messages.length+" "+this.chat_room[i].messages.length);
                  //alert(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id + "  "+this.id);
                  if(local[i].messages.length<this.chat_room[i].messages.length)
                  {
                    if(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id != this.id)
                    {
                      if (this.platform.is('cordova')) 
                      {
                        this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                          console.log(data);
                          this.route.navigate(['folder/Chats']);
                          this.unsub();
                        });
                        this.localNotifocation.schedule({
              
                          id:this.chat_room[i].messages.length+1,
                          text: 'Tiene un nuevo mensaje: '+ this.chat_room[i].messages[this.chat_room[i].messages.length-1].name,
                          sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                          foreground:true,
                          icon: 'file://assets/imgs/logo.png',
                          vibrate:true,
                        });
                      }
                      else
                      {
                      alert("ALERTA: nuevo mensaje: " + this.chat_room[i].messages[this.chat_room[i].messages.length-1].content);
                      }
                    }
                    localStorage.removeItem("chat");
                    localStorage.setItem("chat",JSON.stringify(this.chat_room));
                
                  }
                }
                /**/
              }
              /**ESTE NOTIFICA A NUEVA CONVERSACION */
              if(local.length<ser_res.length)
              {
                for(let item of local)
                {
                  this.aux_local.push(item.id);
                }
                for(let i=0;i<ser_res.length;i++)
                {
                  //alert(ser_res[i]);
                  if(this.aux_local.indexOf(ser_res[i].id)==-1 && ser_res[i].messages[ser_res[i].messages.length-1].id!=this.id)
                  {
                    if (this.platform.is('cordova')) 
                        {
                          this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                            console.log(data);
                            this.route.navigate(['folder/Chats']);
                            this.unsub();
                          });
                          this.localNotifocation.schedule({
            
                            id:ser_res.length+1,
                            text: 'Tiene una nueva conversacion: '+ ser_res[i].name1,
                            sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                            foreground:true,
                            icon: 'file://assets/imgs/logo.png',
                            vibrate:true,
                          });
                        }
                        else
                        {
                            alert("ALERTA: nueva conversación");
                        }  
                  }
                localStorage.removeItem("chat");
                localStorage.setItem("chat",JSON.stringify(this.chat_room));
                }
              }
              if(ser_res.length<local.length)
              {
                localStorage.setItem("chat",JSON.stringify(this.chat_room));
              }


            }


          })
        }
  /**Chats PARA EL DIRECTOR */
        if(this.cargo=="Director" || this.cargo=="Directora")
        {
          //alert(this.id);
              this.chatService.getcharRoots().subscribe(chats1=>{

              
              this.service.read_curse_mysql().then(curses=>{
                this.chat_room=[];
                this.aux_local=[];
                  
                for(let chat of chats1)
                {
                  if(curses!=false)
                  {
                    for(let curso of curses)
                    {
                      
                      if(curso.name==chat.name)
                      {
                        this.chat_room.push(chat);
                      }
                    }
                  }
                  if(chat.uid1==this.id || chat.uid2==this.id)
                  {
                    this.chat_room.push(chat);
                  }
                }
                  /**NOTIFICACION PARA MENSAJES */
                  var local=JSON.parse(localStorage.getItem("chat"));
                  var ser_res=this.chat_room;
                  //alert(local.length+" "+this.chat_room.length);
                  /**NOTIFICA PARANUEVO MENSAJE */
                  if(local.length==ser_res.length)
                  {
                    for(let i=0;i<local.length;i++)
                    {
                      //alert(local[i].messages.length+" "+this.chat_room[i].messages.length);
                      //alert(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id + "  "+this.id);
                      if(local[i].messages.length<this.chat_room[i].messages.length)
                      {
                        if(this.chat_room[i].messages[this.chat_room[i].messages.length-1].id != this.id)
                        {
                          if (this.platform.is('cordova')) 
                          {
                            this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                              console.log(data);
                              this.route.navigate(['folder/Chats']);
                              this.unsub();
                            });
                            this.localNotifocation.schedule({
              
                              id:this.chat_room[i].messages.length+1,
                              text: 'Tiene un nuevo mensaje: '+ this.chat_room[i].messages[this.chat_room[i].messages.length-1].name,
                              sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                              foreground:true,
                              icon: 'file://assets/imgs/logo.png',
                              vibrate:true,
                            });
                          }
                          else
                          {
                          alert("ALERTA: nuevo mensaje: " + this.chat_room[i].messages[this.chat_room[i].messages.length-1].content);
                          }
                        }
                        localStorage.removeItem("chat");
                        localStorage.setItem("chat",JSON.stringify(this.chat_room));
                    
                      }
                    }
                    /**/
                  }
                  /**ESTE NOTIFICA A NUEVA CONVERSACION */
                  if(local.length<ser_res.length)
                  {
                      for(let item of local)
                      {
                        this.aux_local.push(item.id);
                      }
                      for(let i=0;i<ser_res.length;i++)
                      {
                        //alert(ser_res[i]);
                        if(this.aux_local.indexOf(ser_res[i].id)==-1 && ser_res[i].messages[ser_res[i].messages.length-1].id!=this.id)
                        {
                          if (this.platform.is('cordova')) 
                          {
                            this.clickSub = this.localNotifocation.on('click').subscribe(data => {
                              console.log(data);
                              this.route.navigate(['folder/Chats']);
                              this.unsub();
                            });
                            this.localNotifocation.schedule({
              
                              id:ser_res.length+1,
                              text: 'Tiene una nueva conversacion: '+ ser_res[i].name1,
                              sound: this.platform.is('android') ? 'file://assets/sound/notifi1.mp3': 'file://assets/sound/notifi1.mp3',
                              foreground:true,
                              icon: 'file://assets/imgs/logo.png',
                              vibrate:true,
                            });
                          }
                          else
                          {
                              alert("ALERTA: nueva conversación");
                          }
                        }
                      localStorage.removeItem("chat");
                      localStorage.setItem("chat",JSON.stringify(this.chat_room));
                      }
                  }
                  if(ser_res.length<local.length)
                  {
                    localStorage.setItem("chat",JSON.stringify(this.chat_room));
                  }
                
              })
            });
        }
      })
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    //alert(path)
    if (path !== undefined) {
      //this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    
    }
    /** PARA PROFESOR */
    if (path == "Bolet%C3%ADn%20Individual" && (this.cargo=="Director" || this.cargo=="Directora" )) {
       this.selectedIndex = 3
    }
    if(path == "Bolet%C3%ADn%20Individual" && this.cargo=="Tutor")
    {
      this.selectedIndex = 2
    }
    if (path == "Bolet%C3%ADn%20Individual" && this.cargo=="Profesor" || this.cargo=="Profesora" ) {
      this.selectedIndex = 2
    }
    if (path == "Bolet%C3%ADn%20Informativo") {
      this.selectedIndex = 2
   }
    if (path == "Crear%20Nuevo%20Usuario") {
      this.selectedIndex = 3
    }
    if (path == "Inscribir%20Estudiante") {
      this.selectedIndex = 4
    }
    if (path == "Gesti%C3%B3n%20de%20notas") {
      this.selectedIndex = 5
    }
    if (path == "Ver%20notas") {
      this.selectedIndex = 3
    }if (path == "Bolet%C3%ADnes") {
      this.selectedIndex = 2
    }if (path == "Ver%20notas%20estudiante") {
      this.selectedIndex = 2
    }

    
   /** */
    
  }
  async loadsignOut()
    {
      const loading = await this.loadinCtrl.create({
        message:'Cerrando...',
      });
      await loading.present();
    }
  async logout()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Salir',
      message: 'Desea salir del sistema?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            
            this.afAuth.signOut().then(()=>{
              localStorage.removeItem("tokem");
              localStorage.removeItem("user");
              localStorage.removeItem("chat");

              location.reload();
            });
          }
        }
      ]
    });

    await alert.present();

    
  }
}
