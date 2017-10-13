

var flag=0; // represents if we have already an exsiting bar on localStorage ( 0=no , 1=yes)



// ************* EditBar info functions ***************************** //


var updateBarInfoValues=function()
{
    //take values from input 
    var barName = $("#BarNameIdUpdate").val();
    var OwnerName = $("#OwnerNameIdUpdate").val();
    var barLoction =$("#locationIdUpdate").val();
    
    //check the values
    if(barName=="" || OwnerName=="" || barLoction=="")
    {
        sweetAlert("Wrong input", "one field or more are empty", "error");
        return;
    }    



    //update the values by the input
    var barInfo = JSON.parse(localStorage.getItem("barInfo"));
    if(barName!="")
            barInfo[0].barName=barName;
    if(OwnerName!="")
            barInfo[0].OwnerName=OwnerName;
     if(barLoction!="")
        barInfo[0].barLoction=barLoction;
        
    localStorage.setItem("barInfo", JSON.stringify(barInfo));

    fillPrimaryTable(); //paint again the table
    swal("Update Sucess!", "Your new values are saved(empty values not updated!)", "success")
    
    //insert the new values to the input box
    var barInfo = JSON.parse(localStorage.getItem("barInfo"));
    $("#BarNameIdUpdate").val(barInfo[0].barName);
     $("#OwnerNameIdUpdate").val(barInfo[0].OwnerName);
    $("#locationIdUpdate").val(barInfo[0].barLoction);
    
}


var showNewOrEdit = function()//function that called when click on new/edit button
{
    //hide the othres div
    $(".primaryDiv").hide();
    $(".pricingDiv").hide();
    $(".supDiv").hide();
    
    $('nav a').removeClass('active');
    $('#cmdNew').addClass('active');
    
    //check if exists alredy exists bar
    if(flag==0)
        $(".newBarDiv").show();
    else
    {
        //put buttons unavalible
        $('#cmdTodo').attr("disabled", false);
        $('#cmdPricing').attr("disabled", false);
        $('#cmdSup').attr("disabled", false);

        //change button new to edit
        $("#cmdNew").text("Edit");
        $(".newBarDiv").hide();
        $(".editBarDiv").show();

        $('nav a').removeClass('active');
        $('#cmdNew').addClass('active');

        var barInfo = JSON.parse(localStorage.getItem("barInfo"));

        //update the inputbox to the values
        $("#BarNameIdUpdate").val(barInfo[0].barName);
        $("#OwnerNameIdUpdate").val(barInfo[0].OwnerName);
        $("#locationIdUpdate").val(barInfo[0].barLoction);
    }

}




// ************* END of  edit bar info functions ***************************** //











// ************* Add new Bar functions ***************************** //


var showNew=function() //function that show New bar page and hide te others
{
    $(".primaryDiv").hide();
    $(".pricingDiv").hide();
    $(".editBarDiv").hide();
    $(".supDiv").hide();
    $(".newBarDiv").show();
    
    $('nav a').removeClass("active");
    $('#cmdNew').addClass("active");
    //put buttons unavalible
    if(localStorage.getItem("barInfo") == undefined)
        {
              $('#cmdTodo').attr("disabled", true);
            $('#cmdPricing').attr("disabled", true);
            $('#cmdSup').attr("disabled", true);
    
        }
  
    //put default values
    document.getElementById("barNameId").value = "";
    document.getElementById("OwnerNameId").value = "";
    document.getElementById("locationId").value = "";


}


