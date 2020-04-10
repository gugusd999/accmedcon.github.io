define(['jquery', 'crud', 'crud2', 'crud3', 'axios', 'helper'], function($, crud, crud2, crud3, axios, helper){


	$("body").on("click", "[crud2-back]", function(event){
		event.preventDefault();
		// a
		let a = $(this).attr('crud2-name');
		// b
		let b = $(this).attr('crud2-type');
		// page know
		let pageKnow = $(this).attr('page-know');

		let c = Number(pageKnow);

		if ((Number(pageKnow) - 10 ) >= 0) {
			c = Number(pageKnow) - 10;
			crud2.view(a, b, c);
		}else{
			alert('kamu ada di halaman awal');
		}
	})

	$("body").on("click", "[crud2-next]", function(event){
		event.preventDefault();
		// a
		let a = $(this).attr('crud2-name');
		// b
		let b = $(this).attr('crud2-type');

		let total = Number($(this).attr('crud2-total')) * 10;
		// page know
		let pageKnow = $(this).attr('page-know');

		let c = Number(pageKnow);

		if ((Number(pageKnow) + 10 ) <= total) {
			c = Number(pageKnow) + 10;
			crud2.view(a, b, c);
		}else{
			alert('kamu ada di halaman akhir');
		}
	})

	$("body").on("change", "[crud2-choice]", function(event){
		event.preventDefault();
		// a
		let a = $(this).attr('crud2-name');
		// b
		let b = $(this).attr('crud2-type');

		let total = Number($(this).attr('crud2-total')) * 10;
		// page know
		let pageKnow = $(this).attr('page-know');

		let c = Number($(this).val())*10;

		crud2.view(a, b, c);
	})

	$("body").on("click", "[modal-close]", function(event){
    event.preventDefault();

    let table = $(this).attr('modal-act');

    $(`body #modal-tambah-${table}`).css('display', 'none');

  })

  $("body").on("click", "[modal-close-master]", function(event){
    event.preventDefault();

    let table = $(this).attr('modal-act');

    let table3 = $(this).attr('master');

    $(`body #${table}`).css('display', 'none');

		$(`body #makeFormCrud3`).html(crud2.makeFormNew(table3));

  })

  $("body").on("click", "[modal-tambah-data]", function(event){
    event.preventDefault();

    let table = $(this).attr('data-table');

    $(`body #modal-tambah-${table}`).css('display', 'block');

  })


  $("body").on("click", "[open-master]", function(event){
    event.preventDefault();
		let table = $(this).attr('master');
    $("body #modal-master").css('display', 'block');
		crud3.view(table);
  })

	$("body").on("click", "button[go-crud-edit-3]", function(){

    let namaTable = $(this).attr("table-name");
    crud3.edit(namaTable);

  })

	$("body").on("click", "button[tambah-data-baru-crud-3]", function(){


    var params = new URLSearchParams();


    let namaTable = $(this).attr("table-name");

    let dataSend =  $(this).attr("data-send");

    if (dataSend != "") {
      params.append('data', JSON.stringify(helper.decryptG(dataSend)));
    }

    params.append('table', namaTable);
    let dataAkun = axios.post(helper.baseurl+`new-record-2`, params)
    .then(res =>{
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable));
      tableD.push(res.data);
      helper.localNew(namaTable, helper.encryptG(tableD));

      crud3.edit(namaTable);

    });

  })

	$("body").on("click", "button[go-back-crud-view-3]", function(){

    let namaTable = $(this).attr("table-name");
    crud3.view(namaTable);

  })

	$("body").on("click", "button[crud-data-hapus-3]", function(){

    let namaTable = $(this).attr("table-name");

    let hapus = {
      key: $(this).attr("data-key"),
      id: $(this).attr("data-id")
    }

    let hapusData = JSON.stringify(hapus);

    var params = new URLSearchParams();
    params.append('table', namaTable);
    params.append('hapus', hapusData);
    let dataAkun = axios.post(helper.baseurl+`delete-master-axios`, params)
    .then(res =>{
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
        if (eval(`res.${hapus.key}`) != hapus.id) {
          return res;
        }
      });

      console.log(tableD);

      helper.localNew(namaTable, helper.encryptG(tableD));

      crud3.edit(namaTable);

    });

  })

})
