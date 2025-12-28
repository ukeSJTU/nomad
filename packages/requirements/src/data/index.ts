import { flightModule } from "./flight-module";
import type { ModuleDefinition } from "./types";
import { userModule } from "./user-module";

// 目前只导出用户，机票模块，其他模块待迁移
// orderModule,   // 待迁移
// paymentModule, // 待迁移
// uiUxModule,    // 待迁移
export const allModules: ModuleDefinition[] = [userModule, flightModule];

export { userModule, flightModule };
export * from "./types";