var addNewBar = function() //function that add a new bar
{
    //take the values from the input
    var barName = $("#barNameId").val();
    var OwnerName = $("#OwnerNameId").val();
    var barLoction=$("#locationId").val();
    
    //check the input
    if(barName=="" || OwnerName=="" || barLoction=="" )
    {
        sweetAlert("Wrong input", "You must fill all fileds", "error");
        return;
    }
    
    //create a swal dialog that ask if to delete the current bar and create a new one
    if(flag==1)
    {
        swal(
            {   title: "Are you sure?",   text: "All your bar data will delete!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   cancelButtonText: "No, cancel plx!",   closeOnConfirm: false,   closeOnCancel: false }, function(isConfirm){   
                if (isConfirm) {
                     swal("Deleted!", "Your new bar is created", "success"); 
                    deleteAndCreatebar(barName,OwnerName,barLoction);

                } 
                else{ swal("Cancelled", "Your bar is save", "error");   } });
    }
    else //not exsist yet a bar - > can create withot dialog
        deleteAndCreatebar(barName,OwnerName,barLoction);
    
    //put buttons unavalible
    $('#cmdTodo').attr("disabled", false);
    $('#cmdPricing').attr("disabled", false);
    $('#cmdSup').attr("disabled", false);
    
}


var deleteAndCreatebar=function(barName,OwnerName,barLoction) //function that delete the current localStoarge and create new bar with the info from input
{
         //delete all current data from localStoarge
        if(localStorage.getItem("barInfo") != undefined)
                localStorage.removeItem("barInfo");
        if(localStorage.getItem("Mission") != undefined)
                    localStorage.removeItem("Mission");
        if(localStorage.getItem("product") != undefined)
                    localStorage.removeItem("product");
         if(localStorage.getItem("Sup") != undefined)
                    localStorage.removeItem("Sup");
                
        //create a new empty objects and insert them to the localStoarge
         var barInfo = [];
         var mission = [];
         var products = [];
         var sup = [];

        localStorage.setItem("Mission", JSON.stringify(mission));
        localStorage.setItem("barInfo", JSON.stringify(barInfo));
        localStorage.setItem("product", JSON.stringify(products));
        localStorage.setItem("Sup", JSON.stringify(sup));

                
        //creaate a new object of bar info and insert him to localStoarge
        var barInfo = {barName : barName, OwnerName:OwnerName,barLoction:barLoction};

        var barInfoStr = localStorage.getItem("barInfo");
        var barInfoStrObj = JSON.parse(barInfoStr);
        barInfoStrObj.push(barInfo);
        localStorage.setItem("barInfo", JSON.stringify(barInfoStrObj));
                
                
        fillPrimaryTable();  //update the lables of bar information!
        //show the primary page and hide the others 
        $(".primaryDiv").show();
        $(".newBarDiv").hide();
        $("#cmdNew").text("Edit"); //change name of button "new" to " edit "
    
        $('nav a').removeClass('active');
        $('#cmdTodo').addClass('active');
    
        flag=1; // say that now we have a bar info on localStoarge
}





// ************* End of Add  new bar functions ***************************** //










// ************* Primary functions ***************************** //



var showPrimary = function() //function that show primary page and hide the others
{
        
        $(".newBarDiv").hide();
        $(".pricingDiv").hide(); 
        $(".editBarDiv").hide();
        $(".supDiv").hide();
        $(".primaryDiv").show();
        fillPrimaryTable();
    
        $('nav a').removeClass('active');
        $('#cmdTodo').addClass('active');
}



var addMission=function()//function that add a new mission to the localStoarge and to the table of missions
{
    if(localStorage.getItem("Mission")== undefined) //check if exsists
    {
        var mission = [];
        localStorage.setItem("Mission", JSON.stringify(mission));
    }
    //create a build pop up with swal and check the input values
    swal({   title: "Adding new Task",   type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation:"popup",   inputPlaceholder: "Insert your task",confirmButtonText:"Insert" }, 
         function(inputValue)
         {
            if (inputValue === false) 
                return false;     
            if (inputValue === "") 
            {   
                swal.showInputError("You need to write something!");  
                return false;   
            } 
            swal({   title: "Please Wait",   text: "Task was added sucsscfully",   timer: 500,   showConfirmButton: false });
            
            //initalize new object with the input values and insert him to localStoarge ( after get it out from localStoarge)
            var NewMission = inputValue;
            var isPerfomed = false;
            var miss = {mission : NewMission, isPerfomed:isPerfomed};
            var missStr = localStorage.getItem("Mission");
            var missObj = JSON.parse(missStr);
            missObj.push(miss);
            localStorage.setItem("Mission", JSON.stringify(missObj));
            fillPrimaryTable();    
    
        }); 

}

