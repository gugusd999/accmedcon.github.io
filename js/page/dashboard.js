define(['jquery', 'main', 'helper'], function($, main, helper) {
  const dashboard = {
    view: async function() {
      await helper.template('html/dashboard.html');

      helper.sesiNew('sesi-back', '');

    }
  }

  return dashboard;
})
