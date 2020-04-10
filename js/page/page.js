define(['jquery', 'main', 'axios', 'crud', 'crud2', 'crud3', 'helper', "datatables.net", "datatables"], function($, main, axios, crud, crud2, crud3, helper) {
  let obj = {
    view: async function() {
      await helper.createLocalData('type_barang', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');
      await helper.createLocalData2('data_barang', 'get-table-data');
      await helper.createLocalData('status_barang', 'get-data');
      await helper.createLocalData('status_barang_2', 'get-data');
      await helper.createLocalData('debit_kredit', 'get-data');
      await helper.createLocalData('type_akun', 'get-data');
      await helper.createLocalData('akun', 'get-data');
      await helper.createLocalData('supplier', 'get-data');
      await helper.createLocalData('data_vendor', 'get-data');
      await helper.createLocalData('data_satuan', 'get-data');
      await helper.createLocalData('customer', 'get-data');
      await helper.createLocalData('data_laporan', 'get-data');
      await helper.createLocalData('kelompok_penyusutan', 'get-data');

      let data = await axios.get('html/home.html');
      main.html(data.data);

      let akun = await helper.localGet('akun');

      akun = helper.decryptG(akun);

      crud.set("status_barang",{
        key: "id",
        headname: ['No', 'Jenis Barang'],
        table: ['id', 'status_barang'],
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
        domp: 'crud'
      })

      crud.set("type_barang",{
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
        domp: 'crud'
      })

      crud.set("metode_pembayaran",{
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
        domp: 'crud'
      })

      crud.set("status_barang_2",{
        key: "id",
        headname: ['No', 'Kategori Barang'],
        table: ['id', 'status'],
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
        domp: 'crud'
      })

      crud.set("data_barang",{
        key: "id",
        headname: ['No', 'Nama Barang', 'Jenis Barang', 'Kategori Barang', 'golongan', 'Satuan'],
        table: ['id', 'nama_barang', 'status_barang_id', 'status_barang_2_id', 'golongan_barang', 'satuan_id'],
        form: ["no", "text", "select", "select", 'select', "select"],
        listData: [
          null,
          null,
          {
              id: 'id',
              nama: 'status_barang',
              table: 'status_barang'
          },
          {
              id: 'id',
              nama: 'status',
              table: 'status_barang_2'
          },
          {
              id: 'id',
              nama: 'kelompok',
              table: 'kelompok_penyusutan'
          },
          {
              id: 'id',
              nama: 'satuan',
              table: 'data_satuan'
          }
          // {
            //   id: 'id',
            //   nama: 'nama',
            //   table: 'akun'
            // }
          ],
          width: ["50px", "200px", "", "", ""],
          domp: 'crud'
        })

      crud.set("customer",{
        key: "id",
        headname: ['No', 'Nama', 'Alamat', 'No Telp', 'NPWP'],
        table: ['id', 'nama', 'alamat', 'tlpn', 'npwp'],
        form: ["no", "text", "text", "text", 'text'],
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
        width: ["50px", "200px", "", "200px", "200px"],
        domp: 'crud'
      })

      crud.set("supplier",{
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
        domp: 'crud'
      })

      crud.set("data_laporan",{
        key: "id",
        headname: ['No', 'Nama'],
        table: ['id', 'nama'],
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
        domp: 'crud'
      })

      crud.set("debit_kredit",{
        key: "id",
        headname: ['No', 'Posisi Akun'],
        table: ['id', 'debit_kredit'],
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
        domp: 'crud'
      })

      crud.set("type_akun",{
        key: "id",
        headname: ['No', 'Tipe Akun'],
        table: ['id', 'type_akun'],
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
        domp: 'crud'
      })

      crud.set("data_satuan",{
        key: "id",
        headname: ['No', 'Satuan'],
        table: ['id', 'satuan'],
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
        domp: 'crud'
      })

      crud.set("data_vendor",{
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

      crud.set("akun",{
        key: "id",
        headname: ['No', 'Id Akun', 'Nama Akun', 'Posisi Akun', 'Tipe Akun','Kategori', 'Nominal'],
        table: ['id', 'akun_id', 'nama_akun', 'debit_kredit', 'type_akun','laporan', 'nominal'],
        form: ["no", "text", "text", 'select2', "select", 'select2', "rupiah"],
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
        domp: 'crud'
      })

      crud2.set("type_akun",{
        key: "id",
        headname: ['No', 'Type Akun', '#'],
        table: ['id', 'type_akun'],
        form: ["no", "text"],
        listData: [
          null,
        ],
        width: ["50px", ""],
        domp: 'crud'
      })


      crud.set("kelompok_penyusutan",{
        key: "id",
        headname: ['No', 'Kelompok Penyusutan', 'Masa Manfaat', 'Tarif Metode Garis Lurus', 'Tarif Metode Saldo Menurun'],
        table: ['id', 'kelompok', 'masa_manfaat', 'garis_lurus', 'saldo_menurun'],
        form: ["no", "text", 'text', 'text', 'text'],
        listData: [
          null,
          null,
          null,
          null,
          null,
        ],
        width: ["50px", "", "", "", ""],
        domp: 'crud'
      })


      crud.view("akun");


      let dataBack = helper.sesiGet('sesi-back');

      if (dataBack === '') {
        $("body [last-back-button-view]").css("display", "none");
      }

      document.querySelector("body #list-menu").innerHTML = helper.makeList({
        attr: ` class="form-control" style="display:block; float:right;" master-open-data style="width: 250px;"`,
        option: [
          {name:"Akun", value: "akun"},
          {name:"Tipe Akun", value: "type_akun"},
          {name:"Data Barang", value: "data_barang"},
          {name:"Kategori Barang", value: "status_barang_2"},
          {name:"Jenis Barang", value: "status_barang"},
          {name:"Tipe Barang", value: "type_barang"},
          {name:"Satuan", value: "data_satuan"},
          {name:"Customer", value: "customer"},
          {name:"Supplier", value: "supplier"},
          {name:"Vendor", value: "data_vendor"},
          {name:"Debet Kredit", value: "debit_kredit"},
          {name:"Metode Bayar", value: "metode_pembayaran"},
          {name:"Tipe Laporan", value: "data_laporan"},
          {name:"Kelompok Penyusutan", value: "kelompok_penyusutan"},
        ]
      });

    }
  }
  return obj;
})
