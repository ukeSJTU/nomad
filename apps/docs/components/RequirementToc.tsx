"use client";

import type { Requirement } from "@nomad/requirements/types";
import { Badge, getPriorityVariant } from "./ui/badge";

interface RequirementTocProps {
  requirements: Requirement[];
}

export function RequirementToc({ requirements }: RequirementTocProps) {
  return (
    <div className="space-y-2 mb-8">
      {requirements.map(req => (
        <a
          key={req.id}
          href={`#${req.id}`}
          className="block p-3 border border-fd-border rounded-lg hover:bg-fd-secondary/50 transition-colors shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-fd-foreground">
              {req.id}: {req.name}
            </span>
            <Badge variant={getPriorityVariant(req.priority)}>
              {req.priority}
            </Badge>
          </div>
        </a>
      ))}
    </div>
  );
}
