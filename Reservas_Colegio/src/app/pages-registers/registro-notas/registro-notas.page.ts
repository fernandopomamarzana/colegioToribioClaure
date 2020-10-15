import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, LoadingController, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { ReadNotaProfesorPage } from 'src/app/pages-reads/read-nota-profesor/read-nota-profesor.page';
import { RegistroInasistenciaPage } from '../registro-inasistencia/registro-inasistencia.page';

@Component({
  selector: 'app-registro-notas',
  templateUrl: './registro-notas.page.html',
  styleUrls: ['./registro-notas.page.scss'],
})
export class RegistroNotasPage implements OnInit {
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;

  estudiante:any;
  public materia:string="";
  public trimestre:string="";
  public nombre_curso:string="";
  public nota:string="";
  public teto:string="";
  public aler_nega=0;
  public aler_posi=0;
  public bandera=0;
  public date:any

  public trimestre_nota:string="";


  public trimestres:Array<any>=["1er Trimestre","2do Trimestre","3er Trimestre"];
  public materias:Array<any>=[];
  
  
  constructor(
    private navParam:NavParams,
    private modalCtrl:ModalController,
    private authService:AuthService,
    private loadinCtrl:LoadingController,
  ) { 
    this.estudiante=this.navParam.get('estudiante');
    var dat=new Date();
    this.date=dat.getFullYear();
    this.authService.read_curse_mysql().then(cursos=>{
      if(cursos!=false){
        for(let curso of cursos){
          if(curso.name==this.estudiante.curso)
          {
            this.nombre_curso=curso.name;
            authService.buscar_materias_idcurso_mysql(curso.id).then(materias=>{
              if(materias!=false)
              {
               this.materias=materias;
              }
            });

          }
        }
      
      }
        });
    
  }

  ngOnInit() {

  }
  close()
  {
    this.modalCtrl.dismiss();
  }
  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus());
  }
  public inputVa(event: any) {
    this.aler_nega=0;
    const pattern = /^[0-9.]*$/; 
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9.]+/g, "");
      // invalid character, prevent input
      this.teto= this.teto.substr(0,this.teto.length-1);
      
    }
  }
  async loading() {
    const loading = await this.loadinCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Procesando...',
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    if(this.bandera==1)
    {
      this.aler_nega=1;
      this.aler_posi=0;
    }
    else
    {
      this.aler_nega=0;
      this.limpiar_datos();
      this.aler_posi=1;
      
    }
    
  }
  add_notas(){
    this.bandera=0;
    this.aler_nega=0;
    this.aler_posi=0;
    //alert(date.getFullYear()+" "+this.trimestre+" "+this.estudiante.uid+" "+this.id_curso+" "+this.materia+" "+this.nota);
    if(this.materia!="" && this.trimestre!="" && this.nota!="")
    {
      this.authService.register_notas_mysql(this.date,this.trimestre,this.estudiante.uid,this.nombre_curso,this.materia,this.nota).then(reg=>{
        if(reg!=false)
        {
         this.bandera=0;
         this.loading();
        }
      });
    }
    else
    {
     this.bandera=1;
     this.loading();      
    }
  }

  limpiar_datos()
  {
    this.aler_posi=0;
    this.aler_nega=0;
    this.materia="";
    this.trimestre="";
    this.nota="";
  }
  desaparecer()
  {
    this.aler_nega=0;
  }

  async add_asistencia()
  {
    var modal=await this.modalCtrl.create({
      component:RegistroInasistenciaPage,
      cssClass:'register-inasistencia modal',
      componentProps:{
        type:"create",
        gestion:this.date,
        estudiante:this.estudiante,
      }
    });
    modal.onDidDismiss().then(res=>{

    })
    return await modal.present();
  }


  async verificar_notas()
  {
    var modal=await this.modalCtrl.create({
      component:ReadNotaProfesorPage,
      cssClass:'read-notes modal',
      componentProps:{
        type:"boton",
        date:this.date,
        trimestre:this.trimestre_nota,
        estudiante:this.estudiante,

      }
    });
    modal.onDidDismiss().then(data=>{

    });
    return await modal.present();
    //alert(this.trimestre_nota);
  }

}
