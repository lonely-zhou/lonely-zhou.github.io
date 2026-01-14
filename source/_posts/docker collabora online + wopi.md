---
title: docker collabora online + wopi
date: '2025/08/30 19:02:44'
tags:
  - docker
  - wopi
  - collabora
categories: 编程
abbrlink: e5a64255
cover:
---
[[FastAPI WOPI Host (HTTP) 接口文档]]
- token：office.local
- [docker](https://www.docker.com/)

## wopi接口代码
```python
# file_name：wopi_fastapi.py
# token：office.local
# 文件位置：app/files
# 模板文件位置：app/templates
import os
import io
from fastapi import FastAPI, HTTPException, Request,Form
import shutil
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

# -------------------------------
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN", "office.local")
FILE_DIR = os.getenv("FILE_DIR", "./files")
TEMPLATE_DIR = os.getenv("TEMPLATE_DIR", "./templates")
os.makedirs(FILE_DIR, exist_ok=True)
os.makedirs(TEMPLATE_DIR, exist_ok=True)

# 如果没有模板文件，可以自己放置一些到 ./templates 目录，比如空的 docx/xlsx/pptx
DEFAULT_TEMPLATES = {
    "docx": "empty.docx",
    "xlsx": "empty.xlsx",
    "pptx": "empty.pptx"
}

app = FastAPI(title="FastAPI WOPI Host (HTTP)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 内网测试可全开
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
def verify_token(token: str):
    if token != ACCESS_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid access token")

def file_path(file_id: str):
    return os.path.join(FILE_DIR, file_id)

def file_version(file_id: str):
    path = file_path(file_id)
    if os.path.exists(path):
        return str(int(os.path.getmtime(path)))
    return "0"

# -------------------------------
@app.get("/wopi/files/{file_id}")
async def check_file_info(file_id: str, access_token: str):
    verify_token(access_token)
    path = file_path(file_id)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    return JSONResponse({
        "BaseFileName": os.path.basename(path),
        "OwnerId": "user1",
        "UserId": "user1",
        "Size": os.path.getsize(path),
        "Version": file_version(file_id),
        "ReadOnly": False,
        "UserCanWrite": True,
        "SupportsUpdate": True
    })

@app.get("/wopi/files/{file_id}/contents")
async def get_file(file_id: str, access_token: str):
    verify_token(access_token)
    path = file_path(file_id)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    return StreamingResponse(open(path, "rb"), media_type="application/octet-stream")

@app.post("/wopi/files/{file_id}/contents")
async def put_file(file_id: str, request: Request, access_token: str):
    verify_token(access_token)
    path = file_path(file_id)
    data = await request.body()
    with open(path, "wb") as f:
        f.write(data)
    return {"status": "success", "version": file_version(file_id)}

# -------------------------------
# 新建文件接口
# -------------------------------
@app.post("/wopi/files/new")
async def create_new_file(filetype: str = Form(...)):
    """
    新建一个文件(docx / xlsx / pptx)
    """
    filetype = filetype.lower()
    if filetype not in DEFAULT_TEMPLATES:
        raise HTTPException(status_code=400, detail="不支持的文件类型")

    template_file = os.path.join(TEMPLATE_DIR, DEFAULT_TEMPLATES[filetype])
    if not os.path.exists(template_file):
        # 如果模板不存在，就建一个空文件
        open(template_file, "wb").close()

    # 生成文件名
    existing = [f for f in os.listdir(FILE_DIR) if f.endswith("." + filetype)]
    new_name = f"new_{len(existing)+1}.{filetype}"
    new_path = os.path.join(FILE_DIR, new_name)

    # 复制模板
    shutil.copyfile(template_file, new_path)

    # 返回 WOPISrc URL
    wopi_src = f"http://192.168.0.105:8000/wopi/files/{new_name}"  # TODO: 改成你的外部可访问地址
    return JSONResponse({
        "filename": new_name,
        "url": wopi_src,
        "access_token": ACCESS_TOKEN
    })

# -------------------------------
LOCKS = {}

@app.post("/wopi/files/{file_id}/lock")
async def lock_file(file_id: str, request: Request, access_token: str):
    verify_token(access_token)
    LOCKS[file_id] = True
    return {"Lock": "locked"}

@app.post("/wopi/files/{file_id}/unlock")
async def unlock_file(file_id: str, request: Request, access_token: str):
    verify_token(access_token)
    LOCKS[file_id] = False
    return {"Lock": "unlocked"}

```
#### requirements.txt
```text
# file_name：requirements.txt
fastapi==0.111.1
uvicorn[standard]==0.23.2
python-multipart==0.0.6
PyJWT==2.9.0
```
#### 构建镜像
```dockerfile
#file_name：dockerfile
# 基于官方 Python 镜像
FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 复制代码
COPY wopi_fastapi.py /app/

# 安装依赖
RUN pip install --no-cache-dir fastapi uvicorn python-multipart

# 创建文件存储目录
RUN mkdir -p /app/files

# 设置环境变量（非 HTTPS）
ENV ACCESS_TOKEN=office.local
ENV FILE_DIR=/app/files

# 暴露端口
EXPOSE 8000

# 启动 FastAPI
CMD ["uvicorn", "wopi_fastapi:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```
`docker build -t {镜像名} .`
`eg：docker build -t wopi-fastapi .`
## 启动容器
```dockerfile
# file_name：docker-compose.yaml
version: '3.8'

services:
  collabora:
    image: collabora/code:latest
    container_name: collabora
    restart: always
    environment:
      - extra_params=--o:ssl.enable=false
    ports:
      - "9980:9980"

  wopi-server:
    image: wopi-fastapi:latest
    container_name: wopi
    restart: always
    ports:
      - "8000:8000"
    volumes:
      - ../res/files:/app/files
      - ../res/templates:/app/templates
```
`docker-compose up -d`