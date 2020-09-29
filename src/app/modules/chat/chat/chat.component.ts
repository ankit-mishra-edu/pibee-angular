import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { IMessage } from '../../../modules/shared/interfaces/Message';
import { DataService } from '../../../services/data.service';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { IUser } from '../../../modules/shared/interfaces/User';
import { SubSink } from 'subsink';
import { IProfile } from '../../../modules/shared/interfaces/Profile';
import { switchMap } from 'rxjs/operators';
import { SpeechService } from 'src/app/services/speech.service';

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
  // path: string = 'ws://localhost:8000/ws/chat/';
  path: string = 'wss://pibeedjango.herokuapp.com/ws/chat/';

  display = {
    messageArray: [],
  };

  message: IMessage = {
    sender: '',
    receiver: '',
    content: '',
  };

  loggedInUser$: Observable<IUser> = this._data.getLoggedInUser$();
  allUserProfiles$: Observable<IProfile[]> = this._data.getAllUserProfile$();

  constructor(
    private _data: DataService,
    private _chat: ChatService,
    private _speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.getLoggedInUser$();
    this.setLoggedInUser();
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

  createMessage(message) {
    if (message != '') {
      this.message.content = message.value;
      this._chat.createMessage(this.socketRef, this.message);
      message.value = '';
      this.message.content = ''; // Refreshes the input element after the message is created
      // this.spokenKeyword$ = new Observable<''>();
    }
  }

  getMessage() {
    this._chat.getMessage(
      this.socketRef,
      this.loggedInUser?.username,
      this.message.receiver
    );
  }

  setLoggedInUser() {
    this.subscriptions.sink = this._data
      .getLoggedInUser$()
      .subscribe((getLoggedInUserResponse) => {
        this.loggedInUser = getLoggedInUserResponse;
      });
  }

  setIsReceiverNull(receiver: IUser) {
    this.message.receiver = receiver.username;
    this.path += this.message.sender + '/' + this.message.receiver + '/';
    console.log(this.path);
    this.connect();
    this.isReceiverNull = false;
  }

  // Get All the Typed and Spoken Keywords from SearchBox, Merge them and process
  searchBoxTypedKeywords$ = this._data.getSearchBoxQuery$();

  searchBoxSpokenKeyword$ = this._speechService
    .getListenClicks$()
    .pipe(switchMap(() => this._speechService.listen()));

  searchBoxKeywords$ = merge(
    this.searchBoxTypedKeywords$,
    this.searchBoxSpokenKeyword$
  );

  suggestedUsers$ = combineLatest([
    this.searchBoxKeywords$,
    this.allUserProfiles$,
  ]).pipe(
    switchMap(([keyword, allUserProfiles]) =>
      this._data.ProcessKeywords(keyword, allUserProfiles, this.suggestUsers)
    )
  );

  suggestUsers(
    keyword: string,
    allUsersProfile: IProfile[]
  ): Observable<IProfile[]> {
    let usernamesArray: IProfile[] = [];
    console.log(keyword);
    allUsersProfile?.forEach((userProfile) => {
      if (
        userProfile.address.user.username
          .toLowerCase()
          .includes(keyword.toLowerCase()) &&
        keyword != ''
      ) {
        usernamesArray.push(userProfile);
      }
    });
    console.log(usernamesArray);
    return of(usernamesArray);
  }

  // For Sending Chats
  setListenClicks$() {
    console.log('Button clicked....In SearchBox.ts');
    this._speechService.setListenClicks$('1');
  }

  chatSpokenKeyword$ = this._speechService
    .getListenClicks$()
    .pipe(switchMap(() => this._speechService.listen()));
}
