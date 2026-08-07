import { Question } from '../types';

export const ALL_QUESTIONS: Question[] = [
  // 1. Spasial - Spatial logic matrix (From Prompt HTML)
  {
    id: 1,
    category: 'spasial',
    title: 'Manakah gambar yang melengkapi pola di bawah ini?',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOXaxlG_oDSTTNTDVHluY0WHmgDYjw4KcZ2luKjyNUK147eujODXlG07oZLo1rUrhUKlIQegEDk2ZQwVES2rgLRmXGIZR1GpO0grsGoP-UeodeKilR7sAZxdUbuJP2jqHddrE1RoB8oPoYqs2l27Jhsp_OhysqjJErYIYKyVjvu_KBGHRYnhpvRDFfPQtnNOIYglNUSgZ08f8Ri7mL3bR9oUyZjAAncaOV-qh3NGlsyMT3LBamaeAF',
    options: [
      {
        id: 'A',
        label: 'Opsi A',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlNzVr0oLtBqfokLdNLeYRrjOwfZ4YxSwEaeGN7gurEmR4sAKahmAZkURosEO-WeX8Nau7c34d_82T81kk651GAOQ1m746p9H5R4txyCcdz-T2JdRuyfR7CLmNjeaOFIHE0uYN_sU4VMHEQBOVyt9GqR_VceKRejpvpWJbR5_PtRHWrePj__G4pOc2XnG4G4jmMLVtWP2F-xZTATsAvBWaWoPVYI90QT3_ZuWRSH5Flb82wYPSpws'
      },
      {
        id: 'B',
        label: 'Opsi B',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgu4CcDy1dICYQQMGPvZh_mz4TuI6K59kpz7JNNeEE1uRovrPyVjfhYWyHRcb3SFIATQIR7m6rQkvm2AgFAcWrajAT6nf6SEikJniE8n0RRIM3NklQgxnBhFRQ80flCmiu7jQoACqsV_2IJbLwXWYeOU7MOONIKwkmDn44uHjRuN0tdJtFBbEnB7kKHOj_IAlGEsSzkeV-71S1lC0DasSNyhBlEs787HV2aP4IxpZPV-F8Xx5y2cqQ'
      },
      {
        id: 'C',
        label: 'Opsi C',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0xYymMz0wj2tBs0RxWZC2qwX2VJbJERRiNxfEWrLtbSX6epCtbRJE2uRWHZMW46K_NTNxoHjSyJDciH-uq5r6-jkkMzQtdjdAnrrnJb5nIETyExlmid4fMZbkvrILs7QEEheyUs7iZGuP8B-dswRb3Gs8sd6gGkLDntqbvwj-1bvcKawqLGVNGvAGf5J2Sy28Ce92Q_YKfYEL_Sk5hZqYzdKo8IY6oaSRsA_E78zK7i4M-ZsL7y8w'
      },
      {
        id: 'D',
        label: 'Opsi D',
        image: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg'
      }
    ],
    correctOption: 'B',
    explanation: 'Pada matriks spasial ini, pola bentuk berotasi searah jarum jam sebesar 90° di setiap langkah dari kiri ke kanan. Opsi B secara akurat melanjutkan rotasi dan orientasi simbol berikutnya.'
  },

  // 2. Logika - Syllogism
  {
    id: 2,
    category: 'logika',
    title: 'Jika semua peneliti adalah pemikir, dan sebagian pemikir adalah seniman, manakah kesimpulan yang PALING tepat?',
    options: [
      { id: 'A', label: 'Semua seniman adalah peneliti' },
      { id: 'B', label: 'Sebagian pemikir bukan peneliti' },
      { id: 'C', label: 'Sebagian peneliti mungkin adalah seniman' },
      { id: 'D', label: 'Tidak ada seniman yang merupakan peneliti' }
    ],
    correctOption: 'C',
    explanation: 'Karena semua peneliti termasuk dalam himpunan pemikir, dan sebagian pemikir beririsan dengan himpunan seniman, maka ada kemungkinan sebagian peneliti juga merupakan seniman.'
  },

  // 3. Numerik - Number Series
  {
    id: 3,
    category: 'numerik',
    title: 'Berapakah angka berikutnya dalam deret ini? 3, 7, 15, 31, 63, ...',
    options: [
      { id: 'A', label: '127' },
      { id: 'B', label: '125' },
      { id: 'C', label: '95' },
      { id: 'D', label: '128' }
    ],
    correctOption: 'A',
    explanation: 'Polanya adalah (x * 2) + 1. Yaitu: (3*2)+1 = 7, (7*2)+1 = 15, (15*2)+1 = 31, (31*2)+1 = 63, (63*2)+1 = 127.'
  },

  // 4. Verbal - Analogies
  {
    id: 4,
    category: 'verbal',
    title: 'SUTRADARA : FILM = ARSITEK : ...',
    options: [
      { id: 'A', label: 'KAPUR' },
      { id: 'B', label: 'BANGUNAN' },
      { id: 'C', label: 'RUMAH SAKIT' },
      { id: 'D', label: 'PROYEK' }
    ],
    correctOption: 'B',
    explanation: 'Sutradara menghasilkan dan mengarahkan karya berupa Film, sedangkan Arsitek merancang karya berupa Bangunan.'
  },

  // 5. Spasial - Cubic unfolded view
  {
    id: 5,
    category: 'spasial',
    title: 'Bila jaring-jaring kubus ini dilipat, manakah orientasi wajah kubus yang terbentuk secara benar?',
    options: [
      { id: 'A', label: 'Opsi A (Sisi Bintang & Lingkaran Bersebelahan)' },
      { id: 'B', label: 'Opsi B (Sisi Segitiga & Segi Empat Berhadapan)' },
      { id: 'C', label: 'Opsi C (Sisi Polos Berada di Atas)' },
      { id: 'D', label: 'Opsi D (Sisi Garis Diagonak Tegak Lurus)' }
    ],
    correctOption: 'A',
    explanation: 'Pada lipatan jaring-jaring standar, dua wajah yang berdekatan dalam jaring-jaring akan selalu berbagi rusuk yang sama saat dibentuk menjadi kubus 3D.'
  },

  // 6. Logika - Sequence logic
  {
    id: 6,
    category: 'logika',
    title: 'Hari ini hari Selasa. 100 hari dari sekarang adalah hari...',
    options: [
      { id: 'A', label: 'Kamis' },
      { id: 'B', label: 'Jumat' },
      { id: 'C', label: 'Sabtu' },
      { id: 'D', label: 'Minggu' }
    ],
    correctOption: 'A',
    explanation: '100 dibagi 7 adalah 14 sisa 2. Dua hari setelah Selasa adalah hari Kamis.'
  },

  // 7. Numerik - Algebra & Ratio
  {
    id: 7,
    category: 'numerik',
    title: 'Sebuah proyek dapat diselesaikan oleh 12 pekerja dalam 20 hari. Jika pekerja ditambah 3 orang, berapa hari proyek tersebut selesai?',
    options: [
      { id: 'A', label: '16 Hari' },
      { id: 'B', label: '15 Hari' },
      { id: 'C', label: '18 Hari' },
      { id: 'D', label: '14 Hari' }
    ],
    correctOption: 'A',
    explanation: 'Perbandingan berbalik nilai: (12 pekerja * 20 hari) / (12 + 3 pekerja) = 240 / 15 = 16 hari.'
  },

  // 8. Verbal - Synonyms/Antonyms
  {
    id: 8,
    category: 'verbal',
    title: 'Manakah kata yang memiliki makna Paling Berlawanan (Antonym) dengan kata "PROMINEN"?',
    options: [
      { id: 'A', label: 'Ternama' },
      { id: 'B', label: 'Samar / Terbelakang' },
      { id: 'C', label: 'Unggul' },
      { id: 'D', label: 'Dominan' }
    ],
    correctOption: 'B',
    explanation: 'Prominen berarti terkemuka atau menonjol. Antonimnya adalah samar, terbelakang, atau tidak dikenal.'
  },

  // 9. Spasial - Pattern Completion
  {
    id: 9,
    category: 'spasial',
    title: 'Perhatikan susunan pola kisi berotasi. Elemen manakah yang mengisi posisi tanda tanya (?) di pojok kanan bawah?',
    options: [
      { id: 'A', label: 'Lingkaran Hitam dengan Garis Vertikal' },
      { id: 'B', label: 'Segitiga Terbalik dengan Dua Titik' },
      { id: 'C', label: 'Persegi Berarsir Kiri Atas' },
      { id: 'D', label: 'Bintang Empat Sudut' }
    ],
    correctOption: 'B',
    explanation: 'Jumlah elemen pada baris ketiga harus mengikuti kombinasi bentuk dari dua kolom sebelumnya dengan penjumlahan titik internal.'
  },

  // 10. Logika - Conditional Logic
  {
    id: 10,
    category: 'logika',
    title: 'Jika lampu merah menyala, kendaraan berhenti. Kendaraan berhenti saat ini. Apakah kesimpulan yang pasti?',
    options: [
      { id: 'A', label: 'Lampu merah pasti menyala' },
      { id: 'B', label: 'Lampu merah mungkin menyala' },
      { id: 'C', label: 'Lampu hijau menyala' },
      { id: 'D', label: 'Kendaraan mengalami mogok' }
    ],
    correctOption: 'B',
    explanation: 'Merupakan kekeliruan menyimpulkan akibat (Affirming the consequent). Kendaraan bisa berhenti karena lampu merah, kemacetan, atau sebab lain. Jadi lampu merah mungkin menyala.'
  },

  // 11. Numerik - Quick Math
  {
    id: 11,
    category: 'numerik',
    title: 'Hasil dari 15% dari 240 ditambah 25% dari 160 adalah...',
    options: [
      { id: 'A', label: '76' },
      { id: 'B', label: '72' },
      { id: 'C', label: '80' },
      { id: 'D', label: '64' }
    ],
    correctOption: 'A',
    explanation: '(0.15 * 240) = 36. (0.25 * 160) = 40. Total = 36 + 40 = 76.'
  },

  // 12. Verbal - Word Classification
  {
    id: 12,
    category: 'verbal',
    title: 'Pilihlah satu kata yang TIDAK termasuk dalam kelompoknya!',
    options: [
      { id: 'A', label: 'Mikroskop' },
      { id: 'B', label: 'Teleskop' },
      { id: 'C', label: 'Stetoskop' },
      { id: 'D', label: 'Periskop' }
    ],
    correctOption: 'C',
    explanation: 'Mikroskop, Teleskop, dan Periskop adalah alat optik untuk melihat visual, sedangkan Stetoskop adalah alat akustik untuk mendengarkan suara tubuh (kedokteran).'
  },

  // 13. Spasial - Symmetry & Mirroring
  {
    id: 13,
    category: 'spasial',
    title: 'Jika gambar di samping dicerminkan secara horizontal terhadap garis cermin kanan, bentuk manakah yang dihasilkan?',
    options: [
      { id: 'A', label: 'Bentuk A (Poin Panah Menunjuk Kiri Bawah)' },
      { id: 'B', label: 'Bentuk B (Poin Panah Menunjuk Kanan Bawah)' },
      { id: 'C', label: 'Bentuk C (Poin Panah Menunjuk Kiri Atas)' },
      { id: 'D', label: 'Bentuk D (Poin Panah Menunjuk Kanan Atas)' }
    ],
    correctOption: 'A',
    explanation: 'Refleksi cermin horizontal membalikkan orientasi kiri-kanan namun mempertahankan bagian atas-bawah.'
  },

  // 14. Logika - Deduction
  {
    id: 14,
    category: 'logika',
    title: 'Budi lebih tinggi dari Andi. Cici lebih pendek dari Andi. Siapakah yang paling tinggi di antara ketiganya?',
    options: [
      { id: 'A', label: 'Budi' },
      { id: 'B', label: 'Andi' },
      { id: 'C', label: 'Cici' },
      { id: 'D', label: 'Sama tinggi' }
    ],
    correctOption: 'A',
    explanation: 'Urutan tinggi dari yang tertinggi: Budi > Andi > Cici. Maka Budi paling tinggi.'
  },

  // 15. Numerik - Geometric progression
  {
    id: 15,
    category: 'numerik',
    title: 'Berapakah angka selanjutnya: 2, 6, 18, 54, 162, ...',
    options: [
      { id: 'A', label: '486' },
      { id: 'B', label: '324' },
      { id: 'C', label: '420' },
      { id: 'D', label: '512' }
    ],
    correctOption: 'A',
    explanation: 'Polanya adalah perkalian 3 berturut-turut: 162 * 3 = 486.'
  }
];

