import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { type Bloc } from "@/data/blocksData";
import { type LangCode } from "@/hooks/useLanguage";
import { getWord } from "@/data/translations";

const LANG_NAMES: Record<LangCode, string> = {
  ca: "Català",
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
  zh: "中文",
  hi: "हिन्दी",
  snk: "Soninkanxaane",
  ro: "Română",
  srk: "Saranxulle",
};

import { getWord } from "@/data/translations";

export function exportAllToPDF(blocs: Bloc[], targetLang: LangCode, helpLang: LangCode) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(`Aprèn ${LANG_NAMES[targetLang]}!`, pageW / 2, 20, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`${LANG_NAMES[targetLang]} → ${LANG_NAMES[helpLang]}`, pageW / 2, 28, { align: "center" });
  doc.text(`Data: ${new Date().toLocaleDateString()}`, pageW / 2, 34, { align: "center" });

  let y = 42;

  blocs.forEach((bloc) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`${bloc.emoji} ${bloc.nom}`, 14, y);
    y += 2;

    const showPhrase = targetLang === "ca";
    const rows = bloc.fitxes.map((f) => {
      const base = [f.emoji, getWord(f.paraula, targetLang), getWord(f.paraula, helpLang)];
      return showPhrase ? [...base, f.frase] : base;
    });
    const head = showPhrase
      ? [["", LANG_NAMES[targetLang], LANG_NAMES[helpLang], "Frase"]]
      : [["", LANG_NAMES[targetLang], LANG_NAMES[helpLang]]];

    autoTable(doc, {
      startY: y,
      head,
      body: rows,
      margin: { left: 14, right: 14 },
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: "bold" },
      columnStyles: showPhrase
        ? {
            0: { cellWidth: 10, halign: "center" },
            1: { cellWidth: 30, fontStyle: "bold" },
            2: { cellWidth: 40 },
            3: { cellWidth: "auto" },
          }
        : {
            0: { cellWidth: 10, halign: "center" },
            1: { cellWidth: 60, fontStyle: "bold" },
            2: { cellWidth: "auto" },
          },
      didDrawPage: () => {
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(
          `Aprèn ${LANG_NAMES[targetLang]}! — Pàgina ${doc.getNumberOfPages()}`,
          pageW / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: "center" }
        );
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  });

  doc.save(`apren-${targetLang}-fitxes.pdf`);
}

