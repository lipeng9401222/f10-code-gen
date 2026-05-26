---
title: 全流程体验
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/full-process-experience/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/full-process-experience/)

接下来，我们通过一个完整的流程，体验一下框架的开发过程。

首先请确保你已经具备了基本的 node 环境， 配置好了公司私有源， 安装好了 eui-cli 工具。

如果还没有，请参阅文档 [开发环境准备](./development-environment.md) 和 [快速开始](./quick-start.md)。

以下提供 windows 和 mac 的一键环境脚本，但由于设备和网络的情况不同，不一定能一次安装成功，请根据实际情况进行调整。

### Windows 一键环境脚本（PowerShell）

需要有 winget 工具，否则需要手动安装 nvm-windows。 [github 下载地址](https://github.com/coreybutler/nvm-windows)
[备用地址](http://192.168.219.54/docs/software/nvm-setup.exe)

```powershell
#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$nodeVersion = "22.21.1"

function Ensure-Command($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) { return $false } else { return $true }
}

Write-Host "1) 安装 nvm-windows（如未安装）..."
if (-not (Ensure-Command "nvm")) {
  if (Ensure-Command "winget") {
    winget install -e --id CoreyButler.NVMforWindows --silent --accept-package-agreements --accept-source-agreements | Out-Null
  } else {
    Write-Warning "未检测到 winget，请手动安装 nvm-windows: https://github.com/coreybutler/nvm-windows/releases"
  }
}

if (-not (Ensure-Command "nvm")) {
  $nvmPath = "$env:ProgramFiles\nvm"
  if (Test-Path $nvmPath) {
    $env:Path = "$env:Path;$nvmPath"
  }
}

if (-not (Ensure-Command "nvm")) {
  throw "nvm 未安装，无法继续。"
}

Write-Host "2) 设置 nvm 国内镜像..."
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/

Write-Host "3) 安装并使用 Node.js $nodeVersion ..."
nvm install $nodeVersion
nvm use $nodeVersion

Write-Host "4) 安装 nrm 并切换到公司私有源..."
npm install -g nrm --registry=https://registry.npmmirror.com
$nrmList = nrm ls
if ($nrmList -notmatch " epoint ") {
  try { nrm add epoint http://192.168.0.99:8081/nexus/repository/npmpublic/ } catch {}
}
nrm use epoint

Write-Host "5) 写入 npm token 到用户 .npmrc ..."
$npmrcPath = Join-Path $env:USERPROFILE ".npmrc"
$tokenLine = "//192.168.0.99:8081/nexus/repository/npmpublic/:_authToken=YOUR_NPM_TOKEN_HERE"
$prefixPattern = "^//192\\.168\\.0\\.99:8081/nexus/repository/npmpublic/:_authToken=.*$"
if (Test-Path $npmrcPath) {
  $lines = Get-Content -Path $npmrcPath -ErrorAction SilentlyContinue
  $filtered = @()
  foreach ($line in $lines) {
    if ($line -match $prefixPattern) { continue } else { $filtered += $line }
  }
  $filtered + $tokenLine | Set-Content -Path $npmrcPath -Encoding UTF8
} else {
  Set-Content -Path $npmrcPath -Value $tokenLine -Encoding UTF8
}

Write-Host "6) 安装 pnpm@10 ..."
npm install -g pnpm@10

Write-Host "7) 安装 eui-cli ..."
npm install -g @epframe/eui-cli

Write-Host ""
Write-Host "已写入私有源 token 到 %USERPROFILE%\\.npmrc，可直接使用私有源。"
Write-Host "全部完成。当前 Node 版本：" -NoNewline; node -v
```

### macOS / Linux 一键环境脚本（Bash）

如没有 nvm 需要网络能访问 github 下载地址。

```bash
#!/usr/bin/env bash
set -euo pipefail

NODE_VERSION="22.21.1"

echo "1) 安装 nvm（如未安装）..."
if ! command -v nvm >/dev/null 2>&1; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  fi
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
fi

if ! command -v nvm >/dev/null 2>&1; then
  echo "nvm 未安装成功，请参考 https://github.com/nvm-sh/nvm 手动安装" >&2
  exit 1
fi

echo "2) 设置 nvm 国内镜像..."
export NVM_NODEJS_ORG_MIRROR="https://npmmirror.com/mirrors/node"

echo "3) 安装并使用 Node.js ${NODE_VERSION} ..."
nvm install "${NODE_VERSION}"
nvm use "${NODE_VERSION}"
nvm alias default "${NODE_VERSION}"

echo "4) 安装 nrm 并切换到公司私有源..."
npm install -g nrm --registry=https://registry.npmmirror.com
if ! nrm ls | grep -q " epoint "; then
  nrm add epoint http://192.168.0.99:8081/nexus/repository/npmpublic/ || true
fi
nrm use epoint

echo "5) 写入 npm token 到用户 .npmrc ..."
NPMRC_PATH="$HOME/.npmrc"
TOKEN_LINE='//192.168.0.99:8081/nexus/repository/npmpublic/:_authToken=YOUR_NPM_TOKEN_HERE'
PREFIX_PATTERN='^//192\.168\.0\.99:8081/nexus/repository/npmpublic/:_authToken=.*$'
if [ -f "$NPMRC_PATH" ]; then
  # 过滤旧行并追加新行
  grep -Ev "$PREFIX_PATTERN" "$NPMRC_PATH" > "${NPMRC_PATH}.tmp" || true
  printf "%s\n" "$TOKEN_LINE" >> "${NPMRC_PATH}.tmp"
  mv "${NPMRC_PATH}.tmp" "$NPMRC_PATH"
else
  printf "%s\n" "$TOKEN_LINE" > "$NPMRC_PATH"
fi

echo "6) 安装 pnpm@10 ..."
npm install -g pnpm@10

echo "7) 安装 eui-cli ..."
npm install -g @epframe/eui-cli

echo
echo "已写入私有源 token 到 $HOME/.npmrc，可直接使用私有源。"
echo -n "全部完成。当前 Node 版本："; node -v
```
