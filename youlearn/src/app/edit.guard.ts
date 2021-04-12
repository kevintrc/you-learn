import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  constructor(private noteService: NoteService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isEdit = !!this.noteService.nextPageToken
    if (!isEdit) {
      this.router.navigate(['/search'])
    }
    return isEdit;
  }

}
