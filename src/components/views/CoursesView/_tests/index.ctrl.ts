import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CourseCardCtrl } from "../../../courses/CourseCard/_tests/index.ctrl";
export class CoursesViewCtrl {
  private courseCards: Selector;
  private controllers: Promise<CourseCardCtrl[]>;

  constructor(public selector: Selector, private t: TestController) {
    this.courseCards = this.selector.find(
      toTestSelector("CoursesView-courseCard"),
    );
  }

  public async initialise() {
    this.controllers = this.setupControllers();
    return true;
  }

  private async setupControllers() {
    await this.t.expect(this.courseCards.exists).ok();
    const a: CourseCardCtrl[] = [];

    for (let i = 0; i < (await this.courseCards.count); i++) {
      a[i] = new CourseCardCtrl(this.courseCards.nth(i), this.t);
    }
    return a;
  }

  public async coursesCount() {
    return (await this.controllers).length;
  }

  public async click(index: number) {
    (await this.controllers)[index].click();
  }
}
