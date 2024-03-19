---
layout: post
title: "[机器学习] 10 Transformer"
description: 最近几年AI领域最受瞩目的模型。此外猜猜“GPT”是什么的简称？
date: 2023-06-24 17:00:00 +0800
tags:
  - 机器学习
  - Transformer
category: 机器学习
---

> 目前认为，Transformer是处理序列数据上限最高的模型，并且迁移到非序列数据(比如Vision Transformer之于图像)时仍有不错的效果，因其优秀的性能、高效的计算过程和广阔的应用场景受到了广泛关注。当下大火大语言模型(如ChatGPT、BERT)都是基于Transformer的。
>
> 这一章将结合汤老师的课程、原论文以及李沐大神的网课视频，记录下Transformer的相关知识。

## 引子：为什么需要Transformer？

> 因为RNN系列模型存在缺陷(此时又是批判前辈时间，并且这些缺点自然也是Transformer的优点)

* 难以获取长距离的依赖关系：RNN的隐层状态$h_t$只能通过$h_{t-1}$传递信息，如果距离过远，信息传递会出现衰减
* 难以并行：由于严格限制了信息传递的方式，其信息均来自上一时刻的隐层状态，因此无法并行计算。这在工程上是一个十分致命的问题。

## 符号约束与术语解释

|符号|含义|
|:---:|:---:|
|$X(x_1,x_2,...,x_n)$|输入序列，我们通常喜欢把输入记作$X$|
|$Y(y_1,y_2,...,y_m)$|Decoder的输出序列，我们通常喜欢把输出记作$Y$|
|$Z(z_1,z_2,...,z_n)$|Encoder的输出序列，这个序列是一个向量序列，它将作为Decoder的输入(一部分)|

|术语|含义|
|:---:|:---:|
|stack|堆叠/堆积，不要翻译成“堆栈”，那是计算机组成原理的东西。在这里指一种结构：某种“块”连续地串行排列，按照这种结构进行运算。|
|encoder|编码器，在Transformer中的一种结构，用于将输入序列转换为向量表示。|
|decoder|解码器，在Transformer中的一种结构，用于将向量表示转换为输出序列。|
|auto-regressive|自回归，指模型的输出依赖于之前的输出，这一特点在Decoder生成输出的过程中有所体现。|
|sequence transduction models|序列转换模型，指的是输入是序列，输出也是序列的一类模型，看得出来这是单纯从输入和输出的角度来定义的。|

## 10.1 Transformer介绍

> * 在原始论文《Attention Is All You Need》中，Transformer模型被提出，并且用来完成机器翻译任务。因此下面的内容将以机器翻译任务为例，用以详细介绍Transformer模型。
> * 当然，现在Transformer模型已经被广泛运用在各种序列数据中了(如时序数据、文本数据等)。
> * 顺便说一句，在这篇文章出现之前，你去搜“Transformer”基本上只能搜出来变压器广告和变形金刚剧照，但现在，它的风头已经完全盖过了这两者。但其实这个名字取得也很合适——Transformer能用在多种任务中，“变形金刚”一词很贴切，而Transformer的“Encoder-Decoder”结构，与变压器的结构(原绕组-副绕组)也有异曲同工之妙。

### 10.1.1 模型整体结构

![Transformer原始结构](/images/机器学习/10-Transformer模型结构.webp "我相信这个图可能各位都快看吐了，但我还是要贴一下，因为这个图很能说明问题")

* 以上，是Transformer原论文中的配图，其中左侧为Encoder，右侧为Decoder，我比较喜欢先整体后细节的方式，所以这一小节咱们只看整体结构和输出。
  > The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder, shown in the left and right halves of Figure 1, respectively.
  >
  > Transformer遵循这一整体架构，编码器和解码器都使用堆叠自注意力、逐点(姑且这么翻译)、全连接层，分别如图1的左半部分和右半部分所示。
