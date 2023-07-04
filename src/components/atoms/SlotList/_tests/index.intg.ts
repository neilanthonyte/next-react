import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SlotListCtrl } from "./index.ctrl";
import { delay } from "../../../../helpers/delay";

const BOOKING_WIDGET_STANDARD_URL = "http://localhost:6060/#/SlotList";

fixture("SlotList").page(BOOKING_WIDGET_STANDARD_URL);

test("Clicking on an slot fires the callback with correct slot", async (t) => {
  const example = Selector(toTestSelector("SlotList-scenario-standard"));
  const slotList = new SlotListCtrl(example, t);

  const clicked = example.find(toTestSelector("clicked"));

  await slotList.clickSlot(3);
  await t.expect(clicked.innerText).eql("2019-05-17T09:30:00+10:00");
  await slotList.clickSlot(1);
  await t.expect(clicked.innerText).eql("2019-05-17T09:10:00+10:00");
});

test("Show more button exits when there is a slot limit and more slots than the limit exist", async (t) => {
  const example = Selector(toTestSelector("SlotList-scenario-standard"));
  const slotList = new SlotListCtrl(example, t);
  await slotList.showMore.exists();
});

test("Show more button is not shown when all slots are being displayed", async (t) => {
  const example = Selector(toTestSelector("SlotList-scenario-standard"));
  const slotList = new SlotListCtrl(example, t);
  // click the showMore until all slots are being displayed
  await slotList.showMore.click();
  await slotList.showMore.click();
  await slotList.showMore.click();
  await slotList.showMore.click();
  await t.expect(await slotList.showMore.exists()).notOk();
});

test("Clicking on the show more button shows more slots", async (t) => {
  const example = Selector(toTestSelector("SlotList-scenario-standard"));
  const slotList = new SlotListCtrl(example, t);

  await slotList.expectSlotCountOnScreenEqual(4);
  await slotList.showMore.click();
  await slotList.expectSlotCountOnScreenEqual(8);
});

test("Show more button is not shown when there is no slot limit", async (t) => {
  const example = Selector(toTestSelector("SlotList-scenario-no-slot-limit"));
  const slotList = new SlotListCtrl(example, t);
  await t.expect(await slotList.showMore.exists()).notOk();
});
