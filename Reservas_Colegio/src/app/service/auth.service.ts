import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { HttpClientModule, HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

export interface noti{
  id:string,
  id_tutor:string,
  autor:string,
  curso:string,
  estudiante:string,
  mesage:string,
  name:string,
  date:Date,
 
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public id="";
  //notifi:firebaselist
  constructor(
    private AFauth:AngularFireAuth,
    public router:Router,
    private  bd:AngularFirestore,
    public http: HttpClient

    
    ) { }
  auth()
  {
    return new Promise((resolve,reject)=>{
        this.AFauth.authState.pipe(map(auth=>{
        //console.log(auth);
        if(isNullOrUndefined(auth))
        {
          
          reject(false);
        }
        else
        {
          resolve(auth);
        }
      }))
    })
  }
  login(email:string,password:string)
  {
    return new Promise((resolve,reject)=>{
      this.AFauth.signInWithEmailAndPassword(email,password).then(user=>{
      resolve(user);
      }).catch(err=>{console.log('error: '+err)});
    })
    
  }
  logout()
  {
    this.AFauth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }
  logout_register()
  {
    this.AFauth.signOut().then(()=>{
      this.router.navigate(['/folder/Inbox']);
    });
  }

  register_firebase(email:string,password:string,na:string)
  {
    
    return new Promise((resolve,reject)=>{
      
      this.AFauth.createUserWithEmailAndPassword(email,password).then((res)=>{
        this.id=res.user.uid;
        resolve(res);
        //console.log(uid);
        
           /*this.bd.collection("users").doc(this.id).set({ 
          name:na,
          uid:this.id
            })
            .then(function() {
                console.log("USUARIO AGREGADO CORRECTAMENTE!!");
                //this.logout_register();
                //this.AFauth.signOut();
                
              })
            .catch(function(error) {
                console.error("ERROR : DOCUMENTO NO REGISTRADO: ", error);
            });*/
        
      }).catch(err=>reject(err));
  
    }) 
  }
  register_firebase_notifi(id:string,id_tutor:string,autor:string,curso:string,estudiante:string,nom_tutor:string,motivo:string,state:string)
  {
    return new Promise((resolve,reject)=>{

    this.bd.collection("notification").doc(id).set({ 
      id_tutor:id_tutor,
      name:nom_tutor,
      autor:autor,
      curso:curso,
      estudiante:estudiante,
      mesage:motivo,
      state:state,
      date:new Date(),    
    }).then(function() {
            resolve(true);
          })
        .catch(function(error) {
            reject(false);
        });
      })
  }
  getnotifi_firebase()
  {

    return this.bd.collection('notification').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as noti;
        data.id = a.payload.doc.id;
        return data;
      })
    }))

  }
  getnotifi_tutor_firebase(id:string)
  {
    return this.bd.collection('notification').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as noti;
        if(a.payload.doc.id==id)
        {
          data.id = a.payload.doc.id;
        }
        
        return data;
      })
    }))
  }
  update_notifi_tutor_firebase(id:string,id_tutor:string,autor:string,curso:string,estudiante:string,nom_tutor:string,motivo:string,state:string,date:Date)
  {
    return new Promise((resolve,reject)=>{

      this.bd.collection("notification").doc(id).set({ 
        id_tutor:id_tutor,
        name:nom_tutor,
        autor:autor,
        curso:curso,
        estudiante:estudiante,
        mesage:motivo,
        state:state,
        date:date   
      }).then(function() {
              resolve(true);
            })
          .catch(function(error) {
              reject(false);
          });
        })
  }
  delete_notificacion(id:string)
  {
    return new Promise((resolve,reject)=>{
      
      this.bd.collection("notification").doc(id).delete()
        .then(function() {
            
            resolve(true);
          })
        .catch(function(error) {
            reject(false);
        });
      })
  }
  register_firebase_informativo(id:string,name:string,image:string,contenido:string,state:string,date:Date)
  {
    return new Promise((resolve,reject)=>{

      //resolve(image);
    this.bd.collection("informativo").doc(id).set({ 
      urlImage:image,
      name:name,
      content:contenido,
      state:state,
      date:date,    
    }).then(function() {
            resolve(true);
          })
        .catch(function(error) {
            reject(false);
        });
      })
  }
  get_boletin_informativo_firebase()
  {

    return this.bd.collection('informativo').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as noti;
        data.id = a.payload.doc.id;
        return data;
      })
    }))

  }
  delete_bol_infor(id:string)
  {
    return new Promise((resolve,reject)=>{
      
      this.bd.collection("informativo").doc(id).delete()
        .then(function() {
            
            resolve(true);
          })
        .catch(function(error) {
            reject(false);
        });
      })
  }










  login_mysql(username,pass): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/login_user.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('username',username);
    postData.append('password',pass);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }



  /*MYSQL */
  //this.id,this.ci,this.nombre,this.apellido,this.ci,this.conversionEncryptOutput,this.numero_telefonico,this.tipo_usuario,this.domicilio
  register_user_mysql(id,ci,nombre,apellido,edad,username,pass,numero_telefono,tipo_usuario,domicilio): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/create_user.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',id);
    postData.append('ci',ci);
    postData.append('nombre',nombre);
    postData.append('apellido',apellido);
    postData.append('edad',edad);
    postData.append('username',username);
    postData.append('pass',pass);
    postData.append('numero_telefono',numero_telefono);
    postData.append('tipo_usuario',tipo_usuario);
    postData.append('domicilio',domicilio);
    let request=this.http.post(url,postData);
    return request.toPromise();
  
  }
  register_user_student_mysql(id,ci,nombre,apellido,edad,username,pass,numero_telefono,tipo_usuario,tutor,domicilio): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/create_user_student.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',id);
    postData.append('ci',ci);
    postData.append('nombre',nombre);
    postData.append('apellido',apellido);
    postData.append('edad',edad);
    postData.append('username',username);
    postData.append('pass',pass);
    postData.append('numero_telefono',numero_telefono);
    postData.append('tipo_usuario',tipo_usuario);
    postData.append('tutor',tutor);
    postData.append('domicilio',domicilio);
    let request=this.http.post(url,postData);
    return request.toPromise();
  
  }
  read_user_mysql(): Promise<any>{ 
    //let url="http://192.168.43.153:1010:1580/website/readcupos.php";
    let url="https://ue-toribio-claure.000webhostapp.com/read_table_user.php";
    let request=this.http.get(url);
    return request.toPromise();
  }
  update_password_mysql(uid,password): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/update_password.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',uid);
    postData.append('password',password);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_uid_user_mysql(uid): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_uid_user.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',uid);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  update_user_mysql(uid,ci,nombre,apellido,edad,username,pass,numero_telefonico,tipo_usuario,domicilio): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/update_user.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',uid);
    postData.append('ci',ci);
    postData.append('nombre',nombre);
    postData.append('apellido',apellido);
    postData.append('edad',edad);
    postData.append('username',username);
    postData.append('pass',pass);
    postData.append('numero_telefonico',numero_telefonico);
    postData.append('tipo_usuario',tipo_usuario);
    postData.append('domicilio',domicilio);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }

  update_user_curso_mysql(uid,curso): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/update_user_curso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',uid);
    postData.append('curso',curso);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  delete_user_mysql(id): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/delete_user.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',id);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  register_course_mysql(uid,nombre): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/create_curse.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',uid);
    postData.append('nombre',nombre);
    let request=this.http.post(url,postData);
    return request.toPromise();
  
  }
  
  read_curse_mysql(): Promise<any>{ 
    //let url="http://192.168.43.153:1010:1580/website/readcupos.php";
    let url="https://ue-toribio-claure.000webhostapp.com/read_table_curse.php";
    let request=this.http.get(url);
    return request.toPromise();
  }
  buscar_curso_mysql(name:string): Promise<any>{ 
    //let url="http://192.168.43.153:1010:1580/website/readcupos.php";
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_curso.php";
    let postData= new FormData();
    postData.append('name',name);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  delete_curso_mysql(id): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/delete_curso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',id);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_materias_idcurso_mysql(uid): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_materias_idcurso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('uid',uid);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_materias_nomcurso_mysql(nom): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_materias_nomcurso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('nom',nom);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  update_curso_acesor_mysql(uid,nombre_acesor): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/update_curso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',uid);
    postData.append('nombre_acesor',nombre_acesor);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  register_materia_mysql(uid,nombre_curso,nombre_materia,profesor): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/create_materia.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',uid);
    postData.append('nombre_curso',nombre_curso);
    postData.append('nombre_materia',nombre_materia);
    postData.append('nombre_profesor',profesor);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  update_materia_mysql(id,nombre_materia,profesor): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/update_materia.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',id);
    postData.append('nombre_materia',nombre_materia);
    postData.append('nombre_profesor',profesor);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  delete_materia_mysql(id): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/delete_materia.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',id);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  delete_materia_curso_mysql(id_curso): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/delete_materia_curso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',id_curso);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
