define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'bkk'], function($, main, axios, crud, helper, select2, bkk) {
  let obj2 = {

    view: function() {
    	bkk.view('bkk-menu');
    }
  }

  return obj2;
})