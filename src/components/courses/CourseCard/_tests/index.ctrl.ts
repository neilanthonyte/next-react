import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CardCtrl } from "../../../structure/Card/_tests/index.ctrl";
import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";
import { ImgBlockCtrl } from "../../../generic/ImgBlock/_tests/index.ctrl";
import { Course } from "next-shared/src/models/Course";

export class CourseCardCtrl {
  public card: CardCtrl;
  public cell: CellCtrl;
  public decorationImage: ImgBlockCtrl;
  private courseDetails: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.courseDetails = this.selector.find(toTestSelector("course-detail"));
    this.card = new CardCtrl(selector, t);
    this.cell = new CellCtrl(selector, t);
    const decorationImage = this.selector.find(
      toTestSelector("card-body-decoration-image"),
    );
    this.decorationImage = new ImgBlockCtrl(decorationImage, t);
  }

  public async click() {
    await this.card.click();
  }

  public async expectHeader(text: string) {
    return await this.t.expect(await this.cell.getHeading()).eql(text);
  }

  public async expectArticleTitles(details: string[]) {
    await this.t.expect(this.courseDetails.count).eql(details.length);
    for (let i = 0; i < (await details.length); i++) {
      await this.t.expect(this.courseDetails.nth(i).innerText).eql(details[i]);
    }
  }

  public async expectImageToShow() {
    await this.t.expect(this.decorationImage.exists).ok();
    await this.t.expect(await this.decorationImage.exists()).ok();
  }

  // HIGH-LEVEL FUNCTIONS

  public async expectCourse(course: Course) {
    await this.expectHeader(course.title);
    if (course.posterImage) {
      await this.expectImageToShow();
    }
  }
}
