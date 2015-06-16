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
    .module('markdown',[])
    .directive('markdownHtmlViewer', function($compile, $sce){
        return {
            transclude: true,
            replace: true,
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {

                // System have input markdown content into editor by set "content" parameter
                // exam: <markdown-safe content="**Demo Page**"></markdown-safe>

                var unwatch;

                // init markdown converter (Markdown.Converter.js)
                var converter = new Markdown.Converter();

                converter.hooks.chain("preConversion", function (text) {
                    return text.replace(/\b(a\w*)/gi, "*$1*");
                });
                converter.hooks.chain("plainLinkText", function (url) {
                    return "This is a link to " + url.replace(/^https?:\/\//, "");
                });

                converter.hooks.chain("preBlockGamut", function (text, rbg) {
                    return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
                        return "<blockquote>" + rbg(inner) + "</blockquote>\n";
                    });
                });
                converter.hooks.chain("preBlockGamut", prettyPrint);

                // using Markdown-extra to build markdown editor and markdown preview
                Markdown.Extra.init(converter, {
                    extensions: "all",
                    highlighter: "prettify"
                });

                // get content from attribute "content" and convert to html
                var observer = function(content) {
                    var run = function run() {
                        // stop continuing and watching if scope or the content is unreachable
                        if (!scope || (content == undefined || content == null) && unwatch) {
                            unwatch();
                            return;
                        }

                        scope.sanitizedContent = $sce.trustAsHtml(converter.makeHtml(content));
                    };

                    unwatch = scope.$watch("content", run);

                    run();
                };
                attrs.$observe('content', observer);

                // --------------------------------------------------

                var newElementHtml = '<div ng-bind-html="sanitizedContent" class="wmd-preview markdown-body"></div>';

                var newElement = $compile(newElementHtml)(scope);

                element.append(newElement);
            }
        }
    })
    .directive('markdownViewer', function($compile, $sce){
        return {
            transclude: true,
            replace: true,
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {

                // System have input markdown content into editor by set "content" parameter
                // exam: <markdown-safe content="**Demo Page**"></markdown-safe>

                var unwatch;

                // init markdown converter (Markdown.Converter.js)
                var converter = new Markdown.Converter();

                converter.hooks.chain("preConversion", function (text) {
                    return text.replace(/\b(a\w*)/gi, "*$1*");
                });
                converter.hooks.chain("plainLinkText", function (url) {
                    return "This is a link to " + url.replace(/^https?:\/\//, "");
                });

                /*converter.hooks.chain("preBlockGamut", function (text, rbg) {
                 return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
                 return "<blockquote>" + rbg(inner) + "</blockquote>\n";
                 });
                 });*/
                converter.hooks.chain("preBlockGamut", prettyPrint);

                // using Markdown-extra to build markdown editor and markdown preview
                Markdown.Extra.init(converter, {
                    extensions: "all",
                    highlighter: "prettify"
                });

                var safe = Markdown.getSanitizingConverter();

                // using Markdown-extra to build markdown editor and markdown preview
                Markdown.Extra.init(safe, {
                    extensions: "all"
                });

                // get content from attribute "content" and convert to html
                var observer = function(content) {
                    var run = function run() {
                        // stop continuing and watching if scope or the content is unreachable
                        if (!scope || (content == undefined || content == null) && unwatch) {
                            unwatch();
                            return;
                        }

                        var santiz = safe.makeHtml(content);

                        scope.sanitizedContent = $sce.trustAsHtml(converter.makeHtml(santiz));
                    };

                    unwatch = scope.$watch("content", run);

                    run();
                };
                attrs.$observe('content', observer);

                // --------------------------------------------------

                var newElementHtml = '<div ng-bind-html="sanitizedContent" class="wmd-preview markdown-body"></div>';

                var newElement = $compile(newElementHtml)(scope);

                element.append(newElement);
            }
        }
    })
    .directive('markdownSafeViewer', function($compile, $sce){
        return {
            transclude: true,
            replace: true,
            restrict: 'A',
            scope: {
                //content: '@'
            },
            link: function(scope, element, attrs) {

                // System have input markdown content into editor by set "content" parameter
                // exam: <markdown-safe content="**Demo Page**"></markdown-safe>

                var unwatch;

                var converter = Markdown.getSanitizingConverter();

                // using Markdown-extra to build markdown editor and markdown preview
                Markdown.Extra.init(converter, {
                    extensions: "all",
                    highlighter: "prettify"
                });

                // get content from attribute "content" and convert to html
                var observer = function(content) {
                    var run = function run() {
                        // stop continuing and watching if scope or the content is unreachable
                        if (!scope || (content == undefined || content == null) && unwatch) {
                            unwatch();
                            return;
                        }

                        scope.sanitizedContent = $sce.trustAsHtml(converter.makeHtml(content));
                    };

                    unwatch = scope.$watch("content", run);

                    run();
                };
                attrs.$observe('content', observer);

                // ---------------------------------------------------


                var newElementHtml = '<div ng-bind-html="sanitizedContent" class="wmd-preview markdown-body" style=""></div>';

                var newElement = $compile(newElementHtml)(scope);

                element.append(newElement);
            }
        }
    })
    .directive('markdownHtml', function ($compile, $window) {
        return {
            restrict: "E", // active this directive by input tag <markdown-html></markdown-html> into page
            scope: {
                content: '='
            },
            link: function (scope, element, attrs) {

                // "suffix" is parameter to identify  markdown editor.
                // exam: <markdown-html suffix="-second"></markdown-html>
                // It is suffix of wmd element.
                // wmd element: (wmd-input; wmd-button-bar; wmd-preview)
                // exam: "wmd-input-second" => suffix = "-second"
                var suffix = '';
                if(attrs.suffix) suffix = attrs.suffix;

                // Set height for editor using parmatter "rows" set as attribuite of element
                // exam: <markdown-html suffix="-second" rows="10"></markdown-html>
                // Default height of editor is 5 rows
                var rows = 5;
                if(attrs.rows) rows = attrs.rows;

                // System have input markdown content into editor by set "content" parameter
                // exam: <markdown-html content="**Demo Page**"></markdown-html>

                // init markdown converter (Markdown.Converter.js)
                var converter = new Markdown.Converter();

                converter.hooks.chain("preConversion", function (text) {
                    return text.replace(/\b(a\w*)/gi, "*$1*");
                });
                converter.hooks.chain("plainLinkText", function (url) {
                    return "This is a link to " + url.replace(/^https?:\/\//, "");
                });

                converter.hooks.chain("preBlockGamut", function (text, rbg) {
                    return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
                        return "<blockquote>" + rbg(inner) + "</blockquote>\n";
                    });
                });

                // using Markdown-extra to build markdown editor and markdown preview
                Markdown.Extra.init(converter, {
                    extensions: "all",
                    highlighter: "prettify"
                });

                // help function will be open Markdown source page of JOHN GRUBER - author of Markdown
                var help = function () {
                    $window.open("http://daringfireball.net/projects/markdown/syntax", "_blank");
                };

                // build options for editor
                var options = {
                    helpButton: {handler: help},
                    strings: {quoteexample: "whatever you're quoting, put it right here"}
                };

                // get content from attribute "content" and convert to html

                var observer = function(content) {
                    // build markdown editor template.
                    var newElement = $compile(
                        '<div class="markdown-editor">'+
                        '<div class="contianer-fluid col-xs4">'+
                        '<div id="wmd-preview' + suffix + '" class="wmd-preview markdown-body" style="">'+
                        '</div>' +
                        '</div>'+
                        '<div class="contianer-fluid col-xs4 block">' +
                        '<div class="wmd-panel">' +
                        '<div id="wmd-button-bar' + suffix + '"></div>' +
                        '<textarea class="form-control" rows="'+rows+'" id="wmd-input' + suffix + '" ng-model="content"></textarea>' +
                        '</div>' +
                        '</div>'+
                        '</div>')(scope);

                    // add markdown editor in to point called it. html() doesn't work
                    element.html(newElement);

                    // init markdown editor
                    var editor = new Markdown.Editor(converter, suffix, options);
                    editor.hooks.chain("onPreviewRefresh", prettyPrint); // google code prettify to highlight code
                    editor.run();
                };
                attrs.$observe('content', observer);

                // --------------------------------------------------

            }
        }
    })
    .directive('markdownSafe', function ($compile, $window) {
        return {
            transclude: true,
            replace: true,
            restrict: "E", // active this directive by input tag <markdown-safe></markdown-safe> into page
            scope: {
                content: '='
            },
            link: function (scope, iElement, attrs) {

                // "suffix" is parameter to identify  markdown editor.
                // exam: <markdown-safe suffix="-second"></markdown-safe>
                // It is suffix of wmd element.
                // wmd element: (wmd-input; wmd-button-bar; wmd-preview)
                // exam: "wmd-input-second" => suffix = "-second"
                var suffix = '';
                if(attrs.suffix) suffix = attrs.suffix;

                // Set height for editor using parmatter "rows" set as attribuite of element
                // exam: <markdown-safe suffix="-second" rows="10"></markdown-safe>
                // Default height of editor is 5 rows
                var rows = 5;
                if(attrs.rows) rows = attrs.rows;

                // System have input markdown content into editor by set "content" parameter
                // exam: <markdown-safe content="**Demo Page**"></markdown-safe>
                //var content = '';
                //if(attrs.content) content = attrs.content;


                // init markdown converter (Markdown.Converter.js)
                var converter = Markdown.getSanitizingConverter();

                // using Markdown-extra to build markdown editor and markdown preview
                Markdown.Extra.init(converter, {
                    extensions: "all",
                    highlighter: "prettify"
                });

                // help function will be open Markdown source page of JOHN GRUBER - author of Markdown
                var help = function () {
                    $window.open("http://daringfireball.net/projects/markdown/syntax", "_blank");
                };

                // build options for editor
                var options = {
                    helpButton: {handler: help},
                    strings: {quoteexample: "whatever you're quoting, put it right here"}
                };

                // get content from attribute "content" and convert to html

                var observer = function(content) {
                    // build markdown editor template.
                    var newElement = $compile(
                        '<div class="markdown-editor">'+
                        '<div class="contianer-fluid col-xs4">'+
                        '<div id="wmd-preview' + suffix + '" class="markdown-body wmd-preview">'+
                        '</div>' +
                        '</div>'+
                        '<div class="contianer-fluid col-xs4 block">' +
                        '<div class="wmd-panel">' +
                        '<div id="wmd-button-bar' + suffix + '"></div>' +
                        '<textarea name="Content" class="form-control" rows="'+rows+'" id="wmd-input' + suffix + '" ng-model="content"></textarea>' +
                        '</div>' +
                        '</div>'+
                        '</div>')(scope);

                    // add markdown editor in to point called it. html() doesn't work
                    iElement.html(newElement);

                    // init markdown editor
                    var editor = new Markdown.Editor(converter, suffix, options);
                    editor.hooks.chain("onPreviewRefresh", prettyPrint); // google code prettify to highlight code
                    editor.run();

                };
                attrs.$observe('content', observer);

                // --------------------------------------------------
            }
        }
    });
