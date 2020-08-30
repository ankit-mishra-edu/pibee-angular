import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { IMessage } from 'src/app/interfaces/Message';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  loggedInUser: IUser;
  subscriptions = new SubSink();

  socketRef: WebSocket;
  path: string = 'wss://pibeedjango.herokuapp.com/ws/chat/ankit/';

  display = {
    messageArray: [],
  };

  message: IMessage = {
    sender: '',
    receiver: 'amishm766',
    content: '',
  };

  constructor(private _chat: ChatService, private _data: DataService) {}

  ngOnInit(): void {
    this.setLoggedInUser();
    this.message.sender = this.loggedInUser?.username;
    this.connect();
  }

  connect() {
    this.socketRef = new WebSocket(this.path);

    this.socketRef.onopen = () => {
      console.log('websocket open');
      this.getMessage();
    };

    this.socketRef.onmessage = (e) => {
      console.log(e);
      const data = JSON.parse(e.data);
      let receiverdMessageArray = data[data.command];
      console.log(receiverdMessageArray);
      let alignment: string = 'left';
      for (let i = 0; i < receiverdMessageArray.length; i++) {
        if (receiverdMessageArray[i].sender == this.loggedInUser?.username) {
          alignment = 'right';
          receiverdMessageArray[i].sender = 'You';
        } else {
          alignment = 'left';
        }
        // document.getElementById("dataBlock").append('<p>receiverdMessageArray[i].content</p>')
        this.display.messageArray.push({
          alignment: alignment,
          message: receiverdMessageArray[i],
        });
      }
    };

    this.socketRef.onerror = (e) => {
      console.log(e);
    };

    this.socketRef.onclose = () => {
      console.log('websocket is closed');
      this.connect();
    };
  }

  createMessage() {
    this._chat.createMessage(this.socketRef, this.message);
    this.message.content = ''; // Refreshes the input element after the message is created
  }

  getMessage() {
    this._chat.getMessage(
      this.socketRef,
      this.loggedInUser?.username,
      'amishm766'
    );
  }

  setLoggedInUser() {
    this.subscriptions.sink = this._data.loggedInUser$.subscribe(
      (getLoggedInUserResponse) => {
        this.loggedInUser = getLoggedInUserResponse;
      }
    );
  }
}
