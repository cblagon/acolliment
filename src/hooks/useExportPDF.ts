import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { type Bloc } from "@/data/blocksData";
import { type LangCode } from "@/hooks/useLanguage";
import { getTraduccio } from "@/data/translations";

const LANG_NAMES: Record<LangCode, string> = {
  es: "Castellà",
  en: "English",
  fr: "Français",
  ar: "العربية",
  ur: "اردو",
  wo: "Wolof",
  uk: "Українська",
  mnk: "Mandinka",
  it: "Italiano",
  el: "Ελληνικά",
  ptBR: "Português (Brasil)",
  pt: "Português",
  ha: "حسانية",
};

export function exportAllToPDF(blocs: Bloc[], lang: LangCode) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Aprèn Català!", pageW / 2, 20, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Programa d'acollida lingüística — Traducció: ${LANG_NAMES[lang]}`, pageW / 2, 28, { align: "center" });
  doc.text(`Data: ${new Date().toLocaleDateString("ca-ES")}`, pageW / 2, 34, { align: "center" });

  let y = 42;

  blocs.forEach((bloc, bi) => {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Bloc header
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`${bloc.emoji} ${bloc.nom}`, 14, y);
    y += 2;

    // Fitxes table
    const rows = bloc.fitxes.map((f) => [
      f.emoji,
      f.paraula,
      getTraduccio(f.paraula, lang),
      f.frase,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["", "Paraula", "Traducció", "Frase"]],
      body: rows,
      margin: { left: 14, right: 14 },
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 30, fontStyle: "bold" },
        2: { cellWidth: 40 },
        3: { cellWidth: "auto" },
      },
      didDrawPage: () => {
        // footer
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(
          `Aprèn Català! — Pàgina ${doc.getNumberOfPages()}`,
          pageW / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: "center" }
        );
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  });

  doc.save("apren-catala-fitxes.pdf");
}
