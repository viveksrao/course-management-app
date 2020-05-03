import { NgModule } from '@angular/core';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [SharedModule, CourseRoutingModule],
})
export class CourseModule {}
