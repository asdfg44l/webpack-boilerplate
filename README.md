# Frontend Webpack Boilerplate
Provide Simple Webpack5 boilerplate using Babel, PostCSS, Sass, LinguiJS

## 環境建置與需求 (prerequisites)
#### 環境
- Node.js 14.17.6

#### 套件
- [webpack5](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [LinguiJS](https://lingui.js.org/)

## 基本功能使用 (Basic use)

#### 新增頁面 (Add new page)
1. 在 src/pages 中新增 hbs檔
2. 前往 src/javascript/htmlFactory.js 新增 config
```
let configs = {
    index: {
        title: 'Webpack Handlebars Boilerplate',
        //meta: ...
    },
    ...
}
```

#### 新增支援語系 (Support new language)
1. 在 locales新增 json檔
2. 新增該語系的 plurals
```
i18nLoader.js
//import plural rules
import { en, zh } from "make-plural/plurals"

i18n.loadLocaleData("en-us", { plurals: en })
i18n.loadLocaleData("zh-tw", { plurals: zh })


_i18nSetter('en-us')
```
3. 在要支援的元素上加上 data-i18n=[key]
```
<h3 data-i18n="Hello">
    Hello
</h3>
```

## 安裝與執行 (installation and execution)
1. 使用 git 下載本專案 (Git Clone)
```
git clone https://github.com/asdfg44l/webpack-boilerplate.git
```
2. 移動至本專案資料夾 (Move to directory)
```
cd webpack-boilerplate
```
3. 安裝套件 (Installation)
```
npm install
```
4. 啟動專案 (Development)
```
npm run start
```
5. 打包專案 (Production)
```
npm run build
```
