import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'sol-<%= name %>',
  template: require('./<%= name %>.component.html'),
  styles: [require('./<%= name %>.component.css')]
})
export class <%= classifiedName %>Component implements OnInit {

  constructor() {}

  ngOnInit() {}

}
