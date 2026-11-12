import React from "react";
import { Composition } from "remotion";
import {
  DocumentaryVideo,
  TOTAL_DOCUMENTARY_FRAMES,
} from "./DocumentaryVideo";
import { DocumentaryProps } from "./types";

const defaultProps: DocumentaryProps = {
  chapterLabel: "Bagian I • Arsip Nusantara",
  title: "JEJAK DI BALIK KABUT",
  subtitle: "Kisah tentang jalur rempah yang perlahan dilupakan waktu",
  yearLabel: "1602 — KEPULAUAN BANDA",
  locationName: "Pelabuhan Tua Banda Neira",
  locationDetail: "Pusat perdagangan pala yang mengubah peta dunia",
  quoteText:
    "Sejarah tidak pernah benar-benar hilang; ia hanya menunggu seseorang untuk kembali membacanya.",
  quoteAuthor: "Catatan Ekspedisi Timur",
  statNumber: 400,
  statSuffix: "+ Tahun",
  statCaption:
    "Jejak peradaban maritim yang masih tersisa di sepanjang pesisir timur Nusantara.",
  closingText: "Sebuah Dokumenter Pendek • Diproduksi dengan Remotion",
  accentColor: "#d4af37",
  scene2Image: "",
  scene3Image: "",
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CinematicDocumentary"
      component={DocumentaryVideo}
      durationInFrames={TOTAL_DOCUMENTARY_FRAMES}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
    />
  );
};
