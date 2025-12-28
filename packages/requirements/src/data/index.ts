import { flightModule } from "./flight-module";
import { orderModule } from "./order-module";
import { paymentModule } from "./payment-module";
import type { ModuleDefinition } from "./types";
import { uiUxModule } from "./ui-ux-module";
import { userModule } from "./user-module";

export const allModules: ModuleDefinition[] = [
  userModule,
  flightModule,
  orderModule,
  paymentModule,
  uiUxModule,
];

export { userModule, flightModule, orderModule, paymentModule, uiUxModule };
export * from "./types";
