$(document).ready(function(){
    $('#more').click(() => {
        console.log('supply')
        $('.team').hide();
        $('.sortPanel').show()
    })
    timer = null;
    let obj = [];
    for(let i = 97; i <= 122; i++) {
        let key = String.fromCharCode(i)
        obj.push({"key": key, list: []})
    }
    $("#search").bind("input propertychange change",function(event){
        //代码块
        // dou(search, $("#search").val())
        search($("#search").val())
    });
    function randerDiv(list) {
        let str = '';
        list.forEach(val => {
            if(val.list.length > 0) {
               str += `
                <h3 class="col-sm-12 col-md-12 company-title">
                    ${val.key.toUpperCase()}
                </h3>
                `
                val.list.forEach(item => {
                    str += `<div class="col-sm-12 col-md-4 company-name">
                    <img src="https://www.cncarbonneutrality.com/dev-api/${item.imageUrl}" alt="">
                    <div>${item.firmName}</div>
                </div>`
                })
            }
            
        })
        $("#companyList").html(str);
    }
    function randerList(list) {
        let str = ""
        list.forEach(item => {
            str += `<div class="col-sm-12 col-md-4 company-name">
            <img src="https://www.cncarbonneutrality.com/dev-api/${item.imageUrl}" alt="">
            <div>${item.firmName}</div>
        </div>`
        })
        $("#companyList").html(str);
    }
    $.ajax({
        type: "get",
        url: "https://www.cncarbonneutrality.com/dev-api/system/supplyChain/list?pageNum=1&pageSize=1000 ",
        ContentType: "",
        success: function (data, status) {
            let list = data.rows;
            list.forEach(val => {
                let start = pinyinUtil.getPinyin(val.firmName, " ", false).slice(0, 1)
                let idx = obj.findIndex(val => val.key == start);
                obj[idx].list.push(val);
            })
            randerDiv(obj);
        },
        error: function (data, status, e) {
          alert("接口调用错误！");
        },
    });
    
    $.ajax({
        type: "get",
        url: "https://www.cncarbonneutrality.com/dev-api/system/supplyChain/list?isHot=1&pageNum=1&pageSize=1000 ",
        ContentType: "",
        success: function (data, status) {
          var info = "";
          var detail = "";
          console.log(data);
          if (data.rows != null && data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
                // <h6 style='color: black;'>
                    // ${data.rows[i].firmName}
                    // </h6> 
              info +=
                `
                <div class='col-md-2 col-xs-2 team-grid agileits w3layouts team-grid1 wow slideInUp' >
                    <figure class='effect-zoe agileits w3layouts'>
                    <img src="https://www.cncarbonneutrality.com/dev-api/${data.rows[i].imageUrl}" alt='Agileits W3layouts'/>
                    </figure>
                </div>`
            }
          }
          //"<figcaption>" +
           // "<h5>" +
            //data.rows[i].firmName +
            //"</h5>" +
            //"<p class='description agileits w3layouts'>" +
            //"" +
            //"</p>" +
            //" </figcaption>"
          console.log(detail);
          console.log(document.getElementById("tgylqy"));
          document.getElementById("tgylqy").innerHTML = info;
        },
        error: function (data, status, e) {
          alert("接口调用错误！");
        },
      });
    function search(key) {
        $("#companyList").html("");
        let res = [];
        let str = `\S*${key}\S*`;
        if(key == "") {
            randerDiv(obj);
            return
        }
        let reg = new RegExp(str,'i');//不区分大小写

        for(let i = 0, l = obj.length; i < l; i++) {
            obj[i].list.map(item => {
                if(reg.test(item.firmName)){
                    res.push(item);
                }
            })
            // res = obj[i].list.find(item => item.firmName == key)
            
        }
        if(res.length > 0) {
            randerList(res)
        } else {
            randerDiv(obj)
        }

        console.log(res);
    }
    function dou(func, val) {
        if(timer) return;
        timer = setTimeout(() => {
            func(val)
            timer = null;
        }, 1000)
    }
})