var fillPrimaryTable=function() //function that paint the table of missions and add the bar info to the lables
{
     if(localStorage.getItem("Mission") != undefined) //check if exists missions
     {       
            var fin=0; //count how many missions is complete until now
            $("#missionTbl").find("tr:not(:first)").remove(); //remove all table except the first line
            var mission = JSON.parse(localStorage.getItem("Mission"));

            for(var i=0;i<mission.length;i++) //run on all missions and paint them to table
            {     
                //create a delete button to currnt mission
                 var button="  <button class='btn btn-xs btn-danger'  onclick='delFromTable("+i+",1)' type='button' id='idm"+i+"'>X</button>";
                
                if(mission[i].isPerfomed==true) //check if the checkBox is marked or not and create him
                {
                    var checkBox="<input type='checkbox' checked onclick='updateMissionChechBox("+i+")' id='"+i+"'>";
                    fin++;
                }
                else
                    var checkBox="<input type='checkbox' unchecked onclick='updateMissionChechBox("+i+")' id='"+i+"'>";

                //add a new row to the last line with checkbox and delete button
                var row = "<tr><td>" + (i+1) + "</td><td>" + mission[i].mission + "</td><td>" + checkBox+"</td><td>" +button+"</td></tr>";
                $("#missionTbl").find("tr:last").after(row);

           }
            //calculate how precent from the mission is complete until now and added this to the remainMissionLabel label 
           var c=0;
           if(mission.length!=0)
               c=Math.floor((fin/(mission.length))*100);
           else  
               c = 100;
         
          var tC="Total mission finished: "+c+"%";
          $("#remainMissionLabel").text(tC);

     }

    if(localStorage.getItem("barInfo") != undefined) //check if exists info
    {          
            var barInfo = JSON.parse(localStorage.getItem("barInfo"));

            if(barInfo.length>0) //check if exists bar name
            {
                
                
                //insert all bar information to their lables! 
                var names = barInfo[0].barName;
                var loc=barInfo[0].barLoction;
                $("#barName").text(names);
                $("#locLabel").text(loc);
            }
            
    }
    
}



function updateMissionChechBox(index) //function that updated the checkBox of Mission by click on him
{
    //get mission object from the localStoarge and check if the checkbox is check or not and update is perfomed by this
    var mission = JSON.parse(localStorage.getItem("Mission"));
    if(mission[index].isPerfomed==false)
        mission[index].isPerfomed=true;
    else
        mission[index].isPerfomed=false;
    
    localStorage.setItem("Mission", JSON.stringify(mission));
    fillPrimaryTable();
    
}




// ************* END of primary functions ***************************** //










// ************* product functions ***************************** //


var showPricing = function() //functin that show the pricing page and hide the others
{
    $(".newBarDiv").hide();
    $(".primaryDiv").hide();
    $(".editBarDiv").hide();
    $(".supDiv").hide();
    $(".pricingDiv").show(); 
    $("#productName").value=" ";
    fillPricingTable();
    
    $('nav a').removeClass('active');
    $('#cmdPricing').addClass('active');
}

var addProduct=function()
{
    if(localStorage.getItem("product")== undefined) //check if exists already on localStoarge
    {
        var products = [];
        localStorage.setItem("product", JSON.stringify(products));
    }
    
    //take the values from the input and check them
    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();
    var isConfirm=false;

    if(productName=="" || productPrice=="")
    {
       sweetAlert("Wrong input", "Need to fill all fields", "error");
       return;
    }

    if(isNaN($("#productPrice").val()))
    {
        sweetAlert("Wrong input", "Num of products MUST be a number!", "error");
        return;
    }
    var a=parseInt(productPrice);
    if(a<1)
    {
       sweetAlert("Wrong input", "Num of products MUST be bigger than 0", "error");
        return;
    }
    //create a new obeject ant initliaze him with the values ,than get out from localstoarge , return it back with the new obejct
    var productInfo = {productName : productName, isConfirm:isConfirm, productPrice:productPrice};
    var productStr = localStorage.getItem("product");
    var productObj = JSON.parse(productStr);
    productObj.push(productInfo);
    localStorage.setItem("product", JSON.stringify(productObj));
    
    fillPricingTable();
    
}

