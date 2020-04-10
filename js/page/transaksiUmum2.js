define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {

  const transaksiUmum2 = {}

  transaksiUmum2.view = async function() {
    await helper.createLocalData('type_transaksi', 'get-data');
    await helper.template('html/transaksi2.html');

    crud.set("type_transaksi",{
      key: "id",
      headname: ['No', 'Type Transaksi', 'Keterangan'],
      table: ['id', 'type_transaksi', 'keterangan'],
      form: ["no", "text", "text"],
      customeButtonDataView: true,
      customeButtonViewGo: "#/transaksi-3",
      customeButtonViewData: "data-type-transaksi",
      listData: [
        null,
        null,
        null
        // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["50px", "120px", ""],
      domp: 'crud'
    })

    crud.view("type_transaksi");

  }

  return transaksiUmum2;
})
