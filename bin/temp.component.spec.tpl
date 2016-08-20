import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';

import { <%= classifiedName %>Component } from './<%= name %>.component';

describe('Component: <%= classifiedName %>', () => {
  it('should create an instance', () => {
    let component = new <%= classifiedName %>Component();
    expect(component).toBeTruthy();
  });
});
