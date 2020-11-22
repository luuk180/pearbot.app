import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormBuilder} from '@angular/forms';

export interface Item { name: string; }

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageForm;

  private itemsCollection: AngularFirestoreCollection<Item>;
  entries: Observable<Item[]>;
  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
  ) {
    this.itemsCollection = afs.collection<Item>('messages');
    this.entries = this.itemsCollection.valueChanges(['added', 'removed']);

    this.messageForm = this.formBuilder.group({
      message: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit(messageSent) {
    console.log(messageSent);
    var timestamp = new Date();
    this.itemsCollection.add({
      message: messageSent.message,
      time: timestamp
    });
    this.messageForm.reset();
  }

}
