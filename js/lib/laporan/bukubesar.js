define(['jquery', 'axios', 'helper', 'main'], function(
  $, axios, helper, main
){

  let obj = {}

  obj.view = async function(){


    // tampilkan view dong
    let view = await axios.get('html/laporan/bukubesar.html');
    main.html(view.data);


    // call transaksi umum
    let akun = helper.callData('akun');


    // buat pilihan akun

    let akunPilih = ``;

    akun.forEach((item, i) => {
      let {id, nama_akun} = item;
      if (helper.sesiGet('akun') != null) {
        if (id === helper.sesiGet('akun')) {
          akunPilih += `<option selected value="${id}">${nama_akun}</option>`;
        }else{
          akunPilih += `<option value="${id}">${nama_akun}</option>`;
        }
      }else{
        akunPilih += `<option value="${id}">${nama_akun}</option>`;
      }
    })

    let akunSelect = `

      <select akun-action  script-data="bukubesar.view()">
        ${akunPilih}
      </select>

    `;

    // call

    let selectN = helper.yearChoice(10, `tahun-action script-data="bukubesar.view()" style="width:200px;"`, 'select2');

    let bulanPilih = helper.monthChoice(`bulan-action script-data="bukubesar.view()" style="width:200px;"`, 'select2');

    $("body #tahun-choice").html(selectN+bulanPilih+akunSelect)




    let allTransaksi = [];

    let transaksiUmum = helper.callData('transaksi_pengeluaran_umum')
    .forEach((item, i) => {

      let {id, keterangan, debit, kredit, nominal, tanggal_transaksi} = item;

      let obj = {
        id: id,
        tanggal_transaksi: tanggal_transaksi,
        uraian: keterangan,
        debit: debit,
        kredit: kredit,
        nominal: nominal
      }

      allTransaksi.push(obj);


    })


    // console.log(transaksiUmum);



    // call pembelian barang
    let transaksiBarang = helper.callData('transaksi_pembelian_barang')


    .forEach((item, i) => {

      let {id, keterangan, pembayaran, tanggal_transaksi} = item;
      // data

      let kredit = 0;
      let debit = 11;

      if (pembayaran === 'lunas') {
        kredit = 1;
      }else if(pembayaran === 'kas'){
        kredit = 1
      }else{
        kredit = 20
      }

      nominal = 0;

      // ambil data barang beli
      let databeli = helper.callData('data_pembelian_barang')
      .forEach((item, i) => {
        let {
          transaksi_pembelian_barang_id,
          pajak_ppn_masukan,
          harga_satuan,
          jml
        } = item;

        let total = (Number(harga_satuan)*Number(jml)) - (Number(harga_satuan)*Number(jml)*Number(pajak_ppn_masukan)/100);
        if (id === transaksi_pembelian_barang_id) {
          nominal += total;
        }

      })

      let obj = {
        id: id,
        tanggal_transaksi: tanggal_transaksi,
        uraian: keterangan,
        debit: debit,
        kredit: kredit,
        nominal: nominal
      }

      allTransaksi.push(obj);

    })

    let dataDipilih = akun[0].id;
    let totalBefore = Number(akun[0].nominal);
    let nama_akunS = akun[0].nama_akun;

    if (helper.sesiGet('akun') != null) {

      let dataAkun = akun.forEach((item, i) => {
        let {id, nominal, nama_akun} = item;
        if (helper.sesiGet('akun') === id) {
          dataDipilih = id;
          totalBefore = nominal;
          nama_akunS = nama_akun;
        }
      });

      // dataDipilih = dataAkun.id;
      // totalBefore = dataAkun.nominal;
      // nama_akun = dataAkun.nama_akun;

    }


    let tahun = helper.sesiGet('tahun');

    let bulan = helper.sesiGet('bulan');

    let tanggalKnow = tahun+'-'+bulan;

    let {normal2, normal3} = helper.tanggal(tanggalKnow);


    console.log(normal2);

    function compare( a, b ) {
        if ( a.tanggal_transaksi < b.tanggal_transaksi ){
            return -1;
        }
        if ( a.tanggal_transaksi > b.tanggal_transaksi ){
            return 1;
        }
        return 0;
    }



    let dataHtml = ``;

    let totalAfter = totalBefore;

    let dataTerpilih = allTransaksi.filter((item, i) => {
      if (item.debit === dataDipilih || item.kredit === dataDipilih) {
        return item;
      }
    }).sort(compare).filter((item, i) => {
      if (item.tanggal_transaksi < '2020-01-04') {
        if (item.debit === dataDipilih) {
          totalBefore += Number(item.nominal);
        }else{
          totalBefore -= Number(item.nominal);
        }
      }
      if (item.tanggal_transaksi >= normal2 && item.tanggal_transaksi <= normal3) {
        if (item.debit === dataDipilih) {
          return item;
        }
        if (item.kredit === dataDipilih) {
          return  item;
        }
      }
    }).forEach((item, i) => {
      if (item.debit === dataDipilih) {
        dataHtml += `
          <tr>
            <td>${i + 1}</td>
            <td style="width: 80px;">${item.tanggal_transaksi}</td>
            <td style="width: 350px;">${item.uraian}</td>
            <td style="width: 120px;text-align: right;"><span style="float: left;">Rp</span>${helper.formatRupiah(Math.round(item.nominal))}</td>
            <td style="width: 120px;text-align: right;"><span style="float: left;">Rp</span>0</td>
            <td style="width: 120px;text-align: right;"><span style="float: left;">Rp</span>${helper.formatRupiah(Math.round(totalAfter + item.nominal))}</td>
          </tr>
        `;
          let numberF = Number(item.nominal.replace(/\,/g, '.'));
          console.log(numberF);
          totalAfter += numberF;
      }

      if (item.kredit === dataDipilih) {
        dataHtml += `
          <tr>
            <td>${i + 1}</td>
            <td style="width: 80px;">${item.tanggal_transaksi}</td>
            <td style="width: 350px;">${item.uraian}</td>
            <td style="width: 120px;text-align: right;"><span style="float: left;">Rp</span>0</td>
            <td style="width: 120px;text-align: right;"><span style="float: left;">Rp</span>${helper.formatRupiah(Math.round(item.nominal))}</td>
            <td style="width: 120px;text-align: right;"><span style="float: left;">Rp</span>${helper.formatRupiah(Math.round(totalAfter - item.nominal))}</td>
          </tr>
        `;
          let numberF = Number(item.nominal.replace(/\,/g, '.'));
          console.log(numberF);
          totalAfter -= numberF;
      }
    })

    console.log(totalBefore)
    console.log(totalAfter)

    // format penampilan data

    let table =  `
      <div style="width: 210mm;">
        <div style="text-align: center;">
          <h1>Buku Besar ${nama_akunS}</h1>
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
              <th>No</th>
              <th>Tanggal</th>
              <th>Uraian</th>
              <th>Debet</th>
              <th>Kredit</th>
              <th>Nominal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="5" style="text-align: center;">Total Sebelumnya</td>
              <td style="text-align: right;"><span style="float: left;">Rp</span> ${helper.formatRupiah(Math.round(totalBefore))}</td>
            <tr>
            ${dataHtml}
            <tr>
              <td colspan="5" style="text-align: center;">Total</td>
              <td style="text-align: right;"><span style="float: left;">Rp</span> ${helper.formatRupiah(Math.round(totalAfter))}</td>
            <tr>
          </tbody>
        <table>
      </div>
    `;



    $('body #jurnal').html(table);

  }

  return obj;

})
