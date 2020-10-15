import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registromateria',
  templateUrl: './registromateria.page.html',
  styleUrls: ['./registromateria.page.scss'],
})
export class RegistromateriaPage implements OnInit {
  @ViewChild('autofocus', { static: false }) searchbar: IonInput;

  public nombre_materia:any;
  public tipo:any;
  public profesor:any;
  public profesores:Array<any>=["Sin asignar"];
  public teto:string="";
  constructor(
    public navParam:NavParams,
    public authService:AuthService,
    public modalCtrl:ModalController
  ) {
    this.tipo=navParam.get('type');
    if(this.tipo=="crear")
    {
      this.profesor="Sin asignar";
    }
    if(this.tipo=="asignar" || this.tipo=="reasignar")
    {
      this.profesor=navParam.get('materia').nombre_profesor;
      this.nombre_materia=navParam.get('materia').nombre_materia
    }
    //alert(navParam.get('curso').id);
   }

  ngOnInit() {
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
      }
    });
  }
  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus());
  }
  public inputVa(event: any) {
    const pattern = /^[a-zA-Z ]*$/; 
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]+/g, "");
      // invalid character, prevent input
      this.teto= this.teto.substr(0,this.teto.length-1);
      
    }
  }
  close()
  {
    this.modalCtrl.dismiss();
  }
  add_materia()
  {
    
    this.authService.register_materia_mysql(this.navParam.get('curso').id,this.navParam.get('curso').name,this.nombre_materia,this.profesor).then(reg=>{
      if(reg!=false)
      {
        this.close();
      }
    })
  }
  actulizar_materia()
  {
    //alert(this.navParam.get('materia').id);
    this.authService.update_materia_mysql(this.navParam.get('materia').id,this.nombre_materia,this.profesor).then(update=>{
      if(update!=false)
      {
        this.modalCtrl.dismiss();
      }
    })
  }

}
