import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-read-nota-profesor',
  templateUrl: './read-nota-profesor.page.html',
  styleUrls: ['./read-nota-profesor.page.scss'],
})
export class ReadNotaProfesorPage implements OnInit {
  trimestre:any;
  trimestre1:Array<any>=[];
  trimestre2:Array<any>=[];
  materias_sin_notas:Array<any>=[];
  trimestre3:Array<any>=[];
  promedio:Array<any>=[];
  materias1:Array<any>=[];
  
  materias:Array<any>=[];
  prom_anual:any;

  estudiante:any;
  tipo:any;
  notas:Array<any>=[];
  constructor(
    private navParam:NavParams,
    private authService:AuthService,
    private modalCtrl:ModalController
  ) {
    var date =navParam.get('date');
    this.tipo=navParam.get('type');
    this.estudiante=navParam.get('estudiante');
    if(this.tipo=="select")
    {this.trimestre=navParam.get('trimestre');
      
      authService.buscar_notas_trim_student_mysql(date.getFullYear(),this.trimestre,this.estudiante.uid).then(notas=>{
        if(notas!=false)
        {
          for(let nota of notas)
          {
            //alert(nota.id_materia);
            //this.notas=notas;
            authService.buscar_materia_id_mysql(nota.id_materia).then(materia=>{
              for(let mate of materia)
              {
                this.notas.push({"materia":mate.nombre_materia,"nota":nota.nota});
              }
            });
        
          }
          }
      });
    }
    else
    {
      this.prom_anual=0;
      this.trimestre="Notas Anuales";
      //alert(this.estudiante.curso);
      authService.buscar_notas_curso(this.estudiante.curso).then(materias=>{
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
              var gestion=date;
              //alert(mate.id+" "+t1);
              authService.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,t1,this.estudiante.uid,gestion).then(notas1=>{
                authService.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,"2do Trimestre",this.estudiante.uid,gestion).then(notas2=>{
                  authService.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,"3er Trimestre",this.estudiante.uid,gestion).then(notas3=>{
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
   }

  ngOnInit() {
  }
  close()
  {
    this.modalCtrl.dismiss();
  }
}
