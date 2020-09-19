import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { IMessage } from '../../../modules/shared/interfaces/Message';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../modules/shared/interfaces/User';
import { SubSink } from 'subsink';
import { IProfile } from '../../../modules/shared/interfaces/Profile';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  loggedInUser: IUser;
  subscriptions = new SubSink();
  isReceiverNull: boolean = true;

  socketRef: WebSocket;
  path: string = 'wss://pibeedjango.herokuapp.com/ws/chat/';
  // path: string = 'ws://localhost:8000/ws/chat/';

  display = {
    messageArray: [],
  };

  message: IMessage = {
    sender: '',
    receiver: '',
    content: '',
  };

  loggedInUser$: Observable<IUser>;
  allUsersProfile: IProfile[];

  constructor(private _chat: ChatService, private _data: DataService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
    this.setLoggedInUser();
    this.setAllUsersProfiles();
    this.message.sender = this.loggedInUser?.username;
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
      console.log(data);
      let receiverdMessageArray = data['messages'];
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
      this.message.receiver
    );
  }

  setLoggedInUser() {
    this.subscriptions.sink = this._data.loggedInUser$.subscribe(
      (getLoggedInUserResponse) => {
        this.loggedInUser = getLoggedInUserResponse;
      }
    );
  }

  setIsReceiverNull(receiver: IUser) {
    this.message.receiver = receiver.username;
    this.path += this.message.sender + '/' + this.message.receiver + '/';
    console.log(this.path);
    this.connect();
    this.isReceiverNull = false;
  }

  setAllUsersProfiles() {
    this.subscriptions.sink = this._data.allUsersProfile$.subscribe(
      (getAllUsersProfileResponse) => {
        console.log(getAllUsersProfileResponse);
        this.allUsersProfile = getAllUsersProfileResponse;
      }
    );
  }

  matchingUsersArray$ = this._data.searchQueryChangeSubject$.pipe(
    switchMap((partial) =>
      this._data.suggestNames(this.allUsersProfile, partial)
    )
  );
}
