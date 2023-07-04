import { injectable } from "inversify";
import { IAgentModule } from "./AgentModule";

@injectable()
export class MockAgentModule implements IAgentModule {
  // different to other login methods:
  // used to create a JWT token for a given clinic which can then be used to authenticate against IRIS
  public async generateJWT(
    email: string,
    password: string,
  ): Promise<null | string> {
    // return fake JWT
    // https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbklkIjoxMjMsImxvY2F0aW9uU2x1ZyI6Im5zdy1zeWRuZXkiLCJsb2NhdGlvbk5hbWUiOiJOZXh0IFByYWN0aWNlIFN5ZG5leSBDQkQifQ.uKzt-TTn2pjZayrTXMF85rKN2rbAPTKlPU0yJaroSNk

    /*
    Payload:
    {
      "locationId": "4703",
      "locationSlug": "next-head-office-dev",
      "locationName": "Next Head Office - Dev",
      "iat": 1603415602,
      "exp": 1634951602
    }
    */
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbklkIjoxMjMsImxvY2F0aW9uU2x1ZyI6Im5zdy1zeWRuZXkiLCJsb2NhdGlvbk5hbWUiOiJOZXh0IFByYWN0aWNlIFN5ZG5leSBDQkQifQ.uKzt-TTn2pjZayrTXMF85rKN2rbAPTKlPU0yJaroSNk";
  }
}
