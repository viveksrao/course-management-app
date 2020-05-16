import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// Imports for Loading & Configuring the in-memory-web-api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CourseData } from './course-data';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ConvertToSpacesPipe,
    CourseEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(CourseData),
    SharedModule,
    CourseRoutingModule,
  ],
})
export class CourseModule {}
