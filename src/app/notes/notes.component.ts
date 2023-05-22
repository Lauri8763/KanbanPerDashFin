import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [
    new Note ('Test title', 'Test content')
  ]

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes()
  }

}
