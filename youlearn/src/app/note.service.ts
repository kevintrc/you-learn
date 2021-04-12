import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Note } from './note.model';

export interface DataItems {
  title: string;
  imgPath: string;
  channelTitle: string;
  ID: string
}

export interface SearchResponseData {
  nextPageToken: string;
  prevPageToken: string;
  data: DataItems[];
}


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  videoData: DataItems[] = []
  publicData: Note[] = []
  prevPageToken: string
  nextPageToken: string

  constructor(private http: HttpClient) { }

  createNote(note: Note) {
    return this.http
      .post<Note>(
        'http://localhost:3000/notes',
        note
      )
  }

  searchVideos(term: string, npt: string, ppt: string) {
    let searchParams = new HttpParams()
    searchParams = searchParams.append('term', term)
    if (npt) {
      searchParams = searchParams.append('nextPageToken', npt)
    }
    else if (ppt) {
      searchParams = searchParams.append('prevPageToken', ppt)
    }
    else {
      this.videoData = [];
      this.nextPageToken = null;
      this.prevPageToken = null;
    }
    return this.http
      .get<SearchResponseData>("http://localhost:3000/search", { params: searchParams }).pipe(
        tap((resData) => {
          this.videoData = resData.data;
          this.nextPageToken = resData.nextPageToken;
          this.prevPageToken = resData.prevPageToken;
        })
      )
  }

  fetchPublic() {
    return this.http
      .get<Note[]>("http://localhost:3000/public").pipe(
        tap((resData) => {
          this.publicData = resData;
        })
      )
  }
  getUserNotes() {
    return this.http
      .get<Note[]>("http://localhost:3000/usernotes")
  }

  getVideo(id: number) {
    return this.videoData[id]
  }
}

