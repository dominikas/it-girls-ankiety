const masterSheetName = "Merged Data";
const mappingSheetName = "Mapping sheet";
const headerFormSourceName = "Form Source";

function mergeAllForms() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterSheet = ss.getSheetByName(masterSheetName);
  var mappingSheet = ss.getSheetByName(mappingSheetName);

  // Clear existing data (keep headers)
  var lastRow = masterSheet.getLastRow();
  if (lastRow > 1) {
    masterSheet.getRange(2, 1, lastRow - 1, masterSheet.getLastColumn()).clear();
  }

  // Get mapping data
  var mappingData = mappingSheet.getDataRange().getValues();
  var headers = masterSheet.getRange(1, 1, 1, masterSheet.getLastColumn()).getValues()[0];

  // Group mappings by form
  var formMappings = {};
  for (var i = 1; i < mappingData.length; i++) {
    var formName = mappingData[i][0];
    var sheetId = mappingData[i][1];
    var questionCol = mappingData[i][2];
    var categoryCol = mappingData[i][3];
    var questionLabel = mappingData[i][4];

    if (!formMappings[formName]) {
      formMappings[formName] = {
        sheetId: sheetId,
        mappings: []
      };
    }

    formMappings[formName].mappings.push({
      questionCol: questionCol,
      categoryCol: categoryCol,
      questionLabel: questionLabel
    });
  }

  // Process each form
  var outputData = [];

  for (var formName in formMappings) {
    var formData = formMappings[formName];
    var sourceSheet = SpreadsheetApp.openById(formData.sheetId).getSheets()[0];
    var sourceData = sourceSheet.getDataRange().getValues();

    // Skip header row
    for (var row = 1; row < sourceData.length; row++) {
      var newRow = new Array(headers.length).fill("");

      // Add form source
      var formSourceIndex = headers.indexOf(headerFormSourceName);
      if (formSourceIndex > -1) {
        newRow[formSourceIndex] = formName;
      }

      // Map each question to category
      formData.mappings.forEach(function(mapping) {
        var sourceColIndex = getColumnIndex(mapping.questionCol);
        var targetColIndex = headers.indexOf(mapping.categoryCol);

        if (targetColIndex > -1 && sourceColIndex < sourceData[row].length) {
          var newValue = sourceData[row][sourceColIndex];
          //cell already ehas a value, concatenate
          if(newRow[targetColIndex]&&newRow[targetColIndex]!==""){
            if(mapping.questionLabel&&mapping.questionLabel!==""){
              newRow[targetColIndex] = newRow[targetColIndex]+" | "+ mapping.questionLabel + ": "+newValue;
            }
            else{
              newRow[targetColIndex] = newRow[targetColIndex]+" | " +newValue;
            }
          }
          else{
            //first value for this category
            if(mapping.questionLabel&&mapping.questionLabel !== ""){
              newRow[targetColIndex]=mapping.questionLabel+": "+newValue;
            }
            else{
              newRow[targetColIndex]=newValue;
            }
          }

        }
      });

      outputData.push(newRow);
    }
  }

  // Write to master sheet
  if (outputData.length > 0) {
    masterSheet.getRange(2, 1, outputData.length, headers.length).setValues(outputData);
  }

  Logger.log("Merged " + outputData.length + " responses from " + Object.keys(formMappings).length + " forms");
}

// Helper function to convert column letter to index
function getColumnIndex(columnLetter) {
  var column = 0;
  var length = columnLetter.length;
  for (var i = 0; i < length; i++) {
    column += (columnLetter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column - 1;
}
