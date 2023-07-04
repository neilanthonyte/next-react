import { injectable, inject } from "inversify";
import * as uuid from "uuid";
import moment from "moment";

import {
  IPaydockCharge,
  IPaydockSubscription,
} from "next-shared/src/types/PaydockTypes";
import { mockPatientCreditCards } from "next-shared/src/mockData/mockCreditCard";
import { createMockPaydockCharge } from "next-shared/src/mockData/mockPaydockPayments";
import { ICreditCard } from "next-shared/src/types/ICreditCard";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { NotFoundError } from "next-shared/src/helpers/errorTypes";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { IPatientPaymentsDetails } from "next-shared/src/types/IPatientPaymentDetails";
import { mockSubscriptions } from "next-shared/src/mockData/mockSubscriptions";
import {
  mockPaydockSubscription,
  mockPaydockSubscriptions,
} from "next-shared/src/mockData/mockPaydockSubscriptions";

import { IPaymentsModule } from "../modules/PaymentsModule";
import { delay } from "../../helpers/delay";
import { IHttpConnection } from "../connections/HttpConnection";
import { AuthModule } from "./AuthModule";
import { mockScopes } from "next-shared/src/mockData/mockScopes";
import { MockDataCacheModule } from "./MockDataCacheModule";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { SYNC_DATA } from "../../types/sync";

@injectable()
export class MockPaymentsModule implements IPaymentsModule {
  private _subscriptions: { [x: string]: IPaydockSubscription[] };

  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("AuthModule") private _authModule: AuthModule,
    @inject("MockDataCacheModule")
    private _mockDataCacheModule: MockDataCacheModule,
  ) {
    this._subscriptions = mockPaydockSubscriptions;
  }

  public async takePayment(
    patientId: string,
    amount: number,
    reference?: string,
  ): Promise<IPaydockCharge> {
    await delay(1000);
    return createMockPaydockCharge(amount, reference);
  }

  public async takeAppointmentPayment(
    ehrAppointmentId: string,
    amount: number,
    reference?: string,
  ): Promise<IPaydockCharge> {
    await delay(1000);
    return createMockPaydockCharge(amount, reference);
  }

  public async setPaymentMethod(
    patientId: string,
    paymentToken: string,
  ): Promise<void> {
    await delay(2000);
    // TODO trigger update of Next Patient, namely paymentInformationUpdatedAt
    const { emitter, data: patient } =
      this._mockDataCacheModule.findPatient(patientId);

    if (!patient) throw new NotFoundError("Patient not found");

    const patientCards = mockPatientCreditCards[patientId] || [];

    let gatewayId: string;
    // HACK if no location with gatewayId in context, it must be an edit of existing card
    // paydock does this via one time token, for mock purpose, try and look for card to get gateway token
    const existingCreditCard = patientCards.find(
      (cc) => cc.nameOnCard === patient.getDisplayName(),
    );

    // HACK Paydock should tell us the gatewayId based on payment token - we
    // need to infer it in the mock, as we don't know what gateway ID it was created
    // with
    if (existingCreditCard) {
      gatewayId = existingCreditCard.gatewayId;
    } else if (this._authModule.session?.app?.scopeId) {
      // otherwise this should come from a scope in a location
      const scopeId = this._authModule.session?.app?.scopeId;
      const scope = mockScopes.find((s) => s.scopeId === scopeId);
      const ehrId = scope.ehrId;
      const location = mockNextLocations.find((loc) => loc.ehrId === ehrId);
      gatewayId = location?.paydockServiceId;
    } else {
      // SUPER HACK assume the first mock location
      gatewayId = mockNextLocations[0]?.paydockServiceId;
      console.warn(
        "mocking card without knowing the gateway - guessing instead",
      );
    }

    const newMockCreditCard: ICreditCard = {
      paymentToken,
      gatewayId,
      nameOnCard: patient.getDisplayName(),
      cardType: "visa",
      // random 4 digit string of numbers
      cardNumberLast4: (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1),
      // random month & year (between 2020 & 2030)
      expirationDate: `${getRandomNumberInRangeAsString(
        0,
        12,
      )}/${getRandomNumberInRangeAsString(moment().year() + 1, 2030)}`,
    };

    // replace for same gateway id if present or add
    mockPatientCreditCards[patientId] = patientCards.map((cc) =>
      cc.gatewayId === newMockCreditCard.gatewayId ? newMockCreditCard : cc,
    );

    // trigger a mock socket update
    patient.paymentInformationUpdatedAt = currentUnixTimestamp();
    if (!patient.paydockCustomerId) {
      patient.paydockCustomerId = uuid.v4();
    }
    emitter.emit(SYNC_DATA, { patient: cloneModelObject(patient) });
  }

  public async getPaymentDetails(
    patientId: string,
  ): Promise<IPatientPaymentsDetails> {
    const creditCards: null | ICreditCard[] = mockPatientCreditCards[patientId];
    const subscriptions: null | IPaydockSubscription[] =
      this._subscriptions[patientId];

    await delay(1000);
    return {
      subscriptions: subscriptions || [],
      creditCards: creditCards || [],
    };
  }

  public async createSubscription(
    patientId: string,
    planId: string,
  ): Promise<IPaydockSubscription> {
    const subscription = mockSubscriptions.find((s) => s.uuid == planId);
    const patientSubscriptions = this._subscriptions[patientId] || [];
    const newSub = {
      ...mockPaydockSubscription,
      reference: subscription.uuid,
      amount: subscription.price,
    };
    this._subscriptions[patientId] = [...patientSubscriptions, newSub];
    return newSub;
  }

  public async cancelSubscription(patientId: string): Promise<void> {
    this._subscriptions[patientId] = null;
  }
}

// returns number as string in range [low, high).
function getRandomNumberInRangeAsString(low: number, high: number): string {
  return Math.floor(low + (high - low) * Math.random()).toString();
}
