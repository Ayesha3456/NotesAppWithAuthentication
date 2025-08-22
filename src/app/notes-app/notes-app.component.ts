import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Note {
  title: string;
  description: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-notes-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.scss']
})
export class NotesAppComponent implements OnInit {
  notes: Note[] = [];
  newTitle = '';
  newDescription = '';
  currentUser = '';

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = user;
      this.loadNotes();
    }
  }

  addNote() {
    if (this.newTitle.trim() && this.newDescription.trim()) {
      this.notes.push({
        title: this.newTitle,
        description: this.newDescription,
        isEditing: false
      });
      this.saveNotes();
      this.newTitle = '';
      this.newDescription = '';
    }
  }

  editNote(note: Note) {
    note.isEditing = true;
  }

  saveEdit(note: Note) {
    note.isEditing = false;
    this.saveNotes();
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }

  saveNotes() {
    if (this.currentUser) {
      localStorage.setItem(`notes_${this.currentUser}`, JSON.stringify(this.notes));
    }
  }

  loadNotes() {
    const savedNotes = localStorage.getItem(`notes_${this.currentUser}`);
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }
}
