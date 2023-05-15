# micro-front-demo 微前端示例项目

整个项目为一个多包项目(Monorepo)，项目使用 lerna-lite 结合 pnpm 的 workspace 进行多包管理

- 微前端是一种将大型前端应用程序拆分为小的、松耦合的部分的方法，以便不同的部分可以独立地开发、测试和部署。

- Monorepo 是一种开发方法，它使用相同的代码库来管理多个项目。在微前端中，Monorepo 是一种将多个应用代码打包到一个代码库中的方法，而不是将每个应用作为单独的代码库处理。这使得跨多个应用程序共享代码和库变得更加容易，并且可以减少重复代码，从而提高开发效率和代码质量。同时，Monorepo 还提供了更好的版本控制和协作，使得更容易协调代码库中的变更。使用 Monorepo 还可以使团队更容易协作和跟踪整个应用程序的开发进度和版本历史记录。

使用 Monorepo 的微前端项目可以带来更高的开发效率、更好的代码质量，以及更好的协作支持。

# 微前端适配问题记录

- 子应用:root 下的样式无效，将:root 改为 body 即可
- 使用 vite 构建的 vue2 项目，element-ui 字体图标无法显示(从 iconfont 网站用 icon class 方式引入字体图标可正常显示)，使用@vue/cli 构建的项目无此问题。
  - 问题原因：怀疑 css 的@font-face 在 vite 环境 shadow-dom 下识别有问题
  - 解决方案：将 element-ui 样式在基座引用一下，或者一个空白 webpack 构建的子项目，引入 element-ui 样式，则 vite 构建的 vue2 项目中 element-ui 字体图标可以正常显示了。
- 下拉框弹出位置不正确，[原因及解决方案](https://wujie-micro.github.io/doc/question/#_4%E3%80%81%E5%86%92%E6%B3%A1%E7%B3%BB%E5%88%97%E7%BB%84%E4%BB%B6-%E6%AF%94%E5%A6%82%E4%B8%8B%E6%8B%89%E6%A1%86-%E5%BC%B9%E5%87%BA%E4%BD%8D%E7%BD%AE%E4%B8%8D%E6%AD%A3%E7%A1%AE)
