import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICourse } from './course';

export class CourseData implements InMemoryDbService {
  createDb() {
    const courses: ICourse[] = [
      {
        id: 1,
        courseName: 'Adding Graphics to Web Pages Using Canvas and SVG',
        courseCode: 'GDN-0011',
        releaseDate: 'Apr 24, 2020',
        description:
          'When you’re finished with this course, you’ll have the skills and knowledge of web-based graphics needed to create rich and unique user experiences by adding custom graphics to your web pages.',
        price: 19.95,
        starRating: 3.2,
        imageUrl:
          'assets/images/adding-graphics-web-pages-using-canvas-svg-v1.png',
        tags: ['Canvas', 'SVG'],
      },
      {
        id: 2,
        courseName: 'Angular: Getting Started',
        courseCode: 'GDN-0023',
        releaseDate: 'Apr 20, 2020',
        description:
          'By the end of this course, you will be up to date on all the latest Angular knowledge and you will be able to use Angular to create great apps in the future.',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/angular-2-getting-started-update-v1.jpg',
        tags: ['Angular'],
      },
      {
        id: 5,
        courseName: 'React: Getting Started',
        courseCode: 'TBX-0048',
        releaseDate: 'Apr 19, 2020',
        description:
          'When you are finished with this course, you will have the skills and knowledge you need to understand React projects, and start simple React applications from scratch.',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/react-js-getting-started-v2.png',
        tags: ['React'],
      },
      {
        id: 8,
        courseName: 'Server Rendering React Components',
        courseCode: 'TBX-0022',
        releaseDate: 'Apr 16, 2020',
        description:
          "When you're finished with this course, you'll have a broad range of React, Express, and server-rendering skills you can apply to both personal projects and full-scale enterprise applications.",
        price: 11.55,
        starRating: 3.7,
        imageUrl: 'assets/images/server-rendering-react-components-v1.png',
        tags: ['Server Rendering', 'React', 'Components'],
      },
      {
        id: 10,
        courseName: 'Optimize Performance for React',
        courseCode: 'GMG-0042',
        releaseDate: 'Apr 15, 2020',
        description:
          'When you’re finished with this course, you’ll have the skills and knowledge of React performance needed to ensure that your React apps download and execute as fast as possible.',
        price: 35.95,
        starRating: 4.6,
        imageUrl: 'assets/images/optimize-performance-react-v1.png',
        tags: ['Optimization', 'React'],
      },
      {
        id: 10,
        courseName: 'Postman Fundamentals',
        courseCode: 'PMF-0042',
        releaseDate: 'Apr 17, 2020',
        description:
          'Postman is used by over 3 million developers across the world. This course will show you the fundamentals of Postman, how you can issue requests, create automated API tests, and even document your API with Postman.',
        price: 45.95,
        starRating: 3.6,
        imageUrl: 'assets/images/software-development.jpg',
        tags: ['Postman', 'API'],
      },
      {
        id: 11,
        courseName: 'Angular NgRx: Getting Started',
        courseCode: 'NGRX-001',
        tags: [
          'Angular',
          'NgRx',
          'Store',
          'Actions',
          'Reducers',
          'Effects',
          'Selectors',
        ],
        releaseDate: 'Jun 25, 2018',
        price: 100.0,
        description:
          'NgRx is a powerful library for organizing and managing state and interactions with that state in your Angular applications using the redux pattern. This course gets you started with NgRx including a store, actions, reducers, effects, and selectors.',
        starRating: 5,
        imageUrl:
          'assets/images/adding-graphics-web-pages-using-canvas-svg-v1.png',
      },
    ];
    return { courses };
  }
}
