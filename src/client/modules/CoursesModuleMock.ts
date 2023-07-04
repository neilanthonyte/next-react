import { injectable } from "inversify";
import * as _ from "lodash";

import { Course } from "next-shared/src/models/Course";
import { mockCourses } from "next-shared/src/mockData/mockCourses";

import { ICoursesModule } from "../modules/CoursesModule";

@injectable()
export class MockCoursesModule implements ICoursesModule {
  public async retrieveCourses(): Promise<Course[]> {
    return mockCourses;
  }
}