* Encoder：对于左侧的Encoder，其输入均来自上一层Encoder的输出(第一层Encoder的输入为原始输入序列)，也就是图中**Input Embedding+Positional Encoding**的结果。
* Decoder：而对于右侧的Decoder，我们能注意到一个不同的地方：它的输入不仅来自左边Encoder，同时还包括了一个**Output Embedding+Positional Encoding**。这其实就是Auto-regressive(自回归)的体现。它表示的意思是，Decoder每生成一个$y_i$，都会将其加入到下一时刻的输入中，也就是说，对于Decoder生成的第$t$个输出$y_t$，其“Output Embedding”实际上是$y_1,y_2,...,y_{t-1}$的向量表示。
  > 这里沐神总结的非常好：“在过去时刻的输出，也会作为当前时刻的输入”。
* 输出：通常来说，Decoder输出的仍然是一个序列，因为Transformer仍然是一种**sequence transduction models**模型，比如在机器翻译任务中，Transformer的输入是德语，输出是英语，二者都是文本(序列数据)，如下图简化结构所示。但是上图我们能看到，在Decoder的输出后面，又套了一个Linear层，然后再套一个Softmax，得到Output Probabilities。这是因为在机器翻译任务中，Decoder每次实际输出的是一个向量(logits)，每个数表示一个单词的分数，随后通过Softmax将其转换为概率，并选择概率最高的单词作为本次的输出。

![Transformer结构](/images/机器学习/10-Transformer结构简化版.webp "Transformer简化结构")

* Encoders：若干个Encoder层，将输入序列生成隐层空间的表示
* Decoders：若干个Decoder层，将隐层空间的表示转换为输出序列
* 特点：Encoder和Decoder经过多层编码/解码，feature map的大小不变

### 10.1.2 Encoder结构

> 我想，首先我们要知道，Encoder(编码器)是干嘛的？

* 简单来说，Encoder是将输入序列(记作$x_1,...x_n$)转换为向量表示(记作$z_1,...z_n$)。因为当前的各种模型都无法对自然语言直接处理，必须要转换为向量表示。

![5.Ex3_Transformer_Encoder结构](/images/机器学习/5.Ex3_Transformer_Encoder结构.jpg)

* Encoder结构包括 `Self-Attention`和 `Feed Forward Neural Network`两个部分。
* `Self-Attention`模块将数据通过运算得到一个加权的特征向量$Z$
  * $Z=Attention(Q,K,V)=\text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$
* 随后Z将会被送到 `Feed Forward Neural Network`中进行处理，这个模块是个2层全连接层，第一层用ReLU激活，第二层使用线性激活函数。

### 10.1.3 Decoder结构

* Decoder结构包括 `Self-Attention`，`Encoder-Decoder Attention`和 `Feed Forward Neural Network`三个部分。

## 10.2 自注意力机制(Self-Attention)

> 顾名思义，计算注意力时，信息全部来自"自己"

* 每个单词有3个不同的向量

  * Q: Query(查询)
  * K: Key(键)
  * V: Value(值)

### 10.2.1 自注意力计算方法

1. 每个单词都转化为$Embedding$(嵌入，或者说词向量)。
2. 根据$Embedding$得到第$i$个词的向量$q_i,k_i,v_i$，每个词的向量构成了$W^Q,W^K,W^V$三个权值矩阵(有时候也直接记作$Q,K,V$)
3. 然后计算$\text{score}_i$，$\text{score}_i=q_i . k_j$(j遍历其他所有的词向量)，得到若干个score值，这些值构成$score_i$向量
4. 然后是个工程技巧(trick)，将$score_i$除以$\sqrt{d_k}$，其中$d_k$是$K$的维度，实质上是个归一化，避免尺度不同造成的影响，同时稳定梯度
5. 对于上述$score_i$套个Softmax，转换为概率分布，然后再乘以$v_i$，得到最终的$z_i$
6. 在self-attention需要强调的最后一点是其采用了残差网络中的short-cut，以及Layer Normalization，目的都是稳定梯度，防止过拟合

