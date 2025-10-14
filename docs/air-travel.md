# 机票相关业务

## 数据表设计

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

---

### 表名：airlines（航空公司表）

#### 业务描述

存储OTA平台支持的航空公司基础信息，用于航班展示和品牌识别。

#### 表结构

| 字段名     | 数据类型     | 约束                                          | 描述                      | 示例                                                              |
| ---------- | ------------ | --------------------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| id         | UUID         | PRIMARY KEY                                   | 主键，唯一标识            | 550e8400-e29b-41d4-a716-446655440000                              |
| iata_code  | VARCHAR(2)   | NOT NULL, UNIQUE                              | IATA航司代码，2位大写字母 | MU, CA, AA                                                        |
| name       | VARCHAR(255) | NOT NULL                                      | 航空公司名称（英文）      | China Eastern Airlines                                            |
| logo_url   | VARCHAR(500) | NULL                                          | 航司Logo URL              | https://example.com/logos/mu.png 或 /mu.png(直接从public目录读取) |
| is_deleted | BOOLEAN      | NOT NULL, DEFAULT FALSE                       | 软删除标记                | FALSE                                                             |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP           | 创建时间                  | 2024-01-01 10:00:00                                               |
| updated_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间                  | 2024-01-01 10:00:00                                               |

#### 索引设计

```sql
-- 主键索引（自动创建）
PRIMARY KEY (id)

-- 唯一索引
UNIQUE INDEX uk_airlines_iata (iata_code)

-- 查询索引
INDEX idx_airlines_is_deleted (is_deleted)
```

**索引说明**：

- `idx_airlines_is_deleted`：用于软删除过滤查询（WHERE is_deleted = FALSE），提高查询效率

#### 约束规则

```sql
-- IATA代码格式检查
CHECK (iata_code REGEXP '^[A-Z]{2}$')

-- 非空约束
NOT NULL: iata_code, name, is_deleted
```

#### 业务规则

1. **IATA代码**：必须是2位大写英文字母，全局唯一
2. **语言规范**：name字段统一使用英文存储，前端通过国际化（i18n）实现多语言显示
3. **Logo URL**：可选字段，允许为空；前端可使用默认Logo或第三方服务作为降级方案
4. **软删除策略**：
   - 使用 `is_deleted` 字段标记删除状态，不物理删除数据
   - 删除操作：SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP
   - 查询时必须过滤：WHERE is_deleted = FALSE
   - 已删除的数据可用于历史记录和数据恢复

#### 使用场景

- 航班列表：显示航空公司名称和Logo
- 航班筛选：按航空公司过滤航班
- 品牌展示：展示航司品牌标识
- 国际化显示：前端根据用户语言偏好翻译航司名称

---

### 表名：flights（航班表）

#### 业务描述

存储具体日期时间的航班实例信息，每条记录代表一个特定日期的具体航班，用于航班搜索、展示和预订。

#### 表结构

| 字段名               | 数据类型    | 约束                                          | 描述                       | 示例                                 |
| -------------------- | ----------- | --------------------------------------------- | -------------------------- | ------------------------------------ |
| id                   | UUID        | PRIMARY KEY                                   | 主键，唯一标识             | 550e8400-e29b-41d4-a716-446655440000 |
| flight_number        | VARCHAR(10) | NOT NULL                                      | 航班号                     | CA1234, MU5678                       |
| airline_id           | UUID        | NOT NULL, FOREIGN KEY                         | 航空公司ID，关联airlines表 | 550e8400-e29b-41d4-a716-446655440001 |
| departure_airport_id | UUID        | NOT NULL, FOREIGN KEY                         | 出发机场ID，关联airports表 | 550e8400-e29b-41d4-a716-446655440002 |
| arrival_airport_id   | UUID        | NOT NULL, FOREIGN KEY                         | 到达机场ID，关联airports表 | 550e8400-e29b-41d4-a716-446655440003 |
| departure_datetime   | TIMESTAMP   | NOT NULL                                      | 出发日期时间（UTC）        | 2025-10-15 08:00:00                  |
| arrival_datetime     | TIMESTAMP   | NOT NULL                                      | 到达日期时间（UTC）        | 2025-10-15 10:30:00                  |
| aircraft_type        | VARCHAR(50) | NULL                                          | 机型                       | Boeing 737-800, Airbus A320          |
| status               | VARCHAR(20) | NOT NULL, DEFAULT 'SCHEDULED'                 | 航班状态                   | SCHEDULED, DELAYED, CANCELLED        |
| is_deleted           | BOOLEAN     | NOT NULL, DEFAULT FALSE                       | 软删除标记                 | FALSE                                |
| created_at           | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP           | 创建时间                   | 2024-01-01 10:00:00                  |
| updated_at           | TIMESTAMP   | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间                   | 2024-01-01 10:00:00                  |

#### 索引设计

```sql
-- 主键索引（自动创建）
PRIMARY KEY (id)

-- 外键索引
INDEX idx_flights_airline_id (airline_id)
INDEX idx_flights_departure_airport_id (departure_airport_id)
INDEX idx_flights_arrival_airport_id (arrival_airport_id)

-- 查询索引
INDEX idx_flights_flight_number (flight_number)
INDEX idx_flights_departure_datetime (departure_datetime)
INDEX idx_flights_status (status)
INDEX idx_flights_is_deleted (is_deleted)

-- 组合索引（用于航班搜索）
INDEX idx_flights_search (departure_airport_id, arrival_airport_id, departure_datetime, is_deleted)
```

