import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { RegistromateriaPage } from 'src/app/pages-registers/registromateria/registromateria.page';
import { RegistroCursoPage } from 'src/app/pages-registers/registro-curso/registro-curso.page';
import { ChatComponent } from 'src/app/componentes/chat/chat.component';

@Component({
  selector: 'app-materiascurso',
  templateUrl: './materiascurso.page.html',
  styleUrls: ['./materiascurso.page.scss'],
})
export class MateriascursoPage implements OnInit {
  public curso:any;
  public profesor:any;
  public profesores:Array<any>=["Sin asignar"];
  public materias:Array<any>=[];

  constructor(
    public navparams:NavParams,
    public authService:AuthService,
    private modalctrl:ModalController,
    private modal:ModalController,
    public popoverController:PopoverController,
    public alertController:AlertController,
    public loadingController:LoadingController
    
  ) {
    this.curso=this.navparams.get('curse');
      //alert(this.curso.name+"  "+this.curso.id);
      

    this.authService.read_user_mysql().then(users=>{
      if(users!=false)
      {
        for(let user of users)
        {
          if(user.tipo_usuario=='Profesor' || user.tipo_usuario=='Profesora')
          {
            this.profesores.push(user.nombre+" "+user.apellido);
            
          }
        }
      //this.profesor=this.curso.nombre_acesor;
      
      this.read_materias()
      }
      this.profesor=this.curso.nombre_acesor;
    });
    
    
   }

  ngOnInit() {
    
  }
  read_users()
  {
   
  }
  close(){
    
    this.modal.dismiss();
  }
  onChange( profesor)
  {
    //alert(this.curso.id);
    this.authService.update_curso_acesor_mysql(this.curso.id,profesor).then(update=>{
      if(update!=false)
      {
        //alert(profesor)
        /*this.profesores=[]
        this.read_users();*/
        //this.loading();
      }
    });
  }

  read_materias()
  {
    this.authService.buscar_materias_idcurso_mysql(this.curso.id).then(materias=>{
      if(materias!=false)
      { 
        //alert(JSON.stringify(materias));
        this.materias=materias;

      }
    });
  }
  async add_materia() {
     //this.close()
  let modal = await this.modalctrl.create(
    {component:RegistromateriaPage,
      cssClass:'modal',
      componentProps:{
        type:"crear",
        curso:this.curso
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.loading();
     });

  return await modal.present();
  }
  async asignar(materia)
  {
    //this.close()
  let modal = await this.modalctrl.create(
    {component:RegistromateriaPage,
      cssClass:'modal',
      componentProps:{
        type:"asignar",
        materia:materia
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.loading();
      });

  return await modal.present();
  }

  async reasignar(materia)
  {
    //this.close()
    let modal = await this.modalctrl.create(
      {component:RegistromateriaPage,
        cssClass:'modal',
        componentProps:{
          type:"reasignar",
          materia:materia
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        this.loading();
        });

    return await modal.present();
  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
      this.materias=[];
      this.read_materias();
  }

  async delete_materia(id)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Eliminar',
      message: 'Desea eliminar la materia ?',
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
            this.authService.delete_materia_mysql(id).then(res=>{
              if(res!=false)
              {
                this.loading();
              }
            });
          }
        }
      ]
    });

    await alert.present();
    
  }
}
