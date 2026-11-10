import type { Bloc } from "@/data/blocksData";
import type { Ambit } from "@/data/esoData";

// "Gestions" — everyday procedures (school and non-school) shared by 2n–4t ESO.
const f = (paraula: string, traduccio: string, emoji: string, frase: string) => ({ paraula, traduccio, emoji, frase });

const base: Omit<Bloc, "id">[] = [
  { nom: "Anar al metge", emoji: "🩺", color: "bg-primary", level: "A2", fitxes: [
    f("Cita prèvia", "Appointment", "📅", "Vull demanar cita prèvia amb el metge."),
    f("Targeta sanitària", "Health card", "💳", "Porta la targeta sanitària al CAP."),
    f("CAP", "Health centre", "🏥", "El CAP és a prop de l'institut."),
    f("Símptoma", "Symptom", "🤒", "Quins símptomes tens?"),
    f("Febre", "Fever", "🌡️", "Fa dos dies que tinc febre."),
    f("Recepta", "Prescription", "📝", "El metge m'ha fet una recepta."),
    f("Farmàcia", "Pharmacy", "💊", "Compra el medicament a la farmàcia."),
    f("Justificant", "Medical note", "📄", "Necessito un justificant per a l'escola."),
  ]},
  { nom: "Anar d'excursió", emoji: "🚌", color: "bg-accent", level: "A2", fitxes: [
    f("Autorització", "Permission slip", "✍️", "Els pares han de signar l'autorització."),
    f("Sortida", "Trip", "🗺️", "Divendres fem una sortida al museu."),
    f("Punt de trobada", "Meeting point", "📍", "El punt de trobada és la porta del centre."),
    f("Horari", "Schedule", "⏰", "L'autocar surt a les vuit en punt."),
    f("Motxilla", "Backpack", "🎒", "Porta aigua i esmorzar a la motxilla."),
    f("Pagament", "Payment", "💶", "El pagament de l'excursió és de 15 euros."),
    f("Entrada", "Ticket", "🎟️", "L'entrada al museu està inclosa."),
    f("Acompanyant", "Chaperone", "🧑‍🏫", "Hi haurà tres professors acompanyants."),
  ]},
  { nom: "Apuntar-se al gimnàs", emoji: "🏋️", color: "bg-secondary", level: "A2", fitxes: [
    f("Inscripció", "Registration", "🗒️", "Vull fer la inscripció al gimnàs."),
    f("Quota", "Fee", "💳", "La quota mensual és de 25 euros."),
    f("Carnet", "Membership card", "🪪", "Ensenya el carnet a l'entrada."),
    f("Horari", "Opening hours", "🕘", "Quin horari té el gimnàs?"),
    f("Vestidor", "Changing room", "🚿", "Els vestidors són al fons a la dreta."),
    f("Monitor", "Instructor", "🧑‍🏫", "El monitor t'explica les màquines."),
    f("Classe dirigida", "Group class", "🤸", "M'agradaria provar una classe dirigida."),
    f("Baixa", "Cancellation", "❌", "Per donar-te de baixa, avisa amb un mes."),
  ]},
  { nom: "Revisar una nota", emoji: "📝", color: "bg-bloom-pink", level: "B1", fitxes: [
    f("Revisió", "Review", "🔍", "Puc demanar una revisió de l'examen?"),
    f("Qualificació", "Grade", "📊", "No estic d'acord amb la qualificació."),
    f("Criteris", "Criteria", "📋", "Quins criteris d'avaluació heu fet servir?"),
    f("Reclamació", "Formal complaint", "📨", "Si cal, faré una reclamació per escrit."),
    f("Tutor", "Form teacher", "👩‍🏫", "Parlaré primer amb el meu tutor."),
    f("Termini", "Deadline", "⏳", "El termini per reclamar és de dos dies."),
    f("Argument", "Argument", "💬", "Crec que aquesta resposta és correcta perquè..."),
    f("Amb respecte", "Respectfully", "🤝", "Demana-ho sempre amb respecte."),
  ]},
  { nom: "Secretaria i ajuntament", emoji: "🏛️", color: "bg-primary", level: "B1", fitxes: [
    f("Matrícula", "Enrolment", "🎓", "He de fer la matrícula a secretaria."),
    f("Empadronament", "Census registration", "🏠", "Necessito el certificat d'empadronament."),
    f("Document d'identitat", "ID document", "🪪", "Porta el document d'identitat original."),
    f("Fotocòpia", "Photocopy", "📠", "Cal una fotocòpia del passaport."),
    f("Formulari", "Form", "📄", "Omple aquest formulari amb majúscules."),
    f("Signatura", "Signature", "✍️", "Falta la teva signatura aquí."),
    f("Torn", "Turn", "🔢", "Agafa número i espera el teu torn."),
    f("Beca", "Grant", "💰", "Pots demanar una beca de menjador."),
  ]},
  { nom: "Transport i targeta", emoji: "🚇", color: "bg-accent", level: "A2", fitxes: [
    f("Targeta de transport", "Transport card", "🎫", "Vull fer-me la targeta de transport jove."),
    f("Recarregar", "Top up", "🔄", "He de recarregar la targeta."),
    f("Parada", "Stop", "🚏", "Baixa a la parada següent."),
    f("Andana", "Platform", "🚉", "El tren surt de l'andana dos."),
    f("Bitllet", "Ticket", "🎟️", "Un bitllet senzill, si us plau."),
    f("Retard", "Delay", "⌛", "El tren porta deu minuts de retard."),
    f("Transbord", "Transfer", "🔀", "Has de fer transbord a la línia verda."),
    f("Horaris", "Timetables", "🗓️", "Consulta els horaris a l'aplicació."),
  ]},
];

export const gestionsAmbit = (cursId: string): Ambit => ({
  id: "gestions",
  nom: "Gestions",
  emoji: "🗂️",
  color: "bg-bloom-pink",
  descripcio: "Gestions de la vida diària, escolars o no: anar al metge, una excursió, el gimnàs, revisar una nota...",
  blocs: base.map((b, i) => ({ ...b, id: `${cursId}-gestions-${i + 1}` })),
});
