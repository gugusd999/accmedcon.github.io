(function () {
      "use strict";
      require.config({
      baseUrl: 'js',
      paths: {
        jquery: "jquery-3.4.1.min",
        sammy: "sammy-latest.min",
        axios: "lib/axios.min",
        crud: "lib/crud",
        crudtransaksi: "lib/crudtransaksi",
        crud2: "lib/crud2",
        crud3: "lib/crud3",
        form: "lib/form",
        select2: "lib/select2.min",
        helper: "lib/helper",
        live: "lib/live",
        aes: "lib/aes",
        jurnal: "lib/jurnal",
        hutang: "lib/hutang",
        bkk: "lib/bkk",
        neraca: "lib/neraca",
        neracaBulan: "lib/neracaBulan",
        terbilang: "lib/terbilang.min",
        main: "page/config/main",
        baseurl: "page/config/baseurl",
        bootstrap: 'jsb/bootstrap.min',
        "datatables.net": 'lib/jquery.dataTables.min',
        "datatables": 'lib/dataTables.bootstrap4.min',
        inputmask: "lib/dist/inputmask",
        dependencyLib: "lib/dist/dependencyLib",
        jQueryInputmask: "lib/dist/jquery.inputmask",
        persediaan: "lib/laporan/persediaan",
        inventaris: "lib/laporan/inventaris",
        bukubesar: "lib/laporan/bukubesar",
      },
      shim: {
        // we get an error that "jQuery is not defined" error without this
        // shim for sammy
        sammy: {
          deps: ["jquery"],
          exports: "sammy"
        },
        jQueryInputmask: {
            deps: ["jquery", "inputmask"],
            exports: "$"
        },
    }
  });

})();
