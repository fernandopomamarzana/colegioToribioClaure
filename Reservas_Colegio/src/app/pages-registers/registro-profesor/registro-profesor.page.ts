import { Component, OnInit, ViewChild } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { NavParams, ModalController, IonInput, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as bcryptjs from 'bcryptjs';

@Component({
  selector: 'app-registro-profesor',
  templateUrl: './registro-profesor.page.html',
  styleUrls: ['./registro-profesor.page.scss'],
})
export class RegistroProfesorPage implements OnInit {
  public name:any;
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;

  public al_nega:string="0";
  public al_posi:string="0";
  public al_posi1:string="0";
  //title = 'EncryptionDecryptionSample';
  public ci:string
  public teto:string="0";
  public nombre:string;
  public apellido:string;
  public edad:string;
  public numero_telefonico:string;
  public domicilio:string;
  public tipo_usuario:string;
  public id:string;
  public profesores:Array<any>=["Profesor","Profesora","Director","Directora"];
  public tipo:string;
  public profesor:any;
  public username:string;
  public password:string;

  plainText: string;
  encryptText: string;
  encPassword: string;
  decPassword: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  constructor(
    private bd:AngularFirestore,
    private authService:AuthService,
    private navParam:NavParams,
    private modalCrl:ModalController,
    private loadingCtrl:LoadingController,
  ) { 
    
    this.tipo=this.navParam.get('type');
    if(this.tipo=="update")
    {
    this.profesor=this.navParam.get('profesor');
      this.ci=this.profesor.ci;
      this.nombre=this.profesor.nombre;
      this.apellido=this.profesor.apellido;
      this.edad=this.profesor.edad;
      this.numero_telefonico=this.profesor.numero_telefonico;
      this.domicilio=this.profesor.domicilio
      this.tipo_usuario=this.profesor.tipo_usuario;
      this.username=this.profesor.username;
      //this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.profesor.password.trim(), this.profesor.ci.trim()).toString(CryptoJS.enc.Utf8);
    
      this.password=this.ci;
    }
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus());
  }
  public inputVa(event: any) {
    this.al_nega="0";
    this.al_posi="0";
    this.al_posi1="0";
    const pattern = /^[a-zA-Z0-9-]*$/; 
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9-]+/g, "");
      // invalid character, prevent input
      this.teto= this.teto.substr(0,this.teto.length-1);
      
    }
  }
  public inputVa_letras(event: any) {
    this.al_nega="0";
    this.al_posi1="0";
    this.al_posi="0";
    const pattern = /^[a-zA-Z ]*$/; 
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]+/g, "");
      // invalid character, prevent input
      this.teto= this.teto.substr(0,this.teto.length-1);
      
    }
  }
  public inputVa_numeros(event: any) {
    this.al_nega="0";
    this.al_posi1="0";
    this.al_posi="0";
    const pattern = /^[0-9]*$/; 
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]+/g, "");
      // invalid character, prevent input
      this.teto= this.teto.substr(0,this.teto.length-1);
      
    }
  }
  tipouser()
  {
    this.al_nega="0";
    this.al_posi1="0";
    this.al_posi="0";
  }
  
  registrar()
  {
    
      this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
      alert(this.conversionEncryptOutput);

  }
  desencriptar()
  {
    this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    alert(this.conversionDecryptOutput);

  }
  close()
  {
    this.modalCrl.dismiss();
  }
  async loading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Procesando...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    //this.close();
    this.al_posi="1";
    
  }
  add_profesor()
  {
    //alert(this.numero_telefonico)
    this.al_nega="0";
    this.al_posi="0";
    const saltRounds = 10 ;  
    
    if(this.ci!=undefined && this.nombre!=undefined &&this.apellido!=undefined &&this.numero_telefonico!=undefined &&this.tipo_usuario!=undefined &&this.domicilio!=undefined &&this.edad!=undefined)
    {
      //alert("campos llenos");
      this.id= this.bd.createId();
      //this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.ci.trim(), this.ci.trim()).toString();
      //console.log(this.id+" "+this.ci+" "+this.nombre+" "+this.apellido+" "+this.ci+" "+this.conversionEncryptOutput+" "+this.numero_telefonico+" "+this.tipo_usuario+" "+this.domicilio);
      var  hash  = bcryptjs . hashSync ( this.ci ,  saltRounds ) ; 
    
      this.authService.register_user_mysql(this.id,this.ci,this.nombre,this.apellido,this.edad,this.ci,hash,this.numero_telefonico,this.tipo_usuario,this.domicilio).then(user=>{
        if(user!=false)
        {
          //alert(JSON.stringify(user));
          this.loading();
        }
      });
    }
    else
    {
      this.al_nega="1";
    }
    /**/
  }

  update_profesor()
  {this.al_posi1="0";
    const saltRounds = 10 ;   
    //this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.password.trim(), this.ci.trim()).toString();
    var  hash  = bcryptjs . hashSync ( this.password ,  saltRounds ) ; 

    this.authService.update_user_mysql(this.profesor.uid,this.ci,this.nombre,this.apellido,this.edad,this.username,hash,this.numero_telefonico,this.tipo_usuario,this.domicilio).then(user=>{
      if(user!=false)
      {
        //alert(user);
        //this.close();
        this.al_posi1="1";
      }
    });
  }

}
