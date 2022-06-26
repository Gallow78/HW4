/*
File: Script.js
GUI Assignment: HW4 jQuery Plugin/UI with Your Dynamic Table
Wesley Gallo,  UMass Lowell Computer Science, Wesley_Gallo@student.uml.edu

Interactive Dynamic Table
Copyright (c) 2022 by Gallo. All rights reserved. It may be freely copied or 
excerpted for educational purposes with credit to the author.
references: https://developer.mozilla.org/en-US/docs/Web/JavaScript
https://www.w3schools.com/
https://api.jquery.com/
updated by WG on June 25, 2022, at 7:30 PM
*/

//Submit button function to gather input
function myFunction() {

    //getElementById(id) method to from submit input to make variables and table to output
    var BeginColumn, EndColumn, BeginRow, EndRow, output, table;

    BeginColumn = document.getElementById("VMin").value;
    EndColumn = document.getElementById("VMax").value;
    BeginRow = document.getElementById("HMin").value;
    EndRow = document.getElementById("HMax").value;
    output = document.getElementById('makeTable');
    table = "";


  //Using the input given we are able to create a multiplicaiton table using variables from above
  //incrementing columns and rows for the table
  for (i = BeginColumn - 1; i <= EndColumn; i++) {
      table += "<tr>";
      for (j = BeginRow; j <= EndRow; j++) {
          if (i == BeginColumn - 1 && j <= BeginRow) {
              table += "<th></th>";
          }
          if (i == BeginColumn - 1) {
              table += "<th>" + j + "</th>";
          } else if (j == BeginRow) {
              table += "<th>" + i + "</th>";
          } else if (j == EndRow) {
              table += "<td>" + i * (j - 1) + "</td>";
              table += "<td>" + i * j + "</td>";
          } else {
              table += "<td>" + i * (j - 1) + "</td>";
          }
      }
      table += "</tr>";
  }
  output.innerHTML = table;
}

//Function to utilize the sliders change input for table

function newTable() {
  var BeginColumn, EndColumn, BeginRow, EndRow, table;

  BeginColumn = parseInt(document.getElementById("VMin").value);
  EndColumn = parseInt(document.getElementById("VMax").value);
  BeginRow = parseInt(document.getElementById("HMin").value);
  EndRow = parseInt(document.getElementById("HMax").value);
  table = table(BeginColumn, EndColumn, BeginRow, EndRow);
  document.getElementById("makeTable").innerHTML = newTable;
  
  return table;
}

//addMethod Validator to check Min Row/Columns smaller number than Maximum Row and Columns 
$(document).ready(function() {
  $.validator.addMethod("ValRowInput", function(value, param) {
      if (parseInt($("#HMax").val()) < parseInt($("#HMin").val())) {
          return false;
      } else {
          return true;
      }
  });
  $.validator.addMethod("ValColInput", function(value, param) {
      if (parseInt($("#VMax").val()) < parseInt($("#VMin").val())) {
          return false;
      } else {
          return true;
      }
  });
  //User input form validating
  $("#userinput").validate({
      // Validation Rules
      rules: {
          // The name of the rule is on the left side and right side defined 
          VMin: {
              required: true,
              number: true,
              range: [-50, 50]
          },
          VMax: {
              required: true,
              number: true,
              range: [-50, 50],
              ValColInput: "#minCols"
          },
          HMin: {
              required: true,
              number: true,
              range: [-50, 50]
          },
          HMax: {
              required: true,
              number: true,
              range: [-50, 50],
              ValRowInput: "#minRows"
          },
      },
      // Error Messages for different errors
      messages: {
          VMin: {
              required: "Error Message: Please enter a number between -50 to 50",
              number: "Error Message: Please enter a number between -50 to 50",
              range: "Error Range Message: Please enter a number between -50 to 50",
          },
          VMax: {
              required: "Error Message: Please enter a number between -50 to 50",
              number: "Error Message: Please enter a number between -50 to 50",
              range: "Error Range Message: Please enter a number between -50 to 50",
              ValColInput: " Error Message: Minimum Columns must be smaller than Maximum Columns"

          },
          HMin: {
              required: "Error Message: Please enter a number between -50 to 50",
              number: "Error Message: Please enter a number between -50 to 50",
              range: "Error Range Message: Please enter a number between -50 to 50",

          },
          HMax: {
              required: "Error Message: Please enter a number between -50 to 50",
              number: "Error Message: Please enter a number between -50 to 50",
              range: "Error Range Message: Please enter a number between -50 to 50",
              ValRowInput: " Error Message: Minimum Row must be smaller than Maximum Row"
          },
      }
  })
});

