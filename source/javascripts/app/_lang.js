//= require ../lib/_jquery

/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
;$(function () {
  'use strict';

  var languages = [];
  var locales = [];

  // window.setupLanguages = setupLanguages; 
  window.parseURL = parseURL;
  window.setupLocales = setupLocales;
  window.activateLanguage = activateLanguage;
  window.getLanguageFromQueryString = getLanguageFromQueryString;
  window.getLocaleFromQueryString = getLocaleFromQueryString;

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-name='" + language + "']").addClass('active');
    for (var i=0; i < languages.length; i++) {
      $(".highlight.tab-" + languages[i]).hide();
      $(".lang-specific." + languages[i]).hide();
    }
    $(".highlight.tab-" + language).show();
    $(".lang-specific." + language).show();

    window.recacheHeights();

    // scroll to the new location of the position
    if ($(window.location.hash).get(0)) {
      $(window.location.hash).get(0).scrollIntoView(true);
    }
  }
  
  // calls when locales is changedd
  function changeLocale(locale) {
    if (!locale) return;
    if (locale === '') return;

    //jquery class changing 
    for (var i=0; i < locales.length; i++) {
      $(".locale_" + locales[i]).hide()
    }
    $(".locale_" + locale).show()

    pushURL(locale)

    // if ($(window.location.hash).get(0)) {
    //   $(window.location.hash).get(0).scrollIntoView(true);
    // }

    window.recacheHeights();

    if (window.visualViewport){
      $(window).scrollTop(window.visualViewport.pageTop);
    }
  }

  // parseURL and stringifyURL are from https://github.com/sindresorhus/query-string
  // MIT licensed
  // https://github.com/sindresorhus/query-string/blob/7bee64c16f2da1a326579e96977b9227bf6da9e6/license
  function parseURL(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').filter(function (elem) {
      return elem !== "";
    }).reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };
  
  function stringifyURL(obj) {
    const test = Object.keys(obj).sort().map(function (key) {
      if ( obj[key] ) {
        return 'hola'
      }
    })
    return obj ? Object.keys(obj).sort().filter(function (key) { return obj[key] != undefined }).map(function (key) {
      if ( obj[key] ) {
        var val = obj[key];
  
        if (Array.isArray(val)) {
          return val.sort().map(function (val2) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
          }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }
    }).join('&') : '';
  };

  // gets the language set in the query string
  function getLanguageFromQueryString() {
    if (location.search.length >= 1) {
      var language = parseURL(location.search).language;
      if (language) {
        return language;
      } else {
        return 'en';
      }
    }

    return false;
  }

  // returns current locale from query string
  function getLocaleFromQueryString(){
    if (location.search.length >= 1) {
      var locale = parseURL(location.search).locale;
      if (locale) {
        return locale;
      } else {
        return languages[0];
      }
    }

    return false;
  }

  // returns a new query string with the new language in it
  function generateNewQueryString(obj) {
    var url = parseURL(location.search);
    return stringifyURL(obj)
  }



  // if a button is clicked, add the state to the history
  function pushURL(locale, language = undefined, ) {
    if (!history) { return; }
    if (!locale) {
      locale = getLocaleFromQueryString()
    }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    const str_map = {
      locale: locale,
      language: language
    }
    history.pushState({}, '', '?' + generateNewQueryString(str_map) + '#' + hash);

    // save language as next default
    localStorage.setItem("locale", locale);
    localStorage.setItem("language", language);
  }

  // function setupLanguages(l) {
  //   var defaultLanguage = localStorage.getItem("language");

  //   languages = l;

  //   var presetLanguage = getLanguageFromQueryString();
  //   if (presetLanguage) {
  //     // the language is in the URL, so use that language!
  //     activateLanguage(presetLanguage);

  //     localStorage.setItem("language", presetLanguage);
  //   } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
  //     // the language was the last selected one saved in localstorage, so use that language!
  //     activateLanguage(defaultLanguage);
  //   } else {
  //     // no language selected, so use the default
  //     activateLanguage(languages[0]);
  //   }
  // }

  function setupLocales(l) {
    var defaultLocale = localStorage.getItem("locale");

    locales = l

    var presetLocale = getLocaleFromQueryString();
    if (presetLocale) {
      //tuse the locale in the url
      // changeLocale(presetLocale)
      if (presetLocale === $('.locale_button').find('.right').text()){
        $('.locale_button').find('.right').click();
        changeLocale($('.locale_button').find('.right').text())
      } else {
        $('.locale_button').find('.left').click();
        changeLocale($('.locale_button').find('.left').text())

      }
      localStorage.setItem("locale", presetLocale)
    } else if ((defaultLocale !== null) && (jQuery.inArray(defaultLocale, locales) != -1)){
      if (defaultLocale === $('.locale_button').find('.right').text()){
        $('.locale_button').find('.right').click();
        changeLocale($('.locale_button').find('.right').text())
      } else {
        $('.locale_button').find('.left').click();
        changeLocale($('.locale_button').find('.left').text())

      }
      changeLocale(defaultLocale)
    } else {
      $('.locale_button').find('.right').click(); //Default is englihsh
      changeLocale($('.locale_button').find('.right').text())

      // changeLocale('en')
    }
  }

  // if we click on a language tab, activate that language
  // $(function() { //Activate this for Multiple programming language support
  //   $(".lang-selector a").on("click", function() {
  //     var language = $(this).data("language-name");
  //     pushURL(language);
  //     activateLanguage(language);
  //     return false;
  //   });
  // });

  $(function(){
    $('.locale_button').find('#q1').on("click", function(){
      changeLocale($('.locale_button').find('.left').text());
    })
    $('.locale_button').find('#q2').on("click", function(){
      changeLocale($('.locale_button').find('.right').text());
    })
  })

});
