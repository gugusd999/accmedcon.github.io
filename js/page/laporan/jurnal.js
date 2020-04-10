define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'jurnal'], function($, main, axios, crud, helper, select2, jurnal) {
  let obj2 = {

    view: async function() {
      jurnal.view('umum');
    }
  }

  return obj2;
})