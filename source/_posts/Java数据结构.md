---
title: Java数据结构
date: '2025/09/06 14:22:46'
tags:
  - Java
categories:
  - Java
  - 编程
abbrlink: 7038c214
cover:
---
## 数组（Arrays）
`int[] array = new int[5];`
- **特点：** 固定大小，存储相同类型的元素。
- **优点：** 随机访问元素效率高。
- **缺点：** 大小固定，插入和删除元素相对较慢。
## 列表（Lists）
### ArrayList
`List<String> arrayList = new ArrayList<>();`
- **特点：** 动态数组，可变大小。
- **优点：** 高效的随机访问和快速尾部插入。
- **缺点：** 中间插入和删除相对较慢。
### LinkedList
`List<Integer> linkedList = new LinkedList<>();`
- **特点：** 双向链表，元素之间通过指针连接。
- **优点：** 插入和删除元素高效，迭代器性能好。
- **缺点：** 随机访问相对较慢。
## 集合（Set）
存储不重复元素
### HashSet
`Set<String> hashSet = new HashSet<>();`
- **特点：** 无序集合，基于HashMap实现。
- **优点：** 高效的查找和插入操作。
- **缺点：** 不保证顺序。
### TreeSet
`Set<Integer> treeSet = new TreeSet<>();`
- **特点：** 有序集合，底层基于红黑树实现，不允许重复元素。
- **优点：** 提供自动排序功能，适用于需要按顺序存储元素的场景。
- **缺点：** 性能相对较差，不允许插入 null 元素。
## 映射（Maps）
存储键值对
### HashMap
`Map<String, Integer> hashMap = new HashMap<>();`
- **特点：** 基于哈希表实现的键值对存储结构。
- **优点：** 高效的查找、插入和删除操作。
- **缺点：** 无序，不保证顺序。
### TreeMap
`Map<String, Integer> treeMap = new TreeMap<>();`
- **特点：** 基于红黑树实现的有序键值对存储结构。
- **优点：** 有序，支持按照键的顺序遍历。
- **缺点：** 插入和删除相对较慢。
## 栈（Stack）
线性数据结构，后进先出
`Stack<Integer> stack = new Stack<>();`
## 队列（Queue）
先进先出
`Queue<String> queue = new LinkedList<>();`
## 堆（Heap）
```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
```
## 树（Trees）
TreeNode
```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```
