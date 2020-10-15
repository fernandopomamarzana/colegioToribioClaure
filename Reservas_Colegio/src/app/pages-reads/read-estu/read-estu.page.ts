import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { RegistroNotasPage } from 'src/app/pages-registers/registro-notas/registro-notas.page';
import { RegistroEstuPadrePage } from 'src/app/pages-registers/registro-estu-padre/registro-estu-padre.page';

@Component({
  selector: 'app-read-estu',
  templateUrl: './read-estu.page.html',
  styleUrls: ['./read-estu.page.scss'],
})
export class ReadEstuPage implements OnInit {
  curso:any;
  usuarios:Array<any>=[];
  constructor(
    private navParam:NavParams,
    private authService:AuthService,
    private modalCtrl:ModalController,

    ) { 
    this.read_user();
  }
  read_user()
  {
    this.curso=this.navParam.get('curso');
    //alert(this.curso);
      this.authService.read_user_mysql().then(users=>{
        if(users!=false)
        {
          this.usuarios=users;
        }
      });
  }
  ngOnInit() {
  }
  close()
  {
    this.modalCtrl.dismiss();
  }
  async add_notas(estudiante)
  {
    const modal= await this.modalCtrl.create({
      component:RegistroNotasPage,
      cssClass:"add-notas modal",
      componentProps:{
        estudiante:estudiante,
      }
    });
    modal.onDidDismiss().then((data)=>{
      this.usuarios=[];
      this.read_user();
    })


    return await modal.present();
    
  }
  async pasar()
  {
    const modal= await this.modalCtrl.create({
      component:RegistroEstuPadrePage,
      cssClass:"add-notas modal",
      componentProps:{
        curso:this.curso,
      }
    });
    modal.onDidDismiss().then((data)=>{
      this.usuarios=[];
      this.read_user();
    })


    return await modal.present();
    
  }

}
