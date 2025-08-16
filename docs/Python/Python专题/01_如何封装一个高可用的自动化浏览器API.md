---
title: "[Python专题]1 如何封装一个高可用的自动化浏览器API"
description: Playwright + asyncio + FastAPI 应该是Python环境下实现这一目标最好的一套工具。
tags:
  - Python
  - Playwright
  - FastAPI
categories: [Python专题]
---

# [Python专题]1 如何封装一个高可用的自动化浏览器API

> 随着基于JS的前端框架大行其道，越来越多的网站采用了CSR(客户端渲染)的方案，虽然这不利于SEO，但提高了开发效率，降低了服务器的压力，提高了安全性，用户体验也还好。但这对爬虫来说就很蛋疼了，长期以来Python爬虫靠的都是解析HTML，现在要执行JS才能拿到数据了。而Selenium虽然能实现浏览器环境，但它不支持异步、语法兼容性差、性能低下等问题使得使用体验非常糟糕，长期以来Python只能用非官方实现puppeteer FFI的[pyppeteer](https://github.com/pyppeteer/pyppeteer)来实现较为高效的爬虫。
> 但现在，你多了一个选择，那就是由巨硬开源的，原生支持Python的[playwright-python](https://github.com/microsoft/playwright-python)，不仅实现了高效的加载网站，还跨提供了跨浏览器支持，不喜欢Chromium可以直接用Firefox！
> 最麻烦的浏览器问题解决了，剩下的就是在此基础上，添加一些异步，优化一下性能，拿API包装一下，一个不错的服务就诞生了。
