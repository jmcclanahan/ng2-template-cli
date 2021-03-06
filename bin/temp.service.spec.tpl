import { addProviders, async, inject } from '@angular/core/testing';

import { <%= classifiedName %>Service } from './<%= name %>.service';

describe('<%= classifiedName %> Service', () => {
  beforeEachProviders(() => [<%= classifiedName %>Service]);

  it('should ...',
      inject([<%= classifiedName %>Service], (service: <%= classifiedName %>Service) => {
    expect(service).toBeTruthy();
  }));
});
