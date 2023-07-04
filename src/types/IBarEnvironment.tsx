export interface IBarEnvironment {
  name: string;
  color: string;
}
export const nextBarEnvironments: IBarEnvironment[] = [
  { name: "dev", color: "#117A65" },
  { name: "demo", color: "#B7950B" },
  { name: "preprod", color: "#A04000" },
  { name: "production", color: "#922B21" },
];
