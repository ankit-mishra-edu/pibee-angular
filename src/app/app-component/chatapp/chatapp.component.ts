import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/app-service/chat-service/chat.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {

  formData = {
    'display_message' : '',
    'author' : ''
  }

  sendData = {
    'command' : 'new_message',
    'author' : '',
    'content' : "",
  }

  constructor(private _chat : ChatService) { }

  ngOnInit(): void {
    this.sendData['author']= this.formData['author'] = localStorage.getItem('username');
    this._chat.connect(this.formData)
  }

  sendMessage() {
    this._chat.createMessage(this.sendData)
  }

  getMessage() {
    this._chat.getMessage(localStorage.getItem('username'))
  }
}