/**NOTAASSS
 * 
 */
  register_notas_mysql(gestion,trimestre,id_estudiante,id_curso,id_materia,nota): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/create_nota.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('gestion',gestion);
    postData.append('trimestre',trimestre);
    postData.append('id_estudiante',id_estudiante);
    postData.append('id_curso',id_curso);
    postData.append('id_materia',id_materia);
    postData.append('nota',nota);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_notas_trim_student_mysql(gestion,trimestre,uid_student): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_nots.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('gestion',gestion);
    postData.append('trimestre',trimestre);
    postData.append('uid_studen',uid_student);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_notas_gestion_student_mysql(gestion,uid_student): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_nots_gestion.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('gestion',gestion);
    postData.append('uid_studen',uid_student);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_notas_idmateria_idestudiante_mysql(id_materia,trimestre,id_estudiante,gestion): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_nots_idmateria_idestudiante.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id_materia',id_materia);
    postData.append('trimestre',trimestre);
    postData.append('id_estudiante',id_estudiante);
    postData.append('gestion',gestion);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_notas_curso(nombre_curso): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_nots_nom_curso.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('nombre_curso',nombre_curso);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_materia_id_mysql(id): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_materia_id.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id',id);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  read_materias_mysql(): Promise<any>{ 
    //let url="http://192.168.43.153:1010:1580/website/readcupos.php";
    let url="https://ue-toribio-claure.000webhostapp.com/read_table_materias.php";
    let request=this.http.get(url);
    return request.toPromise();
  }

  /**FALTAS */
  register_faltas_mysql(id_estudiante,fecha,gestion): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/create_falta.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id_estudiante',id_estudiante);
    postData.append('fecha',fecha);
    postData.append('gestion',gestion);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  buscar_faltas_mysql(uid,gestion): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/buscar_faltas.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id_estudiante',uid);
    postData.append('gestion',gestion);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
  delete_faltas_mysql(id): Promise<any>{
    //let url="http://192.168.43.153:1010:1580/website/createcupos.php"; servidor local
    let url="https://ue-toribio-claure.000webhostapp.com/delete_falta.php";//SERVIDOR EN PHP PARA OTROS DISPOSITIVOS
    let postData= new FormData();
    postData.append('id_falta',id);
    let request=this.http.post(url,postData);
    return request.toPromise();
  }
}
