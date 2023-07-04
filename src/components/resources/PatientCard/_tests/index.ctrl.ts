import moment = require("moment");

import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

export class PatientCardCtrl {
  constructor(public selector: Selector, private t: TestController) {}

  public async checkPatient(patient: fhir3.Patient) {
    // extract basic patient details from object
    const patientName = fhirUtil<FhirPatientUtil>(patient).getDisplayName();
    const patientDOB = moment(patient.birthDate);
    const patientEmail = fhirUtil<FhirPatientUtil>(patient).getPrimaryEmail();
    const patientMobile =
      fhirUtil<FhirPatientUtil>(patient).getPrimaryMobileNumber();
    const patientMedicare =
      fhirUtil<FhirPatientUtil>(patient).getMedicareNumber();
    const patientDva = fhirUtil<FhirPatientUtil>(patient).getDvaNumber();

    // check name
    const patientNameCellCtrl = new CellCtrl(
      this.selector.find(toTestSelector("patient-cell-name")),
      this.t,
    );

    await this.t
      .expect(await patientNameCellCtrl.getHeading())
      .eql(patientName);

    // check DOB
    await this.t
      .expect(await patientNameCellCtrl.getDescription())
      .eql(`DOB: ${patientDOB.format("MMM Do YYYY")}`);

    // check email
    const patientEmailCellCtrl = new CellCtrl(
      this.selector.find(toTestSelector("patient-cell-email")),
      this.t,
    );
    await this.t
      .expect(await patientEmailCellCtrl.getDescription())
      .eql(patientEmail);

    // check mobile
    const patientMobileCellCtrl = new CellCtrl(
      this.selector.find(toTestSelector("patient-cell-mobile")),
      this.t,
    );
    await this.t
      .expect(await patientMobileCellCtrl.getDescription())
      .eql(patientMobile);

    // check medicare
    const patientMedicareCellCtrl = new CellCtrl(
      this.selector.find(toTestSelector("patient-cell-medicare")),
      this.t,
    );
    await this.t
      .expect(await patientMedicareCellCtrl.getDescription())
      .eql(patientMedicare.value);

    // check dva
    const patientDvaCellCtrl = new CellCtrl(
      this.selector.find(toTestSelector("patient-cell-dva")),
      this.t,
    );
    await this.t
      .expect(await patientDvaCellCtrl.getDescription())
      .eql(patientDva.value);

    // TODO: test CRN

    // TODO: test emergency contact
  }
}
