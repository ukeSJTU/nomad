"use client";

import type { Requirement } from "@nomad/requirements/types";
import { Badge, getPriorityVariant, getStepVariant } from "./ui/badge";

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
        <Badge variant={getPriorityVariant(requirement.priority)}>
          {requirement.priority}
        </Badge>
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
        <div className="mb-6 ">
          <h4 className="text-sm font-semibold mb-2">补充说明</h4>
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
            <div
              key={criteria.id}
              className="border border-fd-border rounded-lg p-4"
            >
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
                    <Badge variant={getStepVariant(step.type)}>
                      {step.type}
                    </Badge>
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

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-fd-border">
        <hr className="flex-1 border-none" />
        <a
          href="#需求列表"
          className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors flex items-center gap-1"
          aria-label="返回顶部"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          返回顶部
        </a>
      </div>
    </div>
  );
}