//Slider Function to Update the table 
$("#VMin").change(function() {
  var val = this.value;
  $("#slider1").slider("value", parseInt(val));
  myFunction();
});
$("#VMax").change(function() {
  var val = this.value;
  $("#slider2").slider("value", parseInt(val));
  myFunction();
});
$("#HMin").change(function() {
  var val = this.value;
  $("#slider3").slider("value", parseInt(val));
  myFunction();
});
$("#HMax").change(function() {
  var val = this.value;
  $("#slider4").slider("value", parseInt(val));
  myFunction();
});

//Updating Each slider function with input based on allowed perameters range between -50 to 50 and starting at 0. 

$(function() {
  $("#slider1").slider({
      value: 0,
      min: -50,
      max: 50,
      range: [-50, 50],
      slide: function(event, ui) {
          $("#Vmin").val(ui.value);
          if ($("#userinput").valid()) {
              myFunction();
          }
      }
  });
  $("#Vmin").val($("#slider1").slider("value"));
});

$(function() {
  $("#slider2").slider({
      value: 0,
      min: -50,
      max: 50,
      range: [-50, 50],
      slide: function(event, ui) {
          $("#VMax").val(ui.value);
          if ($("#userinput").valid()) {
              myFunction();
          }
      }
  });
  $("#VMax").val($("#slider2").slider("value"));
});

$(function() {
  $("#slider3").slider({
      value: 0,
      min: -50,
      max: 50,
      range: [-50, 50],
      slide: function(event, ui) {
          $("#HMin").val(ui.value);
          if ($("#userinput").valid()) {
              myFunction();
          }
      }
  });
  $("#HMin").val($("#slider3").slider("value"));
});

$(function() {
  $("#slider4").slider({
      value: 0,
      min: -50,
      max: 50,
      range: [-50, 50],
      slide: function(event, ui) {
          $("#HMax").val(ui.value);
          if ($("#userinput").valid()) {
              myFunction();
          }
      }
  });
  $("#HMax").val($("#slider4").slider("value"));
});

$(function() {
  $("#tabs").tabs();
});

// save table on the tabs area below Multiplication Table

function SaveTable() {
  if ($("#userinput").valid()) {
      var BeginColumn, EndColumn, BeginRow, EndRow, count;

      BeginColumn = parseInt(document.getElementById("VMin").value);
      EndColumn = parseInt(document.getElementById("VMax").value);
      BeginRow = parseInt(document.getElementById("HMin").value);
      EndRow = parseInt(document.getElementById("HMax").value);
      count = $("#tabs li").length + 1;
     
      var list = `<li><a href='#tab${count}'</a>Rows: ${BeginRow} to ${EndRow} <br> Columns: ${BeginColumn} to ${EndColumn}<br><br><span class='ui-icon ui-icon-close'role='presentation'>Remove Tab</span></li>`;
      $("div#tabs ul").append(list);
      $("div#tabs").append('<div id="tab' + count + '">' + "<table>" + makeTable() + "</table" + '</div>');
      $("#tabs").tabs("refresh");
      $("#tabs").tabs("option", "active", -1);
      //Removes tabs by clicking 
      $("#tabs").delegate("span.ui-icon-close", "click", function() {
          var id = $(this).closest("li").remove().attr("aria-controls");
          $("#" + id).remove();
          $("#tabs").tabs("refresh");
      });
  }
}
// Function to remove the tabs
function removeTabs() {
  $("#tabs ul li").each(function() {
      var id = $(this).attr("aria-controls");
      $(this).remove()
      $("#" + id).remove();
      $("#tabs").tabs("refresh");
  });
}