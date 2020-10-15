import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { session } from 'src/app/moldeos/session';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register-notifi',
  templateUrl: './register-notifi.page.html',
  styleUrls: ['./register-notifi.page.scss'],
})
export class RegisterNotifiPage implements OnInit {
  cargo:any;
  cursos:any;
  cursos_asesor:Array<any>=[];
  tutores:Array<any>=[];
  estudiantes:Array<any>=[];
  
  public uid_generate:string="";

  public curso_user:string="";
  public estudiante_user:any;
  public padre_user:any;
  public msg:any;
  public nombre_asesor:string="";
  public al_nega:string="0";
  public al_posi:string="0";
  constructor(
    private navParam:NavParams,
    private authService:AuthService,
    private modalCtrl:ModalController,
    private bd:AngularFirestore

  ) { 
    this.cargo=navParam.get('cargo');
    //alert(this.nombre_asesor)
    if(this.cargo=="Director" || this.cargo=="Directora")
    {
      this.nombre_asesor="Dire. "+navParam.get('nombre');
    
      authService.read_curse_mysql().then(cursos=>{
        //alert(JSON.stringify(cursos));
        if(cursos!=false)
        {
          this.cursos=cursos;
        }
      });
    }
    if(this.cargo=="Profesor" || this.cargo=="Profesora")
    {
      this.nombre_asesor="Profe. "+navParam.get('nombre');
    
      authService.read_curse_mysql().then(cursos=>{
        //alert(navParam.get('nombre'));
        if(cursos!=false)
        {
          for(let curso of cursos)
          {
            //alert(curso.nombre_acesor);
            if(curso.nombre_acesor==navParam.get('nombre'))
            {
              this.cursos_asesor.push(curso);
            }
          }
          
        }
      });
    }
  }

  ngOnInit() {
  }
  tutores_curso(curso)
  { //alert(curso);
    this.al_nega="0";
    this.al_posi="0";
    this.estudiantes=[];
    this.authService.read_user_mysql().then(users=>{
      if(users!=false)
      {
        for(let user of users)
        {
          if(curso==user.curso)
          {
            this.estudiantes.push(user);
          }
        }
      }
    });
  }
  estudiantes_tutor(estudiante)
  { this.tutores=[];
    this.al_posi="0";
    this.al_nega="0";
    //alert(estudiante);
    this.authService.read_user_mysql().then(users=>{
      if(users!=false)
      {
        for(let user of users)
        {
          if(estudiante.nombre_completo_tutor==user.nombre+' '+user.apellido)
          {
            this.tutores.push(user);
          }
        }
      }
    });
  }
  tuto()
  {
    this.al_posi="0";
    this.al_nega="0";
  }
  close(){
    this.modalCtrl.dismiss();
  }
  add_notificacion()
  { 
    this.al_posi="0";
    this.al_nega="0";
    this.uid_generate= this.bd.createId();
    
    if(this.curso_user!="" &&
    this.estudiante_user!=undefined &&
    this.padre_user!=undefined &&
    (this.msg!=undefined && this.msg!=""))
    {
      //alert(this.curso_user+" => "+this.estudiante_user+" => "+this.padre_user+" => "+this.msg);
      this.authService.register_firebase_notifi(this.uid_generate,this.padre_user.uid,this.nombre_asesor,this.curso_user,this.estudiante_user.nombre+' '+this.estudiante_user.apellido,this.padre_user.nombre+' '+this.padre_user.apellido,this.msg,"0").then(res=>
        {
          if(res!=false)
          {
            console.log("Se registro la notificacion");
            this.al_posi="1";
            
            //this.close();
          }
        });
    }
    else
    {
      
      this.al_nega="1";//alert(this.al_nega);
    }
  }
}
