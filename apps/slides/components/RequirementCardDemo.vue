<script setup lang="ts">
import { userModule } from "@nomad/requirements/data";

// 展示用户模块的第一个需求作为示例
const exampleRequirement = userModule.requirements[0]; // REQ-U01
</script>

<template>
  <div class="requirement-card">
    <div class="req-header">
      <span class="req-id">{{ exampleRequirement.id }}</span>
      <span class="req-priority">{{ exampleRequirement.priority }}</span>
    </div>

    <h3 class="req-name">{{ exampleRequirement.name }}</h3>

    <p class="req-overview">{{ exampleRequirement.overview }}</p>

    <div class="req-metrics">
      <div class="metric">
        <strong>{{ exampleRequirement.userStories.length }}</strong> 用户故事
      </div>
      <div class="metric">
        <strong>{{ exampleRequirement.acceptanceCriteria.length }}</strong>
        验收标准
      </div>
    </div>

    <!-- 展示第一个用户故事作为示例 -->
    <div v-if="exampleRequirement.userStories[0]" class="user-story-example">
      <h4>用户故事示例</h4>
      <blockquote>
        {{ exampleRequirement.userStories[0].content }}
      </blockquote>
    </div>
  </div>
</template>

<style scoped>
.requirement-card {
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  max-width: 800px;
  margin: 0 auto;
}

.req-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.req-id {
  font-weight: bold;
  color: #2563eb;
  font-size: 0.9rem;
}

.req-priority {
  padding: 0.25rem 0.75rem;
  background: #fef3c7;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.req-name {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.req-overview {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.req-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.metric {
  font-size: 0.9rem;
  color: #666;
}

.user-story-example {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.user-story-example h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

blockquote {
  margin: 0;
  padding: 1rem;
  background: #f9fafb;
  border-left: 4px solid #2563eb;
  font-style: italic;
}
</style>
