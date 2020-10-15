import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { IonInput, NavParams, ModalController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import * as bcryptjs from 'bcryptjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;
  
  public id:any;
  public ci:any;
  public contracena_actual:any;
  public contracena_nueva:any;
  public contracena_nueva_rep:any;
  public password:any;
  public al:string="0";
  public vacios:string="0";
  constructor(
    public route:Router,
    public authService:AuthService,
    public navParam:NavParams,
    public modalCtrl:ModalController

  ) { 
    this.id=navParam.get('id');
    this.ci=navParam.get('ci');
    this.contracena_actual=this.ci;
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus());
  }
  public inputVa(event: any) {
    this.al="0";
    this.vacios="0";
  }
  actualizar()
  {
    this.al="0";
    this.vacios="0";
    if(this.contracena_nueva!=undefined && this.contracena_nueva_rep!=undefined)
    {
      if(this.contracena_nueva==this.contracena_nueva_rep)
      {
        //alert(this.contracena_nueva);
        //this.password = CryptoJS.AES.encrypt(this.contracena_nueva.trim(), this.ci.trim()).toString();
        const saltRounds = 10 ;   
        var  hash  = bcryptjs . hashSync ( this.contracena_nueva ,  saltRounds ) ; 

        this.authService.update_password_mysql(this.id,this.password).then(update=>{
          if(update!=false)
          {
            location.reload();
          }
        });
      }
      else
      {
        this.al="1";
      }
    }
    else
    {
      this.vacios="1";
    }
  }
  close(){
    //this.route.navigate(['/folder/Outbox']);
    this.modalCtrl.dismiss();
  }

}
