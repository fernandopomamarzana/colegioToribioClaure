import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { RegistroInasistenciaPage } from 'src/app/pages-registers/registro-inasistencia/registro-inasistencia.page';

@Component({
  selector: 'app-read-nota-student',
  templateUrl: './read-nota-student.page.html',
  styleUrls: ['./read-nota-student.page.scss'],
})
export class ReadNotaStudentPage implements OnInit {
  
  trimestre1:Array<any>=[];
  trimestre2:Array<any>=[];
  materias_sin_notas:Array<any>=[];
  trimestre3:Array<any>=[];
  promedio:Array<any>=[];
  
  materias:Array<any>=[];
  public gesti:any;
  public gestiones:Array<any>=["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"];
  
  estudiante:any;

  materias1:Array<any>=[];
  aux_cur:Array<any>=[];

  prom_anual:any;
  constructor(
    private navParam:NavParams,
    private authService:AuthService,
    private modalCtrl:ModalController

  ) {
    var date =new Date();
    this.gesti=date.getFullYear().toString();
    this.estudiante=navParam.get('estudiante');
    
      //alert(this.estudiante.curso);
      this.read_notes1(this.gesti);
    
   
   }

  ngOnInit() {
  }
  close()
  {
    this.modalCtrl.dismiss();
  }
  read_notes1(gesti)
    { this.prom_anual=0;
      this.authService.buscar_notas_gestion_student_mysql(gesti,this.estudiante.uid).then(bus=>{
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
      this.authService.buscar_notas_curso(curso).then(materias=>{
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
              this.authService.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,t1,this.estudiante.uid,gestion).then(notas1=>{
                this.authService.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,"2do Trimestre",this.estudiante.uid,gestion).then(notas2=>{
                  this.authService.buscar_notas_idmateria_idestudiante_mysql(mate.nombre_materia,"3er Trimestre",this.estudiante.uid,gestion).then(notas3=>{
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
  async faltas()
  {
    var modal=await this.modalCtrl.create({
      component:RegistroInasistenciaPage,
      cssClass:'register-in modal',
      componentProps:{
        type:"read",
        estudiante:this.estudiante,
        gestion:this.gesti,
      }
    });
    modal.onDidDismiss().then(res=>{

    })
    return await modal.present();
  }
}
