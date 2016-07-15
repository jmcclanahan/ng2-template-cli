/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { <%= classifiedName %> } from './<%= name %>.directive';

describe('<%= classifiedName %> Directive', () => {
  it('should create an instance', () => {
    let directive = new <%= classifiedName %>();
    expect(directive).toBeTruthy();
  });
});