var fillPricingTable=function() //function that paint the table of the product
{
    if(localStorage.getItem("product") != undefined)
    {       
        var counter=0; //sum the total products 
        $("#pricingTbl").find("tr:not(:first)").remove(); //remove all table except first line
        var products = JSON.parse(localStorage.getItem("product"));
        
        for(var k=0;k<products.length;k++) //run on all products and add to table
        {
            
            if(products[k].productPrice == NaN || products[k].productPrice=="")
                products[k].productPrice = 1;
            
            var a=parseInt(products[k].productPrice); //convery current productPrice to num
            counter+=a;
            
            //create a delete button to every row 
             var button="  <button class='btn btn-xs btn-danger'  onclick='delFromTable("+k+",0)' type='button' id='id"+k+"'>X</button>";
            
           //add the row with the delete button to every row
            var row = "<tr><td>" + (k+1) + "</td><td>" + products[k].productName + "</td><td>" + products[k].productPrice +"</td><td>"+button+ "</td></tr>";
            
           $("#pricingTbl").find("tr:last").after(row); //add to the last line

        }
        //add a row of total product and confirm

        
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("searchProduct").value = "";
        
   }
   
}



var searchProducts=function() // function that serach product by name every time when click on serach inputBox
{
     ///the function work like fillPricingTable execpt the lines that shed paint just the wanted people from the input box 
     if(localStorage.getItem("product") != undefined)
     {
   
        var products = JSON.parse(localStorage.getItem("product"));
        var productName = $("#searchProduct").val();
        var counter=0;
        $("#pricingTbl").find("tr:not(:first)").remove();
        for(var k=0;k<products.length;k++)
        {
            //take just the products that equale to what insert in serach input
            var res = (products[k].productName).substring(0,productName.length ); 
            //check also Upper letters and low letters
            var upCase=res.toUpperCase();
            var lowCasw=res.toLocaleLowerCase();
            
            //if the productName equel to value in inputBox show all the wanted 
            if(upCase==productName || lowCasw==productName || productName=="")
            {

                if(products[k].productPrice == NaN || products[k].productPrice=="")
                    products[k].productPrice = 1;
                var a=parseInt(products[k].productPrice);
                counter+=a;
                
                var button="  <button class='btn btn-xs btn-danger'  onclick='delFromTable("+k+",0)' type='button' id='idmi"+k+"'>X</button>";    
                
                var row = "<tr><td>" + (k+1) + "</td><td>" + products[k].productName + "</td><td>" + products[k].productPrice +"</td><td>"+button+"</td></tr>";
                $("#pricingTbl").find("tr:last").after(row);
            }

        
        }
    }
    
}


// ***************  End of product functions *************** //








// ***************  Suppliers functions *************** //


var addSup = function()  //function that add a new sup to the localStoarge and than to the table
{
    if(localStorage.getItem("Sup")== undefined)
    {
        var sup = [];
        localStorage.setItem("Sup", JSON.stringify(sup));
    }
    
    var kindSup = $("#mySelect").val();
    var supName = $("#supName").val();
    var amount = $("#amount").val();
    var paid = $("#paid").val();
    
    //check that the input is ok
     if (supName== "" || amount=="" || paid=="")
     {
          sweetAlert("Wrong input", "Some field is miss", "error");
          return;
     }
     if (isNaN(amount) || isNaN(paid))
     {
          sweetAlert("Wrong input", "Amount & Paid MUST be a numbers", "error");
          return;
      }
   
     var tAmount=parseInt(amount); //convert amount to number 
     var tPaid=parseInt(paid); //convert paid to number
     if (tAmount<1 || tPaid<0 )    
     {
           sweetAlert("Wrong input", "Amount must be bigger than 0,Paid must be equel or bigger than 0", "error");
            return;
     }
     if (tPaid>tAmount)
     {
            sweetAlert("Wrong input", "Paid can't be bigger than amount", "error");
            return;
     }
    
    //create a new object-sup and initalize him with the values from the input
     var sup = {kindSup:kindSup, supName:supName, amount:amount, paid:paid};
    
    //pull the Sup string from localStorage ,convert it to object and push to the object the new object to there , than return the new object to localStoarge after convert
     var supStr = localStorage.getItem("Sup");
     var supObj = JSON.parse(supStr);
     supObj.push(sup);
     localStorage.setItem("Sup", JSON.stringify(supObj));
    
     fillSupTable(); //call the function fillTable that paintes the sup table
    
}

