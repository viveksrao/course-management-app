import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseDetailGuard } from './course-detail.guard';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseEditGuard } from './course-edit.guard';

const routes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'courses/:id',
    canActivate: [CourseDetailGuard],
    component: CourseDetailComponent,
  },
  {
    path: 'courses/:id/edit',
    canDeactivate: [CourseEditGuard],
    component: CourseEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
