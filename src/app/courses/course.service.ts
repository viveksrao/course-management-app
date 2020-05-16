import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ICourse } from './course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseUrl = 'api/courses';
  constructor(private http: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.courseUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createCourse(course: ICourse): Observable<ICourse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    course.id = null;
    return this.http
      .post<ICourse>(this.courseUrl, course, { headers })
      .pipe(
        tap((data) => console.log('createCourse: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCourse(id: number): Observable<ICourse> {
    if (id === 0) {
      return of(this.initializeCourse());
    }
    const url = `${this.courseUrl}/${id}`;
    return this.http.get<ICourse>(url).pipe(
      tap((data) => console.log('getCourse: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.courseUrl}/${course.id}`;
    return this.http
      .put<ICourse>(url, course, { headers: headers })
      .pipe(
        tap(() => console.log('updateCourse: ' + course.id)),
        // Return the course on an update
        map(() => course),
        catchError(this.handleError)
      );
  }

  deleteCourse(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.courseUrl}/${id}`;
    return this.http
      .delete<ICourse>(url, { headers: headers })
      .pipe(
        tap((data) => console.log('deleteCourse: ' + id)),
        catchError(this.handleError)
      );
  }

  private initializeCourse(): ICourse {
    return {
      id: 0,
      courseName: null,
      courseCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null,
    };
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
