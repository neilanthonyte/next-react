import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";

import { HtmlWidget } from "@paydock/client-sdk/lib/widget";
import { IProvisionalCreditCard } from "next-shared/src/types/ICreditCard";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { PayDockContext } from "../../../contexts/PayDockContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { Button } from "../../generic/Button";
import { HStack, Solid } from "../../structure/HStack";
import { cssComposer } from "../../../helpers/cssComposer";
import { ToggleSwitch } from "../../generic/ToggleSwitch";
import { VStack } from "../../structure/VStack";
import { Disable } from "../../generic/Disable";

import styles from "./styles.scss";
const css = cssComposer(styles, "payDockForm");

if (!env.paydockPublicKey) {
  console.warn("paydockPublicKey not set");
}

export interface IPayDockCreditCardFormProps {
  onSuccess: (card: IProvisionalCreditCard, saveToRecord: boolean) => void;
  onSkip?: () => void;
  disclaimer?: string;
  includeSaveToRecord?: boolean;
}

export const PayDockCreditCardForm: React.FC<IPayDockCreditCardFormProps> = ({
  onSuccess,
  onSkip,
  disclaimer,
  includeSaveToRecord,
}) => {
  const {
    publicKey: publicKeyFromContext,
    gatewayId,
    prefillData,
    isDebug,
  } = useRequiredContext(PayDockContext);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  // note if the patient wants this card saved to their record
  const [saveToRecord, setSaveToRecord] = useState<boolean>(true);

  const card = useRef<IProvisionalCreditCard>({});

  const resolveFunc = useRef<(value?: unknown) => void>();
  const rejectFunc = useRef<(value?: unknown) => void>();

  // provide an up-to-date callback without needing to re-render the widget
  const successCallback = useRef<(value?: unknown) => void>();
  successCallback.current = (card: IProvisionalCreditCard) => {
    onSuccess(card, includeSaveToRecord ? saveToRecord : undefined);
  };

  const clear = () => {
    setSubmitting(false);
    resolveFunc.current = null;
    rejectFunc.current = null;
  };

  const resolve = useCallback(() => {
    if (resolveFunc.current) {
      resolveFunc.current();
    } else {
      console.warn("try to resolve again");
    }
    clear();
  }, []);

  const reject = useCallback(() => {
    if (rejectFunc.current) {
      rejectFunc.current();
    } else {
      console.warn("try to reject again");
    }
    clear();
  }, []);

  const widget = useMemo(() => {
    const publicKey: string = publicKeyFromContext || env.paydockPublicKey;
    const widget = new HtmlWidget("#payDockWidget", publicKey, gatewayId);

    const paydockEnv: string = (isDebug ? "sandbox" : false) || env.paydockEnv;
    if (paydockEnv) {
      widget.setEnv(paydockEnv);
    }

    widget.setSupportedCardIcons(["mastercard", "visa"]);
    widget.setFormFields(["email"]);
    widget.setHiddenElements(["submit_button"]);

    widget.setRefId("custom-ref-id");
    // widget.interceptSubmitForm("#paydockForm");
    // widget.onFinishInsert(
    //   'input[name="payment_source_token"]',
    //   "payment_source"
    // );
    widget.setStyles({
      background_color: "#fff",
      border_color: "#9b9b9b",
      text_color: "#242021",
      button_color: "#64bcae",
      font_size: "16px",
    });
    widget.setElementStyle("input", null, {
      border: "#9b9b9b solid 1px",
      height: "40px",
    });
    widget.on("metaChange", (data: any) => {
      card.current = {
        cardType: data.card_scheme,
        cardNumberLast4: data.card_number_last4,
      };
    });
    // NOTE only called on a proper attempt (can't rely on this callback, hence the canSubmit logic)
    widget.on("validationError", (data: any) => {
      // TODO leave until we have confirmed this works reliably now
      console.warn("validationError");
      reject();
    });
    widget.on("validation", (data: any) => {
      // TODO leave until we have confirmed this works reliably now
      console.warn("validation");
      setCanSubmit(data.form_valid);
    });
    widget.on("checkoutError", (data: any) => {
      // TODO leave until we have confirmed this works reliably now
      console.warn("checkoutError");
      reject();
    });
    widget.on("systemError", (data: any) => {
      // TODO leave until we have confirmed this works reliably now
      console.warn("systemError");
      reject();
    });
    widget.on("finish", (data: any) => {
      // TODO leave until we have confirmed this works reliably now
      console.warn("finish");
      card.current = { ...card.current, cardToken: data.payment_source };
      resolve();
      successCallback.current(card.current);
    });

    widget.on("afterLoad", (data: any) => {
      // TODO leave until we have confirmed this works reliably now
      console.warn("afterLoad");
      setLoaded(true);
    });

    if (prefillData) {
      widget.setFormValues({
        email: prefillData.email || "",
        card_name: prefillData.nameOnCard || "",
      });
    }

    widget.load();
    return widget;
  }, []);

  const submitCard = useCallback(async () => {
    // TODO return a promise that fails/succeeds
    return new Promise((res, rej) => {
      setSubmitting(true);
      resolveFunc.current = res;
      rejectFunc.current = rej;
      widget.trigger("submit_form");
    });
  }, [resolveFunc, rejectFunc, widget]);

  if (!gatewayId) {
    return <p>Payment gatway not correctly configured</p>;
  }

  return (
    <div id="payDockForm" className={css("", { "-loading": !loaded })}>
      <Disable disabled={submitting}>
        <VStack>
          <div id="payDockWidget" />
          {!!disclaimer && <p className={css("disclaimer")}>{disclaimer}</p>}
          {/* HACK LoadingBlock wants to be around the loaded content - this is a quick fix */}
          {!loaded && (
            <LoadingBlock
              size="payDock"
              isLoading={true}
              message="Loading credit card form..."
            />
          )}
          {loaded && includeSaveToRecord && (
            <div style={{ textAlign: "center" }}>
              Save to your Next account
              <span style={{ padding: "0 10px" }} />
              <ToggleSwitch onSwitch={setSaveToRecord} active={saveToRecord} />
            </div>
          )}
          {loaded && (
            <HStack>
              {!!onSkip && (
                <Solid>
                  <Button
                    variant="secondary"
                    onClick={onSkip}
                    size={EStandardSizes.Medium}
                    disabled={submitting}
                  >
                    Skip
                  </Button>
                </Solid>
              )}
              <div></div>
              <Solid>
                <Button
                  onClick={submitCard}
                  size={EStandardSizes.Medium}
                  disabled={!canSubmit}
                >
                  Add credit card
                </Button>
              </Solid>
            </HStack>
          )}
        </VStack>
      </Disable>
    </div>
  );
};
