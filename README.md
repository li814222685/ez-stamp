# ez-stamp

generate stamp by svg&amp;js,support download png
生成简易印章，支持下载 png



## Language

- [中文](#中文)
- [English](#english)

---

### English

### StampGenerator Class Documentation

#### Overview

The `StampGenerator` class is designed to facilitate the creation and manipulation of custom stamp graphics using SVG.js. This class allows you to generate a stamp with specified text elements and graphical features such as a star, outer circle, and text paths.

#### Installation

To use the `StampGenerator`,

```bash
bash

npm install ez-stamp
```

#### Usage

##### Creating an Instance

Create a new instance of `StampGenerator` by providing the container ID, main text, and base text.

```js
javascript

const myStamp = new StampGenerator('container', 'Main Text', 'Base Text');
```

##### Methods

- **generate()**: Generates the stamp graphic with the specified texts and graphical elements.
- **download()**: Downloads the generated stamp as a PNG image.

##### Properties

- **draw**: An instance of SVG.js used for drawing.
- **radius**: The radius of the outer circle.
- **centerX, centerY**: The center coordinates of the stamp.
- **mainText, baseText**: The texts to be displayed on the stamp.

#### Static Methods

- **createStarPath(centerX, centerY, spikes, outerRadius, innerRadius)**: Creates a path string for a star shape.
- **createOuterCirclePath(centerX, centerY, radius)**: Creates a path string for an outer circle.
- **createUptextPath()**: Creates a path string for the upper text path.
- **createBottomtextPath()**: Creates a path string for the bottom text path.

#### Example

```js
javascript

// Importing the StampGenerator class
import StampGenerator from 'ez-stamp';

// Creating &&Generate a stamp generator instance 
const myStamp = new StampGenerator('myContainer', 'Sample Main Text', 'Sample Base Text');


// Downloading the stamp as a PNG image
myStamp.download();
```

#### Note

Ensure that the container element with the ID provided exists in the DOM before creating the `StampGenerator` instance.

This documentation provides a comprehensive guide on how to utilize the `StampGenerator` class effectively for generating and downloading custom stamp graphics.

---

### 中文

### StampGenerator 类文档

#### 概览

`StampGenerator` 类是使用SVG.js设计的，旨在帮助创建和操作自定义印章图形。此类允许你生成带有指定文本元素和图形特征（如星星、外圈和文本路径）的印章。

#### 安装



```bash
bash

npm instal ez-stamp
```

#### 使用方法

##### 创建实例

通过提供容器ID、主文本和基础文本来创建 `StampGenerator` 的新实例。

```js
javascript

const myStamp = new StampGenerator('containerId', '主文本', '基础文本');
```

##### 方法

- **generate()**：生成具有指定文本和图形元素的印章图形。
- **download()**：将生成的印章下载为PNG图像。

##### 属性

- **draw**：用于绘图的SVG.js实例。
- **radius**：外圈的半径。
- **centerX, centerY**：印章的中心坐标。
- **mainText, baseText**：要在印章上显示的文本。

#### 静态方法

- **createStarPath(centerX, centerY, spikes, outerRadius, innerRadius)**：创建星星形状的路径字符串。
- **createOuterCirclePath(centerX, centerY, radius)**：创建外圈的路径字符串。
- **createUptextPath()**：创建上部文本路径的路径字符串。
- **createBottomtextPath()**：创建底部文本路径的路径字符串。

#### 示例

```js
javascript

// 导入StampGenerator类
import StampGenerator from 'ez-stamp';

// 创建一个StampGenerator实例
const 我的印章 = new StampGenerator('containerId', '示例主文本', '示例基础文本');

// 生成印章
myStamp.generate();

// 将印章下载为PNG图像
myStamp.download();
```

#### 注意

在创建 `StampGenerator` 实例之前，确保提供的DOM中存在具有相应ID的容器元素。

此文档提供了如何有效利用 `StampGenerator` 类生成和下载自定义印章图形的全面指南。

