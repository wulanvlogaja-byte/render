export interface DocumentaryProps {
  title: string;
  subtitle: string;
  chapterLabel: string;
  locationName: string;
  locationDetail: string;
  yearLabel: string;
  quoteText: string;
  quoteAuthor: string;
  statNumber: number;
  statSuffix: string;
  statCaption: string;
  closingText: string;
  accentColor: string;
  // Nama file di folder public/, misal "banda.jpg".
  // Kosongkan ("") untuk memakai background sinematik prosedural bawaan.
  scene2Image: string;
  scene3Image: string;
}
