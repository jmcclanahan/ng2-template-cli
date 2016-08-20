import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'sol-<%= dasherizedName %>',
  template: require('./<%= name %>.component.html'),
  styles: [require('./<%= name %>.component.css')]
})
export class <%= classifiedName %>Component implements OnInit {

  constructor() {}

  ngOnInit() {}

}
