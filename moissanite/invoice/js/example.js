

function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}

function num_gen() {
  var now = new Date();
  var months = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var numr =  (fourdigits(now.getYear()))+ months[now.getMonth()] + date + "XXX";
  return numr;
}


// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  var total = 0;
  $('.price').each(function(i){
    price = $(this).html().replace("RM","").replace(",","");
    if (!isNaN(price)) total += Number(price);
  });

    total = roundNumber(total, 2);
    if (String(total).length > 6) {
        total = total.slice(0, -6) + "," + total.slice(-6);
    }


  $('#subtotal').html("RM"+total);
  $('#total').html("RM" + total);

  
  update_balance(1);
}

function update_balance(a) {
    var due = $("#total").html().replace("RM", "").replace(",", "") - $("#paid").val().replace("RM", "").replace(",","");
    
    due = roundNumber(due, 2);
    
    if (String(due).length > 6) {
        due = due.slice(0, -6) + "," + due.slice(-6);
    }

    $('.due').html("RM" + due);
    if (a == null) {
        var paid = $("#paid").val().replace("RM", "").replace(",", "");
        if (String(paid).length > 6) {
            paid = paid.slice(0, -6) + "," + paid.slice(-6);
        }
        $('#paid').html("RM" + paid);
    }
    


    
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("RM","").replace(",", "") * row.find('.qty').val();
  price = roundNumber(price, 2);
    //isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("RM" + price);

    if (isNaN(price)) {
        row.find('.price').html("N/A");
    }
    else {
        if (String(price).length > 6) {
            price = price.slice(0, -6) + "," + price.slice(-6);
            row.find('.price').html("RM" + price);
        }
        else {
            row.find('.price').html("RM" + price);
        }
    }

    
    
    
  
  update_total();
}





function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);
}

function passWord() {
	var testV = 1;
	var pass1 = prompt('Please Enter Your Password',' ');
	while (testV < 3) {
	if (!pass1)
	history.go(-1);
	if (pass1.toLowerCase() == "wearecrazyrich3#") {
	alert('Welcome, Boss!');
	$("#page-wrap").show();
	$("#firewall").hide();
	break;
	}
	testV+=1;
	var pass1 =
	prompt('Access Denied - Password Incorrect, Please Try Again.','Password');
	}
	if (pass1.toLowerCase()!="password" & testV ==3)
	history.go(-1);
	return " ";
}


$(document).ready(function() {
	
	$("#page-wrap").hide();
	passWord();
    $(".inputfile").change(function () {
        $(this).parent().find("img").attr("src", URL.createObjectURL(this.files[0]));     
        //$("#imageSrc").attr("src", URL.createObjectURL(this.files[0]));
        console.log($(this).val());
    });
	

  $('input').click(function(){
    $(this).select();
  });

  $("#paid").blur(update_balance);
   
  $("#addrow").click(function(){
      $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Item Name</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td class="description"><textarea>Description</textarea><img id="imageSrc" alt="No Image" width="100" height="100" /><input type="file" id="fileInput" accept="image/*" class="inputfile" /></td><td><textarea class="cost">RM0</textarea></td><td><textarea class="qty">0</textarea></td><td><span class="price">RM0</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
      bind();
      $(".inputfile").change(function () {
          $(this).parent().find("img").attr("src", URL.createObjectURL(this.files[0]));
          //$("#imageSrc").attr("src", URL.createObjectURL(this.files[0]));
          console.log($(this).val());
      });
  });
  
  bind();
  
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  $("#cancel-logo").click(function(){
    $("#logo").removeClass('edit');
  });
  $("#delete-logo").click(function(){
    $("#logo").remove();
  });
  /*
  $("#change-logo").click(function(){
    $("#logo").addClass('edit');
    $("#imageloc").val($("#image").attr('src'));
    $("#image").select();
  });
  $("#save-logo").click(function(){
    $("#image").attr('src',$("#imageloc").val());
    $("#logo").removeClass('edit');
  });
  */
  $("#date").val(print_today());
  $("#receipt-num").val(num_gen());
  
});