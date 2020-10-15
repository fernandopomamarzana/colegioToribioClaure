import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { IonInput, ModalController } from '@ionic/angular';
import { session } from 'src/app/moldeos/session';

@Component({
  selector: 'app-registro-bol-info',
  templateUrl: './registro-bol-info.page.html',
  styleUrls: ['./registro-bol-info.page.scss'],
})
export class RegistroBolInfoPage implements OnInit {
  @ViewChild('img') inputImage: ElementRef;
  public imagen:File;
  public ema:any;
  public id:any;
  public descripcion:any;
  public uploadPercent:Observable<number>;
  public urlImage:Observable<string>;
  public name_img:any;
  public filepath:any;
  public al_posi:string="0";
  constructor(
    private storage:AngularFireStorage,
    private authService:AuthService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
  }
  
  close(){
    this.modalCtrl.dismiss();
  }
  onUpload(e:any)
  {
    this.al_posi="0";
    this.ema=e;
    this.id=Math.random().toString(36).substring(2);
    const file=e.target.files[0];
    this.filepath='uploads/profile_'+this.id;
    session.image=this.filepath;
    const ref=this.storage.ref(this.filepath);
    const task=this.storage.upload(this.filepath,file);
    this.uploadPercent=task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=>{
      this.urlImage=ref.getDownloadURL();
      this.name_img="profile_"+this.id;

    
    })).subscribe();
    
  }
  Registrar1()
  {
     
  }
  async Registrar()
  {
    //this.Registrar1();
    console.log(this.inputImage.nativeElement.value);
    var date=new Date();
    this.authService.register_firebase_informativo(this.id,this.name_img,this.inputImage.nativeElement.value,this.descripcion,"0",date).then(reg=>{
      if(reg!=false)
      {
        //alert(reg);
      this.al_posi="1";

        //this.close();
      }
    });
  
  }
}
