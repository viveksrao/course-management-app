import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControlName,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';

import { ICourse } from '../course';
import { CourseService } from '../course.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic-validator';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  pageTitle = 'Course Edit';
  errorMessage: string;
  courseForm: FormGroup;

  course: ICourse;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.courseForm.get('tags') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    this.validationMessages = {
      courseName: {
        required: 'Course name is required.',
        minLength: 'Course name must be at least three characters.',
        maxLength: 'Course name cannot exceed 50 characters.',
      },
      courseCode: {
        required: 'Course code is required.',
      },
      starRating: {
        range: 'Rate the course between 1 (lowest) and 5 (highest).',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      courseCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: '',
    });
    // Read the course Id from the route parameter
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.getCourse(id);
    });
  }

  getCourse(id: number): void {
    this.courseService.getCourse(id).subscribe({
      next: (course: ICourse) => this.displayCourse(course),
      error: (err) => (this.errorMessage = err),
    });
  }

  displayCourse(course: ICourse): void {
    if (this.courseForm) {
      this.courseForm.reset();
    }
    this.course = course;
    if (this.course.id === 0) {
      this.pageTitle = 'Add Course';
    } else {
      this.pageTitle = `Edit Course: ${this.course.courseName}`;
    }
    // Update the data on the form
    this.courseForm.patchValue({
      courseName: this.course.courseName,
      courseCode: this.course.courseCode,
      starRating: this.course.starRating,
      description: this.course.description,
    });
    this.courseForm.setControl('tags', this.fb.array(this.course.tags || []));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<
      any
    >[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );
    merge(this.courseForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.courseForm
        );
      });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  saveCourse(): void {
    if (this.courseForm.valid) {
      if (this.courseForm.dirty) {
        const c = { ...this.course, ...this.courseForm.value };
        if (c.id === 0) {
          this.courseService.createCourse(c).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.courseService.updateCourse(c).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate(['/courses']);
  }

  deleteCourse(): void {
    if (this.course.id === 0) {
      // Don't delete, it was never saved
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the course: ${this.course.courseName}?`)) {
        this.courseService.deleteCourse(this.course.id).subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }
}
