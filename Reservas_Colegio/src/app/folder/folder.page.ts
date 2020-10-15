import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XmppServiceService } from '../service/xmpp-service.service';
import { AuthService } from '../service/auth.service';
import { ChatService } from '../service/chat.service';
import { ModalController, PopoverController, AlertController, LoadingController, IonInput, Platform } from '@ionic/angular';
import { ChatComponent } from '../componentes/chat/chat.component';
//import * as CryptoJS from 'crypto-js';
import * as bcryptjs from 'bcryptjs';

import { session } from 'src/app/moldeos/session';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';
import { ChatCursoComponent } from '../componentes/chat-curso/chat-curso.component';
import { IfStmt, ThrowStmt } from '@angular/compiler';
import { RegistroCursoPage } from '../pages-registers/registro-curso/registro-curso.page';
import { MateriascursoPage } from '../pages-reads/materiascurso/materiascurso.page';
import { RegistroProfesorPage } from '../pages-registers/registro-profesor/registro-profesor.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReadEstuPage } from '../pages-reads/read-estu/read-estu.page';
import { ReadNotaStudentPage } from '../pages-reads/read-nota-student/read-nota-student.page';
import { RegistroInasistenciaPage } from '../pages-registers/registro-inasistencia/registro-inasistencia.page';
import { RegisterNotifiPage } from '../pages-registers/register-notifi/register-notifi.page';
import { RegistroPage } from '../pages-registers/registro/registro.page';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { RegistroBolInfoPage } from '../pages-registers/registro-bol-info/registro-bol-info.page';
import { PreviewImagePage } from '../pages-reads/preview-image/preview-image.page';
import { PreviewNotifiPage } from '../pages-reads/preview-notifi/preview-notifi.page';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import { firestore } from 'firebase';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  /**SLIDE FORMATO CUBE */
  slideOpts = {
    grabCursor: true,
    autoplay:true,
    initialSlide: 0,
    slidesPerView: 1,
    speed: 500,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
  
        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate: function() {
        const swiper = this;
        const {
          $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }
  
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }
  
           if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }
  
           const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });
  
         if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            const multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }
  
        const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
      },
      setTransition: function(duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    }
  }
  /**  */
  imagen:String='data:image/png;base64,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';
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;
  @ViewChild('img') inputImage: ElementRef;
  public teto:string="";
  public state:any;

  currentPopover : any;
  loadin : any;
  public cont=0;
  public spa=0;
  public aler=0;
  public aler_loadin=0;

  public folder: string;
  public chatRooms:any=[];
  public cursos:any=[];
  public chats:Array<any>=[];
  public chats_curso:Array<any>=[];
  public usuarios:any=[];
  public mensajes:Array<any>=[];
  public user:Array<any>=[];
  public studentorfather:Array<any>=["Tutor","Estudiante"];

  materias1:Array<any>=[];
  prom_anual:any;

  
  public id:any;
  public ci:any;
  public nombre_completo:any;

  public nombre:any;
  public apellido:any;
  public username:any;
  public password:any;
  public num_telef:any;
  public cargo:any;
  public domicilio:any;
  public curso:any;

  public ci_user:string="";
  public nombre_user:string="";
  public apellido_user:string="";
  public edad:string="";
  public numero_telefonico_user:string="";
  public domicilio_user:string="";
  public tipo_user:string="";
  public tutor_user:string="";

  public user_student:string="";
  public curso_user:string="";

  private nombre_chat: string = "";
  private uid: string = "";
  public indicador: string = "0";
  public event={
  usuario:'',
  curso:'',
  }
  /**para notas */
  trimestre1:Array<any>=[];
  trimestre2:Array<any>=[];
  materias_sin_notas:Array<any>=[];
  trimestre3:Array<any>=[];
  promedio:Array<any>=[];
  
  materias:Array<any>=[];
  cursos_hijo:Array<any>=[];
  aux:Array<any>=[];
  profesores:Array<any>=[];
  
  aux_cur:Array<any>=[];
  chat_room:Array<any>=[];

  aux_local:Array<any>=[];

  aux_padres:Array<any>=[];
  padres:Array<any>=[];
  notifica:Array<any>=[];
  notifica_padre:Array<any>=[];
  aux_notifica_padre:Array<any>=[];

  boletin_info:Array<any>=[];
  boletin_info_desli:Array<any>=[];
  boletin_info_aux:Array<any>=[];


  public usua:any;
  public gesti:any;
  public years:Array<any>=["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"];
  pdfObject:any;
  pdfObject1:any;
  cur:any;
  acum:any;
  cont1:any;
  ind:any;

  public estudiantes_notas_aprobados:any=[];
  public estudiantes_notas_reprobados:any=[];
  public estudiantes_curso:any=[];
  public mate_curso:any=[];

  
  public uploadPercent:Observable<number>;
  public urlImage:Observable<string>;


  constructor(
    private activatedRoute: ActivatedRoute,
    public xmppService: XmppServiceService,
    public service:AuthService,
    public chatService:ChatService,
    private modal: ModalController,
    private modalctrl: ModalController,
    private router:Router,
    private afAuth:AngularFireAuth,
    public popoverController: PopoverController,
    public alertController:AlertController,
    private bd:AngularFirestore,
    private loadingCtrl:LoadingController,
    public platform: Platform,
    private localNotifocation:LocalNotifications,
    private fileOpener: FileOpener,
    private file:File,
    private storage:AngularFireStorage,

    ) { 
      let dat=localStorage.getItem("tokem");
        
        if(dat!="" && this.folder!="Menu")
        {
          this.usuarios=[];
          this.service.buscar_uid_user_mysql(dat).then(busqueda=>{
             //alert(JSON.stringify(busqueda));
            if(busqueda!=false)
            { 
              this.usua=busqueda;
              //alert(JSON.stringify(this.usua));
              for(let item of busqueda)
              {
                this.id=item.uid;
                this.ci=item.ci;
                this.nombre=item.nombre;
                this.apellido=item.apellido;
                this.nombre_completo=this.nombre+" "+this.apellido;
                this.username=item.username;
                this.password=item.password;
                this.num_telef=item.numero_telefonico;
                this.cargo=item.tipo_usuario;
                this.domicilio=item.domicilio;
                this.curso=item.curso;
                this.state=item.state;


                session.uid=this.id;
                session.ci=this.ci;
                session.nombre=this.nombre;
                session.apellido=this.apellido;
                session.username=this.username;
                session.password=this.password;
                session.num_telef=this.num_telef;
                session.cargo=this.cargo;
                session.domicilio=this.domicilio;

                //alert("APP.COMPONENTS SESSION: "+ this.nombre_compelto)
                this.folder = this.activatedRoute.snapshot.paramMap.get('id');
                
                /**PARTE DEL CHATTTT */
                

                /*if(this.folder=="Conversaciones")
                {
                  alert(this.folder);
                }*/
                this.read_curses();
                
                this.read_users();

                if(this.folder=="Boletín Individual")
                {
                  //this.notificaciones.push();
                  //alert("notificaciones")
                  this.service.getnotifi_firebase().subscribe(notifi=>{
                    //this.notifica=notifi;
                    this.notifica=[];
                    this.notifica_padre=[];
                    if(this.cargo=="Director" || this.cargo=="Directora")
                      {
                        this.notifica=notifi;
                      }
                    for(let item of notifi){
                      //console.log(item.name);
                      if(item.autor=="Profe. "+this.nombre_completo)
                      {
                        this.notifica.push(item);
                      }
                      if(item.id_tutor==this.id)
                      {
                        this.notifica_padre.push(item);
                      }
                      
                    }
                    //console.log(this.notificaciones);
                  });
                }
                if(this.folder=="Boletín Informativo" || this.folder=="Menu")
                {
                  this.read_boletin_informativo();
                }

                 
                  
                /**FIN PARTE CHAT */

                var date =new Date();
                this.gesti=date.getFullYear().toString();
                if(this.cargo=="Estudiante" && this.folder=="Ver notas estudiante")
                {
                  this.read_notes1(this.gesti);
                }
              }
            }
          });
        }
    }
    
    ngOnInit() {

    }
    async cambiar_pass() 
    {
      //console.log(chat);
      const modal = await this.modal.create({
        component: RegistroPage,
        cssClass:'modal-actu-pass modal',
        componentProps:{
          id:this.id,
          ci:this.ci,
          password:this.password,

        }
      });
  
      modal.onDidDismiss()
        .then((data) => {
          
         });
  
      return await modal.present();
    }
    
    ionViewWillEnter() {
      if(this.folder=="Crear Nuevo Usuario")
      {
        setTimeout(() => this.searchbar.setFocus());
      }
      
    }
    public inputVa(event: any) {
      this.spa=0;
      this.aler=0;
      const pattern = /^[a-zA-Z0-9-]*$/; 
      //let inputChar = String.fromCharCode(event.charCode)
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9-]+/g, "");
        // invalid character, prevent input
        this.teto= this.teto.substr(0,this.teto.length-1);
        
      }
    }
    public inputVa_letras(event: any) {
      this.aler=0;
      this.spa=0;
      const pattern = /^[a-zA-Z ]*$/; 
      //let inputChar = String.fromCharCode(event.charCode)
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^a-zA-Z ]+/g, "");
        // invalid character, prevent input
        this.teto= this.teto.substr(0,this.teto.length-1);
        
      }
    }
    public inputVa_numeros(event: any) {
      this.spa=0;
      this.aler=0;
      const pattern = /^[0-9]*$/; 
      //let inputChar = String.fromCharCode(event.charCode)
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, "");
        // invalid character, prevent input
        this.teto= this.teto.substr(0,this.teto.length-1);
        
      }
    }
    read_curses()
    { 
      this.service.read_curse_mysql().then(curses=>{
        this.service.read_user_mysql().then(users=>{
          this.usuarios=users;
        if(curses!=false)
        { this.cursos=curses;
          for(let curso of this.cursos)
          {
            if(curso.nombre_acesor==this.nombre_completo)
            { //alert(curso.name); 
              //alert(this.usuarios);
              for(let user of this.usuarios)
              {
                if(user.curso==curso.name)
                {
                  for(let use of this.usuarios)
                  {
                    
                    if(user.nombre_completo_tutor==use.nombre+" "+use.apellido)
                    {
                     
                      if(this.aux_padres.indexOf(user.nombre_completo_tutor)==-1)
                      {
                        this.aux_padres.push(user.nombre_completo_tutor);
                        
                        this.padres.push(use);
                      }
                    }
                  }
                }
              }
            }
          }
        }

      });
          /*if(this.folder=="Conversaciones")
          {*/
              this.chatService.getcharRoots().subscribe(chats=>{
                //this.localNotifocation.cancel(1);

                this.chatRooms=chats;
                });
            
          //}
        
      });
    }
  read_users()
    {
      this.service.read_user_mysql().then(res=>{
        this.service.read_curse_mysql().then(cursos=>{
          this.service.read_materias_mysql().then(materias=>{
            this.usuarios=[];
            if(res!=false && cursos!=false)
            {
              for(let user of res)
              {
                if(this.id!=user.uid)
                {
                  this.usuarios.push(user);
                }
              }
              //alert(JSON.stringify(cursos));
              for(let user of res)
              {
                for(let curso of cursos)
                {
                  if(curso.name==user.curso)
                  {
                    if(user.nombre_completo_tutor==this.nombre_completo)
                    {
                      //alert(user.curso);
                  
                      if(this.aux.indexOf(user.curso)==-1)
                      {
                        this.aux.push(user.curso);
                        //alert(user.curso);
                        this.cursos_hijo.push(curso);
                      }
                    }
                  }
                }
              }


              for(let curso of this.cursos_hijo)
              {
                
                for(let user of this.usuarios)
                {
                  /*if(curso.nombre_acesor==user.nombre+" "+user.apellido)
                  {
                    //alert(mate.nombre_profesor);
                    this.profesores.push(user);
                  }*/
                  for(let materia of materias)
                  {
                    if(materia.id_curso==curso.id && materia.nombre_profesor==user.nombre+" "+user.apellido)
                    {
                      this.profesores.push(user);
                    }
                  }
                }
                
              }
            }
          })
        });
        
      });
    }

    OpenChat(chat)
    {
      //console.log(chat);
      this.service.buscar_uid_user_mysql(chat).then(user=>{
            
            if(user!=false)
            {
                for(let item of user)
                {
                  //console.log(user)
                  this.modal.create({
                    cssClass:'modal-chat user ',
                    component: ChatComponent,
                    
                    componentProps:{
                      chat:item,
            
                    }
                  }).then((modal)=> modal.present());
                }
            }
      });
    }
    
     
    async OpenChat_curso(chat,e:any) 
    {
      //console.log(chat);
      const modal = await this.modal.create({
        component: ChatCursoComponent,
        cssClass:'modal-chat curse',
        componentProps:{
          chat:chat,

        }
      });
  
      modal.onDidDismiss()
        .then((data) => {
          
         });
  
      return await modal.present();
    }

    registrar()
    {
      this.router.navigate(['/registro']);
    }
    registrar_curso()
    {
      this.router.navigate(['/registro-curso']);
    }
    
    
    async onChange(ev:any) {
      
      const modal = await this.modal.create({
      component: ChatComponent,
      //event:ev
      cssClass:'modal-chat user',
      //translucent: true,
      componentProps:{
        chat:this.event.usuario,
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        
       });

    return await modal.present();

  }
  async chat_dire(user) {
        
      const modal = await this.modal.create({
      component: ChatComponent,
      //event:ev
      cssClass:'modal-chat user',
      //translucent: true,
      componentProps:{
        chat:user,
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        
      });

    return await modal.present();

  }
  
  async onChange_curso(ev:any) {
     
      console.log(this.event.curso);
      const modal = await this.modal.create({
        component: ChatCursoComponent,
        cssClass:'modal-chat curse',
        componentProps:{
          chat:this.event.curso,

        }
      });
  
      modal.onDidDismiss()
        .then((data) => {
          
         });
  
      return await modal.present();
}
     
    option(user)
    {
      console.log(user);
    }

    

    /**FUNCIONES PARA ADMINISTRAR DE CURSOS */
    async add_curso()
    {
      
      const modal = await this.modal.create({
        component: RegistroCursoPage,
        cssClass:'modal-register modal',
        componentProps:{
          

        }
      });
  
      modal.onDidDismiss()
        .then((data) => {
          this.cursos=[];
          this.read_curses();
         });
  
      return await modal.present();

    }

    async curse(curse)
    {
      //this.router.navigate(['/materiascurso']);
      const modal = await this.modal.create({
        component: MateriascursoPage,
        cssClass:'modal-read modal',
        componentProps:{
          curse:curse

        }
      });
  
      modal.onDidDismiss()
        .then((data) => {
          this.cursos=[];
          this.read_curses();
         });
  
      return await modal.present();

    }
    
    async delete_curso(id)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Eliminar',
        message: 'Desea eliminar el Curso?',
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
              
              //console.log('Confirm Okay');
              this.service.delete_curso_mysql(id).then(res=>{
                this.chatService.delete_chatrooms_curse(id).then(del=>{
                  if(res!=false && del!=false)
                  {
                    this.service.delete_materia_curso_mysql(id).then(res1=>{
                      if(res1!=false)
                      {
                        this.cursos=[];
                        this.read_curses();
                      }
                    })
                    
                  }
                });
                
              });
            }
          }
        ]
      });
  
      await alert.present();

    }
    /******DUNCIONES PARA BOLETIN INFORMATIVO */
    read_boletin_informativo()
    {
      this.ind="0";
      this.service.get_boletin_informativo_firebase().subscribe(boletines=>{
        this.boletin_info=[];
        this.boletin_info_desli=[];
        this.boletin_info_aux=boletines;

        for(let boletin of this.boletin_info_aux)
        {
          this.ind="1";
          if(boletin.state=="0")
          {

            this.boletin_info.push(boletin);
          }
          else
          {
            this.boletin_info_desli.push(boletin);
          }
        }
      });
    }
    
    seleccionar(boletin,state)
    {
      this.service.register_firebase_informativo(boletin.id,boletin.name,boletin.urlImage,boletin.content,state,boletin.date)
      {
        this.read_boletin_informativo();
      }
    }
    
    delete_info(boletin)
    {
      const filePath='uploads/'+boletin.name;
      var sto=this.storage.ref(filePath);
      //alert(sto);
      sto.delete().subscribe(del=>{
        this.service.delete_bol_infor(boletin.id).then(de=>{
          if(de!=false)
          {
            this.read_boletin_informativo();            
          }
        });;
        
      });
    }


    async add_boletin_informativo()
    {
      let modal = await this.modal.create(
        {component:RegistroBolInfoPage,
          cssClass:'modal',
          componentProps:{
            type:"create"
          }
        });
        modal.onDidDismiss()
        .then((data) => {
          //this.loading();
          //alert(data.data)
          
          /*const filePath=session.image.toString();
          var sto=this.storage.ref(filePath);
          //alert(sto);
          sto.delete().subscribe(del=>{
            
          });*/
            this.usuarios=[];
            this.read_users();

          });
    
      return await modal.present();

    }
    async preview_image(i,cont)
    {
      //asdf
      let modal = await this.modal.create(
        {component: ViewerModalComponent,
          componentProps: {
            src: i,
            title:"Img: Toribio Claure" ,
            text:cont, 
            scheme:"light",
          },
          cssClass: 'ion-img-viewer',
          
          keyboardClose: true,
          showBackdrop: true,
        });
        modal.onDidDismiss()
        .then((data) => {
          });
    
      return await modal.present();

    }
    async preview_boletin(noti)
    {
      //asdf
      let modal = await this.modal.create(
        {component:PreviewNotifiPage,
          cssClass:'modal',
          componentProps:{
            notificacion:noti,
          }
        });
        modal.onDidDismiss()
        .then((data) => {
          });
    
      return await modal.present();

    }
    /**    PREVIEW BOLETIN INDIVIDUAL */


    /*FUNCIONES PARA ADMINSITRAR DE PROFESORES */
    async add_profesores()
    {
      let modal = await this.modal.create(
        {component:RegistroProfesorPage,
          cssClass:'modal',
          componentProps:{
            type:"create"
          }
        });
        modal.onDidDismiss()
        .then((data) => {
          //this.loading();
          this.usuarios=[];
          this.read_users();
          });
    
      return await modal.present();

    }
    async update_profesor(profe)
    {
      let modal = await this.modal.create(
        {component:RegistroProfesorPage,
          cssClass:'modal',
          componentProps:{
            type:"update",
            profesor:profe,
          }
        });
        modal.onDidDismiss()
        .then((data) => {
          //this.loading();
          this.usuarios=[];
          this.read_users();
          });
    
      return await modal.present();
  
    }
    async delete_profe(id)
    {
      //alert(id);
      const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Eliminar',
      message: 'Desea eliminar el Usuario ?',
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
            //console.log('Confirm Okay');
            this.service.delete_user_mysql(id).then(res=>{
              if(res!=false)
              {
                this.usuarios=[];
                this.read_users();
              }
            });
          }
        }
      ]
    });
    await alert.present();
    }

    /*FUNCIONES PARA ADMINISTRAR ESTUDIANTES O PADRES */

    async loading() {
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Procesando...',
        duration: 1000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      if(this.aler_loadin==1)
      {
        this.aler=1;
      }
      else
      {
        this.aler_loadin=0;
        this.limpiar_datos();
        this.usuarios=[];
        this.read_users();
        this.spa=1;
        
      }
      
    }

    add_student()
    { this.aler=0;
      this.aler_loadin=0;
      this.spa=0;
     
      const saltRounds = 10 ;  
      
      if(this.cont==1)
      { 
        if( this.ci_user!="" && this.nombre_user!="" && this.apellido_user!="" && this.edad!="" && this.numero_telefonico_user!="" && this.domicilio_user!="" && this.tipo_user!="" && this.tutor_user!="")
        {
          var  conversionEncryptOutput  = bcryptjs . hashSync ( this.ci_user ,  saltRounds ) ; 
    
          var id= this.bd.createId();
          this.aler=0;
          this.aler_loadin=0;
          console.log(id,this.ci_user,this.nombre_user,this.apellido_user,this.edad,this.ci_user,conversionEncryptOutput,this.numero_telefonico_user,this.tipo_user,this.tutor_user,this.domicilio_user);

          this.service.register_user_student_mysql(id,this.ci_user,this.nombre_user,this.apellido_user,this.edad,this.ci_user,conversionEncryptOutput,this.numero_telefonico_user,this.tipo_user,this.tutor_user,this.domicilio_user).then(user=>{
            if(user!=false)
            {
              //alert(user);}
              this.loading();
            }
          });
        }
        else
        {
          this.aler_loadin=1;
          this.loading();
        }
      }
      else
      {
        if(this.cont==0 && this.ci_user!="" && this.nombre_user!="" && this.apellido_user!="" && this.edad!="" && this.numero_telefonico_user!="" && this.domicilio_user!="" && this.tipo_user!="" )
        {
          var  conversionEncryptOutput  = bcryptjs . hashSync ( this.ci_user ,  saltRounds ) ;
          var id= this.bd.createId();
          this.aler=0;
          this.aler_loadin=0;

          this.service.register_user_mysql(id,this.ci_user,this.nombre_user,this.apellido_user,this.edad,this.ci_user,conversionEncryptOutput,this.numero_telefonico_user,this.tipo_user,this.domicilio_user).then(user=>{
            if(user!=false)
            {
              //alert(user);}
              this.loading();
            }
          });
        }
        else{
          this.aler_loadin=1;
          this.loading();
        }
      } 
    }
    limpiar_datos()
    {
      this.spa=0;
      this.ci_user="";
      this.edad="";
      this.nombre_user="";
      this.apellido_user="";
      this.numero_telefonico_user="";
      this.domicilio_user="";
      this.tipo_user="";
      this.tutor_user="";
      this.user_student="";
      this.curso_user="";
    }
    desaparecer()
    {
      this.aler=0;
    }

    onChange_estu(tipo_user)
    {
      if(tipo_user=="Estudiante")
      {
        this.cont=1;
      }
      else
      {
        this.cont=0;
      }
      //alert(tipo_user);
    }
    /**AGREGAR CURSO A ESTUDIANTE */
    add_curse_student()
    {this.aler=0;
      this.aler_loadin=0;
      this.spa=0;
      //alert(this.user_student+" "+this.curso_user+" "+this.aler);
      if(this.user_student=="" || this.curso_user=="")
      {
        //this.aler=1;
        this.aler_loadin=1;
        this.spa=0;
        this.loading();
      }
      else
      {
        //this.aler=0;
        this.aler_loadin=0;
        this.service.update_user_curso_mysql(this.user_student,this.curso_user).then(update=>{
            if(update!=false)
            {
              //this.spa=1;
              this.loading();
            }
        });
      }
    }
    /**GESTION DE NOTAS ESTUDIANTE */
    async estudiantes(curso)
    {
      let modal = await this.modal.create(
        {component:ReadEstuPage,
          cssClass:'modal',
          componentProps:{
            curso:curso,
          }
        });
        modal.onDidDismiss()
        .then((data) => {
          //this.loading();
          this.cursos=[];
          this.read_curses();
          });
    
      return await modal.present();
  
    }

    /**funciones para el padre ver notas */
    
    async ver_notas(user)
    {
      var modal=await this.modalctrl.create({
        component:ReadNotaStudentPage,
        cssClass:'read-notes',
        componentProps:{
          type:"boton",
          //trimestre:this.trimestre_nota,
          estudiante:user,

        }
      });
      modal.onDidDismiss().then(data=>{

      });
      return await modal.present();
      //alert(this.trimestre_nota);
    }

    /**read notas para estudiante */

    async loading1() {
      this.loadin = await this.loadingCtrl.create({
        message: 'Espere. . .',
        //duration: 5000
      });
      await this.loadin.present();
      //const { role, data } = await loading.onDidDismiss();
      
      
    }
    read_notes1(gesti)
    {
      this.service.buscar_notas_gestion_student_mysql(gesti,this.id).then(bus=>{
        if(bus!=false)
        {
          for(let cur of bus)
          {
            if(this.aux_cur.indexOf(cur.nombre_curso)==-1)
            {
              this.aux_cur.push(cur.nombre_curso);
            }
          }
          this.read_notes(this.aux_cur[0],this.gesti);
        }
        
      });
      
    }
    read_notes(curso,g)
    {
      /*this.loading1();
      this.loadingCtrl.dismiss();*/
      //alert(this.usua[0])
      this.prom_anual=0;
      this.service.buscar_notas_curso(curso).then(materias=>{
        if(materias!=false)
        {
          for(let mate of materias)
          {
            if(this.materias1.indexOf(mate.nombre_materia)==-1)
            {
              this.materias1.push(mate.nombre_materia);
            
              //alert(mate.nombre_materia);
              this.materias.push(mate.nombre_materia);
              var t1="1er Trimestre";
              var date=new Date();
              var gestion=g;
              //alert(mate.id+" "+t1);
              this.service.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,t1,this.usua[0].uid,gestion).then(notas1=>{
                this.service.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,"2do Trimestre",this.usua[0].uid,gestion).then(notas2=>{
                  this.service.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,"3er Trimestre",this.usua[0].uid,gestion).then(notas3=>{
                    var acum=0;
                    if(notas1!=false)
                    {
                      for(let nota of notas1){
                        acum=acum+parseFloat(nota.nota);
                        this.trimestre1.push({"materia":mate.nombre_materia,"nota":nota.nota});
                      }
                    }
                    else
                    {
                      this.trimestre1.push({"materia":mate.nombre_materia,"nota":'-'});
                    }
                    if(notas2!=false)
                    {
                      for(let nota of notas2){
                        acum=acum+parseFloat(nota.nota);
                        //alert(mate.nombre_materia);
                        this.trimestre2.push({"materia":mate.nombre_materia,"nota":nota.nota});
                      } 
                    }
                    else
                    {
                      this.trimestre2.push({"materia":mate.nombre_materia,"nota":'-'});
                    }
                    if(notas3!=false)
                    {
                      for(let nota of notas3){
                        acum=acum+parseFloat(nota.nota);
                        this.trimestre3.push({"materia":mate.nombre_materia,"nota":nota.nota});
                      }
                    }
                    else
                    {
                      this.trimestre3.push({"materia":mate.nombre_materia,"nota":'-'});
                    }

                    var p=Number((acum/3).toFixed(1));
                   var p_anual=Number((p/this.materias1.length).toFixed(1));
                    this.promedio.push({"materia":mate.nombre_materia,"promedio":p});
                    this.prom_anual=this.prom_anual+p_anual;
                    
                  });
                });
              });
            } 
          }
          
        }

      });
    }
    
    
    async faltas()
    {
      var modal=await this.modalctrl.create({
        component:RegistroInasistenciaPage,
        cssClass:'register-inasistencia',
        componentProps:{
          type:"read",
          estudiante:this.usua[0],
          gestion:this.gesti,
        }
      });
      modal.onDidDismiss().then(res=>{

      })
      return await modal.present();
    }

    select(gesti)
    {
      this.trimestre1=[];
      this.trimestre2=[];
      this.materias_sin_notas=[];
      this.trimestre3=[];
      this.promedio=[];
      this.aux_cur=[];
      this.materias=[];
      this.materias1=[];
      //alert(gesti);

      this.read_notes1(gesti);
    }

    async add_notificacion()
    {
      var modal=await this.modalctrl.create({
        component:RegisterNotifiPage,
        cssClass:'register-notificacion',
        componentProps:{
          cargo:this.cargo,
          nombre:this.nombre_completo,
          //estudiante:this.usua[0],
        }
      });
      modal.onDidDismiss().then(res=>{

      })
      return await modal.present();
    }
    delete_notifi(id)
    {
      //alert(id);
      this.service.delete_notificacion(id).then(del=>{
        if(del!=false)
        {

        }
      });

    }







    /**     *************************  REPORTES *****************************/
    

    cursos_reporte()
    {
      
      //alert(this.cur);
      this.indicador="1";
      this.estudiantes_curso=[];
      this.estudiantes_notas_aprobados=[];
      this.estudiantes_notas_reprobados=[];
      this.mate_curso=[];
      this.service.read_user_mysql().then(users=>{
        this.service.buscar_notas_curso(this.cur.name).then(notas=>{
          this.service.buscar_materias_idcurso_mysql(this.cur.id).then(mat=>{

            if(users!=false || notas!=false || mat!=false)
            {
              for(let materia of mat)
              {
                if(materia.id_curso==this.cur.id)
                {
                  this.mate_curso.push(materia);
                }
              }
              for(let user of users)
              { 
                if(user.tipo_usuario=='Estudiante' && user.curso==this.cur.name)
                {
                  this.estudiantes_curso.push(user);
                  this.acum=0;
                  this.cont1=0;
                  for(let nota of notas)
                  {
                    if(this.materias.indexOf(nota.nombre_materia)==-1)
                    {
                      this.materias.push(nota.nombre_materia);
                    }
                    if(nota.id_estudiante==user.uid)
                    {
    
                      if(nota.trimestre=="1er Trimestre" || nota.trimestre=="2do Trimestre" ||nota.trimestre=="3er Trimestre")
                      {
                        this.acum=this.acum+parseFloat(nota.nota);
                      } 
    
                    }
                  }
                  this.acum=this.acum/3;
                  this.cont1=Number((this.acum/this.materias.length).toFixed(1));
                  //alert(this.cont1);
                  if(this.cont1>51 && this.cont1>5.1)
                  {
                    this.estudiantes_notas_aprobados.push({"id":user.uid,"nombre":user.nombre+" "+user.apellido,"ci":user.ci,"numero_telefonico":user.numero_telefonico,"promedio":this.cont1});
                  }
                  else
                  {
                    this.estudiantes_notas_reprobados.push({"id":user.uid,"nombre":user.nombre+" "+user.apellido,"ci":user.ci,"numero_telefonico":user.numero_telefonico,"promedio":this.cont1});
                  }
                  
                }
              }
            }
          });
        })
      });
    }
    estu_aprobados(curso)
    {
    
      var hoy = new Date();
      var dd = hoy.getDate();
      var mm = hoy.getMonth()+1;
      var yyyy = hoy.getFullYear();
      
  
      var hora=hoy.getHours(); 
      var minutes=hoy.getMinutes();
      var seconds=hoy.getSeconds();     
  
      var espacio=" ";
      var titulo = [
        { text: 'N°', 
          fontSize: 10,
          style: 'tableHeader',
          alignment: 'center',
          fillColor: '#90EE90',
          color:'#233b23',
        },
        { text: 'NOMBRE',
          fontSize: 10, 
          style: 'tableHeader',
          alignment: 'center',
          fillColor: '#90EE90',
          color:'#233b23',
        },
        { text: 'NOTA ANUAL', 
          fontSize: 10,
          style: 'tableHeader',
          alignment: 'center',
          fillColor: '#90EE90',
          color:'#233b23',
        }
      ];
      var array = new Array();
      array.push(titulo);
  


      for (let i = 0; i < this.estudiantes_notas_aprobados.length; i++) {
        array.push([ i+1,this.estudiantes_notas_aprobados[i]['nombre'],this.estudiantes_notas_aprobados[i]['promedio']]);
        }


      let pdfDefinition = {
        pageSize: 'LEGAL', 
        pageMargins: [40, 80, 40, 80], 
        
        header: [{
          margin: 8,
          color:'darkgrey',
                 
          columns: [
              {
                 
                fillColor: '#90EE90',
                margin: [12, 15, 20, 8], 
                height: 50,
                table: {
                  widths: [260,300],
                  body: [
                   [
                      
                    { image: this.imagen,
                      width: 50,
                      absolutePosition: {x: 20, y:30},
          
                    }, 
          
                    [{
                      width: 100,
                      height: 100,
                      absolutePosition: {x: 450, y: 35},
                        alignment: 'center',fontSize: 9,
                        text: 'Fecha:' +" "+ dd+"/"+mm+"/"+yyyy,color:'darkgrey',
                    
                    }
                    ,
                    {
                      width: 100,
                      absolutePosition: {x: 450, y: 45},
                        alignment: 'center',fontSize: 9,
                        text: hora+":"+minutes+":"+seconds,color:'darkgrey',
                    
                    }] 
                   ] 
                  ] 
                 }, 
                 layout: 'noBorders' 
              },

              
              
          ]
      }
    ],
      footer: function(currentPage, pageCount) {
          return {
            
              margin:20,
              color:'grey',
              columns: [
              {
                  fontSize: 10,
                  text:[
                 
                  {
                  text: currentPage.toString() + ' De ' + pageCount,
                  }
                  ],
                  alignment: 'center'
              }
              ]
          };
    
      },
        content: [
          
        
          {text: 'Estudiantes Aprobados', 
            fontSize: 18, 
            bold: true, 
            margin: [30, -30, 0, 8],
            color:'#233b23',
            alignment: 'center',
          },
          {text: curso, 
            fontSize: 18, 
            bold: true, 
            margin: [30, -5, 0, 8],
            color:'#233b23',
            alignment: 'center',
          },
            {
              style: 'tableExample',
              fontSize: 10, 
              color:'#233b23',
              margin: [80, 10, 80, 8],
              table: {
                widths: [15,'*', 60],
                heights: 20,
                bordercolor:'#233b23',
                color:'#233b23',
                body: array,
                
              },
              
              layout: {
                hLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#6bb16b' : '#6bb16b';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#6bb16b' : '#6bb16b';
                },
                
              }
            },
            
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
          }
        }
      };
      // cosntruccion del pdf y descarga
      this.pdfObject = pdfMake.createPdf(pdfDefinition);
      //.download();
      this.openPDF();
    }
    estu_reprobados(curso)
    {
      
    
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
    
        var hora=hoy.getHours(); 
        var minutes=hoy.getMinutes();
        var seconds=hoy.getSeconds();     
    
        var espacio=" ";
        var titulo = [
          { text: 'N°', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'NOMBRE',
            fontSize: 10, 
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'NOTA ANUAL', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          }
        ];
        var array = new Array();
        array.push(titulo);
    
  
  
        for (let i = 0; i < this.estudiantes_notas_reprobados.length; i++) {
          array.push([ i+1,this.estudiantes_notas_reprobados[i]['nombre'],this.estudiantes_notas_reprobados[i]['promedio']]);
          }
  
  
        let pdfDefinition = {
          pageSize: 'LEGAL', 
          pageMargins: [40, 80, 40, 80], 
          
          header: [{
            margin: 8,
            color:'darkgrey',
                   
            columns: [
                {
                   
                  fillColor: '#90EE90',
                  margin: [12, 15, 20, 8], 
                  height: 50,
                  table: {
                    widths: [260,300],
                    body: [
                     [
                        
                      { image: this.imagen,
                        width: 50,
                        absolutePosition: {x: 20, y:30},
            
                      }, 
            
                      [{
                        width: 100,
                        height: 100,
                        absolutePosition: {x: 450, y: 35},
                          alignment: 'center',fontSize: 9,
                          text: 'Fecha:' +" "+ dd+"/"+mm+"/"+yyyy,color:'darkgrey',
                      
                      }
                      ,
                      {
                        width: 100,
                        absolutePosition: {x: 450, y: 45},
                          alignment: 'center',fontSize: 9,
                          text: hora+":"+minutes+":"+seconds,color:'darkgrey',
                      
                      }] 
                     ] 
                    ] 
                   }, 
                   layout: 'noBorders' 
                },
                
                
            ]
        }
      ],
        footer: function(currentPage, pageCount) {
            return {
              
                margin:20,
                color:'grey',
                columns: [
                {
                    fontSize: 10,
                    text:[
                   
                    {
                    text: currentPage.toString() + ' De ' + pageCount,
                    }
                    ],
                    alignment: 'center'
                }
                ]
            };
      
        },
          content: [
            
          
            {text: 'Estudiantes Reprobados', 
              fontSize: 18, 
              bold: true, 
              margin: [30, -30, 0, 8],
              color:'#233b23',
              alignment: 'center',
            },
            {text: curso, 
              fontSize: 18, 
              bold: true, 
              margin: [30, -5, 0, 8],
              color:'#233b23',
              alignment: 'center',
            },
              {
                style: 'tableExample',
                fontSize: 10, 
                color:'#233b23',
                margin: [80, 10, 80, 8],
                table: {
                  widths: [15,'*', 60],
                  heights: 20,
                  bordercolor:'#233b23',
                  color:'#233b23',
                  body: array,
                  
                },
                
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? '#6bb16b' : '#6bb16b';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? '#6bb16b' : '#6bb16b';
                  },
                  
                }
              },
             
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
            }
          }
        };
        // cosntruccion del pdf y descarga
        this.pdfObject = pdfMake.createPdf(pdfDefinition);
        //.download();
        this.openPDF();
      
    }
    todos_estudiantes(curso)
    {
      
    
    
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
    
        var hora=hoy.getHours(); 
        var minutes=hoy.getMinutes();
        var seconds=hoy.getSeconds();     
    
        var espacio=" ";
        var titulo = [
          { text: 'N°', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'NOMBRE',
            fontSize: 10, 
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'L', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'M', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'M', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'J', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          },
          { text: 'V', 
            fontSize: 10,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#90EE90',
            color:'#233b23',
          }
        ];
        var array = new Array();
        array.push(titulo);
    
  
  
        for (let i = 0; i < this.estudiantes_curso.length; i++) {
          array.push([ i+1,this.estudiantes_curso[i]['nombre'] +" "+this.estudiantes_curso[i]['apellido']," "," "," "," "," "]);
          
          }
  
  
        let pdfDefinition = {
          pageSize: 'LEGAL', 
          pageMargins: [40, 80, 40, 80], 
          
          header: [{
            margin: 8,
            color:'darkgrey',
                   
            columns: [
                {
                   
                  fillColor: '#90EE90',
                  margin: [12, 15, 20, 8], 
                  height: 50,
                  table: {
                    widths: [260,300],
                    body: [
                     [
                        
                      { image: this.imagen,
                        width: 50,
                        absolutePosition: {x: 20, y:30},
            
                      }, 
            
                      [{
                        width: 100,
                        height: 100,
                        absolutePosition: {x: 450, y: 35},
                          alignment: 'center',fontSize: 9,
                          text: 'Fecha:' +" "+ dd+"/"+mm+"/"+yyyy,color:'darkgrey',
                      
                      }
                      ,
                      {
                        width: 100,
                        absolutePosition: {x: 450, y: 45},
                          alignment: 'center',fontSize: 9,
                          text: hora+":"+minutes+":"+seconds,color:'darkgrey',
                      
                      }] 
                     ] 
                    ] 
                   }, 
                   layout: 'noBorders' 
                },
  
                {
                   
                },
                
                
            ]
        }
      ],
        footer: function(currentPage, pageCount) {
            return {
              
                margin:20,
                color:'grey',
                columns: [
                {
                    fontSize: 10,
                    text:[
                   
                    {
                    text: currentPage.toString() + ' De ' + pageCount,
                    }
                    ],
                    alignment: 'center'
                }
                ]
            };
      
        },
          content: [
            
          
            {text: 'Estudiantes', 
              fontSize: 18, 
              bold: true, 
              margin: [30, -30, 0, 8],
              color:'#233b23',
              alignment: 'center',
            },
            {text: curso, 
              fontSize: 18, 
              bold: true, 
              margin: [30, -5, 0, 8],
              color:'#233b23',
              alignment: 'center',
            },
              {
                style: 'tableExample',
                fontSize: 10, 
                color:'#233b23',
                margin: [70, 10, 70, 8],
                table: {
                  widths: [15,'*', 15, 15, 15, 15, 15],
                  heights: 15,
                  bordercolor:'#233b23',
                  color:'#233b23',
                  body: array,
                  
                },
                
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? '#6bb16b' : '#6bb16b';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? '#6bb16b' : '#6bb16b';
                  },
                  
                }
              },
             
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
            }
          }
        };
        // cosntruccion del pdf y descarga
        this.pdfObject = pdfMake.createPdf(pdfDefinition);
        //.download();
        this.openPDF();
    }
    
    materias_curso(cur)
    {
      
    
      var hoy = new Date();
      var dd = hoy.getDate();
      var mm = hoy.getMonth()+1;
      var yyyy = hoy.getFullYear();
      
  
      var hora=hoy.getHours(); 
      var minutes=hoy.getMinutes();
      var seconds=hoy.getSeconds();     
  
      var espacio=" ";
      var titulo = [
        { text: 'N°', 
          fontSize: 10,
          style: 'tableHeader',
          alignment: 'center',
          fillColor: '#90EE90',
          color:'#233b23',
        },
        { text: 'MATERIA',
          fontSize: 10, 
          style: 'tableHeader',
          alignment: 'center',
          fillColor: '#90EE90',
          color:'#233b23',
        },
        { text: 'PROFESOR', 
          fontSize: 10,
          style: 'tableHeader',
          alignment: 'center',
          fillColor: '#90EE90',
          color:'#233b23',
        }
      ];
      var array = new Array();
      array.push(titulo);
  


      for (let i = 0; i < this.mate_curso.length; i++) {
        array.push([ i+1,this.mate_curso[i]['nombre_materia'],this.mate_curso[i]['nombre_profesor']]);
        }


      let pdfDefinition = {
        pageSize: 'LEGAL', 
        pageMargins: [40, 80, 40, 80], 
        
        header: [{
          margin: 8,
          color:'darkgrey',
                 
          columns: [
              {
                 
                fillColor: '#90EE90',
                margin: [12, 15, 20, 8], 
                height: 50,
                table: {
                  widths: [260,300],
                  body: [
                   [
                      
                    { image: this.imagen,
                      width: 50,
                      absolutePosition: {x: 20, y:30},
          
                    }, 
          
                    [{
                      width: 100,
                      height: 100,
                      absolutePosition: {x: 450, y: 35},
                        alignment: 'center',fontSize: 9,
                        text: 'Fecha:' +" "+ dd+"/"+mm+"/"+yyyy,color:'darkgrey',
                    
                    }
                    ,
                    {
                      width: 100,
                      absolutePosition: {x: 450, y: 45},
                        alignment: 'center',fontSize: 9,
                        text: hora+":"+minutes+":"+seconds,color:'darkgrey',
                    
                    }] 
                   ] 
                  ] 
                 }, 
                 layout: 'noBorders' 
              },
              
              
          ]
      }
    ],
      footer: function(currentPage, pageCount) {
          return {
            
              margin:20,
              color:'grey',
              columns: [
              {
                  fontSize: 10,
                  text:[
                 
                  {
                  text: currentPage.toString() + ' De ' + pageCount,
                  }
                  ],
                  alignment: 'center'
              }
              ]
          };
    
      },
        content: [
          
        
          {text: 'Listado de Materias', 
            fontSize: 18, 
            bold: true, 
            margin: [30, -30, 0, 8],
            color:'#233b23',
            alignment: 'center',
          },
          {text: cur, 
            fontSize: 18, 
            bold: true, 
            margin: [30, -5, 0, 8],
            color:'#233b23',
            alignment: 'center',
          },
            {
              style: 'tableExample',
              fontSize: 10, 
              color:'#233b23',
              margin: [90, 10, 80, 8],
              table: {
                widths: [15,150, 150],
                heights: 20,
                bordercolor:'#233b23',
                color:'#233b23',
                body: array,
                
              },
              
              layout: {
                hLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#6bb16b' : '#6bb16b';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#6bb16b' : '#6bb16b';
                },
                
              }
            },
           
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
          }
        }
      };
      // cosntruccion del pdf y descarga
      this.pdfObject = pdfMake.createPdf(pdfDefinition);
      //.download();
      this.openPDF();
    
    }

    openPDF()
    {
      if (this.platform.is('cordova')) {
        this.pdfObject.getBuffer((buffer) => {
          var blob = new Blob([ buffer ], { type: 'application/pdf' });
          this.file
            .writeFile(this.file.dataDirectory, 'estudiantes.pdf', blob, { replace: true })
            .then((fileEntry) => {
              this.fileOpener.open(
                this.file.dataDirectory + 'estudiantes.pdf',
                'application/pdf'
              );
            });
        });
        return true;
      }
    
      this.pdfObject.download();
    }
  

    
  }
