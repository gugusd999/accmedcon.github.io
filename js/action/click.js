define(['jquery', 'helper', 'select2', 'persediaan', 'bukubesar'], function($, helper, select2, persediaan, bukubesar){


  $('body .select2').select2();


  $("body").on("click", "#click", function() {
    alert("gugus");
  })

  $("body").on("click", "[bulan-transaksi]", function(){

    let data = $(this).attr("data-date");
    let bulan = $(this).attr("data-date-asli");
    let tahun = helper.sesiGet('tahun');
    let date = new Date(tahun, data);
    let tanggalAkhir = date.getUTCDate();

    let rangeTransaksi = {
        dateOne: tahun+'-'+bulan+'-01',
        dateTwo: tahun+'-'+bulan+'-'+tanggalAkhir
    }

    helper.sesiNew("tanggal-transaksi", tahun.substring(2, 4)+'-'+bulan);

    location.href = "#/transaksi-2";

  })

  $("body").on("click", "[crud-view-data-on-hide]", function(){
      let mydata = $(this).attr('data-keep');
      let go = $(this).attr('data-go');
      let goKey = $(this).attr('data-key');
      helper.sesiNew(goKey, mydata);
      location.href = go;
      location.reload();
  })

  $("body").on("click", "[menuju]", function(){

    let go = $(this).attr('data-go');
    location.href = go;
    location.reload();

  })


  $("body").on("click", "[print-data]", function(){

    let Div = $(this).attr('data-position');



    helper.printDiv(Div);


  })

  $("body").on('change', '[go-to-persediaan]', function(event){

    event.preventDefault();

    let val = $(this).val();

    persediaan.persediaan(val);

  })



  $("body").on('change', '[akun-action]', function(event){
    event.preventDefault();

    let val = $(this).val();
    let script = $(this).attr('script-data');

    helper.sesiNew('akun', val);


    eval(script);

  })



})
