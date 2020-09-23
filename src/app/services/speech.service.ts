import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IWindow } from '../modules/shared/interfaces/Speech';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  // Subject for Search Box
  public _listenClicksSubject$ = new Subject<string>();
  private _listenClicks$ = this._listenClicksSubject$.asObservable();

  getListenClicks$(): Observable<string> {
    console.log('Getting Clicked event');
    return this._listenClicks$;
  }
  setListenClicks$(value: string) {
    console.log('Button clicked....In SpeechServive.ts');
    this._listenClicksSubject$.next(value);
  }

  speech: any;

  constructor() {
    const { webkitSpeechRecognition } = window as any;
    this.speech = new webkitSpeechRecognition();
  }

  listen(): Observable<string> {
    return new Observable<string>((observer) => {
      console.log('Listening....');
      // const speech = new webkitSpeechRecognition();

      console.log('Object Created');
      console.log(this.speech);

      const resultHandler = (e: any) => {
        console.log(e);
        const results: string = this.cleanSpeechResults(e.results);
        console.log(results);
        observer.next(results);
        observer.complete();
      };

      const errorHandler = (err) => {
        observer.error(err);
      };

      this.speech.addEventListener('result', resultHandler);
      this.speech.addEventListener('error', errorHandler);
      this.speech.start();

      return () => {
        this.speech.removeEventListener('result', resultHandler);
        this.speech.removeEventListener('error', errorHandler);
        this.speech.abort();
      };
    });
  }

  cleanSpeechResults(results): string {
    return results[0][0].transcript;
  }
}
