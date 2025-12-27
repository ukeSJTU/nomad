"use client";

import { getRequirementStats } from "@nomad/requirements";
import { allModules } from "@nomad/requirements/data";

export function RequirementStats() {
  const stats = getRequirementStats(allModules);

  return (
    <div className="requirement-stats my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-fd-muted/50">
            <th className="px-4 py-2 text-left font-semibold">模块</th>
            <th className="px-4 py-2 text-left font-semibold">功能点数</th>
            <th className="px-4 py-2 text-left font-semibold">用户故事数</th>
            <th className="px-4 py-2 text-left font-semibold">验收标准数</th>
            <th className="px-4 py-2 text-left font-semibold">MoSCoW分布</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats.byModule).map(([moduleId, data]) => {
            const module = allModules.find(m => m.id === moduleId);
            // 计算该模块的 MoSCoW 分布
            const modulePriorities = module?.requirements.reduce(
              (acc, req) => {
                acc[req.priority] = (acc[req.priority] || 0) + 1;
                return acc;
              },
              {} as Record<string, number>
            );

            return (
              <tr key={moduleId} className="border-b">
                <td className="px-4 py-2">{module?.name || moduleId}</td>
                <td className="px-4 py-2">{data.count}</td>
                <td className="px-4 py-2">{data.userStories}</td>
                <td className="px-4 py-2">{data.scenarios}</td>
                <td className="px-4 py-2 text-sm">
                  {modulePriorities && (
                    <>
                      {modulePriorities["Must Have"] && (
                        <span className="mr-2">
                          Must: {modulePriorities["Must Have"]}
                        </span>
                      )}
                      {modulePriorities["Should Have"] && (
                        <span className="mr-2">
                          Should: {modulePriorities["Should Have"]}
                        </span>
                      )}
                      {modulePriorities["Could Have"] && (
                        <span className="mr-2">
                          Could: {modulePriorities["Could Have"]}
                        </span>
                      )}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
          <tr className="border-t-2 font-semibold bg-fd-muted/30">
            <td className="px-4 py-2">总计</td>
            <td className="px-4 py-2">{stats.totalRequirements}</td>
            <td className="px-4 py-2">{stats.totalUserStories}</td>
            <td className="px-4 py-2">{stats.totalAcceptanceCriteria}</td>
            <td className="px-4 py-2 text-sm">
              Must: {stats.byPriority["Must Have"]}, Should:{" "}
              {stats.byPriority["Should Have"]}, Could:{" "}
              {stats.byPriority["Could Have"]}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
