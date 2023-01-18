/*
*
*/
import fs            from "fs" ;
import path          from "path" ;
import PDFDoc        from "pdfkit" ;
//
const replaceTextLines = (argArrayTemplate,argData) => {
    try {
        //
        let outArray = [] ;
        let __DATA__ = {} ;
        //
        for ( let keyData in argData ){
            __DATA__[keyData] = argData[keyData] ;
        } ;
        //
        for ( let posL=0; posL<argArrayTemplate.length; posL++ ){
            let newObj  = argArrayTemplate[posL] ;
            let newText = ""+String(newObj.text) ;
            if ( newText.indexOf("${")>-1 ){
                let tempText = newText.replace(/\${/g,"${__DATA__.") ;
                // console.log("...(A) tempText: ",tempText,";") ;
                tempText     = eval( "`"+tempText+"`" ) ;
                newObj.text  = tempText ;
                // console.log("...(B) tempText: ",tempText,";") ;
            } ;
            outArray.push(newObj) ;
        } ;
        //
        return outArray ;
        //
    } catch(errRTL){
        throw errRTL ;
    } ;
} ;
//
export const generatePDF = (argOpt) => {
    return new Promise((respOk,respRech)=>{
        try {
            //
            let pathPDF = path.join( argOpt.path ? argOpt.path :  __dirname, "../test/output.pdf" ) ;
            console.log("..pathPDF: ",pathPDF,";") ;
            //
            const { data } = argOpt ;
            const { general, defaults, fixedLines } = argOpt.template ;
            //
            let doc = new PDFDoc({layout: general.orientation, pdfVersion: general.pdfVersion||"1.4", margin: general.margin||1, size: general.size||'A4' }) ;
            //
            doc.pipe(fs.createWriteStream( pathPDF ));
            //
            let arrayLines = replaceTextLines( fixedLines, data ) ;
            for ( let posDD=0; posDD<arrayLines.length; posDD++ ){
                let elemText = arrayLines[posDD] ;
                //
                let fontSize = elemText.fontSize==undefined ? defaults.fontSize||9 : elemText.fontSize ;
                let fontNN   = elemText.fontName==undefined ? defaults.fontName||"Courier-Bold" : elemText.fontName ;
                fontNN     = fontNN.replace(/_/g,"-") ;
                switch(fontNN){
                    case "Helvetica-bold": fontNN="Helvetica-Bold" ; break ;
                    default: break ;
                } ;
                //
                doc .font( fontNN )
                    .fontSize( fontSize )
                    .text( ""+elemText.text , parseFloat(elemText.x)* 2.54 , parseFloat(elemText.y)* 2.54  ) ;
                //
            } ;
            //
            doc.end() ;
            //
            respOk({}) ;
            //
        } catch(errGP){
            respRech(errGP) ;
        } ;
    }) ;
} ;
//