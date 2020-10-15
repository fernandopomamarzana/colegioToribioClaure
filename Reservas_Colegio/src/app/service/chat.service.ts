import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { message } from '../moldeos/message';
import { message_curse } from '../moldeos/message_curse';

import { firestore } from 'firebase';

export interface chat{
  name1:string,
  name2:string,
  name:string,
  id:string,
  uid1:string,
  uid2:string,
  messages:Array<any>,
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
uid_auto:string;
public array:any;
constructor(
    private bd:AngularFirestore,
  ) { }

  getcharRoots()
  {

    return this.bd.collection('ChatRooms').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as chat;
        data.id = a.payload.doc.id;
        return data;
      })
    }))

  }
  getChatRoom_session(chat_id1:string)
  {
    console.log("uid de"+chat_id1);
    return this.bd.collection('ChatRooms').doc(chat_id1).valueChanges();
  }
  getChatRoom_chat(chat_id:string)
  {
    return this.bd.collection('ChatRooms').doc(chat_id).valueChanges();
  }
  getChatRoom_curso(id:string)
  { 
    return (this.bd.collection('ChatRooms').doc(id).valueChanges());
  }

  sendMessageToFirebase(message:message,chat_id:string)
  {
    this.bd.collection('ChatRooms').doc(chat_id).update({
      messages:firestore.FieldValue.arrayUnion(message),//hace como un push
    });
  }
  setchatRoots(message:message,id:string,uid1:string,name1:string,uid2:string,name2:string)
  {
    return new Promise((resolve,reject)=>{
      
      this.bd.collection("ChatRooms").doc(id).set({ 
        uid1:uid1,
        uid2:uid2,
        name1:name1,
        name2:name2,
        messages:firestore.FieldValue.arrayUnion(message),//hace como un push
    
        /*messages:{
          id:uid2,
          content:message,
          date:new Date,
          type:"Text",
        }*/
        })
        .then(function() {
            console.log("USUARIO AGREGADO CORRECTAMENTE!!");
              
          })
        .catch(function(error) {
            console.error("ERROR : DOCUMENTO NO REGISTRADO: ", error);
        });
      });
  }
  getcharRoots_name_curso(name:string)
  {
    //return new Promise((resolve,reject)=>{
      return this.bd.collection("ChatRooms", ref =>ref.where('name','==',name)).snapshotChanges().pipe(map(rooms=> {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as chat;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  getcharRoots_name_user_uid1(uid:string)
  {
      this.array=this.bd.collection('ChatRooms', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.where('uid1', '==', uid);
          //console.log(query);
          return query;
        }).valueChanges()
        return this.array;
  }
  getcharRoots_name_user_uid2(uid:string)
  {
      this.array=this.bd.collection('ChatRooms', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.where('uid2', '==', uid);
          //console.log(query);
          return query;
        }).valueChanges()
        return this.array;
  }
set_chatrooms_curse(message:message_curse,uid:string,nombre:string)
{
  //console.log(this.bd.collection("curse").doc());
  
  
  return new Promise((resolve,reject)=>{
    var id=uid;
    this.bd.collection("ChatRooms").doc(id).set({ 
    name:nombre,
    messages:firestore.FieldValue.arrayUnion(message),//hace como un push
    

      })
      .then(function() {
          console.log("CURSO AGREGADO CORRECTAMENTE!!");
          
          resolve(id);
        })
      .catch(function(error) {
          console.error("ERROR : DOCUMENTO NO REGISTRADO: ", error);
      });
    })
}
delete_chatrooms_curse(id:string)
{
  return new Promise((resolve,reject)=>{
    
    this.bd.collection("ChatRooms").doc(id).delete()
      .then(function() {
          
          resolve(true);
        })
      .catch(function(error) {
          reject(false);
      });
    })
}

}
