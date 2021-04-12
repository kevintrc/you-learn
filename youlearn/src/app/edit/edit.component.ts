import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from '../note.model';
import { DataItems, NoteService } from '../note.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  video: DataItems = null
  id: number;
  noteForm: FormGroup
  link = "https://www.youtube.com/embed/fIxM_BP3Mtc?rel=0"

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.video = this.noteService.getVideo(this.id)
          if (!this.video) return
          this.link = "https://www.youtube.com/embed/" + this.video.ID + "?rel=0"
        }
      )
    this.noteForm = new FormGroup({
      'note': new FormControl(null, Validators.required),
      'public': new FormControl(null, Validators.required),
    })
  }
  onSubmit() {
    const postData: Note = {
      title: this.video.title,
      imgPath: this.video.imgPath,
      videoId: this.video.ID,
      note: this.noteForm.get('note').value,
      public: !!this.noteForm.get('public').value
    }
    this.noteService.createNote(postData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/search'])
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

