<script setup lang="ts">
import { getRequirementStats } from "@nomad/requirements";
import { allModules } from "@nomad/requirements/data";

const stats = getRequirementStats(allModules);
</script>

<template>
  <div class="requirements-overview">
    <h2>项目需求概览</h2>

    <!-- 总体统计 -->
    <div class="stats-summary">
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalRequirements }}</div>
        <div class="stat-label">功能需求总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalUserStories }}</div>
        <div class="stat-label">用户故事总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalAcceptanceCriteria }}</div>
        <div class="stat-label">验收标准总数</div>
      </div>
    </div>

    <!-- 优先级分布 -->
    <div class="priority-distribution">
      <h3>优先级分布</h3>
      <ul>
        <li>
          Must Have: <strong>{{ stats.byPriority["Must Have"] }}</strong>
        </li>
        <li>
          Should Have: <strong>{{ stats.byPriority["Should Have"] }}</strong>
        </li>
        <li v-if="stats.byPriority['Could Have'] > 0">
          Could Have: <strong>{{ stats.byPriority["Could Have"] }}</strong>
        </li>
      </ul>
    </div>

    <!-- 模块分布 -->
    <div class="module-distribution">
      <h3>模块分布</h3>
      <table>
        <thead>
          <tr>
            <th>模块</th>
            <th>需求数</th>
            <th>场景数</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="[moduleId, data] in Object.entries(stats.byModule)"
            :key="moduleId"
          >
            <td>{{ allModules.find(m => m.id === moduleId)?.name }}</td>
            <td>{{ data.count }}</td>
            <td>{{ data.scenarios }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.requirements-overview {
  padding: 2rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #2563eb;
}

.stat-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.priority-distribution {
  margin-bottom: 2rem;
}

.priority-distribution ul {
  list-style: none;
  padding: 0;
}

.priority-distribution li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.module-distribution table {
  width: 100%;
  border-collapse: collapse;
}

.module-distribution th,
.module-distribution td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.module-distribution th {
  background: #f5f5f5;
  font-weight: bold;
}

.module-distribution tbody tr:hover {
  background: #f9f9f9;
}
</style>
