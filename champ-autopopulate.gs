function champAutopopulate() {
  
  // set the sheet where all the schools' CHAMPIONS data should autopoulate
  
  var ss = SpreadsheetApp.openById('1wwA6lk14FAx-8Dj3uOOEhz_BHukFAQiRtYOwMKpoFFI');
  var champSheet = ss.setActiveSheet(ss.getSheetByName('CHAMPIONS AUTOPOPULATE'));
  
  // folder where all the schools' sheets are stored
 
  var mainFolder = DriveApp.getFolderById('0B-Z7OUgXBAAbRFQxQVg1OFNDZEU');
  var schoolSheets = mainFolder.getFiles();
  
  // other variables
  
  var fileId;
  var file;
  var sourceBook;
  var sourceSheet;
  var startRow = 3;
  var numRow;
  var startCol = 1;
  var numCol = 13;
  var sourceRange;
  var sourceValues;
  var destValues;
  var sheetName;
  
  // autopopulate the Parent Champions tab
  
  champSheet.clearContents();
  champSheet.appendRow(['School Name', 'First Name', 'Last Name', 'Relationship', 'Scholar First Name', 'Scholar Last Name', 'Cell Phone', 'Email Address', 'Street Address', 'NYS Assembly District', 'NYC Council District', 'NYS Senate District', 'Notes']);
  
  
  while(schoolSheets.hasNext()) {
    fileId = schoolSheets.next().getId();
    file = SpreadsheetApp.openById(fileId);
    sheetName = file.getName();
    sourceSheet = file.setActiveSheet(file.getSheetByName('Champion Parent Advocates'));
    numRow = sourceSheet.getLastRow()-startRow;
    
    if (sourceSheet.getLastRow()>startRow) {
    sourceRange = sourceSheet.getRange(startRow, startCol, numRow+1, numCol);
    sourceValues = sourceRange.getValues();
    
    var i = champSheet.getLastRow()+1
    champSheet.getRange(i, startCol+1, numRow+1, numCol).setValues(sourceValues);
    SpreadsheetApp.flush();
    champSheet.getRange(i, startCol, numRow+1, 1).setValue(sheetName);
   
    } else {
      Logger.log(sheetName);
    }
    
  }
  
}
