define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'bkk', 'inventaris'], function($, main, axios, crud, helper, select2, bkk, inventaris) {
  let obj2 = {

    view: function() {
    	inventaris.view();
    }
  }

  return obj2;
})
