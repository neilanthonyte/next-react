import { Selector } from "testcafe";
import { AvatarCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Avatar").page("http://0.0.0.0:6060/#!/Avatar");

test("Avatar displays correct source image", async (t) => {
  const example = Selector(toTestSelector("Avatar-source-correct"));
  const avatar = new AvatarCtrl(example, t);

  await avatar.expectSourceValue("http://lorempixel.com/400/200");
});

test("Avatar displays correct size", async (t) => {
  const example = Selector(toTestSelector("Avatar-size-small"));
  const avatar = new AvatarCtrl(example, t);

  await avatar.expectCorrectSize(40);
});