var fillSupTable=function() //function that paintes the SupTable
{
    if(localStorage.getItem("Sup") != undefined)
    {
        var sumAmount=0; // represent the total aomunt
        var sumPaid=0; // represent the total paid
        $("#supTbl").find("tr:not(:first)").remove(); //remove all the table execpt the first line
        var sups = JSON.parse(localStorage.getItem("Sup")); //get out from localStoarge
        for (var t=0; t<sups.length; t++)
        {        
            var button="<button type='button' class='btn-xs btn-success' onclick='ShowUpdateSup("+t+")' id = 'updateSupPopUp"+t+"'>Update</button>"; //add a button of update to every line
                
            //calac the current summry of amount and paid
            var sumAmountTemp = parseInt(sups[t].amount);
            var sumPaidTemp = parseInt(sups[t].paid);
            sumAmount+=sumAmountTemp;
            sumPaid+=sumPaidTemp;
            var c=sups[t].amount-sups[t].paid;
            
            //add the row to the last line
            var row = "<tr><td>" + (t+1) + "</td><td>" + sups[t].kindSup + "</td><td>" + sups[t].supName +"</td><td>"+sups[t].amount +"</td><td>" + sups[t].paid + "</td><td>" +c  + "</td><td>"+button+"</td></tr>";            
            $("#supTbl").find("tr:last").after(row);

        }
        //add the summary values from the table 
        var total = "<tr><td>" + "Total" + "</td><td>" + "" + "</td><td>" + "" +"</td><td>"+sumAmount +"</td><td>" + sumPaid+ "</td><td>" + (sumAmount-sumPaid )  + "</td><td></td></tr>"; 
        $("#supTbl").find("tr:last").after(total);
        
        //initalize the values to be empty
        document.getElementById("supName").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("paid").value = "";
        
        
    } 
}
    
var closePopUp=function() //function that close the popUp of the update Sup
{
    $(".updateSupDiv").hide();
    $(".popUpSup").hide();
}

var showSup = function() //function that show the sup page and hide the others
{
    $(".primaryDiv").hide();
    $(".pricingDiv").hide();
    $(".editBarDiv").hide();
    $(".newBarDiv").hide();
    $(".supDiv").show();
    fillSupTable();
    
    $('nav a').removeClass('active');
    $('#cmdSup').addClass('active');
}



function ShowUpdateSup(index) //function that add update&delte button to updateSupllier page and show the update page
{
    
    $("#tblUpdateSup").find("tr:last").remove(); //remove last line from table of updateSup
    $(".updateSupDiv").show();
    $(".popUpSup").show();
    
    //put the values into the input box
    var sup = JSON.parse(localStorage.getItem("Sup"));
    $("#supplierNameUpdate").val(sup[index].supName);
    $("#amountUpdate").val(sup[index].amount);
    $("#paidUpdate").val(sup[index].paid);
    
    
    var updBut="<button type='button' class='btn btn-info' onclick='updateSupValues("+index+")' id='cmdUpd'>Update Supllier</button>"; //create update button
    
    //row includede update & delete button
    var row="<tr><td>" +"<button type='button' class='btn btn-danger' onclick='delFromTable("+index+",2)' id='cmdDelSup'>delete Supllier</button>"+ "</td><td>"+updBut+"</td></tr>";

    $("#tblUpdateSup").find("tr:last").after(row);
    
}

 //function that update supllier values by index that represnts num of line to updete in tha table
