import { flightModule } from "./flight-module";
import { orderModule } from "./order-module";
import { paymentModule } from "./payment-module";
import type { ModuleDefinition } from "./types";
import { userModule } from "./user-module";

// 目前只导出用户，机票模块，其他模块待迁移
// uiUxModule,    // 待迁移
export const allModules: ModuleDefinition[] = [
  userModule,
  flightModule,
  orderModule,
  paymentModule,
];

export { userModule, flightModule, orderModule, paymentModule };
export * from "./types";
