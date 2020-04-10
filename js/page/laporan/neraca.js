define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'neraca'], function($, main, axios, crud, helper, select2, neraca) {
  let obj2 = {

    view: function() {
    	neraca.view('bkk-menu');
    }
  }

  return obj2;

})