'use strict';

/**
 * @ngdoc:  readme.md
 * @name;   markdown
 * @author: Hoang Duc Tho
 * @time:   21-11-2014
 * @description:
 *  - Markdown module is markdown toolkit in the angular page.
 *  - this module is directives of  pagedown-extra module for AngularJS
 *  - it use padedown-extra library in bower to convert markdown standard
 *  - thís module provide 2 options for markdown style: markdown-html and markdown-safe
 *  - "markdown-html" allow add html tags into view
 *  - "markdown-safe" using sanitizing protected will be replace all html tag into view
 *  - This module using github-markdown-css as main stylesheet for show
 *  - This module allow you create multiple markdown editor in a page by using "suffix" parameter.
 *
 *@note:
 *  - Use markdown-html allow you add html code into Markdown but your site vulnerable to XSS attacks.
 *  - Use markdown-safe, your site is poor, but it is safe for user.
 *
 *
 * Sub- module of the application.
 */

angular
    .module('markdown',[]);
