import type { ModuleDefinition } from "./types";
import { userModule } from "./user-module";

// 目前只导出用户模块，其他模块待迁移
// flightModule,  // 待迁移
// orderModule,   // 待迁移
// paymentModule, // 待迁移
// uiUxModule,    // 待迁移
export const allModules: ModuleDefinition[] = [userModule];

export { userModule };
export * from "./types";
