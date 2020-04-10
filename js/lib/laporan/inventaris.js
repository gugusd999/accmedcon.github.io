define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'terbilang', 'live'], function($, main, axios, crud, helper, select2, angkaTerbilang, live) {
  let bkkP = null;
  let bkkP2 = null;
  let dataB = "";
  let obj2 = {}


  obj2.persediaan = async function(a = null) {
    live('data_barang');
    live('data_pembelian_barang');
    live('status_barang');
    console.log('selamat datan di persediaan');


    // tampilkan view dong
    let view = await axios.get('html/laporan/inventaris.html');
    main.html(view.data);

    let barangInventaris = [];

    let barang = helper.callData('data_barang');

    let data_golongan_barang = helper.callData('kelompok_penyusutan');


    let transaksiBarang = helper.callData('transaksi_pembelian_barang').map((item, i) => {
      let {id,tipe_barang, tanggal_transaksi} = item;
      if (tipe_barang === 'inventaris') {
        let dataBarang = []
        let idS = id;
        let databeli = helper.callData('data_pembelian_barang').filter((res, i) => {
          let {id, transaksi_pembelian_barang_id, pajak_ppn_masukan, barang_id, jml, harga_satuan} = res;
          if (transaksi_pembelian_barang_id === idS) {
            barangInventaris.push({
              tanggal: tanggal_transaksi,
              transaksi_pembelian_barang_id: transaksi_pembelian_barang_id,
              pajak_ppn_masukan: pajak_ppn_masukan,
              barang_id: barang_id,
              jml:jml,
              harga_satuan: harga_satuan
            });
          }
        });
      }
    })


    // get data_barang

    let html = ``;

    barangInventaris.forEach((item, i) => {
      let {tanggal, transaksi_pembelian_barang_id, pajak_ppn_masukan, barang_id, jml, harga_satuan} = item;

        let hargaTotal = (Number(jml) * Number(harga_satuan)) + (Number(pajak_ppn_masukan) * Number(jml) * Number(harga_satuan));

        let namaBarang = barang.filter((item,i) => {
          if (item.id === barang_id) {
            return item;
          }
        })[0].nama_barang;

        let golongan = barang.filter((item,i) => {
          if (item.id === barang_id) {
            return item;
          }
        })[0].golongan_barang;

        let persentase = data_golongan_barang.filter((item, i) =>{
          if (item.id === golongan) {
            return item;
          }
        })[0].garis_lurus;

        let masa_manfaat = data_golongan_barang.filter((item, i) =>{
          if (item.id === golongan) {
            return item;
          }
        })[0].masa_manfaat;

        console.log(persentase);


        let {normal ,normal3} = helper.tanggal('gugus');


        let jangkawaktu = normal3 - normal ;

        function selisih_tanggal(date1)
        {
         var tgl = new Date(date1);
         var tgl2 = new Date();
         tgl.setHours(0);
         tgl.setMinutes(0);
         tgl.setSeconds(0);
         tgl.setMilliseconds(0);
         var selisih = Math.abs(tgl - tgl2)/86400000;
         return Math.floor(selisih/30);
        }

        var xselisih = selisih_tanggal(tanggal);

        console.log(xselisih);

        let h2 = hargaTotal;
        let h3 = 0;

        if (xselisih != 0) {
          for (var i = 0; i <= 0; i++) {
            let a = persentase.length - 1;
            a = Number(persentase.substring(0,a))/100;
            a = h2 * a;

            h3 += a;

            let b = h2 - a;
            h2 = b;
          }
        }

        let {sekarang} = helper.tanggal(tanggal);


        html += `
          <tr>
            <td>${sekarang}</td>
            <td style="text-align: right;">${namaBarang}</td>
            <td style="text-align: right;">${jml}</td>
            <td style="text-align: right;"><span style="float:left;">Rp </span>${helper.formatRupiah(hargaTotal)}</td>
            <td style="text-align: right;">${masa_manfaat}</td>
            <td style="text-align: right;">${persentase}</td>
            <td style="text-align: right;"><span style="float:left;">Rp </span>${helper.formatRupiah(h3)}</td>
            <td style="text-align: right;"><span style="float:left;">Rp </span> ${helper.formatRupiah(h2)}</td>
          <tr>
        `;

    });



    // console.log(table_persediaan_total_stock);

    // buat table dong
    let table =  `
    <div style="width: 210mm;">
      <div style="text-align: center;">
        <h1>Data Inventaris dan Penyusutan</h1>
      </div>

      <style>
          .table-border, .table-no-border{
            border-collapse: collapse;
            width: 100%;
          }

          .table-no-border th, .table-no-border td{
            padding: 5px;
          }

          .table-border th, .table-border td{
            padding: 5px;
            border: 1px solid #dfdfdf;
          }

          th{
            text-align: center;
          }

          td{
            font-size: 12px;
          }

          .border{
            border: 1px solid #dfdfdf;
          }
      </style>

      <table class="table-border">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama Barang</th>
            <th>Jumlah</th>
            <th>Total</th>
            <th>Masa anfaat</th>
            <th>Pesentase</th>
            <th>Penyusutan</th>
            <th>Depresiasi</th>
          </tr>
        </thead>
        <tbody>
          ${html}
        </tbody>
      <table>
    </div>
    `;

    // tampilkan table
    $('body #jurnal').html(table);

  }

  obj2.view = async function() {
      await this.persediaan();
  }

  return obj2;

})
