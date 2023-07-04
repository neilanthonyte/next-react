import { Selector } from "testcafe";
import { CreditCardInputCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("TextInput").page("http://localhost:6060/#!/CreditCardInput");

test.skip("Can set a card", async (t) => {
  const example = Selector(toTestSelector("CreditCardInput-scenario-standard"));

  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const creditCardCtrl = new CreditCardInputCtrl(input, t);

  const card = {
    cardType: "visa",
    cardNumberLast4: "1234",
    expirationDate: "02/2020",
    paymentToken: "abcdefg",
  };

  await creditCardCtrl.appendValue({
    cardType: "visa",
    cardNumberLast4: "1234",
    expirationDate: "02/2020",
    paymentToken: "abcdefg",
  });

  await creditCardCtrl.expectValue(card);
  await t.expect(await output.innerText).eql(JSON.stringify(card, null, 2));
});
