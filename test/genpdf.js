/*
*
*/
import fs                            from "fs" ;
import path                          from "path" ;
import { generatePDF }               from "../src/index" ;
//
/*
import xmlParser                     from "fast-xml-parser" ;
let xmlStr = fs.readFileSync( path.join(__dirname,"./imagen.xml"), {encoding:"utf8"} ) ;
const options = {
    attributeNamePrefix : "",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: false,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, 
    stopNodes: ["parse-me-as-string"]
} ;
let tObj       = xmlParser.getTraversalObj(xmlStr,options);
let jsonParsed = xmlParser.convertToJson( tObj, options ) ;
console.log("\n\n....jsonParsed: ",jsonParsed,";") ;
let arrayText = jsonParsed['iolc:Invoices']['iolc:Invoice']['iolc:InvoiceHeader']['iolc:Text'] ;
*/
/*
arrayText.forEach((elemText)=>{
    console.log("...elemText: attr: ",elemText.attr," tt: ",elemText["#text"],";") ;
}) ;
*/
// console.log("\n....header: ",jsonParsed['iolc:Invoices']['iolc:Invoice']['iolc:InvoiceHeader'],";") ;
//
let tempDataInvoice = JSON.parse( fs.readFileSync( path.join(__dirname,"./invoice.json"),"utf-8") );
let tempTemplate    = JSON.parse( fs.readFileSync( path.join(__dirname,"./templateInvoice.json"),"utf-8") );
//
generatePDF({ path: __dirname, data: tempDataInvoice , template: tempTemplate })
    .then((rr)=>{
        console.log("...r: ",rr,";") ;
    })
    .catch((ee)=>{
        console.log("...ee: ",ee,";") ;
    }) ;
//