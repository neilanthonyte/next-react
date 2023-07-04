import { Selector } from "testcafe";
import { ErrorHandlerCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("ErrorHandler").page("http://localhost:6060/#!/ErrorPlaceholder");

test("Basic example", async (t) => {
  const example = Selector(toTestSelector("scenario-basic"));
  const errorHandler = new ErrorHandlerCtrl(example, t);

  const attemptsCount = example.find(toTestSelector("attempts-count"));

  await t.expect(attemptsCount.innerText).eql("Attempts: 0");

  await errorHandler.clickRetry();

  await t.expect(attemptsCount.innerText).eql("Attempts: 1");
});
