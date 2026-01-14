---
title: Java对象和类
date: '2025/09/04 09:37:24'
tags:
  - Java
categories:
  - Java
  - 编程
abbrlink: f145112f
---
## 1. 类 class
- 定义对象的蓝图，包括属性和方法。
- `public class 类名 {...}`
## 2. 对象 object
- 类的实例，具有状态和行为
- `类名 实例名 = new 类名();`
## 3. 继承 inheritance
- 一个类可以继承另一个类的属性和方法。
- `public class 类A extends 类B {...}`
## 4. 封装 encapsulation
- 将对象的状态私有化，通过公共方法访问。
- `private String name;public String getName() { return name; }`
## 5. 多态 polymorphism
- 对象可以表现为多种形态，通过方法的重载与重写实现。
## 6. 抽象 abstraction
- 使用抽象类和接口来定义必须实现的方法，不提供具体实现。
- **抽象类**：`public abstract class Shape { abstract void draw(); }`
- **接口**：`public interface Animal { void eat(); }`
## 7. 接口 interface
- 定义必须实现的方法，支持多重继承。
- `public interface Drivable { void drive(); }`
## 8. 方法 method
- 定义类的行为
## 9. 方法重载 method overloading
- 同一个类中可以有多个同名的方法，但参数不同。
