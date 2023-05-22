import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-manage-bookmarks',
  templateUrl: './manage-bookmarks.component.html',
  styleUrls: ['./manage-bookmarks.component.scss']
})
export class ManageBookmarksComponent implements OnInit {

  bookmarks: Bookmark[]
  bookmarkService: any;

  constructor() { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks()
  }

}
