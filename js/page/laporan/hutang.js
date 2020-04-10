define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'hutang'], function($, main, axios, crud, helper, select2, hutang) {
  let obj2 = {

    view: function() {
    	hutang.view('umum');
    }
  }

  return obj2;
})