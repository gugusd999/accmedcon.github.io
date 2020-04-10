define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'bkk', 'persediaan'], function($, main, axios, crud, helper, select2, bkk, persediaan) {
  let obj2 = {

    view: function() {
    	persediaan.view();
    }
  }

  return obj2;
})
