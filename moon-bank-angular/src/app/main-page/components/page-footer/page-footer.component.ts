import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css']
})
export class PageFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  facebookLink() {
    console.log('facebook link');
  }

  twitterLink() {
    console.log('twitter link');
  }

  linkedInLink() {
    console.log('linkedIn link');
  }

  youtubeLink() {
    console.log('youtube link');
  }

  searchPostal() { 
    console.log("search postal")
  }

}
