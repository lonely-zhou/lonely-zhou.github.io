---
title: Python
date: 2025/05/15 10:38:55
tags:
  - Python
categories:
  - 编程
abbrlink: a378bd8e
---


## pip国内源
```ini
# 查找配置文件路径 pip config list -v
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com
```

## uv国内源
```ini
# 环境变量 用户或者系统
变量名：UV_DEFAULT_INDEX
变量值：https://mirrors.aliyun.com/pypi/simple/
```

## SQLite 基本操作
```python
import sqlite3

def main():
    # 连接到数据库 (如果不存在则创建)
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    print("成功连接到数据库")

    # 创建 'users' 表 (如果不存在)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
    )
    ''')
    conn.commit()
    print("成功创建 'users' 表")

    # 插入数据
    cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ('Alice', 30))
    users_data = [
        ('Bob', 25),
        ('Charlie', 35)
    ]
    cursor.executemany("INSERT INTO users (name, age) VALUES (?, ?)", users_data)
    conn.commit()
    print("成功插入数据")

    # 查询所有数据
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
    print("所有用户:", rows)

    # 查询年龄大于 28 的用户
    cursor.execute("SELECT name, age FROM users WHERE age > ?", (28,))
    older_users = cursor.fetchall()
    print("年龄大于 28 的用户:", older_users)

    # 更新 Alice 的年龄
    cursor.execute("UPDATE users SET age = ? WHERE name = ?", (31, 'Alice'))
    conn.commit()
    print("成功更新 Alice 的年龄")

    # 删除名为 Bob 的用户
    cursor.execute("DELETE FROM users WHERE name = ?", ('Bob',))
    conn.commit()
    print("成功删除 Bob")

    # 再次查询所有数据
    cursor.execute("SELECT * FROM users")
    updated_rows = cursor.fetchall()
    print("更新后的所有用户:", updated_rows)

    # 关闭连接
    cursor.close()
    conn.close()
    print("已关闭数据库连接")

if __name__ == "__main__":
    main()
```