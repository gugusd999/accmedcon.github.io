define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {

  const order2 = {}

  order2.view = async function() {
    await helper.createLocalData2('data_barang', 'get-table-data');
    await helper.createLocalData('tbl_form_order', 'get-data');
    await helper.template('html/order2.html');

    let dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-order'));

    console.log(dataTypeTransaksi);

    crud.set("tbl_form_order",{
      key: "id",
      headname: ['No', 'Barang', 'jml'],
      table: ['id', 'data_barang_id', 'jml'],
      form: ["no", "select", "text"],
      filter: {
        key: "form_order_id",
        value: dataTypeTransaksi.id
      },
      dataSend: {
        form_order_id: dataTypeTransaksi.id
      },
      listData: [
        null,
        {
          id: 'id',
          nama: 'nama_barang',
          table: 'data_barang'
        },
        null
        // {
        //   id: 'id',
        //   nama: 'nama',
        //   table: 'akun'
        // }
      ],
      width: ["50px", "", ""],
      domp: 'crud'
    })

    crud.view("tbl_form_order");

  }

  return order2;
})
