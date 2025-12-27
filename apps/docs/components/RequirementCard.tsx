"use client";

import type { Requirement } from "@nomad/requirements/types";

interface RequirementCardProps {
  requirement: Requirement;
}

export function RequirementCard({ requirement }: RequirementCardProps) {
  return (
    <div className="requirement-card border rounded-lg p-6 my-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-sm font-semibold text-fd-primary">
            {requirement.id}
          </span>
          <h3 className="text-xl font-bold mt-1">{requirement.name}</h3>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
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

      <p className="text-fd-muted-foreground mb-4 leading-relaxed">
        {requirement.overview}
      </p>

      <div className="flex gap-6 text-sm mb-4">
        <div>
          <span className="font-semibold">
            {requirement.userStories.length}
          </span>{" "}
          <span className="text-fd-muted-foreground">用户故事</span>
        </div>
        <div>
          <span className="font-semibold">
            {requirement.acceptanceCriteria.length}
          </span>{" "}
          <span className="text-fd-muted-foreground">验收标准</span>
        </div>
      </div>

      {requirement.userStories.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm mb-2">用户故事示例</h4>
          <blockquote className="border-l-4 border-fd-primary pl-4 italic text-sm text-fd-muted-foreground">
            {requirement.userStories[0].content}
          </blockquote>
        </div>
      )}
    </div>
  );
}
