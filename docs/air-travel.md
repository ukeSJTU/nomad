# 机票相关业务

## 数据表设计

### 表名：examples（模版表）

#### 业务描述

一句话描述相关业务

#### 表结构

markdown表格记录字段名，数据类型，约束，描述，示例

#### 索引设计

```sql
TODO
```

TODO: 我觉得有必要解释为什么建立这个索引

#### 约束规则

```sql
-- IATA代码格式检查
CHECK (iata_code REGEXP '^[A-Z]{3}$')

-- 非空约束
NOT NULL: iata_code, name, city, country, timezone
```

### 表名：airports（机场表）

#### 业务描述

存储OTA平台支持的机场基础信息，用于航班搜索、预订和显示功能。

#### 表结构

| 字段名     | 数据类型     | 约束                                          | 描述                      | 示例                                  |
| ---------- | ------------ | --------------------------------------------- | ------------------------- | ------------------------------------- |
| id         | UUID         | PRIMARY KEY                                   | 主键，唯一标识            | 550e8400-e29b-41d4-a716-446655440000  |
| iata_code  | VARCHAR(3)   | NOT NULL, UNIQUE                              | IATA机场代码，3位大写字母 | PVG, PEK, LAX                         |
| name       | VARCHAR(255) | NOT NULL                                      | 机场全称（英文）          | Shanghai Pudong International Airport |
| city       | VARCHAR(100) | NOT NULL                                      | 所在城市（英文）          | Shanghai                              |
| country    | VARCHAR(100) | NOT NULL                                      | 所在国家（英文）          | China                                 |
| timezone   | VARCHAR(50)  | NOT NULL                                      | 时区标识                  | Asia/Shanghai                         |
| is_deleted | BOOLEAN      | NOT NULL, DEFAULT FALSE                       | 软删除标记                | FALSE                                 |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP           | 创建时间                  | 2024-01-01 10:00:00                   |
| updated_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间                  | 2024-01-01 10:00:00                   |

#### 索引设计

```sql
-- 主键索引（自动创建）
PRIMARY KEY (id)

-- 唯一索引
UNIQUE INDEX uk_airports_iata (iata_code)

-- 查询索引
INDEX idx_airports_city (city)
INDEX idx_airports_country (country)
INDEX idx_airports_is_deleted (is_deleted)
```

**索引说明**：

- `idx_airports_is_deleted`：用于软删除过滤查询（WHERE is_deleted = FALSE），提高查询效率

#### 约束规则

```sql
-- IATA代码格式检查
CHECK (iata_code REGEXP '^[A-Z]{3}$')

-- 非空约束
NOT NULL: iata_code, name, city, country, timezone, is_deleted
```

#### 业务规则

1. **IATA代码**：必须是3位大写英文字母，全局唯一
2. **语言规范**：所有文本字段（name, city, country）统一使用英文存储，前端通过国际化（i18n）实现多语言显示
3. **搜索支持**：应用层需实现中文输入到英文的映射（如：用户输入"上海"时搜索"Shanghai"）
4. **时区格式**：使用标准IANA时区标识符（如：Asia/Shanghai, America/Los_Angeles）
5. **软删除策略**：
   - 使用 `is_deleted` 字段标记删除状态，不物理删除数据
   - 删除操作：SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP
   - 查询时必须过滤：WHERE is_deleted = FALSE
   - 已删除的数据可用于历史记录和数据恢复

#### 使用场景

- 航班搜索：根据出发地/目的地城市查询机场（需过滤已删除数据）
- 机票显示：显示机场名称和IATA代码
- 时间计算：根据机场时区计算本地起降时间
- 国际化显示：前端根据用户语言偏好翻译城市和国家名称
