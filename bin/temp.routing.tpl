import { Routes, RouterModule } from '@angular/router';

import { <%= classifiedName %>Component }    from './<%= name %>.component';

const <%= name %>Routes: Routes = [
  { path: '<%= name %>',  component: <%= classifiedName %>Component }
];

export const <%= name %>Routing = RouterModule.forChild(<%= name %>Routes);
