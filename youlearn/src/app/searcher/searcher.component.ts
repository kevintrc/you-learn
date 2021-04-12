import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataItems, NoteService, SearchResponseData } from '../note.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  error = null
  nextPageToken = null
  prevPageToken = null
  curTerm = null
  videos: DataItems[]
  isLoading = false;

  searchForm: FormGroup
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'term': new FormControl(null, [Validators.required])
    })
    this.nextPageToken = this.noteService.nextPageToken
    this.prevPageToken = this.noteService.prevPageToken
    this.videos = this.noteService.videoData
  }
  search(mode: number) {
    this.isLoading = true;
    this.error = null;
    let SearchOb: Observable<SearchResponseData>
    if (mode === 0) {
      const term = this.searchForm.get('term').value;
      this.curTerm = term;
      SearchOb = this.noteService.searchVideos(term, null, null)
    } else if (mode === -1) {
      if (!this.prevPageToken) return
      const term = this.curTerm
      SearchOb = this.noteService.searchVideos(term, null, this.prevPageToken)
    } else if (mode === 1) {
      if (!this.nextPageToken) return
      const term = this.curTerm
      SearchOb = this.noteService.searchVideos(term, this.nextPageToken, null)
    }
    this.scrollToTop()
    SearchOb.subscribe(
      (resData) => {
        this.nextPageToken = this.noteService.nextPageToken
        this.prevPageToken = this.noteService.prevPageToken
        this.videos = this.noteService.videoData
        this.isLoading = false
      },
      (errorData) => {
        this.error = errorData.message
        this.isLoading = false
      }
    )
  }

  private scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 4);
  }

}