import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-notifi',
  templateUrl: './preview-notifi.page.html',
  styleUrls: ['./preview-notifi.page.scss'],
})
export class PreviewNotifiPage implements OnInit {
  boletin:any;
  autor:any;
  estudiante:any;
  curso:any;
  mesage:any;
  constructor(
    public navParam:NavParams,
    private modalCtrl:ModalController
  ) { 
    this.boletin=navParam.get('notificacion');
    //alert(JSON.stringify(this.boletin));
    this.autor=this.boletin.autor;
    this.estudiante=this.boletin.estudiante;
    this.curso=this.boletin.curso;
    this.mesage=this.boletin.mesage;

  }

  ngOnInit() {
  }
  close()
  {
    this.modalCtrl.dismiss();
  }

}
