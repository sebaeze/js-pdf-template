/*
*
*/
import fs            from "fs" ;
import path          from "path" ;
import PDFDoc        from "pdfkit" ;
//
export const generatePDF = (argOpt) => {
    return new Promise((respOk,respRech)=>{
        try {
            //
            let pathPDF = path.join( argOpt.path ? argOpt.path :  __dirname, "../test/output.pdf" ) ;
            console.log("..pathPDF: ",pathPDF,";") ;
            //
            let doc = new PDFDoc({
                layout: 'portrait',
                pdfVersion: "1.4",
                margin: 1,
                size: 'A4'
            }) ;
            doc.pipe(fs.createWriteStream( pathPDF ));
            //
            console.log("...data.length: ",argOpt.data.length,";");
            for ( let posDD=0; posDD<argOpt.data.length; posDD++ ){
                let elemText = argOpt.data[posDD] ;
                if ( elemText["#text"]!=undefined && elemText["#text"].length>0 ){
                    // doc.switchToPage(0) ;
                    // doc .font("Courier-Bold")
                    let fontNN = elemText.attr.fontName==undefined ? "Courier-Bold" : elemText.attr.fontName ;
                    fontNN     = fontNN.replace(/_/g,"-") ;
                    switch(fontNN){
                        case "Helvetica-bold": fontNN="Helvetica-Bold" ; break ;
                        default: break ;
                    } ;
                    console.log("...fontNN: ",fontNN," fSize: ",elemText.attr.fontSize," x: ",elemText.attr.x," y: ",elemText.attr.y," text: ",elemText["#text"],"") ;
                    //
                    doc .font( fontNN )
                        .fontSize( elemText.attr.fontSize )
                        .text( ""+String(elemText["#text"]) , parseFloat(elemText.attr.x)* 2.54 , parseFloat(elemText.attr.y)* 2.54  ) ;
                } ;
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