define(['jquery', 'main', 'axios', 'crud', 'crud3',  'helper', 'crudtransaksi'], function($, main, axios, crud, crud3, helper, crudtransaksi) {

  const transaksiUmum3 = {}

  transaksiUmum3.view = async function() {
    await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
    await helper.createLocalData('transaksi_pembelian_barang', 'get-data');
    await helper.template('html/transaksi3.html');

    let dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-type-transaksi'));

    console.log(dataTypeTransaksi);

    console.log(dataTypeTransaksi.type_transaksi_id);

    let dataTanggal = helper.sesiGet('tanggal-transaksi');

    helper.sesiNew('no_bukti_pengeluaran', dataTypeTransaksi.type_transaksi+'-'+dataTanggal);

    crud3.set("type_barang",{
      key: "id",
      headname: ['No', 'Tipe Barang'],
      table: ['id', 'type_barang'],
      form: ["no", "text"],
      listData: [
        null,
        null
        // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["50px", ""],
    })

    crud3.set("metode_pembayaran",{
      key: "id",
      headname: ['No', 'Bayar'],
      table: ['id', 'bayar'],
      form: ["no", "text"],
      listData: [
        null,
        null
        // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["50px", ""],
    })

    crud3.set("supplier",{
      key: "id",
      headname: ['No', 'Nama Supplier', 'Alamat', 'No Telp'],
      table: ['id', 'nama_supplier', 'alamat', 'no_telp'],
      form: ["no", "text", "text", "text"],
      listData: [
        null,
        null,
        null,
        null
        // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["50px", "200px", "", "150px"],
    })

    crud3.set("akun",{
      key: "id",
      headname: ['No', 'Id Akun', 'Nama Akun', 'Posisi Akun', 'Tipe Akun','Kategori', 'Nominal'],
      table: ['id', 'akun_id', 'nama_akun', 'debit_kredit', 'type_akun','laporan', 'nominal'],
      form: ["no", "text", "text", 'select2', "select", 'select2', "text"],
      listData: [
        null,
        null,
        null,
        {
          id: 'debit_kredit',
          nama: 'debit_kredit',
          table: 'debit_kredit'
        },
        {
          id: 'id',
          nama: 'type_akun',
          table: 'type_akun'
        },
        {
          id: 'nama',
          nama: 'nama',
          table: 'data_laporan',
        },
        null
      ],
      width: ["50px", "120px", "", "", ""],
    })

    crud3.set("data_vendor",{
      key: "id",
      headname: ['No', 'Nama Vendor', 'No Telp', 'Alamat'],
      table: ['id', 'nama_vendor', 'no_telp', 'alamat'],
      form: ["no", "text", "text", "text"],
      listData: [
        null,
        null,
        null,
        null
        // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["50px", "", "", ""],
      domp: 'crud'
    })


    crudtransaksi.set("transaksi_pengeluaran_umum",{
      key: "id",
      headname: ['No', 'Tanggal Transaksi', 'No Bukti Transaksi', 'No Nota', 'Tanggal Nota', 'Uraian', 'vendor', 'Supplier', 'Debet', 'Kredit', 'Nominal', 'Pembayaran'],
      table: ['id', 'tanggal_transaksi', 'no_bukti_pengeluaran', 'no_nota', 'tanggal_nota', 'keterangan', 'vendor_id', 'supplier_id', 'debit', 'kredit', 'nominal', 'pembayaran'],
      form: ["no", "tanggal", "no", "text", "tanggal", "text", "select", "select", "select", "select", "rupiah", "select2"],
      filter: {
        key: "no_bukti_pengeluaran",
        value: helper.sesiGet('no_bukti_pengeluaran')
      },
      dataSend: {
        no_bukti_pengeluaran: helper.sesiGet('no_bukti_pengeluaran'),
        type_transaksi_id: dataTypeTransaksi.id
      },
      listData: [
        null,
        null,
        null,
        null,
        null,
        null,
        {
          id: 'id',
          nama: 'nama_vendor',
          table: 'data_vendor'
        },
        {
          id: 'id',
          nama: 'nama_supplier',
          table: 'supplier'
        },
        {
          id: 'id',
          nama: 'nama_akun',
          table: 'akun'
        },
        {
          id: 'id',
          nama: 'nama_akun',
          table: 'akun'
        },
        null,
        {
          id: 'bayar',
          nama: 'bayar',
          table: 'metode_pembayaran'
        }
      ],
      width: ["40px", "150px", "130px", "100px", "150px", "250px", "150px", "150px", "150px", "150px", "100px", "100px"],
      domp: 'crud'
    })

    crudtransaksi.set("transaksi_pembelian_barang",{
      key: "id",
      headname: ['No', 'Tanggal Transaksi', 'No Bukti Transaksi', 'No Nota', 'Tanggal Nota', 'Uraian', 'Tipe Barang','Supplier', 'Pembayaran', 'Nominal'],
      table: ['id', 'tanggal_transaksi', 'no_bukti_pengeluaran', 'no_nota', 'tanggal_nota', 'keterangan', 'tipe_barang', 'supplier_id', 'pembayaran', 'nominal'],
      form: ["no", "tanggal", "no", "number", "tanggal", "text", "select2","select", "select2", "no"],
      customeButtonDataView: true,
      customeButtonViewGo: "#/transaksi-4",
      customeButtonViewData: "data-type-transaksi-umum",
      filter: {
        key: "no_bukti_pengeluaran",
        value: helper.sesiGet('no_bukti_pengeluaran')
      },
      dataSend: {
        no_bukti_pengeluaran: helper.sesiGet('no_bukti_pengeluaran'),
        type_transaksi_id: dataTypeTransaksi.id
      },
      listData: [
        null,
        null,
        null,
        null,
        null,
        null,
        {
          id: 'type_barang',
          nama: 'type_barang',
          table: 'type_barang'
        },
        {
          id: 'id',
          nama: 'nama_supplier',
          table: 'supplier'
        },
        {
          id: 'bayar',
          nama: 'bayar',
          table: 'metode_pembayaran'
        },
        null
      ],
      width: ["40px", "150px", "200px", "100px", "150px", "250px", "150px", "150px", "150px", "150px"],
      domp: 'crud'
    })

    crudtransaksi.view("transaksi_pengeluaran_umum");

  }

  return transaksiUmum3;

})
