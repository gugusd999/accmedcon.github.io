define(['jquery', 'main', 'helper'], function($, main, helper) {
  const transaksiUmum = {}


  transaksiUmum.dateTransaksi = function(){

    let date = new Date();

    helper.sesiNew('tahun', date.getFullYear());

  }

  transaksiUmum.view = async function() {
    await this.dateTransaksi()
    await helper.createLocalData('debit_kredit', 'get-data');
    await helper.template('html/transaksi.html');
    let selectN = helper.yearChoice(10, `tahun-action class="custom-select select2" script-data="" style="width:200px;"`, 'select2');
    $("#tahun-ganti").html(`<span>Tahun : </span>`+selectN);
    $("body .select2").select2();
  }

  return transaksiUmum;
})
