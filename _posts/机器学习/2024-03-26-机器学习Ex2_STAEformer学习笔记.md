---
layout: post
title: "[机器学习] Extra-02 STAEformer学习笔记"
description: "STAEformer学习笔记"
date: 2024-03-26 10:23:00 +0800
tags:
  - 机器学习
  - Transformer
  - 交通流预测
category: 机器学习
---

> 上网搜了搜，似乎关于这篇论文的资料比较少，于是自己啃了啃论文，看了看源代码，并斗胆分享一下自己的理解。

## 1. 预先准备

### 1.1 评价指标

* 对于预测类问题，由于模型最后是能够得出预测值的，所以评价指标通常就是计算预测值与真实值之间的差距，以下这3种是常用的几个指标：
  * MAE
  * MAPE
  * RMSE
  
* 然后我们简单介绍一下，下面原始值以$Y_i$表示，预测值以$\hat{Y_i}$表示，共有$n$个样本。

#### 1.1.1 MAE

> MAE (Mean Absolute Error) - 平均绝对误差

* MAE就是**误差的绝对值的均值**，公式表示为：

$$\text{MAE}=\frac{1}{n}\sum^n_{i=1} \vert Y_i-\hat{Y_i}\vert$$

* 若$Y_i$和$\hat{Y_i}$均为向量，则$\vert Y_i-\hat{Y_i}\vert$表示向量之差的模长。
* MAE对异常值不敏感，但它不能反映预测误差的分布情况<sup>[[1]](#reference)</sup>。
* 在Python中，计算MAE可以使用`sklearn.metrics.mean_absolute_error`函数，函数原型为：

```python
def mean_absolute_error(y_true, y_pred, *, sample_weight=None, multioutput="uniform_average")
```

#### 1.1.2 MAPE

> MAPE (Mean Absolute Percentage Error) - 平均绝对百分比误差

* 嗯，名字和MAE很像啊，其实二者也确实差不多，只不过MAPE多了个Percentage，所以要将其按百分比缩放，公式表示为：

$$\text{MAPE}=\frac{100\%}{n}\sum^n_{i=1}\vert \frac{Y_i-\hat{Y_i}}{Y_i}\vert$$

* 可以看到，缩放这一步是在绝对值内部实现的，此时值域为$[0, +\infty)$。我们称$\text{MAPE}=0$的为完美模型，$\text{MAPE}>100\%$为劣质模型<sup>[[2]](#reference)</sup>。
* 注意：当真实值有数据等于0时，存在分母为0的问题，该公式不可用！
* 同样，`sklearn`提供了计算MAPE的函数`sklearn.metrics.mean_absolute_percentage_error`，函数原型为：

```python
def mean_absolute_percentage_error(y_true, y_pred, *, sample_weight=None, multioutput="uniform_average")
```

#### 1.1.3 RMSE

> RMSE (Root Mean Square Error) - 均方根误差

* emmm，我觉得不用介绍吧，看看英文名全称就知道怎么写公式了：

$$\text{RMSE}=\sqrt{\frac{1}{n}\sum^n_{i=1}(Y_i-\hat{Y_i})^2}$$

* MSE对异常值敏感（因为当异常值与正常值差距较大时，误差会大于1，取平方值以后会进一步增大数值），但它们能够反映预测误差的分布情况<sup>[[1]](#reference)</sup>。
* 还是老朋友`sklearn`，提供了计算RMSE的函数`sklearn.metrics.mean_squared_error`，函数原型为：

```python
def root_mean_squared_error(y_true, y_pred, *, sample_weight=None, multioutput="uniform_average")
```

### 1.2 数据集介绍

> 该论文采用了诸多数据集进行验证，但主要使用的是PeMS08，这是PeMS系列数据集中的一个，相对比较新，也比较有代表性，因此主要介绍这个数据集。

* PeMS08数据集的**数据维度**为$17856 \times 170 \times 3$，文件格式为`npz`，采用`float32`存储。
* 根据学习笔记<sup>[[3]](#reference)</sup>上对于该数据集的介绍，PeMS08为170个探测器每隔5分钟采集一次，共采集62天的数据，每个样本包含3个特征，分别为**流量**、**平均速度**和**平均占用率**
* 我们可以简单计算一下：一小时采集$60\div 5=12$个样本，那么总共就采集$12 \times 24 \times 62=17856$个样本，嗯，确实是这样。
* 所以....数据集长这个样子：

![PeMS08数据集格式](/images/机器学习/PeMS08数据集格式.svg)

## 2. 论文内容

> 原始论文可以在arXiv<sup>[[4]](#reference)</sup>上找到。
>
> ~~为了保持简洁~~因为我懒，这里只简单介绍一下论文的主要内容，原文中的**CCS CONCEPTS**、**KEYWORDS**就略过了。

### 2.1 Abstract

<details>
<summary>查看截图</summary>
<img alt="STAEformer_Abstract" src="/images/机器学习/STAEformer_Abstract.png">
</details>

## Reference

1. [评价指标 - MAE、MSE、RMSE、MRE - 知乎](https://zhuanlan.zhihu.com/p/652167878)
2. [预测评价指标RMSE、MSE、MAE、MAPE、SMAPE-CSDN博客](https://blog.csdn.net/guolindonggld/article/details/87856780)
3. [PEMs数据集 - emanlee - 博客园](https://www.cnblogs.com/emanlee/p/17923764.html)
4. [[2308.10425] STAEformer: Spatio-Temporal Adaptive Embedding Makes Vanilla Transformer SOTA for Traffic Forecasting](https://arxiv.org/abs/2308.10425)
