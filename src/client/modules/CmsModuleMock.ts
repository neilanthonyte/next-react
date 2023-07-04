import { injectable } from "inversify";
import { ICmsModule } from "../modules/CmsModule";

@injectable()
export class CmsModule implements ICmsModule {
  async createCmsEntry(): Promise<any> {
    await new Promise((r) => setTimeout(r, 500));
    return;
  }
  async updateCmsEntry(): Promise<any> {
    await new Promise((r) => setTimeout(r, 2500));
    return;
  }
  async getContent(type: string, slug: string): Promise<any> {
    if (type === "articles") {
      await new Promise((r) => setTimeout(r, 2500));
      return {
        title: "Ullamco ex duis aliqua adipisicing in elit.",
        body: `<p>Irure do eu aliquip non. Fugiat ipsum culpa mollit proident culpa elit ut exercitation incididunt nulla sit voluptate enim voluptate. In excepteur la<strong>boris labore aliquip ullamco qui proident laboris. Sit ex sit cillum ex sunt nulla occaecat duis pariatur laboris excepteur reprehenderit proident ad. Esse aute excepteur eu eu pariatur exercitation sit.</strong><strong><br></strong></p><p><strong>sdfworldIrure do eu aliquip non. Fugiat ipsum culpa mollit proident culpa elit ut exercitation incididunt nulla sit voluptate enim voluptate. In excepteur laboris labore aliquip ullamco qui proident laboris. Sit ex sit cillum ex sunt nulla occaecat duis pariatur laboris excepteur reprehenderit proident ad. Esse aute excepteur eu eu pariatur exercitation sit.<br></strong></p>`,
        posterImage: [{ url: "http://lorempixel.com/400/200" }],
        gallery: [
          { url: "http://lorempixel.com/100/100" },
          { url: "http://lorempixel.com/200/200" },
          { url: "http://lorempixel.com/300/300" },
        ],
      };
    }
  }
}
