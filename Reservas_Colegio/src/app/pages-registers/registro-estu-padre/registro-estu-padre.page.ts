import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavParams, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-estu-padre',
  templateUrl: './registro-estu-padre.page.html',
  styleUrls: ['./registro-estu-padre.page.scss'],
})
export class RegistroEstuPadrePage implements OnInit {
curso:any;
cur:string="";
acum:any;
cont:any;
materias:Array<any>=[];
usuarios:Array<any>=[];
cursos:Array<any>=[];
  constructor(
    private authService:AuthService,
    private navParam:NavParams,
    private modalCtrl:ModalController,
    private alertController:AlertController
  ) {

    this.read_usu();
   }

  ngOnInit() {
  }
  read_usu()
  {
    this.authService.read_user_mysql().then(users=>{
      this.curso=this.navParam.get('curso');
      this.authService.buscar_notas_curso(this.curso).then(notas=>{

        if(users!=false && notas!=false)
        {
          for(let user of users)
          { 
            if(user.tipo_usuario=='Estudiante' && user.curso==this.curso)
            {
              this.acum=0;
              this.cont=0;
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
              this.cont=Number((this.acum/this.materias.length).toFixed(1));
              //alert(this.cont);
              if(this.cont>51 && this.cont>5.1)
              {
                this.usuarios.push({"id":user.uid,"nombre":user.nombre+" "+user.apellido,"ci":user.ci,"numero_telefonico":user.numero_telefonico,"promedio":this.cont});
              }
            }
          }
        }
      })

      this.authService.read_curse_mysql().then(cursos=>{
        this.cursos=cursos;
      })

      
    });
  }
  close()
  {
    this.modalCtrl.dismiss();
  }
  async aler()
    {
      //alert(id);
      const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aprobados',
      message: 'Los estudiantes fueron aprobados con exito',
      buttons: [
         {
          text: 'Si',
          handler: () => {
            this.usuarios=[];
            this.read_usu();
          }
        }
      ]
    });
    await alert.present();
  }
  pasar()
  {
    //alert(this.cur);
    for(let user of this.usuarios)
    {
      //alert(user.id);
      this.authService.update_user_curso_mysql(user.id,this.cur).then(update=>{
        if(update==false)
        {
          console.log("Error al actualizar");
        }
      }).catch(err=>{console.log("Error al acrualizar: "+ err);});
    }
    this.aler();
  }
}