function updateSupValues(index)
{
    //take the values from the input box
    var supName=$("#supplierNameUpdate").val();
    var amount=$("#amountUpdate").val();
    var paid=$("#paidUpdate").val();

    //check the input
    if (supName== "" || amount=="" || paid=="")
     {
          sweetAlert("Wrong input", "Some field is miss", "error");
            return;
     }
     if (isNaN(amount) || isNaN(paid) )
     {
          sweetAlert("Wrong input", "Amount&paid MUST be a numbers", "error");
            return;
     }
     var tAmount=parseInt(amount); //convert amount to num
     var tPaid=parseInt(paid); //convery paid to num
    
     if (tPaid<0 ||tAmount<1)
     {
         sweetAlert("Wrong input", "Amount must be bigger than 0,Paid must be equel or bigger than 0", "error");
          return;
     }
    
     if (tPaid>tAmount)
     {
            sweetAlert("Wrong input", "Paid can't be bigger than amount", "error");
            return;
     }

    //get out the Sup from localStorage and update the right value by index
     var g = JSON.parse(localStorage.getItem("Sup"));
     g[index].supName=supName;
     g[index].amount=amount;
     g[index].paid=paid;
     localStorage.setItem("Sup", JSON.stringify(g));

     fillSupTable(); //paint again the sup table
    
    //hide the update page
     $(".updateSupDiv").hide();
     $(".popUpSup").hide();
    
}






// ***************  End of Suppliers functions *************** //








// ************* Generl functions ***************************** //



//function that delete object from localstorage. idnum=number of object to delete , choise=from whice localStorage to delete (0-products,1-missions ,2-sup) 
function delFromTable(idnum,choise) 
{
    var n="";
    if(choise==0)
        n="product";
    else if(choise==1)
        n="Mission";
    else if(choise==2)
        n="Sup";
    
    //get out the wanted item from the localStorage and delete the wanted object by idnum
    var array = JSON.parse(localStorage.getItem(n));
    array.splice(idnum,1);
    //return the new array to the localStorage withot the wanted item
    localStorage.setItem(n, JSON.stringify(array));
    
    //need to paint again the wanted table
    if(choise==0)
       fillPricingTable();
    if(choise==1)
        fillPrimaryTable();
    else
    {
         $(".updateSupDiv").hide();
         $(".popUpSup").hide();
         fillSupTable();
    }
        
    
}


var loadPage = function()  //function that called when loading the page!
{
    //check whice page to load->the edit or new bar by checking if exists already barInfo object on local stoarge
    var barInfo = JSON.parse(localStorage.getItem("barInfo"));
    if(barInfo!=undefined && barInfo.length>0)
    {
               flag=1;
                showNewOrEdit();  
    }
    else
       showNew(); 
    
    
    //connect Suppliers page buttons to their functions 
    $("#cmdSup").click(showSup); //when click on suppliers on nav
    $("#cmdAddSup").click(addSup); //when adding new supllier
    $("#closePopUp").click(closePopUp); //when close the popUp of update

    
    
     //connect product page buttons to their functions 
    $("#cmdPricing").click(showPricing);//when click on suppliers on nav
    $("#cmdAddProduct").click(addProduct); //when adding new product
   // $("#searchProduct").click(searchProducts); //when serching a product

     //when the press ic click on Serach inputBox the serachproducts function called
     $("#searchProduct").keypress(searchProducts);
     $("#searchProduct").keydown(searchProducts); 
     $("#searchProduct").keyup(searchProducts);

    //connect Primary page buttons to their functions 
    $("#cmdTodo").click(showPrimary); //when click on primary on nav
    $("#cmdAddMission").click(addMission); //when adding now mission

    
    //connect new/edit bar page buttons to their functions 
    $("#createNewBarName").click(showNew);//when clicking on button "create new bar"
    $("#cmdAddNewBar").click(addNewBar); //when clicking on new bar button
    $("#cmdNew").click(showNewOrEdit); // when clicking on edit/new button
    $("#cmdUpdateBarName").click(updateBarInfoValues); //when clicking on button "update" on edit page
    
};

// *************End of Generl functions ***************************** //