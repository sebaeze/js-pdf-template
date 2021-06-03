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
                margin: 40,
                size: 'A4'
            }) ;
            doc.pipe(fs.createWriteStream( pathPDF ));
            //
            doc .fontSize(15)
                .text('Some text with an embedded font!') ;
            //
            doc .fontSize(12)
                .text('*** test 1 ***',200,200) ;
            //
            doc .fontSize(13)
                .text('*** 2222222 ***',50,100) ;
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