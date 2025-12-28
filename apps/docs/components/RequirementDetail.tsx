"use client";

import type { Requirement } from "@nomad/requirements/types";

interface RequirementDetailProps {
  requirement: Requirement;
}

export function RequirementDetail({ requirement }: RequirementDetailProps) {
  return (
    <div className="requirement-detail my-8">
      {/* 标题部分 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold" id={requirement.id}>
            {requirement.id}: {requirement.name}
          </h3>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
            requirement.priority === "Must Have"
              ? "bg-red-100 text-red-800"
              : requirement.priority === "Should Have"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {requirement.priority}
        </span>
      </div>

      {/* 功能概述 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">功能概述</h4>
        <p className="text-fd-muted-foreground leading-relaxed">
          {requirement.overview}
        </p>
      </div>

      {/* 补充说明 */}
      {requirement.notes && (
        <div className="mb-6 p-4 bg-fd-secondary/50 rounded-lg border">
          <h4 className="text-sm font-semibold mb-2">📝 补充说明</h4>
          <p className="text-sm text-fd-muted-foreground">
            {requirement.notes}
          </p>
        </div>
      )}

      {/* 用户故事 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">用户故事</h4>
        <div className="space-y-3">
          {requirement.userStories.map(story => (
            <div
              key={story.id}
              className="pl-4 border-l-4 border-fd-primary py-2"
            >
              <span className="font-semibold text-sm text-fd-primary">
                {story.id}:
              </span>{" "}
              <span className="text-fd-muted-foreground">{story.content}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 验收标准 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">验收标准</h4>
        <div className="space-y-6">
          {requirement.acceptanceCriteria.map(criteria => (
            <div key={criteria.id} className="border rounded-lg p-4">
              <h5 className="font-semibold mb-3">
                {criteria.id}: {criteria.title}
              </h5>
              {criteria.description && (
                <p className="text-sm text-fd-muted-foreground mb-3">
                  {criteria.description}
                </p>
              )}
              <div className="space-y-2">
                {criteria.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium uppercase whitespace-nowrap ${
                        step.type === "given"
                          ? "bg-blue-100 text-blue-700"
                          : step.type === "when"
                            ? "bg-purple-100 text-purple-700"
                            : step.type === "then"
                              ? "bg-green-100 text-green-700"
                              : step.type === "and"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {step.type}
                    </span>
                    <span className="flex-1 text-fd-muted-foreground">
                      {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 相关需求 */}
      {requirement.relatedRequirements &&
        requirement.relatedRequirements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">相关需求</h4>
            <div className="flex flex-wrap gap-2">
              {requirement.relatedRequirements.map(relatedId => (
                <a
                  key={relatedId}
                  href={`#${relatedId}`}
                  className="px-3 py-1 text-sm bg-fd-secondary rounded-md hover:bg-fd-secondary/80 transition-colors"
                >
                  {relatedId}
                </a>
              ))}
            </div>
          </div>
        )}

      <hr className="my-8 border-fd-border" />
    </div>
  );
}
