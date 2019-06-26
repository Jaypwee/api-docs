//= require ./lib/_energize
//= require ./app/_toc
//= require ./app/_lang

$(function() {
  loadToc($('#toc'), '.toc-link', '.toc-list-h2', 10);
  console.log('in nosearch');
  // setupLanguages($('body').data('languages')); //Activate in case of multiple language support
  setupLocales($('body').data('locales'));
  $('.content').imagesLoaded( function() {
    window.recacheHeights();
    window.refreshToc();
  });
});

// window.onpopstate = function() {
//   console.log('in onpopstate')
//   activateLanguage(getLanguageFromQueryString());
// };