**索引说明**：

- `idx_flights_search`：航班搜索的核心索引，支持"出发地 + 目的地 + 日期"的查询，同时过滤软删除数据

#### 约束规则

```sql
-- 航班号格式检查（2位航司IATA代码 + 1-4位数字）
CHECK (flight_number REGEXP '^[A-Z]{2}[0-9]{1,4}$')

-- 时间逻辑检查
CHECK (arrival_datetime > departure_datetime)

-- 状态值检查
CHECK (status IN ('SCHEDULED', 'DELAYED', 'CANCELLED', 'COMPLETED'))

-- 非空约束
NOT NULL: flight_number, airline_id, departure_airport_id, arrival_airport_id,
          departure_datetime, arrival_datetime, status, is_deleted

-- 外键约束
FOREIGN KEY (airline_id) REFERENCES airlines(id)
FOREIGN KEY (departure_airport_id) REFERENCES airports(id)
FOREIGN KEY (arrival_airport_id) REFERENCES airports(id)
```

#### 业务规则

1. **航班号格式**：2位航司IATA代码（大写字母）+ 1-4位数字（如：CA1234, MU5678），航司代码部分应与airlines表的iata_code对应
2. **时间存储**：所有时间使用UTC时区存储，显示时根据机场时区转换为本地时间
3. **航班状态**：
   - `SCHEDULED`：已排期，正常
   - `DELAYED`：延误
   - `CANCELLED`：取消
   - `COMPLETED`：已完成（已起飞并到达）
4. **数据完整性**：
   - 出发机场和到达机场不能相同
   - 到达时间必须晚于出发时间
5. **软删除策略**：
   - 使用 `is_deleted` 字段标记删除状态，不物理删除数据
   - 删除操作：SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP
   - 查询时必须过滤：WHERE is_deleted = FALSE

#### 使用场景

- 航班搜索：根据出发地、目的地、日期查询可用航班
- 航班详情：显示航班的完整信息（航司、机场、时间、机型、状态）
- 航班管理：更新航班状态（延误、取消等）
- 库存管理：配合 flight_seat_classes 表管理座位库存

---

### 表名：flight_seat_classes（航班座位舱位表）

#### 业务描述

存储每个航班的座位舱位信息（经济舱、商务舱等），包括座位数量、库存和价格，用于座位库存管理和差异化定价。

#### 表结构

| 字段名          | 数据类型      | 约束                                          | 描述                  | 示例                                 |
| --------------- | ------------- | --------------------------------------------- | --------------------- | ------------------------------------ |
| id              | UUID          | PRIMARY KEY                                   | 主键，唯一标识        | 550e8400-e29b-41d4-a716-446655440000 |
| flight_id       | UUID          | NOT NULL, FOREIGN KEY                         | 航班ID，关联flights表 | 550e8400-e29b-41d4-a716-446655440001 |
| class_type      | VARCHAR(20)   | NOT NULL                                      | 舱位类型              | ECONOMY, BUSINESS, FIRST             |
| total_seats     | INT           | NOT NULL                                      | 该舱位总座位数        | 150                                  |
| available_seats | INT           | NOT NULL                                      | 该舱位剩余可售座位    | 120                                  |
| price           | DECIMAL(10,2) | NOT NULL                                      | 该舱位票价（CNY）     | 899.00                               |
| created_at      | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP           | 创建时间              | 2024-01-01 10:00:00                  |
| updated_at      | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间              | 2024-01-01 10:00:00                  |

#### 索引设计

```sql
-- 主键索引（自动创建）
PRIMARY KEY (id)

-- 外键索引
INDEX idx_seat_classes_flight_id (flight_id)

-- 唯一索引（一个航班的同一舱位只能有一条记录）
UNIQUE INDEX uk_seat_classes_flight_class (flight_id, class_type)

-- 查询索引
INDEX idx_seat_classes_class_type (class_type)
```

**索引说明**：

- `uk_seat_classes_flight_class`：确保一个航班的每个舱位类型只有一条记录，防止数据重复

#### 约束规则

```sql
-- 舱位类型检查
CHECK (class_type IN ('ECONOMY', 'BUSINESS', 'FIRST'))

-- 座位数逻辑检查
CHECK (available_seats >= 0)
CHECK (available_seats <= total_seats)
CHECK (total_seats > 0)

-- 价格检查
CHECK (price > 0)

-- 非空约束
NOT NULL: flight_id, class_type, total_seats, available_seats, price

-- 外键约束
FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
```

#### 业务规则

1. **舱位类型**：
   - `ECONOMY`：经济舱
   - `BUSINESS`：商务舱
   - `FIRST`：头等舱
2. **库存管理**：
   - 预订时：`available_seats = available_seats - 订票数量`
   - 取消订单时：`available_seats = available_seats + 退票数量`
   - 不能超卖：`available_seats >= 0`
3. **价格策略**：
   - 每个舱位独立定价
   - 支持动态调价（修改price字段）
4. **级联删除**：当航班被删除时，对应的座位舱位记录也会被删除（ON DELETE CASCADE）
5. **数据完整性**：
   - 同一航班的同一舱位类型只能有一条记录
   - 剩余座位数不能超过总座位数

#### 使用场景

- 座位查询：查询某航班各舱位的剩余座位和价格
- 库存管理：预订/取消时更新剩余座位数
- 价格展示：显示不同舱位的差异化价格
- 舱位筛选：用户按舱位类型筛选航班
