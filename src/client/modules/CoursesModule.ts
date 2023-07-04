import { inject, injectable } from "inversify";

import { Course, ICourse } from "next-shared/src/models/Course";
import { IHttpConnection } from "../connections/HttpConnection";

export interface ICoursesModule {
  retrieveCourses(): Promise<Course[]>;
}

@injectable()
export class CoursesModule implements ICoursesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveCourses(): Promise<Course[]> {
    const res = await this._httpConnection.makeRequest({
      url: "courses",
      method: "get",
    });

    if (!res.courses) {
      console.warn("missing courses");
      return null;
    }

    const courses: Course[] = res.courses.map((a: ICourse) =>
      Course.unserialize(a),
    );
    // filter out broken courses
    courses.filter((a) => {
      try {
        a.validate();
      } catch {
        console.warn(`invalid course: ${a.slug}`);
        return false;
      }
      return true;
    });

    return courses;
  }
}
