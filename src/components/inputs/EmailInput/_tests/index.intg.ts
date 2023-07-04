import { Selector } from "testcafe";
import { EmailInputCtrl } from "./index.ctrl";

import * as faker from "faker";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { delay } from "../../../../helpers/delay";

fixture("EmailInput").page("http://localhost:6060/#!/EmailInput");

test("EmailInput displays correctly and receives input in standard usage", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-standard"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  await email.expectEmailHint(false);
  const emailEntered = faker.internet.email();
  await email.setValue(emailEntered);
  await email.expectValue(emailEntered);
  await email.expectHasPlaceholder(false);
  await email.expectEmailHint(true);

  // Selected block displays the data
  const selected = await example.find(toTestSelector("output")).innerText;
  await email.expectValue(selected);
});

test("EmailInput displays correctly and receives input in placeholder usage", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-placeholder"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  await email.expectEmailHint(false);
  const emailEntered = faker.internet.email();
  await email.setValue(emailEntered);
  await email.expectValue(emailEntered);
  await email.expectHasPlaceholder(true);
  await email.expectEmailHint(true);

  // Selected block displays the data
  const selected = await example.find(toTestSelector("output")).innerText;
  await email.expectValue(selected);
});

test("EmailInput displays correctly and receives input in no DOM usage", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-nodom"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  await email.expectEmailHint(false);
  const emailEntered = faker.internet.email();
  await email.setValue(emailEntered);
  await email.expectValue(emailEntered);
  await email.expectHasPlaceholder(false);
  await email.click();
  await email.expectEmailHint(false);

  // Selected block displays the data
  const selected = await example.find(toTestSelector("output")).innerText;
  await email.expectValue(selected);
});

test("EmailInput in standard usage allows for keyboard hints to be used", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-standard"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  await email.expectEmailHint(false);
  await email.click();
  await email.expectEmailHint(true);
  const name = faker.name.lastName();
  await email.setValue(name);
  await email.keypad.clickKey("@gmail.com");
  await email.expectValue(name + "@gmail.com");

  // Selected block displays the data
  const selected = await example.find(toTestSelector("output")).innerText;
  await email.expectValue(selected);
});

test("EmailInput in standard usage clears out on the command", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-standard"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  const emailEntered = "test";
  await email.setValue(emailEntered);
  await email.pressKey("ctrl+a delete");
  await email.expectValue("");
});

test("Disabled input returns the default value", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-disabled"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  await email.expectIsDisabled(true);
  await email.expectValue("email@email.com");
  await email.click();
  await email.expectValue("email@email.com");
});

test("EmailInput hint does not allow double email inputs", async (t) => {
  const example = Selector(toTestSelector("EmailInput-scenario-standard"));
  const email = new EmailInputCtrl(
    example.find(toTestSelector("email-input")),
    t,
  );

  const nameEntered = faker.internet.userName();
  await email.setValue(nameEntered);
  await email.expectEmailHint(true);
  await email.pressHint(0);
  await email.expectValue(nameEntered + "@gmail.com");
  await email.pressHint(1);
  await email.expectValue(nameEntered + "@outlook.com");
});
