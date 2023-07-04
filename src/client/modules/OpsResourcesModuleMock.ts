import { injectable } from "inversify";

import { mockOpsResources } from "next-shared/src/mockData/mockOpsResources";
import { FilesResource } from "next-shared/src/models/FilesResource";

import { delay } from "../../helpers/delay";
import { IOpsResourcesModule } from "./OpsResourcesModule";

@injectable()
export class MockOpsResourcesModule implements IOpsResourcesModule {
  async retrieveOpsResources(noCache?: boolean): Promise<FilesResource[]> {
    await delay(500);
    return mockOpsResources;
  }
}
