import { Component, OnInit } from '@angular/core';
import { ICourse } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  performFilter(filterBy: string): ICourse[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.courses.filter(
      (course: ICourse) =>
        course.courseName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
  pageTitle: string = 'Course List';
  imageBorderRadius: number = 2;
  showCourseImage: boolean = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCourses = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.courses;
  }

  filteredCourses: ICourse[];
  courses: ICourse[] = [];

  toggleCourseImage(): void {
    this.showCourseImage = !this.showCourseImage;
  }
  constructor(private courseService: CourseService) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Course List: ' + message;
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filteredCourses = this.courses;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
