import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  pageTitle: string = 'Course Detail';
  errorMessage = '';
  course: ICourse | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    let param = +this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCourse(id);
    }
  }

  getCourse(id: number) {
    this.courseService.getCourse(id).subscribe({
      next: (course) => (this.course = course),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/courses']);
  }
}
