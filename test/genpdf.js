/*
*
*/
import fs                            from "fs" ;
import path                          from "path" ;
import xmlParser                     from "fast-xml-parser" ;
import { generatePDF }               from "../src/index" ;
//
let xmlStr = fs.readFileSync( path.join(__dirname,"./imagen.xml"), {encoding:"utf8"} ) ;
// console.log("..xmlStr: ",xmlStr,";") ;
const options = {
    attributeNamePrefix : "",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    // attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    // tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
} ;
let tObj       = xmlParser.getTraversalObj(xmlStr,options);
let jsonParsed = xmlParser.convertToJson( tObj, options ) ;
console.log("\n\n....jsonParsed: ",jsonParsed,";") ;
//
let arrayText = jsonParsed['iolc:Invoices']['iolc:Invoice']['iolc:InvoiceHeader']['iolc:Text'] ;
arrayText.forEach((elemText)=>{
    console.log("...elemText: attr: ",elemText.attr," tt: ",elemText["#text"],";") ;
}) ;
// console.log("\n....header: ",jsonParsed['iolc:Invoices']['iolc:Invoice']['iolc:InvoiceHeader'],";") ;
//
/*
generatePDF({ path: __dirname })
    .then((rr)=>{
        console.log("...r: ",rr,";") ;
    })
    .catch((ee)=>{
        console.log("...ee: ",ee,";") ;
    }) ;
*/
//