export function getQuestionsForTest(mode: 'quick' | 'full' | 'category' | 'daily', category?: string): Question[] {
  if (mode === 'quick') {
    // 15 questions
    return [...ALL_QUESTIONS].slice(0, 15);
  }
  if (mode === 'full') {
    // Duplicate & generate items to reach up to 40 items dynamically
    const fullList: Question[] = [];
    let idCounter = 1;
    for (let i = 0; i < 3; i++) {
      ALL_QUESTIONS.forEach(q => {
        fullList.push({
          ...q,
          id: idCounter++,
          title: i === 0 ? q.title : `[Variasi ${i+1}] ${q.title}`
        });
      });
    }
    return fullList.slice(0, 40);
  }
  if (mode === 'category' && category) {
    const filtered = ALL_QUESTIONS.filter(q => q.category === category);
    if (filtered.length >= 10) return filtered.slice(0, 10);
    // Expand list if needed
    const expanded: Question[] = [];
    let counter = 1;
    while (expanded.length < 10) {
      ALL_QUESTIONS.forEach(q => {
        if (q.category === category) {
          expanded.push({
            ...q,
            id: counter++,
          });
        }
      });
      if (expanded.length === 0) break; // fallback safety
    }
    return expanded.slice(0, 10);
  }
  // Default daily challenge
  return [...ALL_QUESTIONS].slice(0, 10);
}
