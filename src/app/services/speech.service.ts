import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

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

  constructor() {}

  listen(): Observable<string> {
    return new Observable<string>((observer) => {
      console.log('Listening....');
      const speech = new webkitSpeechRecognition();
      console.log('Object Created');
      console.log(speech);

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

      speech.addEventListener('result', resultHandler);
      speech.addEventListener('error', errorHandler);
      speech.start();

      return () => {
        speech.removeEventListener('result', resultHandler);
        speech.removeEventListener('error', errorHandler);
        speech.abort();
      };
    });
  }

  cleanSpeechResults(results): string {
    return results[0][0].transcript;
  }
}
