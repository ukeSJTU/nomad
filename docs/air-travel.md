# 机票相关业务

## 数据表设计

## 表名：examples（模版表）

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

| 字段名     | 数据类型     | 约束                                          | 描述                      | 示例                                 |
| ---------- | ------------ | --------------------------------------------- | ------------------------- | ------------------------------------ |
| id         | UUID         | PRIMARY KEY                                   | 主键，唯一标识            | 550e8400-e29b-41d4-a716-446655440000 |
| iata_code  | VARCHAR(3)   | NOT NULL, UNIQUE                              | IATA机场代码，3位大写字母 | PVG, PEK, LAX                        |
| name       | VARCHAR(255) | NOT NULL                                      | 机场全称                  | 上海浦东国际机场                     |
| city       | VARCHAR(100) | NOT NULL                                      | 所在城市                  | 上海                                 |
| country    | VARCHAR(100) | NOT NULL                                      | 所在国家                  | 中国                                 |
| timezone   | VARCHAR(50)  | NOT NULL                                      | 时区标识                  | Asia/Shanghai                        |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP           | 创建时间                  | 2024-01-01 10:00:00                  |
| updated_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间                  | 2024-01-01 10:00:00                  |

#### 索引设计

```sql
-- 主键索引（自动创建）
PRIMARY KEY (id)

-- 唯一索引
UNIQUE INDEX uk_airports_iata (iata_code)

-- 查询索引
INDEX idx_airports_city (city)
INDEX idx_airports_country (country)
```

#### 约束规则

```sql
-- IATA代码格式检查
CHECK (iata_code REGEXP '^[A-Z]{3}$')

-- 非空约束
NOT NULL: iata_code, name, city, country, timezone
```

#### 业务规则

1. **IATA代码**：必须是3位大写英文字母，全局唯一
2. **时区格式**：使用标准时区标识符（如：Asia/Shanghai）
3. **软删除**：不物理删除数据，如需要可增加 `is_deleted` 字段

#### 使用场景

- 航班搜索：根据出发地/目的地城市查询机场
- 机票显示：显示机场名称和IATA代码
- 时间计算：根据机场时区计算本地时间
