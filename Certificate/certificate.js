
const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb } = PDFLib;

const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase()
    );

submitBtn.addEventListener("click", () => {
    const val = capitalize(userName.value);

    // Check if the text is empty or not
    if (val.trim() !== "" && userName.checkValidity()) {
        generatePDF(val);
    } else {
        userName.reportValidity();
    }
});

const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("./Certificate.pdf").then((res) =>
        res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    // Get font
    const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
        res.arrayBuffer()
    );

    // Embed our custom font in the document
    const SanChezFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw a string of text diagonally across the first page
    firstPage.drawText(name, {
        x: 220,
        y: 320,
        size: 58,
        font: SanChezFont,
        color: rgb(0, 0, 0)
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    console.log("Done creating");

    // This was for creating uri and showing in iframe
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById("pdf").src = pdfDataUri;
    document.getElementById("pdf");

    const file = new File([pdfBytes], "Web3gle Certificate.pdf", {
        type: "application/pdf;charset=utf-8",
    });
    saveAs(file);
};