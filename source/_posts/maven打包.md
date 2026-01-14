---
title: maven
date: 2024/11/07 10:38:55
tags:
  - maven
categories:
  - 编程
abbrlink: 780af030
---

## 阿里云镜像

```shell
<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```



## 分环境打包

```xml
<build>
  <!-- 指定配置文件-->
  <finalName>HIS</finalName>
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <!-- 资源根目录排除各环境的配置，防止在生成目录中多余其它目录 -->
      <filtering>true</filtering>
      <excludes>
        <exclude>dev/*</exclude>
        <exclude>pro/*</exclude>
      </excludes>
    </resource>
    <resource>
      <directory>src/main/resources/${profiles.active}</directory>
    </resource>
  </resources>
</build>

<profiles>
  <profile>
    <!-- 本地开发环境 -->
    <id>dev</id>
    <properties>
      <!-- 这里的标签名会和resourse进行拼接 -->
      <profiles.active>dev</profiles.active>
    </properties>
    <!-- 这里配置为默认选项 -->
    <activation>
      <activeByDefault>true</activeByDefault>
    </activation>
  </profile>
  <profile>
    <!-- 生产环境 -->
    <id>pro</id>
    <properties>
      <profiles.active>pro</profiles.active>
    </properties>
  </profile>
</profiles>
```

## jar包 （包含依赖）

```xml
<build>
  <plugins>
    <plugin>
      <artifactId>maven-assembly-plugin</artifactId>
      <executions>
        <execution>
          <phase>package</phase>
          <goals>
            <goal>single</goal>
          </goals>
        </execution>
      </executions>
      <configuration>
        <descriptorRefs>
          <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
          <manifest>
            <mainClass>Main</mainClass>
          </manifest>
        </archive>
      </configuration>
    </plugin>
  </plugins>
</build>
```


