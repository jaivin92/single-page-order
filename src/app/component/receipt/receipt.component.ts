import {
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { PosService } from '../../services/pos.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receipt',
  standalone: true,
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss',
  imports: [DatePipe]
})
export class ReceiptComponent {

  readonly pos = inject(PosService);
  today = new Date();

  @Output() close =
    new EventEmitter<void>();

  // print(): void {
  //   window.print();
  // }

  print(): void {

    const receipt = document.getElementById('receiptPaper');

    if (!receipt) {
      console.error('Receipt element not found');
      return;
    }

    const printWindow = window.open(
      '',
      '_blank',
      'width=400,height=700'
    );

    if (!printWindow) {
      return;
    }

    printWindow.document.open();

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>

        <title>Receipt</title>

        <style>

          @page {
            size: 80mm auto;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;

            width: 80mm;

            background: #fff;

            font-family:
              'Courier New',
              monospace;

            color: #1a1a1a;
          }

          #receiptPaper {

            width: 80mm;

            padding: 6mm 5mm;

            font-size: 11px;

            background: #fff;
          }

          .r-center {
            text-align: center;
          }

          .r-brand {

            font-family: Arial, sans-serif;

            font-weight: 800;

            font-size: 15px;

            letter-spacing: .03em;

            color: #16233F;
          }

          .r-sub {

            font-size: 10px;

            color: #666;

            margin-bottom: 8px;
          }

          .r-dash {

            border: none;

            border-top: 1px dashed #999;

            margin: 8px 0;
          }

          .r-row {

            display: flex;

            justify-content: space-between;

            margin-bottom: 3px;
          }

          .r-line-name {

            font-weight: 600;

            margin-top: 4px;
          }

          .r-line-sub {

            color: #666;

            font-size: 10px;

            margin-bottom: 5px;
          }

          .r-total {

            font-weight: 700;

            font-size: 13px;
          }

          .r-footer {

            margin-top: 12px;

            font-size: 10px;

            color: #555;
          }

        </style>

      </head>

      <body>

        <div id="receiptPaper">

          ${receipt.innerHTML}

        </div>

      </body>

    </html>
  `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {

      printWindow.print();

      printWindow.close();

    }, 300);
  }

  // downloadPDF(): void {

  //   // PDF implementation can be added here
  //   // using jsPDF.

  //   console.log('Generate PDF');
  //   const receipt =
  //     document.getElementById('receiptPaper');

  //   if (!receipt) {
  //     console.error('Receipt element not found');
  //     return;
  //   }

  //   /*
  //   80mm receipt width

  //   jsPDF unit = mm

  //   Width  = 80mm
  //   Height = calculated based on content
  // */

  //   const pdf = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'mm',
  //     format: [80, 200]
  //   });


  //   const pageWidth = 80;

  //   const margin = 5;

  //   const contentWidth =
  //     pageWidth - (margin * 2);


  //   /*
  //     Convert receipt HTML to PDF
  //   */

  //   pdf.html(receipt, {

  //     x: margin,

  //     y: margin,

  //     width: contentWidth,

  //     windowWidth: receipt.scrollWidth,

  //     autoPaging: 'text',

  //     html2canvas: {
  //       scale: 2,

  //       useCORS: true,

  //       backgroundColor: '#ffffff'
  //     },

  //     callback: (doc) => {

  //       doc.save(
  //         'BuildRight-Receipt-A-1042.pdf'
  //       );

  //     }
  //   });

  // }

  downloadPDF(): void {

    const receipt =
      document.getElementById('receiptPaper');

    if (!receipt) {
      console.error('Receipt element not found');
      return;
    }

    const receiptHeight =
      Math.max(
        100,
        receipt.scrollHeight * 0.264583
      );

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, receiptHeight + 10]
    });

    pdf.html(receipt, {

      x: 5,

      y: 5,

      width: 70,

      windowWidth: receipt.scrollWidth,

      autoPaging: 'text',

      html2canvas: {

        scale: 2,

        useCORS: true,

        backgroundColor: '#ffffff'

      },

      callback: (doc) => {

        doc.save(
          `BuildRight-Receipt-${Date.now()}.pdf`
        );

      }

    });

  }
}
