/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { <%= classifiedName %>Pipe } from './<%= name %>.pipe';

describe('Pipe: <%= classifiedName %>', () => {
  it('create an instance', () => {
    let pipe = new <%= classifiedName %>Pipe();
    expect(pipe).toBeTruthy();
  });
});
