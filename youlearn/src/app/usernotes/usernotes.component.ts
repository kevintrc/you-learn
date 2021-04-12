import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-usernotes',
  templateUrl: './usernotes.component.html',
  styleUrls: ['./usernotes.component.css']
})
export class UsernotesComponent implements OnInit {

  videos: Note[]
  isLoading = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes() {
    this.isLoading = true;
    this.noteService.getUserNotes().subscribe(
      (resData) => {
        console.log(resData);
        this.videos = resData;
        this.isLoading = false
      },
      (errorData) => {
        console.log(errorData);
        this.isLoading = false
      }
    )
  }
}