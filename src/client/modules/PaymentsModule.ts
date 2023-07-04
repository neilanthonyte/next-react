import { inject, injectable } from "inversify";

// team submodules
import { IHttpConnection } from "../connections/HttpConnection";
import {
  IPaydockCharge,
  IPaydockSubscription,
} from "next-shared/src/types/PaydockTypes";
import { IPatientPaymentsDetails } from "next-shared/src/types/IPatientPaymentDetails";

/**
 * payments module interface
 */
export interface IPaymentsModule {
  /**
   * Charges patient card for a given amount and applies optional transaction reference
   * @param patientId
   * @param amount
   * @param reference
   */
  takePayment(
    patientId: string,
    amount: number,
    reference?: string,
  ): Promise<IPaydockCharge>;

  /**
   * Charges card stored against appointment for a given amount and applies optional transaction reference
   * @param ehrAppointmentId
   * @param amount
   * @param reference
   */
  takeAppointmentPayment(
    ehrAppointmentId: string,
    amount: number,
    reference?: string,
  ): Promise<IPaydockCharge>;

  /**
   * Stores payment information in Paydock for given patient from single token
   * @param patientId
   * @param paymentToken
   */
  setPaymentMethod(patientId: string, paymentToken: string): Promise<void>;

  /**
   * Retrieves payment details (credit cards and subscriptions) for given patient
   * @param patientId
   */
  getPaymentDetails(patientId: string): Promise<IPatientPaymentsDetails>;

  /**
   * Sets given subscription plan in paydock for a given patient
   * @param patientId
   * @param planId
   */
  createSubscription(
    patientId: string,
    planId: string,
  ): Promise<IPaydockSubscription>;

  /**
   * Cancels subscription plans in paydock for a given patient
   * @param patientId
   */
  cancelSubscription(patientId: string): Promise<void>;
}

/**
 * payments module
 */
@injectable()
export class PaymentsModule implements IPaymentsModule {
  /**
   * constructor
   *
   * @param {IHttpConnection} _httpConnection
   */
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async takePayment(
    patientId: string,
    amount: number,
    reference?: string,
  ): Promise<IPaydockCharge> {
    const res = await this._httpConnection.makeRequest({
      url: `payments/${patientId}/take-payment`,
      method: "post",
      data: { amount, reference },
    });
    return res.payment ? res.payment : null;
  }

  public async takeAppointmentPayment(
    ehrAppointmentId: string,
    amount: number,
    reference?: string,
  ): Promise<IPaydockCharge> {
    const res = await this._httpConnection.makeRequest({
      url: `payments/${ehrAppointmentId}/take-appointment-payment`,
      method: "post",
      data: { amount, reference },
    });
    return res.payment ? res.payment : null;
  }

  public async setPaymentMethod(
    patientId: string,
    paymentToken: string,
  ): Promise<void> {
    if (!patientId) {
      throw new Error("missing patientId");
    }
    if (!paymentToken) {
      throw new Error("missing paymentToken");
    }

    await this._httpConnection.makeRequest({
      url: `payments/${patientId}/set-payment-method`,
      method: "post",
      data: { paymentToken },
    });
  }

  public async getPaymentDetails(
    patientId: string,
  ): Promise<IPatientPaymentsDetails> {
    const res = await this._httpConnection.makeRequest({
      url: `subscriptions/${patientId}`,
      method: "get",
      allow404: true,
    });
    return res;
  }

  public async createSubscription(
    patientId: string,
    planId: string,
  ): Promise<IPaydockSubscription> {
    const res = await this._httpConnection.makeRequest({
      url: `subscriptions/${patientId}`,
      method: "post",
      data: { planId },
    });
    return res.subscription;
  }

  public async cancelSubscription(patientId: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `subscriptions/${patientId}`,
      method: "delete",
    });
  }
}
