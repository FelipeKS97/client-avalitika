import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

export default function printPDF (elementId, printId, filename) {
  let divHeight = document.getElementById(elementId).clientHeight;
  let divWidth = document.getElementById(elementId).clientWidth;
  let ratio = divHeight / divWidth;
  const domElement = document.getElementById(elementId)
  html2canvas(domElement, { onclone: (document) => {
    document.getElementById(printId).style.visibility = 'hidden'
  }})
  .then((canvas) => {
      const img = canvas.toDataURL('image/png')
      // console.log({canvas})
      const pdf = new jsPdf("p")
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();
      height = ratio * width
      pdf.addImage(img, 'svg', 0, 0, width-20, height-10)
      pdf.save(filename)
  })
}
