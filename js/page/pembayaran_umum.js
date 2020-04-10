define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {
  let obj2 = {
    view: async function() {
      await helper.createLocalData('data_pembayaran_hutang_umum', 'get-data');
      await helper.createLocalData('data_pembayaran_hutang_barang', 'get-data');
      let data = await axios.get('html/home0.html');
      main.html(data.data);

      let akun = await helper.localGet('akun');

      akun = helper.decryptG(akun);

      crud.set("transaksi_pengeluaran_umum",{
        key: "id",
        headname: ['No', 'Tipe Transaksi', 'Tanggal Transaksi', 'No Bukti Pengeluaran', 'No Transaksi', 'hutang'],
        table: ['id', 'type_transaksi_id', 'tanggal_transaksi', 'no_bukti_pengeluaran', 'no_transaksi', 'nominal'],
        form: ["no", "no", 'no', 'no', 'no'],
        customeButtonDataView: true,
        customeButtonViewGo: "#/hutang-umum",
        customeButtonViewData: "data-hutang-umum",
        filter: {
          key: "pembayaran",
          value: '8'
        },
        listData: [
          null,
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
        width: ["50px", "", "", "", ""],
        domp: 'crud'
      })

      crud.view("transaksi_pengeluaran_umum");
    }
  }
  return obj2;
})