## 10.3 其他设计

### 10.3.1 Multi-Head Attention

* 实质即多个Self-Attention并行，允许不同的头关注不同的位置

### 10.3.2处理序列信息：Positional Encoding

* 先前的设计中没有利用序列信息，为了解决这个问题，Transformer引入了Positional Encoding

### 10.3.3 其他Trick

* 残差连接
* Layer Normalization

## Ques10-例题整理

### [原理理解·自注意力机制]

> 题目内容

* 请详细解释Transformer模型的自注意力(Self-Attention)机制如何帮助模型捕捉序列中的长距离依赖关系。

> 分析与解答

* Self-Attention的运算过程如下：
  * Transformer为每个词向量都分配三个权重矩阵：$W^Q,W^K,W^V$，将每个词向量分别与这三个权重矩阵相乘，得到$q_i,k_i,v_i$；然后对于序列中的每一个词$x_i$计算其权重：$\text{attention}_i=\text{Softmax}\left(\frac{Q\cdot K^T}{\sqrt{d_k}}\right)$。实际得到$attention$系数矩阵，最后按照$Z=attention\cdot V$得到输出。
* 在Transformer中，其Encoder和Decoder都使用了Self-Attention机制。
  * 在编码阶段，每个词向量经过编码后都包含了其对于整个序列的相关性信息。
  * 在预测阶段，Decoder会接收来自Encoder传入的Q、K矩阵，使得进行每一次预测时，模型拥有了对于之前序列的全局信息，从而避免了像RNN一样对于长序列编码过程中信息丢失的问题。

### [模型理解·网络结构比较]

> 题目内容

* 请比较并对比CNN、RNN、GRU、LSTM和Transformer这五种神经网络结构。请考虑他们的主要特性、优点、缺点和适用场景。

> 分析与解答

|模型|网络结构|特性|优点|缺点|适用场景|
|:---:|:---:|:---:|:---:|:---:|:---:|
|CNN|卷积层、池化层、全连接层。|通过卷积层和池化层来提取特征并减少参数量。|权值共享、局部感受野、平移不变性。|池化层可能会丢失信息、容易出现梯度消失或梯度爆炸。|计算机视觉中，分类、识别等任务。|
|RNN|多个神经元线性排列。|适合处理序列数据。|可以捕捉长期依赖关系，能有效利用时序信息。|难以解决“长期依赖”问题，难以并行化计算。|自然语言处理中，如机器翻译、情感分析等任务。|
|GRU|引入了更新门和重置门。|通过更新门和重置门控制信息的流动。|计算相较于LSTM更快，某些问题下能达到不错的效果。|在某些情况下仍然无法很好处理长期依赖问题。|同上。|
|LSTM|引入了遗忘门、输入门和输出门。|通过遗忘门、输入门和输出门控制信息的流动。|适用于处理长期依赖关系，能够有效地缓解梯度消失和梯度爆炸问题。|计算较为复杂，开销大。|同上。|
|Transformer|包括Decoder-Encoder两部分。|基于自注意力机制，能有效应对长距离依赖问题。|允许并行计算，对于序列数据的处理效果更好。|局部信息的获取不如RNN和CNN强。|序列数据的处理，如自然语言处理。|

## References

* [详解Transformer （Attention Is All You Need） - 知乎](https://zhuanlan.zhihu.com/p/48508221)
* [Self-Attention和Transformer \| machine-learning-notes](https://luweikxy.gitbook.io/machine-learning-notes/self-attention-and-transformer)
* [Transformer论文逐段精读【论文精读】](https://www.bilibili.com/video/BV1pu411o7BE)
* [细节拉满，全网最详细的Transformer介绍（含大量插图）！ - 知乎](https://zhuanlan.zhihu.com/p/681532180)
