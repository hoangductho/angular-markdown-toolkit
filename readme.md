## Markdown For AngularJS ##

**1. Overview**

- *Introduce*:
 *  Markdown module is markdown toolkit in the angular page.
 *  this module is directives of  pagedown-extra module for AngularJS
 *  it use padedown-extra library in bower to convert markdown standard
 *  thís module provide 2 options for markdown style: markdown-html and markdown-safe
 *  "markdown-html" allow add html tags into view
 *  "markdown-safe" using sanitizing protected will be replace all html tag into view
 *  This module using github-markdown-css as main stylesheet for show
 *  This use google-code-prettify to highlight code
 *  This module allow you create multiple markdown editor in a page by using "suffix" parameter.
- *Note*:
 *  Use markdown-html allow you add html code into Markdown but your site vulnerable to XSS attacks.
 *  Use markdown-safe, your site is poor, but it is safe for user.

**2. Install Markdown Module**

Install:
```shell
bower install --save angular-markdown-toolkit
```

After install, markdown module included into `index.html`:

```html
<!--Markdown module css loading-->
<link rel="stylesheet" href="scripts/modules/markdown/markdown.css">
```

```html
<!--Markdown module js loading-->
<script src="scripts/modules/markdown/markdown.js"></script>
```

To use markdown module, you need inject it into your module with name `markdown`. Exam
```javascript
angular.module('yourApp', ['markdown']);
```

**3. Dependencies**

- *Pagedown Extra*: https://github.com/jmcmanus/pagedown-extra

install:
```shell
bower install --save pagedown-extra
```

include pagedown extra into `index.html`: 

```html
<script src="bower_components/pagedown-extra/pagedown/Markdown.Converter.js"></script>
<script src="bower_components/pagedown-extra/pagedown/Markdown.Sanitizer.js"></script>
<script src="bower_components/pagedown-extra/pagedown/Markdown.Editor.js"></script>
<script src="bower_components/pagedown-extra/Markdown.Extra.js"></script>
```

- *GitHub Markdown CSS*: https://github.com/sindresorhus/github-markdown-css

install:
```shell
bower install --save github-markdown-css
```

- *Google Code Prettify*: https://github.com/tcollard/google-code-prettify

install:
```shell
bower install --save google-code-prettify
```

- *Bootstrap*

install:
```shell
bower install --save bootstrap
```


----------
## Usage Markdown Module ##

**1. Call Markdown Editor**

Markdown code have 2 options: "markdown html" and "markdown safe".

- Markdown html allow you input and express html code into markdown code. It make flexibility for express, but it isn't safe with the surface attacks, exam XSS.

- Markdown safe deny to express html code into markdown code. It makes your website become monotonous, but it protected your site against XSS attacks. It using sanitizing filter to extrude all html tags before express markdown code into view

So, Markdown Module provide 2 editors for that options:

* Call Markdown HTML Editor: you add markdown editor tag `<markdown-html></markdown-html> ` into your html code.
* Call Markdown Safe Editor: you add markdown editor tag `<markdown-safe></markdown-safe> ` into your html code. 

**2. Multiple Markdown Editor**

Markdown Module allow you create multi editor in a page. So, to do it, you need add `suffix` parameter into your markdown editor tags. With once of editor, `suffix` is only one.

*Example1*: 
```html
<markdown-html suffix="-first"></markdown-html>

<markdown-html suffix="-second"></markdown-html>
```

*Example2*: 
```html
<markdown-safe suffix="first"></markdown-safe>

<markdown-safe suffix="second"></markdown-safe>
```

**3. Push content into Markdown Editor**

If you want revise markdown code existed, you can push your code into Markdown Editors by `content` parameter.

Example1: 
```html
<markdown-html content="##Demo##"></markdown-html>
```
Example2:
```html
<markdown-safe content="##Markdown Safe Editor Demo##"></markdown-safe>
```

**4. Express Markdown Content**

When you have markdown content, and you want express it in your site, you can choice once in two options: `express markdown safe` and `express markdown html`.

- *Express markdown safe*: you add atribute `markdown-safe-viewer` into your html tags. Example:
```html
<div markdown-safe-viewer></div>
// Or
<pre markdown-safe-viewer></pre>
```

- *Express markdown html*: you add atribute `markdown-html-viewer` into your html tags. Exam:
```html
<div markdown-html-viewer></div>
// Or
<pre markdown-html-viewer></pre>
```


----------
## Consultation ##

- *Pagedown Extra*: https://github.com/jmcmanus/pagedown-extra
- *Angular Pagedown*: https://github.com/kennyki/angular-pagedown
- *GitHub Markdown CSS*: https://github.com/sindresorhus/github-markdown-css
- *Google Code Prettify*: https://github.com/tcollard/google-code-prettify


----------


**Author: Hoang Duc Tho**