import { injectable } from "inversify";

import { ISyncModule } from "../modules/SyncModule";
import { TGuid } from "next-shared/src/types/guid";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { createGuid } from "next-shared/src/helpers/guid";

@injectable()
export class MockSyncModule implements ISyncModule {
  public sessionToken: string = "";
  public setUrls(url: { [name: string]: string }): void {}

  public subscribe(
    syncMetadata: ISyncMetadata,
    cb: (newData: any) => void,
  ): TGuid {
    return createGuid();
  }

  public unsubscribe(guid: TGuid): boolean {
    return true;
  }

  public getSockets() {
    return {};
  }
}
