import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  videos: Note[]
  isLoading = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.videos = this.noteService.publicData;
    this.getPublic()
  }
  getPublic() {
    this.isLoading = true;

    this.noteService.fetchPublic().subscribe(
      (resData) => {
        console.log(resData);
        this.videos = this.noteService.publicData
        this.isLoading = false
      },
      (errorData) => {
        console.log(errorData);
        this.isLoading = false
      }
    )
  }


}
