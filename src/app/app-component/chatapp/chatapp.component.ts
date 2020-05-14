import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/app-service/chat-service/chat.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {
  
  input_message = '';
  display_message = '';

  chatData = {
    'command' : 'new_message',
    'from' : '',
    'message' : "",
  }
  constructor(private _chat : ChatService) { }

  ngOnInit(): void {
    this.chatData['from'] = localStorage.getItem('username');
    this._chat.connect(this.chatData)
  }

  sendMessage($event) {
    this.chatData['message'] + '\n' +this.chatData['from'] + "   :   " + this.input_message
    this._chat.createMessage(this.chatData)
  }

  getMessage() {

  }

}
