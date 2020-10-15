import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registro-inasistencia',
  templateUrl: './registro-inasistencia.page.html',
  styleUrls: ['./registro-inasistencia.page.scss'],
})
export class RegistroInasistenciaPage implements OnInit {
  public estudiante:any;
  public gestion:any;
  public type:any;
  public fecha:string="";
  public al_posi:string="0";
  public faltas:Array<any>=[];
  public dates:Array<any>=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(
    private modalCrl:ModalController,
    private navParam:NavParams,
    private authService:AuthService,
  ) { 
    this.estudiante=navParam.get('estudiante');
    this.type=navParam.get('type');
    this.gestion=navParam.get('gestion');
    this.fecha=this.gestion+"-4-15";
    //alert(this.gestion);
    this.read_faltas();
    //alert(this.faltas.id_estudiante)
  }

  ngOnInit() {
  }
  close()
  {
    this.modalCrl.dismiss();
  }
  read_faltas()
  {
    this.authService.buscar_faltas_mysql(this.estudiante.uid,this.gestion).then(faltas=>{
      if(faltas!=false)
      {
        this.faltas=faltas;
        //alert(JSON.stringify(this.faltas));
      }
    });
  }
  limpiar()
  {
    this.al_posi="0";
  }
  add_fecha()
  {
    //
    this.al_posi="0";
    let date=new Date(this.fecha);
    //alert(this.dates[date.getMonth()]);
    var falta=date.getUTCDate()+" de "+this.dates[date.getMonth()]+", "+date.getFullYear();
    //alert()
    
    this.authService.register_faltas_mysql(this.estudiante.uid,falta,this.gestion).then(reg=>{
      if(reg!=false)
      {
        this.al_posi="1";
        this.faltas=[];
        this.read_faltas();
      }
    });
  }
  delete_fecha(id)
  {
    this.authService.delete_faltas_mysql(id).then(res=>{
      if(res!=false)
      {
        this.faltas=[];
        this.read_faltas();
      }
    });
  
  }

}
