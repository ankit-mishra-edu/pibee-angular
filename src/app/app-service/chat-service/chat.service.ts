import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socketRef;
  callbacks = {}

  constructor(private _http : HttpClient) { }

  connect(formData) {
    let path = 'ws://127.0.0.1:8000/ws/chat/lobby/';
    this.socketRef = new WebSocket(path);
    
    this.socketRef.onopen = () => {console.log('websocket open');this.getMessage('amishm766')}

    this.socketRef.onmessage = e => {
      console.log(e);
      const data = JSON.parse(e.data);

      if (data['command'] === 'messages') {
        console.log(data['messages'][0])
        for (let i=0; i<data['messages'].length; i++) {
          formData['display_message'] += '\n' + data['messages'][i]['author'] + '   :   ' + data['messages'][i]['content'];
        }
      }
      
      else if (data['command'] === 'new_message'){
        formData['display_message'] += '\n' + data.message['author'] + '   :   ' + data.message.content;
      }
      // formData['display_message'] += '\n' + data.message['author'] + '   :   ' + data.message.content;
    }

    this.socketRef.onerror = e => { console.log(e.message);}

    this.socketRef.onclose = () => {
      console.log('websocket is closed');
      this.connect(formData);
    }
  }

  getMessage(username) {
    this.sendMessage({ command : 'fetch_messages'});
  }

  createMessage(message) {
    return(this.sendMessage({ command : 'new_message', from : message.author, message : message.content}));
  }

  sendMessage(data)  {
    try {
      return(this.socketRef.send(JSON.stringify({ ...data})))

    } catch (error) {
      console.log(error)
    }
  }

  socketNewMessaage(data) {
    // let parsedData = JSON.parse(data);
    let parsedData = data;
    let command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) { return; }

    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }

    if (command === 'new_message') {
      this.callbacks[command](parsedData.messages);
    }
  }

  addCallbacks(messagesCallback, createMessageCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = createMessageCallback;
  }

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;

    setTimeout(
      function() {
        if (socket.readyState === 1) {
          console.log('connection is secure');
          if (callback != null) {
            callback();
          }
          return;
        }
        else {
          console.log('waiting for connection');
          recursion(callback)
        }
      },1);
  }
}
