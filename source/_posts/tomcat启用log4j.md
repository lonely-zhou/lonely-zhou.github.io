---
title: tomcat 启用log4j
date: 2024/11/07
abbrlink: 1569dc91
---

## tomcat 安装目录 lib文件夹增加jar包与配置文件

### jar包

https://mvnrepository.com/artifact/log4j/log4j

### 配置文件

```properties
### 设置 ###
log4j.rootLogger=info,stdout,D,E
### 输出信息到控制抬 ###
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[%-5p] %d{yyyy-MM-dd HH:mm:ss} method:%l%n%m%n
### 输出DEBUG 级别以上的日志到=logs/error.log ###
log4j.appender.D=org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.DatePattern='-'yyyy-MM-dd'.log'
log4j.appender.D.File=路径/info.log
log4j.appender.D.encoding=UTF-8
log4j.appender.D.File.encoding=UTF-8
log4j.appender.D.Append=true
log4j.appender.D.Threshold=DEBUG
log4j.appender.D.filter.filterName=org.apache.log4j.varia.LevelRangeFilter
log4j.appender.D.filter.filterName.LevelMin=INFO
log4j.appender.D.filter.filterName.LevelMax=INFO
log4j.appender.D.layout=org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern=%-d{yyyy-MM-dd HH:mm:ss}  [ %F ] - [ %p ]  %n%m%n%n
### 输出ERROR 级别以上的日志到=logs/error.log ###
log4j.appender.E=org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.DatePattern='-'yyyy-MM-dd'.log'
log4j.appender.E.File=路径/error.log
log4j.appender.E.File.encoding=UTF-8
log4j.appender.E.encoding=UTF-8
log4j.appender.E.Append=true
log4j.appender.E.Threshold=ERROR
log4j.appender.E.filter.filterName=org.apache.log4j.varia.LevelRangeFilter
log4j.appender.E.filter.filterName.LevelMin=ERROR
log4j.appender.E.filter.filterName.LevelMax=ERROR
log4j.appender.E.layout=org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern=%-d{yyyy-MM-dd HH:mm:ss}  [ %F ] - [ %p ]  %n%m%n%n
```

## groovy 代码

```groovy
import org.apache.log4j.Category
import org.apache.log4j.Logger

log.info()
```
