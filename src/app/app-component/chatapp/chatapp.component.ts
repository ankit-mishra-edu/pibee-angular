import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/app-service/chat-service/chat.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {

  socketRef : WebSocket;
  path : string = 'ws://127.0.0.1:8000/ws/chat/lobby/' ; 

  formData = {
    'display_message' : '',
    'author' : ''
  }

  sendData = {
    'command' : 'create_message',
    'author' : '',
    'content' : "",
  }

  constructor(private _chat : ChatService) { }

  ngOnInit(): void {
    this.sendData['author'] = this.formData['author'] = localStorage.getItem('username');
    this.connect()
  }

  connect() {

    this.socketRef = new WebSocket(this.path);
    
    this.socketRef.onopen = () => {
      console.log('websocket open');
      this.getMessage();
    }

    this.socketRef.onmessage = e => {
      console.log(e);
      const data = JSON.parse(e.data);
      console.log(data)
      for (let i=0; i<data[data['command']].length; i++) {
        this.formData['display_message'] += '\n' +
        data[data['command']][i]['author'] + '   :   ' + 
        data[data['command']][i]['content'];
      }
    }

    this.socketRef.onerror = e => { console.log(e);}

    this.socketRef.onclose = () => {
      console.log('websocket is closed');
      this.connect();
    }
  }

  createMessage() {
    this._chat.createMessage(this.socketRef, this.sendData)
    this.sendData['content'] = "";  // Refreshes the input element after the message is created
  }

  getMessage() {
    this._chat.getMessage(this.socketRef, localStorage.getItem('username'))
  }
}
