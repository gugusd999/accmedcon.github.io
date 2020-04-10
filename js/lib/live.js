define(['jquery', 'helper', 'axios'], function($, helper, axios){


async function live(tableName){

  var params = new URLSearchParams();
  let data = {
    table: tableName,
    limit: 0,
    length: 10
  }
  params.append('table', JSON.stringify(data));
  let dataAkun = await axios.post(helper.baseurl+'get-table-data', params)
  .then(res =>{

    let newArr = [];
    res.data.forEach((item, i) => {
      newArr.push(JSON.parse(item));
    })


    if (JSON.stringify(newArr) != JSON.stringify(helper.decryptG(helper.localGet(tableName)))) {

    	helper.localNew(tableName, helper.encryptG(newArr));

    }

  });

}

return live;


})
