<template>
  <div class="p-xl">
    <!-- 常见文件类型 -->
    <div class="mb-xxl">
      <div class="mb-l pb-s">
        <h3 class="text-lg fw-md text-primary mb-xs">常见文件类型图标</h3>
        <p class="text-sm text-third">常用办公文档和压缩包格式</p>
      </div>
      <div class="flex flex-wrap gap-l">
        <div class="file-icon-card">
          <e-file-icon icon="pdf" class="file-icon" />
          <span class="text-sm text-primary fw-md">PDF</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="doc" class="file-icon" />
          <span class="text-sm text-primary fw-md">Word</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="xls" class="file-icon" />
          <span class="text-sm text-primary fw-md">Excel</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="ppt" class="file-icon" />
          <span class="text-sm text-primary fw-md">PPT</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="txt" class="file-icon" />
          <span class="text-sm text-primary fw-md">文本</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="zip" class="file-icon" />
          <span class="text-sm text-primary fw-md">压缩包</span>
        </div>
      </div>
    </div>

    <!-- 图片文件类型 -->
    <div class="mb-xxl">
      <div class="mb-l pb-s">
        <h3 class="text-lg fw-md text-primary mb-xs">图片文件类型图标</h3>
        <p class="text-sm text-third">常见图片和矢量图格式</p>
      </div>
      <div class="flex flex-wrap gap-l">
        <div class="file-icon-card">
          <e-file-icon icon="jpg" class="file-icon" />
          <span class="text-sm text-primary fw-md">JPG</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="png" class="file-icon" />
          <span class="text-sm text-primary fw-md">PNG</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="gif" class="file-icon" />
          <span class="text-sm text-primary fw-md">GIF</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="svg" class="file-icon" />
          <span class="text-sm text-primary fw-md">SVG</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="tif" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">TIF</span>
        </div>
      </div>
    </div>

    <!-- 音视频文件类型 -->
    <div class="mb-xxl">
      <div class="mb-l pb-s">
        <h3 class="text-lg fw-md text-primary mb-xs">音视频文件图标</h3>
        <p class="text-sm text-third">常见音频和视频格式</p>
      </div>
      <div class="flex flex-wrap gap-l">
        <div class="file-icon-card">
          <e-file-icon icon="mp4" class="file-icon" />
          <span class="text-sm text-primary fw-md">MP4</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="wmv" class="file-icon" />
          <span class="text-sm text-primary fw-md">WMV</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="mp3" class="file-icon" />
          <span class="text-sm text-primary fw-md">MP3</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="wav" class="file-icon" />
          <span class="text-sm text-primary fw-md">WAV</span>
        </div>
      </div>
    </div>

    <!-- 其他内置类型 -->
    <div class="mb-xxl">
      <div class="mb-l pb-s">
        <h3 class="text-lg fw-md text-primary mb-xs">其他内置文件图标</h3>
        <p class="text-sm text-third">补齐图片、设计、网页与系统相关格式</p>
      </div>
      <div class="flex flex-wrap gap-l">
        <div class="file-icon-card">
          <e-file-icon icon="js" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">JS</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="xml" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">XML</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="java" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">JAVA</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="vue" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">Vue</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="class" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">CLASS</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="properties" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">PROPERTIES</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="json" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">JSON</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="md" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">MD</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="log" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">LOG</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="com" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">COM</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="ioc" class="file-icon" />
          <span class="text-sm text-primary fw-md" style="max-width: 100px">IOC</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="bmp" class="file-icon" />
          <span class="text-sm text-primary fw-md">BMP</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="ai" class="file-icon" />
          <span class="text-sm text-primary fw-md">AI</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="eps" class="file-icon" />
          <span class="text-sm text-primary fw-md">EPS</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="css" class="file-icon" />
          <span class="text-sm text-primary fw-md">CSS</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="html" class="file-icon" />
          <span class="text-sm text-primary fw-md">HTML</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="ofd" class="file-icon" />
          <span class="text-sm text-primary fw-md">OFD</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="ps" class="file-icon" />
          <span class="text-sm text-primary fw-md">PS</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="ico" class="file-icon" />
          <span class="text-sm text-primary fw-md">ICO</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="dll" class="file-icon" />
          <span class="text-sm text-primary fw-md">DLL</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="swf" class="file-icon" />
          <span class="text-sm text-primary fw-md">SWF</span>
        </div>
      </div>
    </div>

    <!-- 文件名识别 -->
    <div class="mb-xxl">
      <div class="mb-l pb-s">
        <h3 class="text-lg fw-md text-primary mb-xs">通过文件名识别</h3>
        <p class="text-sm text-third">自动从完整文件名提取扩展名</p>
      </div>
      <div class="flex flex-wrap gap-l">
        <div class="file-icon-card">
          <e-file-icon icon="document.pdf" class="file-icon" />
          <span class="text-sm text-secondary text-center ellipsis" style="max-width: 100px">document.pdf</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="报告.docx" class="file-icon" />
          <span class="text-sm text-secondary text-center ellipsis" style="max-width: 100px">报告.docx</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="数据.xlsx" class="file-icon" />
          <span class="text-sm text-secondary text-center ellipsis" style="max-width: 100px">数据.xlsx</span>
        </div>
      </div>
    </div>

    <!-- 未知类型 -->
    <div>
      <div class="mb-l pb-s">
        <h3 class="text-lg fw-md text-primary mb-xs">未知类型使用默认图标</h3>
        <p class="text-sm text-third">不支持的文件类型显示通用图标</p>
      </div>
      <div class="flex flex-wrap gap-l">
        <div class="file-icon-card">
          <e-file-icon icon="unknown" class="file-icon" />
          <span class="text-sm text-secondary">未知类型</span>
        </div>
        <div class="file-icon-card">
          <e-file-icon icon="file.xyz" class="file-icon" />
          <span class="text-sm text-secondary text-center ellipsis" style="max-width: 100px">file.xyz</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EFileIcon } from '@epoint-fe/eui-components';
</script>

<style scoped>
.file-icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--e-space-m);
  padding: var(--e-space-l);
  min-width: 110px;
  background: var(--e-color-white);
  border: var(--e-border);
  border-radius: var(--e-border-radius-base);
  transition: var(--e-transition-all);
  cursor: pointer;
}

.file-icon-card:hover {
  border-color: var(--e-color-primary);
  background-color: var(--e-fill-color-lighter);
  box-shadow: var(--e-shadow-m);
  transform: translateY(-2px);
}

.file-icon {
  font-size: 48px;
  transition: var(--e-transition-all);
}

.file-icon-card:hover .file-icon {
  transform: scale(1.1);
}
</style>
