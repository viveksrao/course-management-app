export interface ICourse {
  id: number;
  courseName: string;
  courseCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  tags?: string[];
}
