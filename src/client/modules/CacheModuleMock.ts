import { injectable } from "inversify";
import { delay } from "../../helpers/delay";
import { ICacheModule } from "../modules/CacheModule";

@injectable()
export class MockCacheModule implements ICacheModule {
  public async clearEntireCache(): Promise<void> {
    await delay(500);
  }
}
