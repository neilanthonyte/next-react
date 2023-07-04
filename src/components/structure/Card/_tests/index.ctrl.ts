import { CircularMetricCtrl } from "../../../generic/CircularMetric/_tests/index.ctrl";
import { LoaderCtrl } from "../../../generic/Loader/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CellCtrl } from "../../Cell/_tests/index.ctrl";

export class CardCtrl {
  public leadCell: CellCtrl;
  public circularMetric: CircularMetricCtrl;
  public fallback: Selector;
  public loader: LoaderCtrl;
  private header: Selector;
  private body: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.leadCell = new CellCtrl(selector.find(toTestSelector("leadCell")), t);
    this.circularMetric = new CircularMetricCtrl(
      selector.find(toTestSelector("metric")),
      t,
    );
    this.loader = new LoaderCtrl(selector, t);
    this.header = selector.find(toTestSelector("card-header"));
    this.body = selector.find(toTestSelector("card-body"));
    this.fallback = selector.find(toTestSelector("fallback"));
  }

  public async click() {
    await this.t.click(this.selector);
  }

  public async clickCardWithTitle(title: string) {
    await this.t.click(this.selector.withText(title));
  }

  public async expectToShowBodyContent(text: string) {
    return this.t.expect(await this.body.innerText).eql(text);
  }

  public async expectToShowHeaderTitle(title: string) {
    return this.t.expect(await this.header.innerText).eql(title);
  }

  public async expectToShowDatasets(metric: string) {
    // check the element exists
    await this.t.expect(this.header.exists).ok();
    await this.circularMetric.expectToSeeContent(metric);
  }

  public async expectToSeeLoader() {
    return await this.loader.expectLoader(true);
  }

  public async expectToShowFallback() {
    await this.t.expect(this.fallback.exists).ok();
    await this.t
      .expect(this.fallback.innerText)
      .eql("No records in our system.");
  }

  public async expectContentLength(num: number) {
    const words = (await this.body.innerText).split(/\s+/g);
    return this.t.expect(words.length).eql(num);
  }
}
