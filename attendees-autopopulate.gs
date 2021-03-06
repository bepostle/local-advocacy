function attendeesAutopopulate() {
  
  // set the sheet where all the schools' Parent Attendees data should autopoulate
  
  var ss = SpreadsheetApp.openById('1wwA6lk14FAx-8Dj3uOOEhz_BHukFAQiRtYOwMKpoFFI');
  var attendeeSheet = ss.setActiveSheet(ss.getSheetByName('ATTENDEES AUTOPOPULATE'));
  
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
  var numCol = 5;
  var sourceRange;
  var sourceValues;
  var destValues;
  var sheetName;
  
  // autopopulate the Parent Attendees tab
  
  attendeeSheet.clearContents();
  attendeeSheet.appendRow(['School Name', 'Event Code', 'Parent First Name', 'Parent Last Name', 'Parent Invite Status', 'Role']);
  
  
  while(schoolSheets.hasNext()) {
    fileId = schoolSheets.next().getId();
    file = SpreadsheetApp.openById(fileId);
    sheetName = file.getName();
    sourceSheet = file.setActiveSheet(file.getSheetByName('Parent Attendees List'));
    numRow = sourceSheet.getLastRow()-startRow;
    
    if (sourceSheet.getLastRow()>startRow) {
    sourceRange = sourceSheet.getRange(startRow, startCol, numRow+1, numCol);
    sourceValues = sourceRange.getValues();
    
    var i = attendeeSheet.getLastRow()+1
    attendeeSheet.getRange(i, startCol+1, numRow+1, numCol).setValues(sourceValues);
    SpreadsheetApp.flush();
    attendeeSheet.getRange(i, startCol, numRow+1, 1).setValue(sheetName);

    } else {
      Logger.log(sheetName);
    }
  }
  
}
