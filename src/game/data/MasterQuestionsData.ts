export interface QuestionItem {
  id: string;
  grade: number;
  difficulty: 'easy' | 'normal' | 'hard';
  num: number;
  question: string;
  correctAnswer: string;
  choices: string[];
}

export const MASTER_QUESTIONS: QuestionItem[] = [
  {
    "id": "g3:easy:1",
    "grade": 3,
    "difficulty": "easy",
    "num": 1,
    "question": "13 + 40 = ?",
    "correctAnswer": "53",
    "choices": [
      "53",
      "58",
      "48",
      "63"
    ]
  },
  {
    "id": "g3:easy:2",
    "grade": 3,
    "difficulty": "easy",
    "num": 2,
    "question": "38 + 13 = ?",
    "correctAnswer": "51",
    "choices": [
      "51",
      "56",
      "46",
      "61"
    ]
  },
  {
    "id": "g3:easy:3",
    "grade": 3,
    "difficulty": "easy",
    "num": 3,
    "question": "79 + 7 = ?",
    "correctAnswer": "86",
    "choices": [
      "86",
      "91",
      "81",
      "96"
    ]
  },
  {
    "id": "g3:easy:4",
    "grade": 3,
    "difficulty": "easy",
    "num": 4,
    "question": "24 - 5 = ?",
    "correctAnswer": "19",
    "choices": [
      "19",
      "21",
      "17",
      "23"
    ]
  },
  {
    "id": "g3:easy:5",
    "grade": 3,
    "difficulty": "easy",
    "num": 5,
    "question": "37 + 19 = ?",
    "correctAnswer": "56",
    "choices": [
      "56",
      "61",
      "51",
      "66"
    ]
  },
  {
    "id": "g3:easy:6",
    "grade": 3,
    "difficulty": "easy",
    "num": 6,
    "question": "81 + 8 = ?",
    "correctAnswer": "89",
    "choices": [
      "89",
      "94",
      "84",
      "99"
    ]
  },
  {
    "id": "g3:easy:7",
    "grade": 3,
    "difficulty": "easy",
    "num": 7,
    "question": "48 - 33 = ?",
    "correctAnswer": "15",
    "choices": [
      "15",
      "17",
      "13",
      "19"
    ]
  },
  {
    "id": "g3:easy:8",
    "grade": 3,
    "difficulty": "easy",
    "num": 8,
    "question": "20 - 17 = ?",
    "correctAnswer": "3",
    "choices": [
      "3",
      "5",
      "1",
      "7"
    ]
  },
  {
    "id": "g3:easy:9",
    "grade": 3,
    "difficulty": "easy",
    "num": 9,
    "question": "64 + 15 = ?",
    "correctAnswer": "79",
    "choices": [
      "79",
      "84",
      "74",
      "89"
    ]
  },
  {
    "id": "g3:easy:10",
    "grade": 3,
    "difficulty": "easy",
    "num": 10,
    "question": "39 - 18 = ?",
    "correctAnswer": "21",
    "choices": [
      "21",
      "26",
      "16",
      "31"
    ]
  },
  {
    "id": "g3:easy:11",
    "grade": 3,
    "difficulty": "easy",
    "num": 11,
    "question": "33 - 7 = ?",
    "correctAnswer": "26",
    "choices": [
      "26",
      "31",
      "21",
      "36"
    ]
  },
  {
    "id": "g3:easy:12",
    "grade": 3,
    "difficulty": "easy",
    "num": 12,
    "question": "32 - 16 = ?",
    "correctAnswer": "16",
    "choices": [
      "16",
      "18",
      "14",
      "20"
    ]
  },
  {
    "id": "g3:easy:13",
    "grade": 3,
    "difficulty": "easy",
    "num": 13,
    "question": "97 - 38 = ?",
    "correctAnswer": "59",
    "choices": [
      "59",
      "64",
      "54",
      "69"
    ]
  },
  {
    "id": "g3:easy:14",
    "grade": 3,
    "difficulty": "easy",
    "num": 14,
    "question": "68 + 22 = ?",
    "correctAnswer": "90",
    "choices": [
      "90",
      "95",
      "85",
      "100"
    ]
  },
  {
    "id": "g3:easy:15",
    "grade": 3,
    "difficulty": "easy",
    "num": 15,
    "question": "58 + 10 = ?",
    "correctAnswer": "68",
    "choices": [
      "68",
      "73",
      "63",
      "78"
    ]
  },
  {
    "id": "g3:easy:16",
    "grade": 3,
    "difficulty": "easy",
    "num": 16,
    "question": "99 - 51 = ?",
    "correctAnswer": "48",
    "choices": [
      "48",
      "53",
      "43",
      "58"
    ]
  },
  {
    "id": "g3:easy:17",
    "grade": 3,
    "difficulty": "easy",
    "num": 17,
    "question": "18 + 10 = ?",
    "correctAnswer": "28",
    "choices": [
      "28",
      "33",
      "23",
      "38"
    ]
  },
  {
    "id": "g3:easy:18",
    "grade": 3,
    "difficulty": "easy",
    "num": 18,
    "question": "47 + 10 = ?",
    "correctAnswer": "57",
    "choices": [
      "57",
      "62",
      "52",
      "67"
    ]
  },
  {
    "id": "g3:easy:19",
    "grade": 3,
    "difficulty": "easy",
    "num": 19,
    "question": "22 + 53 = ?",
    "correctAnswer": "75",
    "choices": [
      "75",
      "80",
      "70",
      "85"
    ]
  },
  {
    "id": "g3:easy:20",
    "grade": 3,
    "difficulty": "easy",
    "num": 20,
    "question": "78 - 51 = ?",
    "correctAnswer": "27",
    "choices": [
      "27",
      "32",
      "22",
      "37"
    ]
  },
  {
    "id": "g3:easy:21",
    "grade": 3,
    "difficulty": "easy",
    "num": 21,
    "question": "57 + 27 = ?",
    "correctAnswer": "84",
    "choices": [
      "84",
      "89",
      "79",
      "94"
    ]
  },
  {
    "id": "g3:easy:22",
    "grade": 3,
    "difficulty": "easy",
    "num": 22,
    "question": "44 + 49 = ?",
    "correctAnswer": "93",
    "choices": [
      "93",
      "98",
      "88",
      "103"
    ]
  },
  {
    "id": "g3:easy:23",
    "grade": 3,
    "difficulty": "easy",
    "num": 23,
    "question": "87 + 7 = ?",
    "correctAnswer": "94",
    "choices": [
      "94",
      "99",
      "89",
      "104"
    ]
  },
  {
    "id": "g3:easy:24",
    "grade": 3,
    "difficulty": "easy",
    "num": 24,
    "question": "30 + 64 = ?",
    "correctAnswer": "94",
    "choices": [
      "94",
      "99",
      "89",
      "104"
    ]
  },
  {
    "id": "g3:easy:25",
    "grade": 3,
    "difficulty": "easy",
    "num": 25,
    "question": "54 - 45 = ?",
    "correctAnswer": "9",
    "choices": [
      "9",
      "11",
      "7",
      "13"
    ]
  },
  {
    "id": "g3:easy:26",
    "grade": 3,
    "difficulty": "easy",
    "num": 26,
    "question": "51 + 8 = ?",
    "correctAnswer": "59",
    "choices": [
      "59",
      "64",
      "54",
      "69"
    ]
  },
  {
    "id": "g3:easy:27",
    "grade": 3,
    "difficulty": "easy",
    "num": 27,
    "question": "14 + 45 = ?",
    "correctAnswer": "59",
    "choices": [
      "59",
      "64",
      "54",
      "69"
    ]
  },
  {
    "id": "g3:easy:28",
    "grade": 3,
    "difficulty": "easy",
    "num": 28,
    "question": "54 - 9 = ?",
    "correctAnswer": "45",
    "choices": [
      "45",
      "50",
      "40",
      "55"
    ]
  },
  {
    "id": "g3:easy:29",
    "grade": 3,
    "difficulty": "easy",
    "num": 29,
    "question": "82 + 16 = ?",
    "correctAnswer": "98",
    "choices": [
      "98",
      "103",
      "93",
      "108"
    ]
  },
  {
    "id": "g3:easy:30",
    "grade": 3,
    "difficulty": "easy",
    "num": 30,
    "question": "47 - 46 = ?",
    "correctAnswer": "1",
    "choices": [
      "1",
      "3",
      "5",
      "2"
    ]
  },
  {
    "id": "g3:normal:31",
    "grade": 3,
    "difficulty": "normal",
    "num": 31,
    "question": "250 + 161 = ?",
    "correctAnswer": "411",
    "choices": [
      "411",
      "421",
      "401",
      "431"
    ]
  },
  {
    "id": "g3:normal:32",
    "grade": 3,
    "difficulty": "normal",
    "num": 32,
    "question": "124 + 106 = ?",
    "correctAnswer": "230",
    "choices": [
      "230",
      "240",
      "220",
      "250"
    ]
  },
  {
    "id": "g3:normal:33",
    "grade": 3,
    "difficulty": "normal",
    "num": 33,
    "question": "178 + 241 = ?",
    "correctAnswer": "419",
    "choices": [
      "419",
      "429",
      "409",
      "439"
    ]
  },
  {
    "id": "g3:normal:34",
    "grade": 3,
    "difficulty": "normal",
    "num": 34,
    "question": "285 + 128 = ?",
    "correctAnswer": "413",
    "choices": [
      "413",
      "423",
      "403",
      "433"
    ]
  },
  {
    "id": "g3:normal:35",
    "grade": 3,
    "difficulty": "normal",
    "num": 35,
    "question": "ร้านค้าขายสมุดได้ 142 เล่ม และขายปากกาได้ 117 ด้าม รวมขายได้ทั้งหมดกี่ชิ้น ?",
    "correctAnswer": "259",
    "choices": [
      "259",
      "269",
      "249",
      "279"
    ]
  },
  {
    "id": "g3:normal:36",
    "grade": 3,
    "difficulty": "normal",
    "num": 36,
    "question": "420 - 148 = ?",
    "correctAnswer": "272",
    "choices": [
      "272",
      "282",
      "262",
      "292"
    ]
  },
  {
    "id": "g3:normal:37",
    "grade": 3,
    "difficulty": "normal",
    "num": 37,
    "question": "478 - 194 = ?",
    "correctAnswer": "284",
    "choices": [
      "284",
      "294",
      "274",
      "304"
    ]
  },
  {
    "id": "g3:normal:38",
    "grade": 3,
    "difficulty": "normal",
    "num": 38,
    "question": "335 - 132 = ?",
    "correctAnswer": "203",
    "choices": [
      "203",
      "213",
      "193",
      "223"
    ]
  },
  {
    "id": "g3:normal:39",
    "grade": 3,
    "difficulty": "normal",
    "num": 39,
    "question": "นักเรียนมีดินสอ 424 แท่ง ให้เพื่อนไป 284 แท่ง เหลือดินสอกี่แท่ง ?",
    "correctAnswer": "140",
    "choices": [
      "140",
      "150",
      "130",
      "160"
    ]
  },
  {
    "id": "g3:normal:40",
    "grade": 3,
    "difficulty": "normal",
    "num": 40,
    "question": "297 + 147 = ?",
    "correctAnswer": "444",
    "choices": [
      "444",
      "454",
      "434",
      "464"
    ]
  },
  {
    "id": "g3:normal:41",
    "grade": 3,
    "difficulty": "normal",
    "num": 41,
    "question": "332 + 50 = ?",
    "correctAnswer": "382",
    "choices": [
      "382",
      "392",
      "372",
      "402"
    ]
  },
  {
    "id": "g3:normal:42",
    "grade": 3,
    "difficulty": "normal",
    "num": 42,
    "question": "360 + 113 = ?",
    "correctAnswer": "473",
    "choices": [
      "473",
      "483",
      "463",
      "493"
    ]
  },
  {
    "id": "g3:normal:43",
    "grade": 3,
    "difficulty": "normal",
    "num": 43,
    "question": "143 + 298 = ?",
    "correctAnswer": "441",
    "choices": [
      "441",
      "451",
      "431",
      "461"
    ]
  },
  {
    "id": "g3:normal:44",
    "grade": 3,
    "difficulty": "normal",
    "num": 44,
    "question": "252 + 213 = ?",
    "correctAnswer": "465",
    "choices": [
      "465",
      "475",
      "455",
      "485"
    ]
  },
  {
    "id": "g3:normal:45",
    "grade": 3,
    "difficulty": "normal",
    "num": 45,
    "question": "ฟาร์มไก่มีไข่ไก่ 202 ฟอง เก็บเพิ่มอีก 145 ฟอง มีไข่ไก่ทั้งหมดกี่ฟอง ?",
    "correctAnswer": "347",
    "choices": [
      "347",
      "357",
      "337",
      "367"
    ]
  },
  {
    "id": "g3:normal:46",
    "grade": 3,
    "difficulty": "normal",
    "num": 46,
    "question": "223 - 87 = ?",
    "correctAnswer": "136",
    "choices": [
      "136",
      "146",
      "126",
      "156"
    ]
  },
  {
    "id": "g3:normal:47",
    "grade": 3,
    "difficulty": "normal",
    "num": 47,
    "question": "โรงเรียนมีนักเรียนชาย 235 คน นักเรียนหญิง 158 คน โรงเรียนนี้มีนักเรียนทั้งหมดกี่คน ?",
    "correctAnswer": "393",
    "choices": [
      "393",
      "403",
      "383",
      "413"
    ]
  },
  {
    "id": "g3:normal:48",
    "grade": 3,
    "difficulty": "normal",
    "num": 48,
    "question": "343 + 120 = ?",
    "correctAnswer": "463",
    "choices": [
      "463",
      "473",
      "453",
      "483"
    ]
  },
  {
    "id": "g3:normal:49",
    "grade": 3,
    "difficulty": "normal",
    "num": 49,
    "question": "129 + 173 = ?",
    "correctAnswer": "302",
    "choices": [
      "302",
      "312",
      "292",
      "322"
    ]
  },
  {
    "id": "g3:normal:50",
    "grade": 3,
    "difficulty": "normal",
    "num": 50,
    "question": "372 + 66 = ?",
    "correctAnswer": "438",
    "choices": [
      "438",
      "448",
      "428",
      "458"
    ]
  },
  {
    "id": "g3:normal:51",
    "grade": 3,
    "difficulty": "normal",
    "num": 51,
    "question": "แม่ค้ามีส้ม 308 ผล ขายไป 296 ผล เหลือส้มกี่ผล ?",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g3:normal:52",
    "grade": 3,
    "difficulty": "normal",
    "num": 52,
    "question": "376 + 50 = ?",
    "correctAnswer": "426",
    "choices": [
      "426",
      "436",
      "416",
      "446"
    ]
  },
  {
    "id": "g3:normal:53",
    "grade": 3,
    "difficulty": "normal",
    "num": 53,
    "question": "400 - 29 = ?",
    "correctAnswer": "371",
    "choices": [
      "371",
      "381",
      "361",
      "391"
    ]
  },
  {
    "id": "g3:normal:54",
    "grade": 3,
    "difficulty": "normal",
    "num": 54,
    "question": "352 - 349 = ?",
    "correctAnswer": "3",
    "choices": [
      "3",
      "5",
      "1",
      "7"
    ]
  },
  {
    "id": "g3:normal:55",
    "grade": 3,
    "difficulty": "normal",
    "num": 55,
    "question": "158 + 324 = ?",
    "correctAnswer": "482",
    "choices": [
      "482",
      "492",
      "472",
      "502"
    ]
  },
  {
    "id": "g3:normal:56",
    "grade": 3,
    "difficulty": "normal",
    "num": 56,
    "question": "226 + 240 = ?",
    "correctAnswer": "466",
    "choices": [
      "466",
      "476",
      "456",
      "486"
    ]
  },
  {
    "id": "g3:normal:57",
    "grade": 3,
    "difficulty": "normal",
    "num": 57,
    "question": "ห้องสมุดมีหนังสือ 302 เล่ม นักเรียนยืมไป 179 เล่ม เหลือหนังสือกี่เล่ม ?",
    "correctAnswer": "123",
    "choices": [
      "123",
      "133",
      "113",
      "143"
    ]
  },
  {
    "id": "g3:normal:58",
    "grade": 3,
    "difficulty": "normal",
    "num": 58,
    "question": "181 + 266 = ?",
    "correctAnswer": "447",
    "choices": [
      "447",
      "457",
      "437",
      "467"
    ]
  },
  {
    "id": "g3:normal:59",
    "grade": 3,
    "difficulty": "normal",
    "num": 59,
    "question": "449 - 239 = ?",
    "correctAnswer": "210",
    "choices": [
      "210",
      "220",
      "200",
      "230"
    ]
  },
  {
    "id": "g3:normal:60",
    "grade": 3,
    "difficulty": "normal",
    "num": 60,
    "question": "406 - 111 = ?",
    "correctAnswer": "295",
    "choices": [
      "295",
      "305",
      "285",
      "315"
    ]
  },
  {
    "id": "g3:hard:61",
    "grade": 3,
    "difficulty": "hard",
    "num": 61,
    "question": "ร้านหนังสือมีหนังสือทั้งหมด 884 เล่ม ขายไปในสัปดาห์แรก 777 เล่ม เหลือหนังสือกี่เล่ม ?",
    "correctAnswer": "107",
    "choices": [
      "107",
      "117",
      "97",
      "127"
    ]
  },
  {
    "id": "g3:hard:62",
    "grade": 3,
    "difficulty": "hard",
    "num": 62,
    "question": "442 + 336 = ?",
    "correctAnswer": "778",
    "choices": [
      "778",
      "828",
      "728",
      "878"
    ]
  },
  {
    "id": "g3:hard:63",
    "grade": 3,
    "difficulty": "hard",
    "num": 63,
    "question": "398 + 197 = ?",
    "correctAnswer": "595",
    "choices": [
      "595",
      "645",
      "545",
      "695"
    ]
  },
  {
    "id": "g3:hard:64",
    "grade": 3,
    "difficulty": "hard",
    "num": 64,
    "question": "สวนผลไม้เก็บมะม่วงได้ 331 ผล เก็บฝรั่งได้ 291 ผล เก็บผลไม้รวมกันได้กี่ผล ?",
    "correctAnswer": "622",
    "choices": [
      "622",
      "672",
      "572",
      "722"
    ]
  },
  {
    "id": "g3:hard:65",
    "grade": 3,
    "difficulty": "hard",
    "num": 65,
    "question": "962 - 110 = ?",
    "correctAnswer": "852",
    "choices": [
      "852",
      "902",
      "802",
      "952"
    ]
  },
  {
    "id": "g3:hard:66",
    "grade": 3,
    "difficulty": "hard",
    "num": 66,
    "question": "942 - 796 = ?",
    "correctAnswer": "146",
    "choices": [
      "146",
      "156",
      "136",
      "166"
    ]
  },
  {
    "id": "g3:hard:67",
    "grade": 3,
    "difficulty": "hard",
    "num": 67,
    "question": "โรงงานผลิตขนมได้ 446 ชิ้น ในตอนเช้า และผลิตเพิ่มอีก 208 ชิ้น ในตอนบ่าย รวมผลิตขนมได้ทั้งหมดกี่ชิ้น ?",
    "correctAnswer": "654",
    "choices": [
      "654",
      "704",
      "604",
      "754"
    ]
  },
  {
    "id": "g3:hard:68",
    "grade": 3,
    "difficulty": "hard",
    "num": 68,
    "question": "506 + 472 = ?",
    "correctAnswer": "978",
    "choices": [
      "978",
      "1028",
      "928",
      "1078"
    ]
  },
  {
    "id": "g3:hard:69",
    "grade": 3,
    "difficulty": "hard",
    "num": 69,
    "question": "หมู่บ้านแห่งหนึ่งมีต้นไม้ 667 ต้น ปลูกเพิ่มอีก 224 ต้น มีต้นไม้ทั้งหมดกี่ต้น ?",
    "correctAnswer": "891",
    "choices": [
      "891",
      "941",
      "841",
      "991"
    ]
  },
  {
    "id": "g3:hard:70",
    "grade": 3,
    "difficulty": "hard",
    "num": 70,
    "question": "701 + 221 = ?",
    "correctAnswer": "922",
    "choices": [
      "922",
      "972",
      "872",
      "1022"
    ]
  },
  {
    "id": "g3:hard:71",
    "grade": 3,
    "difficulty": "hard",
    "num": 71,
    "question": "747 + 119 = ?",
    "correctAnswer": "866",
    "choices": [
      "866",
      "916",
      "816",
      "966"
    ]
  },
  {
    "id": "g3:hard:72",
    "grade": 3,
    "difficulty": "hard",
    "num": 72,
    "question": "325 + 653 = ?",
    "correctAnswer": "978",
    "choices": [
      "978",
      "1028",
      "928",
      "1078"
    ]
  },
  {
    "id": "g3:hard:73",
    "grade": 3,
    "difficulty": "hard",
    "num": 73,
    "question": "โรงเรียนมีนักเรียนทั้งหมด 976 คน ย้ายออกไปโรงเรียนอื่น 655 คน เหลือนักเรียนกี่คน ?",
    "correctAnswer": "321",
    "choices": [
      "321",
      "331",
      "311",
      "341"
    ]
  },
  {
    "id": "g3:hard:74",
    "grade": 3,
    "difficulty": "hard",
    "num": 74,
    "question": "571 - 482 = ?",
    "correctAnswer": "89",
    "choices": [
      "89",
      "94",
      "84",
      "99"
    ]
  },
  {
    "id": "g3:hard:75",
    "grade": 3,
    "difficulty": "hard",
    "num": 75,
    "question": "796 + 111 = ?",
    "correctAnswer": "907",
    "choices": [
      "907",
      "957",
      "857",
      "1007"
    ]
  },
  {
    "id": "g3:hard:76",
    "grade": 3,
    "difficulty": "hard",
    "num": 76,
    "question": "716 - 470 = ?",
    "correctAnswer": "246",
    "choices": [
      "246",
      "256",
      "236",
      "266"
    ]
  },
  {
    "id": "g3:hard:77",
    "grade": 3,
    "difficulty": "hard",
    "num": 77,
    "question": "913 - 613 = ?",
    "correctAnswer": "300",
    "choices": [
      "300",
      "310",
      "290",
      "320"
    ]
  },
  {
    "id": "g3:hard:78",
    "grade": 3,
    "difficulty": "hard",
    "num": 78,
    "question": "909 - 161 = ?",
    "correctAnswer": "748",
    "choices": [
      "748",
      "798",
      "698",
      "848"
    ]
  },
  {
    "id": "g3:hard:79",
    "grade": 3,
    "difficulty": "hard",
    "num": 79,
    "question": "635 - 515 = ?",
    "correctAnswer": "120",
    "choices": [
      "120",
      "130",
      "110",
      "140"
    ]
  },
  {
    "id": "g3:hard:80",
    "grade": 3,
    "difficulty": "hard",
    "num": 80,
    "question": "สนามกีฬามีผู้ชม 956 คน เมื่อจบการแข่งขันมีผู้ชมเดินออกไป 848 คน เหลือผู้ชมในสนามกี่คน ?",
    "correctAnswer": "108",
    "choices": [
      "108",
      "118",
      "98",
      "128"
    ]
  },
  {
    "id": "g3:hard:81",
    "grade": 3,
    "difficulty": "hard",
    "num": 81,
    "question": "โกดังมีกล่องสินค้า 679 กล่อง ส่งออกไป 294 กล่อง เหลือกล่องสินค้ากี่กล่อง ?",
    "correctAnswer": "385",
    "choices": [
      "385",
      "395",
      "375",
      "405"
    ]
  },
  {
    "id": "g3:hard:82",
    "grade": 3,
    "difficulty": "hard",
    "num": 82,
    "question": "637 + 320 = ?",
    "correctAnswer": "957",
    "choices": [
      "957",
      "1007",
      "907",
      "1057"
    ]
  },
  {
    "id": "g3:hard:83",
    "grade": 3,
    "difficulty": "hard",
    "num": 83,
    "question": "งานแสดงสินค้ามีผู้เข้าชมวันแรก 451 คน วันที่สอง 155 คน รวมมีผู้เข้าชมทั้งสองวันกี่คน ?",
    "correctAnswer": "606",
    "choices": [
      "606",
      "656",
      "556",
      "706"
    ]
  },
  {
    "id": "g3:hard:84",
    "grade": 3,
    "difficulty": "hard",
    "num": 84,
    "question": "คลังสินค้ามีข้าวสาร 760 กระสอบ จำหน่ายไป 158 กระสอบ เหลือข้าวสารกี่กระสอบ ?",
    "correctAnswer": "602",
    "choices": [
      "602",
      "652",
      "552",
      "702"
    ]
  },
  {
    "id": "g3:hard:85",
    "grade": 3,
    "difficulty": "hard",
    "num": 85,
    "question": "644 + 150 = ?",
    "correctAnswer": "794",
    "choices": [
      "794",
      "844",
      "744",
      "894"
    ]
  },
  {
    "id": "g3:hard:86",
    "grade": 3,
    "difficulty": "hard",
    "num": 86,
    "question": "นายมีเงินเก็บ 329 บาท ได้รับเงินเพิ่มอีก 248 บาท มีเงินเก็บทั้งหมดกี่บาท ?",
    "correctAnswer": "577",
    "choices": [
      "577",
      "627",
      "527",
      "677"
    ]
  },
  {
    "id": "g3:hard:87",
    "grade": 3,
    "difficulty": "hard",
    "num": 87,
    "question": "746 - 268 = ?",
    "correctAnswer": "478",
    "choices": [
      "478",
      "488",
      "468",
      "498"
    ]
  },
  {
    "id": "g3:hard:88",
    "grade": 3,
    "difficulty": "hard",
    "num": 88,
    "question": "385 + 516 = ?",
    "correctAnswer": "901",
    "choices": [
      "901",
      "951",
      "851",
      "1001"
    ]
  },
  {
    "id": "g3:hard:89",
    "grade": 3,
    "difficulty": "hard",
    "num": 89,
    "question": "494 + 101 = ?",
    "correctAnswer": "595",
    "choices": [
      "595",
      "645",
      "545",
      "695"
    ]
  },
  {
    "id": "g3:hard:90",
    "grade": 3,
    "difficulty": "hard",
    "num": 90,
    "question": "597 - 146 = ?",
    "correctAnswer": "451",
    "choices": [
      "451",
      "461",
      "441",
      "471"
    ]
  },
  {
    "id": "g4:easy:1",
    "grade": 4,
    "difficulty": "easy",
    "num": 1,
    "question": "30 ÷ 5 = ?",
    "correctAnswer": "6",
    "choices": [
      "6",
      "8",
      "4",
      "10"
    ]
  },
  {
    "id": "g4:easy:2",
    "grade": 4,
    "difficulty": "easy",
    "num": 2,
    "question": "48 ÷ 4 = ?",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g4:easy:3",
    "grade": 4,
    "difficulty": "easy",
    "num": 3,
    "question": "63 ÷ 9 = ?",
    "correctAnswer": "7",
    "choices": [
      "7",
      "9",
      "5",
      "11"
    ]
  },
  {
    "id": "g4:easy:4",
    "grade": 4,
    "difficulty": "easy",
    "num": 4,
    "question": "2 x 9 = ?",
    "correctAnswer": "18",
    "choices": [
      "18",
      "20",
      "16",
      "22"
    ]
  },
  {
    "id": "g4:easy:5",
    "grade": 4,
    "difficulty": "easy",
    "num": 5,
    "question": "3 x 10 = ?",
    "correctAnswer": "30",
    "choices": [
      "30",
      "35",
      "25",
      "40"
    ]
  },
  {
    "id": "g4:easy:6",
    "grade": 4,
    "difficulty": "easy",
    "num": 6,
    "question": "10 x 6 = ?",
    "correctAnswer": "60",
    "choices": [
      "60",
      "65",
      "55",
      "70"
    ]
  },
  {
    "id": "g4:easy:7",
    "grade": 4,
    "difficulty": "easy",
    "num": 7,
    "question": "7 x 3 = ?",
    "correctAnswer": "21",
    "choices": [
      "21",
      "26",
      "16",
      "31"
    ]
  },
  {
    "id": "g4:easy:8",
    "grade": 4,
    "difficulty": "easy",
    "num": 8,
    "question": "7 x 6 = ?",
    "correctAnswer": "42",
    "choices": [
      "42",
      "47",
      "37",
      "52"
    ]
  },
  {
    "id": "g4:easy:9",
    "grade": 4,
    "difficulty": "easy",
    "num": 9,
    "question": "9 x 10 = ?",
    "correctAnswer": "90",
    "choices": [
      "90",
      "95",
      "85",
      "100"
    ]
  },
  {
    "id": "g4:easy:10",
    "grade": 4,
    "difficulty": "easy",
    "num": 10,
    "question": "132 ÷ 11 = ?",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g4:easy:11",
    "grade": 4,
    "difficulty": "easy",
    "num": 11,
    "question": "12 x 10 = ?",
    "correctAnswer": "120",
    "choices": [
      "120",
      "130",
      "110",
      "140"
    ]
  },
  {
    "id": "g4:easy:12",
    "grade": 4,
    "difficulty": "easy",
    "num": 12,
    "question": "36 ÷ 12 = ?",
    "correctAnswer": "3",
    "choices": [
      "3",
      "5",
      "1",
      "7"
    ]
  },
  {
    "id": "g4:easy:13",
    "grade": 4,
    "difficulty": "easy",
    "num": 13,
    "question": "6 x 3 = ?",
    "correctAnswer": "18",
    "choices": [
      "18",
      "20",
      "16",
      "22"
    ]
  },
  {
    "id": "g4:easy:14",
    "grade": 4,
    "difficulty": "easy",
    "num": 14,
    "question": "10 x 4 = ?",
    "correctAnswer": "40",
    "choices": [
      "40",
      "45",
      "35",
      "50"
    ]
  },
  {
    "id": "g4:easy:15",
    "grade": 4,
    "difficulty": "easy",
    "num": 15,
    "question": "66 ÷ 6 = ?",
    "correctAnswer": "11",
    "choices": [
      "11",
      "13",
      "9",
      "15"
    ]
  },
  {
    "id": "g4:easy:16",
    "grade": 4,
    "difficulty": "easy",
    "num": 16,
    "question": "7 x 5 = ?",
    "correctAnswer": "35",
    "choices": [
      "35",
      "40",
      "30",
      "45"
    ]
  },
  {
    "id": "g4:easy:17",
    "grade": 4,
    "difficulty": "easy",
    "num": 17,
    "question": "90 ÷ 10 = ?",
    "correctAnswer": "9",
    "choices": [
      "9",
      "11",
      "7",
      "13"
    ]
  },
  {
    "id": "g4:easy:18",
    "grade": 4,
    "difficulty": "easy",
    "num": 18,
    "question": "6 ÷ 2 = ?",
    "correctAnswer": "3",
    "choices": [
      "3",
      "5",
      "1",
      "7"
    ]
  },
  {
    "id": "g4:easy:19",
    "grade": 4,
    "difficulty": "easy",
    "num": 19,
    "question": "12 ÷ 6 = ?",
    "correctAnswer": "2",
    "choices": [
      "2",
      "4",
      "0",
      "6"
    ]
  },
  {
    "id": "g4:easy:20",
    "grade": 4,
    "difficulty": "easy",
    "num": 20,
    "question": "7 x 4 = ?",
    "correctAnswer": "28",
    "choices": [
      "28",
      "33",
      "23",
      "38"
    ]
  },
  {
    "id": "g4:easy:21",
    "grade": 4,
    "difficulty": "easy",
    "num": 21,
    "question": "36 ÷ 4 = ?",
    "correctAnswer": "9",
    "choices": [
      "9",
      "11",
      "7",
      "13"
    ]
  },
  {
    "id": "g4:easy:22",
    "grade": 4,
    "difficulty": "easy",
    "num": 22,
    "question": "20 ÷ 10 = ?",
    "correctAnswer": "2",
    "choices": [
      "2",
      "4",
      "0",
      "6"
    ]
  },
  {
    "id": "g4:easy:23",
    "grade": 4,
    "difficulty": "easy",
    "num": 23,
    "question": "3 x 4 = ?",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g4:easy:24",
    "grade": 4,
    "difficulty": "easy",
    "num": 24,
    "question": "7 x 11 = ?",
    "correctAnswer": "77",
    "choices": [
      "77",
      "82",
      "72",
      "87"
    ]
  },
  {
    "id": "g4:easy:25",
    "grade": 4,
    "difficulty": "easy",
    "num": 25,
    "question": "8 x 4 = ?",
    "correctAnswer": "32",
    "choices": [
      "32",
      "37",
      "27",
      "42"
    ]
  },
  {
    "id": "g4:easy:26",
    "grade": 4,
    "difficulty": "easy",
    "num": 26,
    "question": "6 x 7 = ?",
    "correctAnswer": "42",
    "choices": [
      "42",
      "47",
      "37",
      "52"
    ]
  },
  {
    "id": "g4:easy:27",
    "grade": 4,
    "difficulty": "easy",
    "num": 27,
    "question": "12 x 3 = ?",
    "correctAnswer": "36",
    "choices": [
      "36",
      "41",
      "31",
      "46"
    ]
  },
  {
    "id": "g4:easy:28",
    "grade": 4,
    "difficulty": "easy",
    "num": 28,
    "question": "80 ÷ 10 = ?",
    "correctAnswer": "8",
    "choices": [
      "8",
      "10",
      "6",
      "12"
    ]
  },
  {
    "id": "g4:easy:29",
    "grade": 4,
    "difficulty": "easy",
    "num": 29,
    "question": "5 x 4 = ?",
    "correctAnswer": "20",
    "choices": [
      "20",
      "22",
      "18",
      "24"
    ]
  },
  {
    "id": "g4:easy:30",
    "grade": 4,
    "difficulty": "easy",
    "num": 30,
    "question": "8 x 2 = ?",
    "correctAnswer": "16",
    "choices": [
      "16",
      "18",
      "14",
      "20"
    ]
  },
  {
    "id": "g4:normal:31",
    "grade": 4,
    "difficulty": "normal",
    "num": 31,
    "question": "มีลูกอม 39 เม็ด แจกให้เด็ก 3 คน เท่า ๆ กัน เด็กแต่ละคนจะได้ลูกอมกี่เม็ด ?",
    "correctAnswer": "13",
    "choices": [
      "13",
      "15",
      "11",
      "17"
    ]
  },
  {
    "id": "g4:normal:32",
    "grade": 4,
    "difficulty": "normal",
    "num": 32,
    "question": "767 + 165 = ?",
    "correctAnswer": "932",
    "choices": [
      "932",
      "982",
      "882",
      "1032"
    ]
  },
  {
    "id": "g4:normal:33",
    "grade": 4,
    "difficulty": "normal",
    "num": 33,
    "question": "126 ÷ 6 = ?",
    "correctAnswer": "21",
    "choices": [
      "21",
      "26",
      "16",
      "31"
    ]
  },
  {
    "id": "g4:normal:34",
    "grade": 4,
    "difficulty": "normal",
    "num": 34,
    "question": "แม่ค้าแบ่งขนม 65 ชิ้น ใส่ถุงถุงละ 5 ชิ้น จะแบ่งได้กี่ถุง ?",
    "correctAnswer": "13",
    "choices": [
      "13",
      "15",
      "11",
      "17"
    ]
  },
  {
    "id": "g4:normal:35",
    "grade": 4,
    "difficulty": "normal",
    "num": 35,
    "question": "559 + 428 = ?",
    "correctAnswer": "987",
    "choices": [
      "987",
      "1037",
      "937",
      "1087"
    ]
  },
  {
    "id": "g4:normal:36",
    "grade": 4,
    "difficulty": "normal",
    "num": 36,
    "question": "676 - 421 = ?",
    "correctAnswer": "255",
    "choices": [
      "255",
      "265",
      "245",
      "275"
    ]
  },
  {
    "id": "g4:normal:37",
    "grade": 4,
    "difficulty": "normal",
    "num": 37,
    "question": "424 ÷ 8 = ?",
    "correctAnswer": "53",
    "choices": [
      "53",
      "58",
      "48",
      "63"
    ]
  },
  {
    "id": "g4:normal:38",
    "grade": 4,
    "difficulty": "normal",
    "num": 38,
    "question": "382 + 397 = ?",
    "correctAnswer": "779",
    "choices": [
      "779",
      "829",
      "729",
      "879"
    ]
  },
  {
    "id": "g4:normal:39",
    "grade": 4,
    "difficulty": "normal",
    "num": 39,
    "question": "32 x 7 = ?",
    "correctAnswer": "224",
    "choices": [
      "224",
      "234",
      "214",
      "244"
    ]
  },
  {
    "id": "g4:normal:40",
    "grade": 4,
    "difficulty": "normal",
    "num": 40,
    "question": "259 ÷ 7 = ?",
    "correctAnswer": "37",
    "choices": [
      "37",
      "42",
      "32",
      "47"
    ]
  },
  {
    "id": "g4:normal:41",
    "grade": 4,
    "difficulty": "normal",
    "num": 41,
    "question": "266 ÷ 7 = ?",
    "correctAnswer": "38",
    "choices": [
      "38",
      "43",
      "33",
      "48"
    ]
  },
  {
    "id": "g4:normal:42",
    "grade": 4,
    "difficulty": "normal",
    "num": 42,
    "question": "239 + 155 = ?",
    "correctAnswer": "394",
    "choices": [
      "394",
      "404",
      "384",
      "414"
    ]
  },
  {
    "id": "g4:normal:43",
    "grade": 4,
    "difficulty": "normal",
    "num": 43,
    "question": "613 - 304 = ?",
    "correctAnswer": "309",
    "choices": [
      "309",
      "319",
      "299",
      "329"
    ]
  },
  {
    "id": "g4:normal:44",
    "grade": 4,
    "difficulty": "normal",
    "num": 44,
    "question": "679 - 412 = ?",
    "correctAnswer": "267",
    "choices": [
      "267",
      "277",
      "257",
      "287"
    ]
  },
  {
    "id": "g4:normal:45",
    "grade": 4,
    "difficulty": "normal",
    "num": 45,
    "question": "500 - 366 = ?",
    "correctAnswer": "134",
    "choices": [
      "134",
      "144",
      "124",
      "154"
    ]
  },
  {
    "id": "g4:normal:46",
    "grade": 4,
    "difficulty": "normal",
    "num": 46,
    "question": "271 + 495 = ?",
    "correctAnswer": "766",
    "choices": [
      "766",
      "816",
      "716",
      "866"
    ]
  },
  {
    "id": "g4:normal:47",
    "grade": 4,
    "difficulty": "normal",
    "num": 47,
    "question": "30 x 6 = ?",
    "correctAnswer": "180",
    "choices": [
      "180",
      "190",
      "170",
      "200"
    ]
  },
  {
    "id": "g4:normal:48",
    "grade": 4,
    "difficulty": "normal",
    "num": 48,
    "question": "228 + 159 = ?",
    "correctAnswer": "387",
    "choices": [
      "387",
      "397",
      "377",
      "407"
    ]
  },
  {
    "id": "g4:normal:49",
    "grade": 4,
    "difficulty": "normal",
    "num": 49,
    "question": "รถบัสคันหนึ่งบรรทุกผู้โดยสารได้ 16 คน มีรถบัสทั้งหมด 13 คัน จะบรรทุกผู้โดยสารได้กี่คน ?",
    "correctAnswer": "208",
    "choices": [
      "208",
      "218",
      "198",
      "228"
    ]
  },
  {
    "id": "g4:normal:50",
    "grade": 4,
    "difficulty": "normal",
    "num": 50,
    "question": "847 - 649 = ?",
    "correctAnswer": "198",
    "choices": [
      "198",
      "208",
      "188",
      "218"
    ]
  },
  {
    "id": "g4:normal:51",
    "grade": 4,
    "difficulty": "normal",
    "num": 51,
    "question": "35 x 2 = ?",
    "correctAnswer": "70",
    "choices": [
      "70",
      "75",
      "65",
      "80"
    ]
  },
  {
    "id": "g4:normal:52",
    "grade": 4,
    "difficulty": "normal",
    "num": 52,
    "question": "โรงเรียนซื้อดินสอ 16 กล่อง กล่องละ 11 แท่ง ซื้อดินสอทั้งหมดกี่แท่ง ?",
    "correctAnswer": "176",
    "choices": [
      "176",
      "186",
      "166",
      "196"
    ]
  },
  {
    "id": "g4:normal:53",
    "grade": 4,
    "difficulty": "normal",
    "num": 53,
    "question": "60 ÷ 5 = ?",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g4:normal:54",
    "grade": 4,
    "difficulty": "normal",
    "num": 54,
    "question": "35 x 5 = ?",
    "correctAnswer": "175",
    "choices": [
      "175",
      "185",
      "165",
      "195"
    ]
  },
  {
    "id": "g4:normal:55",
    "grade": 4,
    "difficulty": "normal",
    "num": 55,
    "question": "245 + 462 = ?",
    "correctAnswer": "707",
    "choices": [
      "707",
      "757",
      "657",
      "807"
    ]
  },
  {
    "id": "g4:normal:56",
    "grade": 4,
    "difficulty": "normal",
    "num": 56,
    "question": "256 ÷ 8 = ?",
    "correctAnswer": "32",
    "choices": [
      "32",
      "37",
      "27",
      "42"
    ]
  },
  {
    "id": "g4:normal:57",
    "grade": 4,
    "difficulty": "normal",
    "num": 57,
    "question": "667 - 512 = ?",
    "correctAnswer": "155",
    "choices": [
      "155",
      "165",
      "145",
      "175"
    ]
  },
  {
    "id": "g4:normal:58",
    "grade": 4,
    "difficulty": "normal",
    "num": 58,
    "question": "ครูจัดเก้าอี้เป็นแถว แถวละ 6 ตัว จำนวน 13 แถว มีเก้าอี้ทั้งหมดกี่ตัว ?",
    "correctAnswer": "78",
    "choices": [
      "78",
      "83",
      "73",
      "88"
    ]
  },
  {
    "id": "g4:normal:59",
    "grade": 4,
    "difficulty": "normal",
    "num": 59,
    "question": "โรงงานบรรจุน้ำผลไม้ 126 ขวด ใส่ลัง ลังละ 9 ขวด บรรจุได้กี่ลัง ?",
    "correctAnswer": "14",
    "choices": [
      "14",
      "16",
      "12",
      "18"
    ]
  },
  {
    "id": "g4:normal:60",
    "grade": 4,
    "difficulty": "normal",
    "num": 60,
    "question": "810 - 623 = ?",
    "correctAnswer": "187",
    "choices": [
      "187",
      "197",
      "177",
      "207"
    ]
  },
  {
    "id": "g4:hard:61",
    "grade": 4,
    "difficulty": "hard",
    "num": 61,
    "question": "(4 x 11) - 26 = ?",
    "correctAnswer": "18",
    "choices": [
      "18",
      "20",
      "16",
      "22"
    ]
  },
  {
    "id": "g4:hard:62",
    "grade": 4,
    "difficulty": "hard",
    "num": 62,
    "question": "(12 x 19) - 16 = ?",
    "correctAnswer": "212",
    "choices": [
      "212",
      "222",
      "202",
      "232"
    ]
  },
  {
    "id": "g4:hard:63",
    "grade": 4,
    "difficulty": "hard",
    "num": 63,
    "question": "(18 x 19) - 21 = ?",
    "correctAnswer": "321",
    "choices": [
      "321",
      "331",
      "311",
      "341"
    ]
  },
  {
    "id": "g4:hard:64",
    "grade": 4,
    "difficulty": "hard",
    "num": 64,
    "question": "(9 x 14) + 24 = ?",
    "correctAnswer": "150",
    "choices": [
      "150",
      "160",
      "140",
      "170"
    ]
  },
  {
    "id": "g4:hard:65",
    "grade": 4,
    "difficulty": "hard",
    "num": 65,
    "question": "(9 x 10) - 12 = ?",
    "correctAnswer": "78",
    "choices": [
      "78",
      "83",
      "73",
      "88"
    ]
  },
  {
    "id": "g4:hard:66",
    "grade": 4,
    "difficulty": "hard",
    "num": 66,
    "question": "(30 ÷ 5) + 17 = ?",
    "correctAnswer": "23",
    "choices": [
      "23",
      "28",
      "18",
      "33"
    ]
  },
  {
    "id": "g4:hard:67",
    "grade": 4,
    "difficulty": "hard",
    "num": 67,
    "question": "(16 x 6) - 27 = ?",
    "correctAnswer": "69",
    "choices": [
      "69",
      "74",
      "64",
      "79"
    ]
  },
  {
    "id": "g4:hard:68",
    "grade": 4,
    "difficulty": "hard",
    "num": 68,
    "question": "โรงเรียนซื้อสมุด 8 โหล โหลละ 12 เล่ม แจกนักเรียนคนละ 13 เล่ม จะแจกนักเรียนได้กี่คน ?",
    "correctAnswer": "7",
    "choices": [
      "7",
      "9",
      "5",
      "11"
    ]
  },
  {
    "id": "g4:hard:69",
    "grade": 4,
    "difficulty": "hard",
    "num": 69,
    "question": "(14 x 20) + 24 = ?",
    "correctAnswer": "304",
    "choices": [
      "304",
      "314",
      "294",
      "324"
    ]
  },
  {
    "id": "g4:hard:70",
    "grade": 4,
    "difficulty": "hard",
    "num": 70,
    "question": "ร้านค้าซื้อไข่ไก่ 13 แผง แผงละ 30 ฟอง แตกเสียหาย 15 ฟอง เหลือไข่ไก่ที่ขายได้กี่ฟอง ?",
    "correctAnswer": "193",
    "choices": [
      "193",
      "203",
      "183",
      "213"
    ]
  },
  {
    "id": "g4:hard:71",
    "grade": 4,
    "difficulty": "hard",
    "num": 71,
    "question": "(19 x 9) + 29 = ?",
    "correctAnswer": "200",
    "choices": [
      "200",
      "210",
      "190",
      "220"
    ]
  },
  {
    "id": "g4:hard:72",
    "grade": 4,
    "difficulty": "hard",
    "num": 72,
    "question": "รถบรรทุกขนแอปเปิล 9 ลัง ลังละ 11 ผล ขายไปแล้ว 36 ผล เหลือแอปเปิลกี่ผล ?",
    "correctAnswer": "63",
    "choices": [
      "63",
      "68",
      "58",
      "73"
    ]
  },
  {
    "id": "g4:hard:73",
    "grade": 4,
    "difficulty": "hard",
    "num": 73,
    "question": "(16 x 4) - 24 = ?",
    "correctAnswer": "40",
    "choices": [
      "40",
      "45",
      "35",
      "50"
    ]
  },
  {
    "id": "g4:hard:74",
    "grade": 4,
    "difficulty": "hard",
    "num": 74,
    "question": "คนงานปลูกต้นไม้ได้วันละ 4 ต้น ทำงาน 11 วัน จะปลูกต้นไม้ได้ทั้งหมดกี่ต้น ?",
    "correctAnswer": "14",
    "choices": [
      "14",
      "16",
      "12",
      "18"
    ]
  },
  {
    "id": "g4:hard:75",
    "grade": 4,
    "difficulty": "hard",
    "num": 75,
    "question": "(8 x 4) - 15 = ?",
    "correctAnswer": "17",
    "choices": [
      "17",
      "19",
      "15",
      "21"
    ]
  },
  {
    "id": "g4:hard:76",
    "grade": 4,
    "difficulty": "hard",
    "num": 76,
    "question": "(36 ÷ 9) + 15 = ?",
    "correctAnswer": "19",
    "choices": [
      "19",
      "21",
      "17",
      "23"
    ]
  },
  {
    "id": "g4:hard:77",
    "grade": 4,
    "difficulty": "hard",
    "num": 77,
    "question": "นักเรียน 42 คน แบ่งกลุ่ม กลุ่มละ 4 คน เท่า ๆ กัน จะแบ่งได้กี่กลุ่ม และเหลือนักเรียนกี่คน (ตอบจำนวนกลุ่ม)",
    "correctAnswer": "10",
    "choices": [
      "10",
      "12",
      "8",
      "14"
    ]
  },
  {
    "id": "g4:hard:78",
    "grade": 4,
    "difficulty": "hard",
    "num": 78,
    "question": "(15 x 11) - 28 = ?",
    "correctAnswer": "137",
    "choices": [
      "137",
      "147",
      "127",
      "157"
    ]
  },
  {
    "id": "g4:hard:79",
    "grade": 4,
    "difficulty": "hard",
    "num": 79,
    "question": "ห้องสมุดมีหนังสือ 12 ชั้น ชั้นละ 4 เล่ม บริจาคออกไป 10 เล่ม เหลือหนังสือกี่เล่ม ?",
    "correctAnswer": "38",
    "choices": [
      "38",
      "43",
      "33",
      "48"
    ]
  },
  {
    "id": "g4:hard:80",
    "grade": 4,
    "difficulty": "hard",
    "num": 80,
    "question": "(9 x 17) - 22 = ?",
    "correctAnswer": "131",
    "choices": [
      "131",
      "141",
      "121",
      "151"
    ]
  },
  {
    "id": "g4:hard:81",
    "grade": 4,
    "difficulty": "hard",
    "num": 81,
    "question": "ฟาร์มมีไก่ 6 ตัว แต่ละตัวออกไข่ 12 ฟองต่อสัปดาห์ ฟาร์มนี้จะได้ไข่กี่ฟองใน 1 สัปดาห์ ?",
    "correctAnswer": "40",
    "choices": [
      "40",
      "45",
      "35",
      "50"
    ]
  },
  {
    "id": "g4:hard:82",
    "grade": 4,
    "difficulty": "hard",
    "num": 82,
    "question": "(17 x 16) + 10 = ?",
    "correctAnswer": "282",
    "choices": [
      "282",
      "292",
      "272",
      "302"
    ]
  },
  {
    "id": "g4:hard:83",
    "grade": 4,
    "difficulty": "hard",
    "num": 83,
    "question": "(19 x 4) + 6 = ?",
    "correctAnswer": "82",
    "choices": [
      "82",
      "87",
      "77",
      "92"
    ]
  },
  {
    "id": "g4:hard:84",
    "grade": 4,
    "difficulty": "hard",
    "num": 84,
    "question": "(6 x 2) + 30 = ?",
    "correctAnswer": "42",
    "choices": [
      "42",
      "47",
      "37",
      "52"
    ]
  },
  {
    "id": "g4:hard:85",
    "grade": 4,
    "difficulty": "hard",
    "num": 85,
    "question": "(20 x 14) + 17 = ?",
    "correctAnswer": "297",
    "choices": [
      "297",
      "307",
      "287",
      "317"
    ]
  },
  {
    "id": "g4:hard:86",
    "grade": 4,
    "difficulty": "hard",
    "num": 86,
    "question": "โรงงานผลิตเสื้อได้วันละ 8 ตัว เป็นเวลา 10 วัน แล้วส่งขายไป 44 ตัว เหลือเสื้อกี่ตัว ?",
    "correctAnswer": "36",
    "choices": [
      "36",
      "41",
      "31",
      "46"
    ]
  },
  {
    "id": "g4:hard:87",
    "grade": 4,
    "difficulty": "hard",
    "num": 87,
    "question": "(14 x 17) + 14 = ?",
    "correctAnswer": "252",
    "choices": [
      "252",
      "262",
      "242",
      "272"
    ]
  },
  {
    "id": "g4:hard:88",
    "grade": 4,
    "difficulty": "hard",
    "num": 88,
    "question": "(3 x 8) + 28 = ?",
    "correctAnswer": "52",
    "choices": [
      "52",
      "57",
      "47",
      "62"
    ]
  },
  {
    "id": "g4:hard:89",
    "grade": 4,
    "difficulty": "hard",
    "num": 89,
    "question": "(18 ÷ 9) + 7 = ?",
    "correctAnswer": "9",
    "choices": [
      "9",
      "11",
      "7",
      "13"
    ]
  },
  {
    "id": "g4:hard:90",
    "grade": 4,
    "difficulty": "hard",
    "num": 90,
    "question": "(16 x 7) + 31 = ?",
    "correctAnswer": "143",
    "choices": [
      "143",
      "153",
      "133",
      "163"
    ]
  },
  {
    "id": "g5:easy:1",
    "grade": 5,
    "difficulty": "easy",
    "num": 1,
    "question": "2/5 + 2/5 = ?",
    "correctAnswer": "4/5",
    "choices": [
      "4/5",
      "5/5",
      "3/5",
      "6/5"
    ]
  },
  {
    "id": "g5:easy:2",
    "grade": 5,
    "difficulty": "easy",
    "num": 2,
    "question": "1/5 + 3/5 = ?",
    "correctAnswer": "4/5",
    "choices": [
      "4/5",
      "5/5",
      "3/5",
      "6/5"
    ]
  },
  {
    "id": "g5:easy:3",
    "grade": 5,
    "difficulty": "easy",
    "num": 3,
    "question": "7/10 + 3/10 = ?",
    "correctAnswer": "10/10",
    "choices": [
      "10/10",
      "11/10",
      "9/10",
      "12/10"
    ]
  },
  {
    "id": "g5:easy:4",
    "grade": 5,
    "difficulty": "easy",
    "num": 4,
    "question": "1/7 + 5/7 = ?",
    "correctAnswer": "6/7",
    "choices": [
      "6/7",
      "7/7",
      "5/7",
      "8/7"
    ]
  },
  {
    "id": "g5:easy:5",
    "grade": 5,
    "difficulty": "easy",
    "num": 5,
    "question": "1/7 + 6/7 = ?",
    "correctAnswer": "7/7",
    "choices": [
      "7/7",
      "8/7",
      "6/7",
      "9/7"
    ]
  },
  {
    "id": "g5:easy:6",
    "grade": 5,
    "difficulty": "easy",
    "num": 6,
    "question": "7/8 + 1/8 = ?",
    "correctAnswer": "8/8",
    "choices": [
      "8/8",
      "9/8",
      "7/8",
      "10/8"
    ]
  },
  {
    "id": "g5:easy:7",
    "grade": 5,
    "difficulty": "easy",
    "num": 7,
    "question": "7/12 + 3/12 = ?",
    "correctAnswer": "10/12",
    "choices": [
      "10/12",
      "11/12",
      "9/12",
      "12/12"
    ]
  },
  {
    "id": "g5:easy:8",
    "grade": 5,
    "difficulty": "easy",
    "num": 8,
    "question": "3/5 + 1/5 = ?",
    "correctAnswer": "4/5",
    "choices": [
      "4/5",
      "5/5",
      "3/5",
      "6/5"
    ]
  },
  {
    "id": "g5:easy:9",
    "grade": 5,
    "difficulty": "easy",
    "num": 9,
    "question": "8/10 + 1/10 = ?",
    "correctAnswer": "9/10",
    "choices": [
      "9/10",
      "10/10",
      "8/10",
      "11/10"
    ]
  },
  {
    "id": "g5:easy:10",
    "grade": 5,
    "difficulty": "easy",
    "num": 10,
    "question": "6/10 + 4/10 = ?",
    "correctAnswer": "10/10",
    "choices": [
      "10/10",
      "11/10",
      "9/10",
      "12/10"
    ]
  },
  {
    "id": "g5:easy:11",
    "grade": 5,
    "difficulty": "easy",
    "num": 11,
    "question": "4/6 + 1/6 = ?",
    "correctAnswer": "5/6",
    "choices": [
      "5/6",
      "6/6",
      "4/6",
      "7/6"
    ]
  },
  {
    "id": "g5:easy:12",
    "grade": 5,
    "difficulty": "easy",
    "num": 12,
    "question": "11/12 + 1/12 = ?",
    "correctAnswer": "12/12",
    "choices": [
      "12/12",
      "13/12",
      "11/12",
      "14/12"
    ]
  },
  {
    "id": "g5:easy:13",
    "grade": 5,
    "difficulty": "easy",
    "num": 13,
    "question": "5/8 + 3/8 = ?",
    "correctAnswer": "8/8",
    "choices": [
      "8/8",
      "9/8",
      "7/8",
      "10/8"
    ]
  },
  {
    "id": "g5:easy:14",
    "grade": 5,
    "difficulty": "easy",
    "num": 14,
    "question": "8/11 + 2/11 = ?",
    "correctAnswer": "10/11",
    "choices": [
      "10/11",
      "11/11",
      "9/11",
      "12/11"
    ]
  },
  {
    "id": "g5:easy:15",
    "grade": 5,
    "difficulty": "easy",
    "num": 15,
    "question": "3/8 + 2/8 = ?",
    "correctAnswer": "5/8",
    "choices": [
      "5/8",
      "6/8",
      "4/8",
      "7/8"
    ]
  },
  {
    "id": "g5:easy:16",
    "grade": 5,
    "difficulty": "easy",
    "num": 16,
    "question": "6.8 - 0.9 = ?",
    "correctAnswer": "5.9",
    "choices": [
      "5.9",
      "6.4",
      "5.4",
      "6.9"
    ]
  },
  {
    "id": "g5:easy:17",
    "grade": 5,
    "difficulty": "easy",
    "num": 17,
    "question": "2.7 - 2.6 = ?",
    "correctAnswer": "0.1",
    "choices": [
      "0.1",
      "0.6",
      "1.1",
      "1.6"
    ]
  },
  {
    "id": "g5:easy:18",
    "grade": 5,
    "difficulty": "easy",
    "num": 18,
    "question": "3.4 - 2.7 = ?",
    "correctAnswer": "0.7",
    "choices": [
      "0.7",
      "1.2",
      "0.2",
      "1.7"
    ]
  },
  {
    "id": "g5:easy:19",
    "grade": 5,
    "difficulty": "easy",
    "num": 19,
    "question": "2.3 - 1.5 = ?",
    "correctAnswer": "0.8",
    "choices": [
      "0.8",
      "1.3",
      "0.3",
      "1.8"
    ]
  },
  {
    "id": "g5:easy:20",
    "grade": 5,
    "difficulty": "easy",
    "num": 20,
    "question": "4.5 - 3.4 = ?",
    "correctAnswer": "1.1",
    "choices": [
      "1.1",
      "1.6",
      "0.6",
      "2.1"
    ]
  },
  {
    "id": "g5:easy:21",
    "grade": 5,
    "difficulty": "easy",
    "num": 21,
    "question": "4.9 + 2.8 = ?",
    "correctAnswer": "7.7",
    "choices": [
      "7.7",
      "8.2",
      "7.2",
      "8.7"
    ]
  },
  {
    "id": "g5:easy:22",
    "grade": 5,
    "difficulty": "easy",
    "num": 22,
    "question": "3.7 - 1.6 = ?",
    "correctAnswer": "2.1",
    "choices": [
      "2.1",
      "2.6",
      "1.6",
      "3.1"
    ]
  },
  {
    "id": "g5:easy:23",
    "grade": 5,
    "difficulty": "easy",
    "num": 23,
    "question": "4.9 - 1.6 = ?",
    "correctAnswer": "3.3",
    "choices": [
      "3.3",
      "3.8",
      "2.8",
      "4.3"
    ]
  },
  {
    "id": "g5:easy:24",
    "grade": 5,
    "difficulty": "easy",
    "num": 24,
    "question": "5.5 + 2.7 = ?",
    "correctAnswer": "8.2",
    "choices": [
      "8.2",
      "8.7",
      "7.7",
      "9.2"
    ]
  },
  {
    "id": "g5:easy:25",
    "grade": 5,
    "difficulty": "easy",
    "num": 25,
    "question": "1.7 + 1.5 = ?",
    "correctAnswer": "3.2",
    "choices": [
      "3.2",
      "3.7",
      "2.7",
      "4.2"
    ]
  },
  {
    "id": "g5:easy:26",
    "grade": 5,
    "difficulty": "easy",
    "num": 26,
    "question": "3.1 - 3.1 = ?",
    "correctAnswer": "0.0",
    "choices": [
      "0.0",
      "0.5",
      "1.0",
      "1.5"
    ]
  },
  {
    "id": "g5:easy:27",
    "grade": 5,
    "difficulty": "easy",
    "num": 27,
    "question": "4.9 - 2.0 = ?",
    "correctAnswer": "2.9",
    "choices": [
      "2.9",
      "3.4",
      "2.4",
      "3.9"
    ]
  },
  {
    "id": "g5:easy:28",
    "grade": 5,
    "difficulty": "easy",
    "num": 28,
    "question": "3.5 - 2.5 = ?",
    "correctAnswer": "1.0",
    "choices": [
      "1.0",
      "1.5",
      "0.5",
      "2.0"
    ]
  },
  {
    "id": "g5:easy:29",
    "grade": 5,
    "difficulty": "easy",
    "num": 29,
    "question": "2.8 + 1.0 = ?",
    "correctAnswer": "3.8",
    "choices": [
      "3.8",
      "4.3",
      "3.3",
      "4.8"
    ]
  },
  {
    "id": "g5:easy:30",
    "grade": 5,
    "difficulty": "easy",
    "num": 30,
    "question": "3.2 + 3.8 = ?",
    "correctAnswer": "7.0",
    "choices": [
      "7.0",
      "7.5",
      "6.5",
      "8.0"
    ]
  },
  {
    "id": "g5:normal:31",
    "grade": 5,
    "difficulty": "normal",
    "num": 31,
    "question": "14.96 x 4 = ?",
    "correctAnswer": "59.84",
    "choices": [
      "59.84",
      "60.09",
      "59.59",
      "60.34"
    ]
  },
  {
    "id": "g5:normal:32",
    "grade": 5,
    "difficulty": "normal",
    "num": 32,
    "question": "1/2 + 4/5 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "13/10",
    "choices": [
      "13/10",
      "14/10",
      "12/10",
      "15/10"
    ]
  },
  {
    "id": "g5:normal:33",
    "grade": 5,
    "difficulty": "normal",
    "num": 33,
    "question": "14.36 x 5 = ?",
    "correctAnswer": "71.8",
    "choices": [
      "71.8",
      "72.8",
      "70.8",
      "73.8"
    ]
  },
  {
    "id": "g5:normal:34",
    "grade": 5,
    "difficulty": "normal",
    "num": 34,
    "question": "นักเรียนกิน 1/6 ของพิซซ่า อีกคนกิน 1/6 ของพิซซ่าถาดเดียวกัน รวมกินไปกี่ส่วนของพิซซ่า",
    "correctAnswer": "2/6",
    "choices": [
      "2/6",
      "3/6",
      "1/6",
      "4/6"
    ]
  },
  {
    "id": "g5:normal:35",
    "grade": 5,
    "difficulty": "normal",
    "num": 35,
    "question": "4/5 + 3/6 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "13/10",
    "choices": [
      "13/10",
      "14/10",
      "12/10",
      "15/10"
    ]
  },
  {
    "id": "g5:normal:36",
    "grade": 5,
    "difficulty": "normal",
    "num": 36,
    "question": "14.06 x 4 = ?",
    "correctAnswer": "56.24",
    "choices": [
      "56.24",
      "56.49",
      "55.99",
      "56.74"
    ]
  },
  {
    "id": "g5:normal:37",
    "grade": 5,
    "difficulty": "normal",
    "num": 37,
    "question": "รถวิ่งด้วยความเร็วชั่วโมงละ 75.0 กิโลเมตร ใช้เวลา 3 ชั่วโมง วิ่งได้ระยะทางกี่กิโลเมตร",
    "correctAnswer": "225.0",
    "choices": [
      "225.0",
      "230.0",
      "220.0",
      "235.0"
    ]
  },
  {
    "id": "g5:normal:38",
    "grade": 5,
    "difficulty": "normal",
    "num": 38,
    "question": "18.26 x 3 = ?",
    "correctAnswer": "54.78",
    "choices": [
      "54.78",
      "55.03",
      "54.53",
      "55.28"
    ]
  },
  {
    "id": "g5:normal:39",
    "grade": 5,
    "difficulty": "normal",
    "num": 39,
    "question": "1/4 + 1/2 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/4",
    "choices": [
      "3/4",
      "4/4",
      "2/4",
      "5/4"
    ]
  },
  {
    "id": "g5:normal:40",
    "grade": 5,
    "difficulty": "normal",
    "num": 40,
    "question": "1/2 + 1/5 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "7/10",
    "choices": [
      "7/10",
      "8/10",
      "6/10",
      "9/10"
    ]
  },
  {
    "id": "g5:normal:41",
    "grade": 5,
    "difficulty": "normal",
    "num": 41,
    "question": "2/3 + 2/4 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "7/6",
    "choices": [
      "7/6",
      "8/6",
      "6/6",
      "9/6"
    ]
  },
  {
    "id": "g5:normal:42",
    "grade": 5,
    "difficulty": "normal",
    "num": 42,
    "question": "1/2 + 1/6 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "2/3",
    "choices": [
      "2/3",
      "3/3",
      "1/3",
      "4/3"
    ]
  },
  {
    "id": "g5:normal:43",
    "grade": 5,
    "difficulty": "normal",
    "num": 43,
    "question": "1/2 + 1/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "5/6",
    "choices": [
      "5/6",
      "6/6",
      "4/6",
      "7/6"
    ]
  },
  {
    "id": "g5:normal:44",
    "grade": 5,
    "difficulty": "normal",
    "num": 44,
    "question": "3/5 + 2/6 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "14/15",
    "choices": [
      "14/15",
      "15/15",
      "13/15",
      "16/15"
    ]
  },
  {
    "id": "g5:normal:45",
    "grade": 5,
    "difficulty": "normal",
    "num": 45,
    "question": "9.08 x 3 = ?",
    "correctAnswer": "27.24",
    "choices": [
      "27.24",
      "27.49",
      "26.99",
      "27.74"
    ]
  },
  {
    "id": "g5:normal:46",
    "grade": 5,
    "difficulty": "normal",
    "num": 46,
    "question": "1/2 + 3/4 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "5/4",
    "choices": [
      "5/4",
      "6/4",
      "4/4",
      "7/4"
    ]
  },
  {
    "id": "g5:normal:47",
    "grade": 5,
    "difficulty": "normal",
    "num": 47,
    "question": "2.74 ÷ 2 = ?",
    "correctAnswer": "1.37",
    "choices": [
      "1.37",
      "1.62",
      "1.12",
      "1.87"
    ]
  },
  {
    "id": "g5:normal:48",
    "grade": 5,
    "difficulty": "normal",
    "num": 48,
    "question": "9.32 ÷ 2 = ?",
    "correctAnswer": "4.66",
    "choices": [
      "4.66",
      "4.91",
      "4.41",
      "5.16"
    ]
  },
  {
    "id": "g5:normal:49",
    "grade": 5,
    "difficulty": "normal",
    "num": 49,
    "question": "9.34 ÷ 5 = ?",
    "correctAnswer": "1.87",
    "choices": [
      "1.87",
      "2.12",
      "1.62",
      "2.37"
    ]
  },
  {
    "id": "g5:normal:50",
    "grade": 5,
    "difficulty": "normal",
    "num": 50,
    "question": "1/2 + 2/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "7/6",
    "choices": [
      "7/6",
      "8/6",
      "6/6",
      "9/6"
    ]
  },
  {
    "id": "g5:normal:51",
    "grade": 5,
    "difficulty": "normal",
    "num": 51,
    "question": "1/2 + 1/4 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/4",
    "choices": [
      "3/4",
      "4/4",
      "2/4",
      "5/4"
    ]
  },
  {
    "id": "g5:normal:52",
    "grade": 5,
    "difficulty": "normal",
    "num": 52,
    "question": "14.29 ÷ 4 = ?",
    "correctAnswer": "3.57",
    "choices": [
      "3.57",
      "3.82",
      "3.32",
      "4.07"
    ]
  },
  {
    "id": "g5:normal:53",
    "grade": 5,
    "difficulty": "normal",
    "num": 53,
    "question": "4/5 + 2/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "22/15",
    "choices": [
      "22/15",
      "23/15",
      "21/15",
      "24/15"
    ]
  },
  {
    "id": "g5:normal:54",
    "grade": 5,
    "difficulty": "normal",
    "num": 54,
    "question": "1/3 + 1/2 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "5/6",
    "choices": [
      "5/6",
      "6/6",
      "4/6",
      "7/6"
    ]
  },
  {
    "id": "g5:normal:55",
    "grade": 5,
    "difficulty": "normal",
    "num": 55,
    "question": "4/5 + 2/4 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "13/10",
    "choices": [
      "13/10",
      "14/10",
      "12/10",
      "15/10"
    ]
  },
  {
    "id": "g5:normal:56",
    "grade": 5,
    "difficulty": "normal",
    "num": 56,
    "question": "แม่ครัวใช้แป้ง 21.3 กิโลกรัม ทำขนมได้ 6 ถาด แป้งถาดละกี่กิโลกรัม (ตอบทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "3.55",
    "choices": [
      "3.55",
      "3.80",
      "3.30",
      "4.05"
    ]
  },
  {
    "id": "g5:normal:57",
    "grade": 5,
    "difficulty": "normal",
    "num": 57,
    "question": "1/3 + 3/5 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "14/15",
    "choices": [
      "14/15",
      "15/15",
      "13/15",
      "16/15"
    ]
  },
  {
    "id": "g5:normal:58",
    "grade": 5,
    "difficulty": "normal",
    "num": 58,
    "question": "1.62 ÷ 4 = ?",
    "correctAnswer": "0.41",
    "choices": [
      "0.41",
      "0.66",
      "0.16",
      "0.91"
    ]
  },
  {
    "id": "g5:normal:59",
    "grade": 5,
    "difficulty": "normal",
    "num": 59,
    "question": "11.95 ÷ 3 = ?",
    "correctAnswer": "3.98",
    "choices": [
      "3.98",
      "4.23",
      "3.73",
      "4.48"
    ]
  },
  {
    "id": "g5:normal:60",
    "grade": 5,
    "difficulty": "normal",
    "num": 60,
    "question": "2.13 ÷ 4 = ?",
    "correctAnswer": "0.53",
    "choices": [
      "0.53",
      "0.78",
      "0.28",
      "1.03"
    ]
  },
  {
    "id": "g5:hard:61",
    "grade": 5,
    "difficulty": "hard",
    "num": 61,
    "question": "3/6 ÷ 4/7 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "7/8",
    "choices": [
      "7/8",
      "8/8",
      "6/8",
      "9/8"
    ]
  },
  {
    "id": "g5:hard:62",
    "grade": 5,
    "difficulty": "hard",
    "num": 62,
    "question": "ผ้าผืนหนึ่งยาว 32.8 เมตร ตัดแบ่งให้เพื่อน 1/5 ของผืน เหลือผ้ากี่เมตร (ตอบทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "26.24",
    "choices": [
      "26.24",
      "26.49",
      "25.99",
      "26.74"
    ]
  },
  {
    "id": "g5:hard:63",
    "grade": 5,
    "difficulty": "hard",
    "num": 63,
    "question": "4/8 ÷ 2/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/4",
    "choices": [
      "3/4",
      "4/4",
      "2/4",
      "5/4"
    ]
  },
  {
    "id": "g5:hard:64",
    "grade": 5,
    "difficulty": "hard",
    "num": 64,
    "question": "1/4 ÷ 5/6 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/10",
    "choices": [
      "3/10",
      "4/10",
      "2/10",
      "5/10"
    ]
  },
  {
    "id": "g5:hard:65",
    "grade": 5,
    "difficulty": "hard",
    "num": 65,
    "question": "1/2 x 2/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "1/3",
    "choices": [
      "1/3",
      "2/3",
      "3/3",
      "4/3"
    ]
  },
  {
    "id": "g5:hard:66",
    "grade": 5,
    "difficulty": "hard",
    "num": 66,
    "question": "12.8 x 14.6 = ?",
    "correctAnswer": "186.88",
    "choices": [
      "186.88",
      "187.13",
      "186.63",
      "187.38"
    ]
  },
  {
    "id": "g5:hard:67",
    "grade": 5,
    "difficulty": "hard",
    "num": 67,
    "question": "7.37 + 3.9 = ?",
    "correctAnswer": "11.27",
    "choices": [
      "11.27",
      "11.52",
      "11.02",
      "11.77"
    ]
  },
  {
    "id": "g5:hard:68",
    "grade": 5,
    "difficulty": "hard",
    "num": 68,
    "question": "5/7 ÷ 4/8 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "10/7",
    "choices": [
      "10/7",
      "11/7",
      "9/7",
      "12/7"
    ]
  },
  {
    "id": "g5:hard:69",
    "grade": 5,
    "difficulty": "hard",
    "num": 69,
    "question": "1/2 x 6/7 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/7",
    "choices": [
      "3/7",
      "4/7",
      "2/7",
      "5/7"
    ]
  },
  {
    "id": "g5:hard:70",
    "grade": 5,
    "difficulty": "hard",
    "num": 70,
    "question": "22.03 + 14.61 = ?",
    "correctAnswer": "36.64",
    "choices": [
      "36.64",
      "36.89",
      "36.39",
      "37.14"
    ]
  },
  {
    "id": "g5:hard:71",
    "grade": 5,
    "difficulty": "hard",
    "num": 71,
    "question": "4.27 + 7.98 = ?",
    "correctAnswer": "12.25",
    "choices": [
      "12.25",
      "12.50",
      "12.00",
      "12.75"
    ]
  },
  {
    "id": "g5:hard:72",
    "grade": 5,
    "difficulty": "hard",
    "num": 72,
    "question": "สวนผลไม้กว้าง 53.5 เมตร ยาว 9.0 เมตร มีพื้นที่กี่ตารางเมตร (ตอบทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "481.5",
    "choices": [
      "481.5",
      "486.5",
      "476.5",
      "491.5"
    ]
  },
  {
    "id": "g5:hard:73",
    "grade": 5,
    "difficulty": "hard",
    "num": 73,
    "question": "7/8 ÷ 4/8 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "7/4",
    "choices": [
      "7/4",
      "8/4",
      "6/4",
      "9/4"
    ]
  },
  {
    "id": "g5:hard:74",
    "grade": 5,
    "difficulty": "hard",
    "num": 74,
    "question": "21.59 ÷ 13.08 = ?",
    "correctAnswer": "1.65",
    "choices": [
      "1.65",
      "1.90",
      "1.40",
      "2.15"
    ]
  },
  {
    "id": "g5:hard:75",
    "grade": 5,
    "difficulty": "hard",
    "num": 75,
    "question": "3/8 ÷ 1/6 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "9/4",
    "choices": [
      "9/4",
      "10/4",
      "8/4",
      "11/4"
    ]
  },
  {
    "id": "g5:hard:76",
    "grade": 5,
    "difficulty": "hard",
    "num": 76,
    "question": "3/4 x 4/5 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/5",
    "choices": [
      "3/5",
      "4/5",
      "2/5",
      "5/5"
    ]
  },
  {
    "id": "g5:hard:77",
    "grade": 5,
    "difficulty": "hard",
    "num": 77,
    "question": "5/7 ÷ 3/4 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "20/21",
    "choices": [
      "20/21",
      "21/21",
      "19/21",
      "22/21"
    ]
  },
  {
    "id": "g5:hard:78",
    "grade": 5,
    "difficulty": "hard",
    "num": 78,
    "question": "14.73 + 5.46 = ?",
    "correctAnswer": "20.19",
    "choices": [
      "20.19",
      "20.44",
      "19.94",
      "20.69"
    ]
  },
  {
    "id": "g5:hard:79",
    "grade": 5,
    "difficulty": "hard",
    "num": 79,
    "question": "16.33 + 7.17 = ?",
    "correctAnswer": "23.5",
    "choices": [
      "23.5",
      "24.5",
      "22.5",
      "25.5"
    ]
  },
  {
    "id": "g5:hard:80",
    "grade": 5,
    "difficulty": "hard",
    "num": 80,
    "question": "4/5 ÷ 1/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "12/5",
    "choices": [
      "12/5",
      "13/5",
      "11/5",
      "14/5"
    ]
  },
  {
    "id": "g5:hard:81",
    "grade": 5,
    "difficulty": "hard",
    "num": 81,
    "question": "2/7 ÷ 4/8 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "4/7",
    "choices": [
      "4/7",
      "5/7",
      "3/7",
      "6/7"
    ]
  },
  {
    "id": "g5:hard:82",
    "grade": 5,
    "difficulty": "hard",
    "num": 82,
    "question": "2/8 x 1/2 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "1/8",
    "choices": [
      "1/8",
      "2/8",
      "3/8",
      "4/8"
    ]
  },
  {
    "id": "g5:hard:83",
    "grade": 5,
    "difficulty": "hard",
    "num": 83,
    "question": "5.45 - 5.26 = ?",
    "correctAnswer": "0.19",
    "choices": [
      "0.19",
      "0.44",
      "0.69",
      "0.94"
    ]
  },
  {
    "id": "g5:hard:84",
    "grade": 5,
    "difficulty": "hard",
    "num": 84,
    "question": "1/2 ÷ 2/3 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "3/4",
    "choices": [
      "3/4",
      "4/4",
      "2/4",
      "5/4"
    ]
  },
  {
    "id": "g5:hard:85",
    "grade": 5,
    "difficulty": "hard",
    "num": 85,
    "question": "14.73 - 3.15 = ?",
    "correctAnswer": "11.58",
    "choices": [
      "11.58",
      "11.83",
      "11.33",
      "12.08"
    ]
  },
  {
    "id": "g5:hard:86",
    "grade": 5,
    "difficulty": "hard",
    "num": 86,
    "question": "7.87 - 5.65 = ?",
    "correctAnswer": "2.22",
    "choices": [
      "2.22",
      "2.47",
      "1.97",
      "2.72"
    ]
  },
  {
    "id": "g5:hard:87",
    "grade": 5,
    "difficulty": "hard",
    "num": 87,
    "question": "นักวิ่งวิ่งได้ 32.0 กิโลเมตร ในเวลา 6.2 ชั่วโมง วิ่งได้เฉลี่ยชั่วโมงละกี่กิโลเมตร (ตอบทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "5.16",
    "choices": [
      "5.16",
      "5.41",
      "4.91",
      "5.66"
    ]
  },
  {
    "id": "g5:hard:88",
    "grade": 5,
    "difficulty": "hard",
    "num": 88,
    "question": "ถังน้ำใบหนึ่งจุน้ำ 16.3 ลิตร มีน้ำอยู่ 3/4 ของถัง คิดเป็นน้ำกี่ลิตร (ตอบทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "12.23",
    "choices": [
      "12.23",
      "12.48",
      "11.98",
      "12.73"
    ]
  },
  {
    "id": "g5:hard:89",
    "grade": 5,
    "difficulty": "hard",
    "num": 89,
    "question": "6.41 x 6.97 = ?",
    "correctAnswer": "44.68",
    "choices": [
      "44.68",
      "44.93",
      "44.43",
      "45.18"
    ]
  },
  {
    "id": "g5:hard:90",
    "grade": 5,
    "difficulty": "hard",
    "num": 90,
    "question": "1/3 ÷ 1/6 = ? (ตอบเป็นเศษส่วนอย่างต่ำ)",
    "correctAnswer": "2/1",
    "choices": [
      "2/1",
      "3/1",
      "1/1",
      "4/1"
    ]
  },
  {
    "id": "g6:easy:1",
    "grade": 6,
    "difficulty": "easy",
    "num": 1,
    "question": "20% ของ 120 เท่ากับเท่าไร",
    "correctAnswer": "24.0",
    "choices": [
      "24.0",
      "25.0",
      "23.0",
      "26.0"
    ]
  },
  {
    "id": "g6:easy:2",
    "grade": 6,
    "difficulty": "easy",
    "num": 2,
    "question": "อัตราส่วน 9 : 36 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 5 จงหาตัวหลัง",
    "correctAnswer": "20",
    "choices": [
      "20",
      "22",
      "18",
      "24"
    ]
  },
  {
    "id": "g6:easy:3",
    "grade": 6,
    "difficulty": "easy",
    "num": 3,
    "question": "100% ของ 80 เท่ากับเท่าไร",
    "correctAnswer": "80.0",
    "choices": [
      "80.0",
      "81.0",
      "79.0",
      "82.0"
    ]
  },
  {
    "id": "g6:easy:4",
    "grade": 6,
    "difficulty": "easy",
    "num": 4,
    "question": "อัตราส่วน 4 : 12 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 4 จงหาตัวหลัง",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g6:easy:5",
    "grade": 6,
    "difficulty": "easy",
    "num": 5,
    "question": "อัตราส่วน 11 : 22 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 11 จงหาตัวหลัง",
    "correctAnswer": "22",
    "choices": [
      "22",
      "27",
      "17",
      "32"
    ]
  },
  {
    "id": "g6:easy:6",
    "grade": 6,
    "difficulty": "easy",
    "num": 6,
    "question": "25% ของ 80 เท่ากับเท่าไร",
    "correctAnswer": "20.0",
    "choices": [
      "20.0",
      "20.5",
      "19.5",
      "21.0"
    ]
  },
  {
    "id": "g6:easy:7",
    "grade": 6,
    "difficulty": "easy",
    "num": 7,
    "question": "50% ของ 50 เท่ากับเท่าไร",
    "correctAnswer": "25.0",
    "choices": [
      "25.0",
      "26.0",
      "24.0",
      "27.0"
    ]
  },
  {
    "id": "g6:easy:8",
    "grade": 6,
    "difficulty": "easy",
    "num": 8,
    "question": "อัตราส่วน 12 : 36 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 11 จงหาตัวหลัง",
    "correctAnswer": "33",
    "choices": [
      "33",
      "38",
      "28",
      "43"
    ]
  },
  {
    "id": "g6:easy:9",
    "grade": 6,
    "difficulty": "easy",
    "num": 9,
    "question": "อัตราส่วน 11 : 44 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 5 จงหาตัวหลัง",
    "correctAnswer": "20",
    "choices": [
      "20",
      "22",
      "18",
      "24"
    ]
  },
  {
    "id": "g6:easy:10",
    "grade": 6,
    "difficulty": "easy",
    "num": 10,
    "question": "20% ของ 200 เท่ากับเท่าไร",
    "correctAnswer": "40.0",
    "choices": [
      "40.0",
      "41.0",
      "39.0",
      "42.0"
    ]
  },
  {
    "id": "g6:easy:11",
    "grade": 6,
    "difficulty": "easy",
    "num": 11,
    "question": "อัตราส่วน 6 : 24 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 8 จงหาตัวหลัง",
    "correctAnswer": "32",
    "choices": [
      "32",
      "37",
      "27",
      "42"
    ]
  },
  {
    "id": "g6:easy:12",
    "grade": 6,
    "difficulty": "easy",
    "num": 12,
    "question": "อัตราส่วน 7 : 21 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 3 จงหาตัวหลัง",
    "correctAnswer": "9",
    "choices": [
      "9",
      "11",
      "7",
      "13"
    ]
  },
  {
    "id": "g6:easy:13",
    "grade": 6,
    "difficulty": "easy",
    "num": 13,
    "question": "อัตราส่วน 8 : 32 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 2 จงหาตัวหลัง",
    "correctAnswer": "8",
    "choices": [
      "8",
      "10",
      "6",
      "12"
    ]
  },
  {
    "id": "g6:easy:14",
    "grade": 6,
    "difficulty": "easy",
    "num": 14,
    "question": "อัตราส่วน 6 : 12 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 12 จงหาตัวหลัง",
    "correctAnswer": "24",
    "choices": [
      "24",
      "29",
      "19",
      "34"
    ]
  },
  {
    "id": "g6:easy:15",
    "grade": 6,
    "difficulty": "easy",
    "num": 15,
    "question": "10% ของ 200 เท่ากับเท่าไร",
    "correctAnswer": "20.0",
    "choices": [
      "20.0",
      "20.5",
      "19.5",
      "21.0"
    ]
  },
  {
    "id": "g6:easy:16",
    "grade": 6,
    "difficulty": "easy",
    "num": 16,
    "question": "10% ของ 120 เท่ากับเท่าไร",
    "correctAnswer": "12.0",
    "choices": [
      "12.0",
      "12.5",
      "11.5",
      "13.0"
    ]
  },
  {
    "id": "g6:easy:17",
    "grade": 6,
    "difficulty": "easy",
    "num": 17,
    "question": "5% ของ 50 เท่ากับเท่าไร",
    "correctAnswer": "2.5",
    "choices": [
      "2.5",
      "3.0",
      "2.0",
      "3.5"
    ]
  },
  {
    "id": "g6:easy:18",
    "grade": 6,
    "difficulty": "easy",
    "num": 18,
    "question": "100% ของ 120 เท่ากับเท่าไร",
    "correctAnswer": "120.0",
    "choices": [
      "120.0",
      "125.0",
      "115.0",
      "130.0"
    ]
  },
  {
    "id": "g6:easy:19",
    "grade": 6,
    "difficulty": "easy",
    "num": 19,
    "question": "20% ของ 50 เท่ากับเท่าไร",
    "correctAnswer": "10.0",
    "choices": [
      "10.0",
      "10.5",
      "9.5",
      "11.0"
    ]
  },
  {
    "id": "g6:easy:20",
    "grade": 6,
    "difficulty": "easy",
    "num": 20,
    "question": "75% ของ 200 เท่ากับเท่าไร",
    "correctAnswer": "150.0",
    "choices": [
      "150.0",
      "155.0",
      "145.0",
      "160.0"
    ]
  },
  {
    "id": "g6:easy:21",
    "grade": 6,
    "difficulty": "easy",
    "num": 21,
    "question": "100% ของ 20 เท่ากับเท่าไร",
    "correctAnswer": "20.0",
    "choices": [
      "20.0",
      "20.5",
      "19.5",
      "21.0"
    ]
  },
  {
    "id": "g6:easy:22",
    "grade": 6,
    "difficulty": "easy",
    "num": 22,
    "question": "10% ของ 60 เท่ากับเท่าไร",
    "correctAnswer": "6.0",
    "choices": [
      "6.0",
      "6.5",
      "5.5",
      "7.0"
    ]
  },
  {
    "id": "g6:easy:23",
    "grade": 6,
    "difficulty": "easy",
    "num": 23,
    "question": "อัตราส่วน 6 : 18 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 12 จงหาตัวหลัง",
    "correctAnswer": "36",
    "choices": [
      "36",
      "41",
      "31",
      "46"
    ]
  },
  {
    "id": "g6:easy:24",
    "grade": 6,
    "difficulty": "easy",
    "num": 24,
    "question": "5% ของ 60 เท่ากับเท่าไร",
    "correctAnswer": "3.0",
    "choices": [
      "3.0",
      "3.5",
      "2.5",
      "4.0"
    ]
  },
  {
    "id": "g6:easy:25",
    "grade": 6,
    "difficulty": "easy",
    "num": 25,
    "question": "50% ของ 80 เท่ากับเท่าไร",
    "correctAnswer": "40.0",
    "choices": [
      "40.0",
      "41.0",
      "39.0",
      "42.0"
    ]
  },
  {
    "id": "g6:easy:26",
    "grade": 6,
    "difficulty": "easy",
    "num": 26,
    "question": "อัตราส่วน 9 : 18 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 11 จงหาตัวหลัง",
    "correctAnswer": "22",
    "choices": [
      "22",
      "27",
      "17",
      "32"
    ]
  },
  {
    "id": "g6:easy:27",
    "grade": 6,
    "difficulty": "easy",
    "num": 27,
    "question": "50% ของ 100 เท่ากับเท่าไร",
    "correctAnswer": "50.0",
    "choices": [
      "50.0",
      "51.0",
      "49.0",
      "52.0"
    ]
  },
  {
    "id": "g6:easy:28",
    "grade": 6,
    "difficulty": "easy",
    "num": 28,
    "question": "25% ของ 50 เท่ากับเท่าไร",
    "correctAnswer": "12.5",
    "choices": [
      "12.5",
      "13.0",
      "12.0",
      "13.5"
    ]
  },
  {
    "id": "g6:easy:29",
    "grade": 6,
    "difficulty": "easy",
    "num": 29,
    "question": "5% ของ 80 เท่ากับเท่าไร",
    "correctAnswer": "4.0",
    "choices": [
      "4.0",
      "4.5",
      "3.5",
      "5.0"
    ]
  },
  {
    "id": "g6:easy:30",
    "grade": 6,
    "difficulty": "easy",
    "num": 30,
    "question": "อัตราส่วน 3 : 6 เท่ากับอัตราส่วนใด ถ้าตัวหน้าคือ 6 จงหาตัวหลัง",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g6:normal:31",
    "grade": 6,
    "difficulty": "normal",
    "num": 31,
    "question": "90% ของ 300 เท่ากับเท่าไร",
    "correctAnswer": "270.0",
    "choices": [
      "270.0",
      "275.0",
      "265.0",
      "280.0"
    ]
  },
  {
    "id": "g6:normal:32",
    "grade": 6,
    "difficulty": "normal",
    "num": 32,
    "question": "30% ของ 120 เท่ากับเท่าไร",
    "correctAnswer": "36.0",
    "choices": [
      "36.0",
      "37.0",
      "35.0",
      "38.0"
    ]
  },
  {
    "id": "g6:normal:33",
    "grade": 6,
    "difficulty": "normal",
    "num": 33,
    "question": "70% ของ 250 เท่ากับเท่าไร",
    "correctAnswer": "175.0",
    "choices": [
      "175.0",
      "180.0",
      "170.0",
      "185.0"
    ]
  },
  {
    "id": "g6:normal:34",
    "grade": 6,
    "difficulty": "normal",
    "num": 34,
    "question": "60% ของ 120 เท่ากับเท่าไร",
    "correctAnswer": "72.0",
    "choices": [
      "72.0",
      "73.0",
      "71.0",
      "74.0"
    ]
  },
  {
    "id": "g6:normal:35",
    "grade": 6,
    "difficulty": "normal",
    "num": 35,
    "question": "65% ของ 60 เท่ากับเท่าไร",
    "correctAnswer": "39.0",
    "choices": [
      "39.0",
      "40.0",
      "38.0",
      "41.0"
    ]
  },
  {
    "id": "g6:normal:36",
    "grade": 6,
    "difficulty": "normal",
    "num": 36,
    "question": "45% ของ 40 เท่ากับเท่าไร",
    "correctAnswer": "18.0",
    "choices": [
      "18.0",
      "18.5",
      "17.5",
      "19.0"
    ]
  },
  {
    "id": "g6:normal:37",
    "grade": 6,
    "difficulty": "normal",
    "num": 37,
    "question": "15% ของ 150 เท่ากับเท่าไร",
    "correctAnswer": "22.5",
    "choices": [
      "22.5",
      "23.5",
      "21.5",
      "24.5"
    ]
  },
  {
    "id": "g6:normal:38",
    "grade": 6,
    "difficulty": "normal",
    "num": 38,
    "question": "สินค้าราคา 500 บาท ลดราคา 30% สินค้าชิ้นนี้ลดราคาไปกี่บาท",
    "correctAnswer": "150.0",
    "choices": [
      "150.0",
      "155.0",
      "145.0",
      "160.0"
    ]
  },
  {
    "id": "g6:normal:39",
    "grade": 6,
    "difficulty": "normal",
    "num": 39,
    "question": "45% ของ 400 เท่ากับเท่าไร",
    "correctAnswer": "180.0",
    "choices": [
      "180.0",
      "185.0",
      "175.0",
      "190.0"
    ]
  },
  {
    "id": "g6:normal:40",
    "grade": 6,
    "difficulty": "normal",
    "num": 40,
    "question": "70% ของ 60 เท่ากับเท่าไร",
    "correctAnswer": "42.0",
    "choices": [
      "42.0",
      "43.0",
      "41.0",
      "44.0"
    ]
  },
  {
    "id": "g6:normal:41",
    "grade": 6,
    "difficulty": "normal",
    "num": 41,
    "question": "30% ของ 180 เท่ากับเท่าไร",
    "correctAnswer": "54.0",
    "choices": [
      "54.0",
      "55.0",
      "53.0",
      "56.0"
    ]
  },
  {
    "id": "g6:normal:42",
    "grade": 6,
    "difficulty": "normal",
    "num": 42,
    "question": "นักเรียนห้องหนึ่งมี 40 คน เป็นนักเรียนชาย 75% นักเรียนห้องนี้มีนักเรียนชายกี่คน",
    "correctAnswer": "30.0",
    "choices": [
      "30.0",
      "31.0",
      "29.0",
      "32.0"
    ]
  },
  {
    "id": "g6:normal:43",
    "grade": 6,
    "difficulty": "normal",
    "num": 43,
    "question": "65% ของ 250 เท่ากับเท่าไร",
    "correctAnswer": "162.5",
    "choices": [
      "162.5",
      "167.5",
      "157.5",
      "172.5"
    ]
  },
  {
    "id": "g6:normal:44",
    "grade": 6,
    "difficulty": "normal",
    "num": 44,
    "question": "85% ของ 180 เท่ากับเท่าไร",
    "correctAnswer": "153.0",
    "choices": [
      "153.0",
      "158.0",
      "148.0",
      "163.0"
    ]
  },
  {
    "id": "g6:normal:45",
    "grade": 6,
    "difficulty": "normal",
    "num": 45,
    "question": "85% ของ 80 เท่ากับเท่าไร",
    "correctAnswer": "68.0",
    "choices": [
      "68.0",
      "69.0",
      "67.0",
      "70.0"
    ]
  },
  {
    "id": "g6:normal:46",
    "grade": 6,
    "difficulty": "normal",
    "num": 46,
    "question": "70% ของ 150 เท่ากับเท่าไร",
    "correctAnswer": "105.0",
    "choices": [
      "105.0",
      "110.0",
      "100.0",
      "115.0"
    ]
  },
  {
    "id": "g6:normal:47",
    "grade": 6,
    "difficulty": "normal",
    "num": 47,
    "question": "70% ของ 180 เท่ากับเท่าไร",
    "correctAnswer": "126.0",
    "choices": [
      "126.0",
      "131.0",
      "121.0",
      "136.0"
    ]
  },
  {
    "id": "g6:normal:48",
    "grade": 6,
    "difficulty": "normal",
    "num": 48,
    "question": "90% ของ 40 เท่ากับเท่าไร",
    "correctAnswer": "36.0",
    "choices": [
      "36.0",
      "37.0",
      "35.0",
      "38.0"
    ]
  },
  {
    "id": "g6:normal:49",
    "grade": 6,
    "difficulty": "normal",
    "num": 49,
    "question": "35% ของ 40 เท่ากับเท่าไร",
    "correctAnswer": "14.0",
    "choices": [
      "14.0",
      "14.5",
      "13.5",
      "15.0"
    ]
  },
  {
    "id": "g6:normal:50",
    "grade": 6,
    "difficulty": "normal",
    "num": 50,
    "question": "15% ของ 180 เท่ากับเท่าไร",
    "correctAnswer": "27.0",
    "choices": [
      "27.0",
      "28.0",
      "26.0",
      "29.0"
    ]
  },
  {
    "id": "g6:normal:51",
    "grade": 6,
    "difficulty": "normal",
    "num": 51,
    "question": "40% ของ 180 เท่ากับเท่าไร",
    "correctAnswer": "72.0",
    "choices": [
      "72.0",
      "73.0",
      "71.0",
      "74.0"
    ]
  },
  {
    "id": "g6:normal:52",
    "grade": 6,
    "difficulty": "normal",
    "num": 52,
    "question": "45% ของ 120 เท่ากับเท่าไร",
    "correctAnswer": "54.0",
    "choices": [
      "54.0",
      "55.0",
      "53.0",
      "56.0"
    ]
  },
  {
    "id": "g6:normal:53",
    "grade": 6,
    "difficulty": "normal",
    "num": 53,
    "question": "30% ของ 250 เท่ากับเท่าไร",
    "correctAnswer": "75.0",
    "choices": [
      "75.0",
      "76.0",
      "74.0",
      "77.0"
    ]
  },
  {
    "id": "g6:normal:54",
    "grade": 6,
    "difficulty": "normal",
    "num": 54,
    "question": "ในสวนมีต้นมะม่วงต่อต้นส้มเป็นอัตราส่วน 3 : 5 ถ้ามีต้นมะม่วง 21 ต้น จะมีต้นส้มกี่ต้น",
    "correctAnswer": "35",
    "choices": [
      "35",
      "40",
      "30",
      "45"
    ]
  },
  {
    "id": "g6:normal:55",
    "grade": 6,
    "difficulty": "normal",
    "num": 55,
    "question": "65% ของ 180 เท่ากับเท่าไร",
    "correctAnswer": "117.0",
    "choices": [
      "117.0",
      "122.0",
      "112.0",
      "127.0"
    ]
  },
  {
    "id": "g6:normal:56",
    "grade": 6,
    "difficulty": "normal",
    "num": 56,
    "question": "60% ของ 400 เท่ากับเท่าไร",
    "correctAnswer": "240.0",
    "choices": [
      "240.0",
      "245.0",
      "235.0",
      "250.0"
    ]
  },
  {
    "id": "g6:normal:57",
    "grade": 6,
    "difficulty": "normal",
    "num": 57,
    "question": "แบ่งเงิน 40 บาท ให้ A และ B ตามอัตราส่วน 1 : 4 A จะได้เงินกี่บาท",
    "correctAnswer": "8",
    "choices": [
      "8",
      "10",
      "6",
      "12"
    ]
  },
  {
    "id": "g6:normal:58",
    "grade": 6,
    "difficulty": "normal",
    "num": 58,
    "question": "15% ของ 200 เท่ากับเท่าไร",
    "correctAnswer": "30.0",
    "choices": [
      "30.0",
      "31.0",
      "29.0",
      "32.0"
    ]
  },
  {
    "id": "g6:normal:59",
    "grade": 6,
    "difficulty": "normal",
    "num": 59,
    "question": "70% ของ 40 เท่ากับเท่าไร",
    "correctAnswer": "28.0",
    "choices": [
      "28.0",
      "29.0",
      "27.0",
      "30.0"
    ]
  },
  {
    "id": "g6:normal:60",
    "grade": 6,
    "difficulty": "normal",
    "num": 60,
    "question": "40% ของ 60 เท่ากับเท่าไร",
    "correctAnswer": "24.0",
    "choices": [
      "24.0",
      "25.0",
      "23.0",
      "26.0"
    ]
  },
  {
    "id": "g6:hard:61",
    "grade": 6,
    "difficulty": "hard",
    "num": 61,
    "question": "สินค้าราคาทุน 250 บาท ตั้งราคาขายเพิ่มขึ้น 20% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "300.0",
    "choices": [
      "300.0",
      "305.0",
      "295.0",
      "310.0"
    ]
  },
  {
    "id": "g6:hard:62",
    "grade": 6,
    "difficulty": "hard",
    "num": 62,
    "question": "สินค้าราคาทุน 250 บาท ตั้งราคาขายเพิ่มขึ้น 40% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "350.0",
    "choices": [
      "350.0",
      "355.0",
      "345.0",
      "360.0"
    ]
  },
  {
    "id": "g6:hard:63",
    "grade": 6,
    "difficulty": "hard",
    "num": 63,
    "question": "จำนวนเงินฝากธนาคาร 1000 บาท ได้ดอกเบี้ย 2% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "1020.0",
    "choices": [
      "1020.0",
      "1025.0",
      "1015.0",
      "1030.0"
    ]
  },
  {
    "id": "g6:hard:64",
    "grade": 6,
    "difficulty": "hard",
    "num": 64,
    "question": "จำนวนเงินฝากธนาคาร 10000 บาท ได้ดอกเบี้ย 4% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "10400.0",
    "choices": [
      "10400.0",
      "10405.0",
      "10395.0",
      "10410.0"
    ]
  },
  {
    "id": "g6:hard:65",
    "grade": 6,
    "difficulty": "hard",
    "num": 65,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 5 : 4 : 1 ถ้าลูกอายุ 5 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "20",
    "choices": [
      "20",
      "22",
      "18",
      "24"
    ]
  },
  {
    "id": "g6:hard:66",
    "grade": 6,
    "difficulty": "hard",
    "num": 66,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 6 : 4 : 1 ถ้าลูกอายุ 6 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "24",
    "choices": [
      "24",
      "29",
      "19",
      "34"
    ]
  },
  {
    "id": "g6:hard:67",
    "grade": 6,
    "difficulty": "hard",
    "num": 67,
    "question": "สินค้าราคาทุน 400 บาท ตั้งราคาขายเพิ่มขึ้น 25% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "500.0",
    "choices": [
      "500.0",
      "505.0",
      "495.0",
      "510.0"
    ]
  },
  {
    "id": "g6:hard:68",
    "grade": 6,
    "difficulty": "hard",
    "num": 68,
    "question": "ผสมสีน้ำเงินกับสีเหลืองในอัตราส่วน 2 : 2 ถ้าต้องการสีน้ำเงิน 10 ลิตร จะต้องใช้สีเหลืองกี่ลิตร",
    "correctAnswer": "10",
    "choices": [
      "10",
      "12",
      "8",
      "14"
    ]
  },
  {
    "id": "g6:hard:69",
    "grade": 6,
    "difficulty": "hard",
    "num": 69,
    "question": "จำนวนเงินฝากธนาคาร 10000 บาท ได้ดอกเบี้ย 2% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "10200.0",
    "choices": [
      "10200.0",
      "10205.0",
      "10195.0",
      "10210.0"
    ]
  },
  {
    "id": "g6:hard:70",
    "grade": 6,
    "difficulty": "hard",
    "num": 70,
    "question": "จำนวนเงินฝากธนาคาร 10000 บาท ได้ดอกเบี้ย 2% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "10200.0",
    "choices": [
      "10200.0",
      "10205.0",
      "10195.0",
      "10210.0"
    ]
  },
  {
    "id": "g6:hard:71",
    "grade": 6,
    "difficulty": "hard",
    "num": 71,
    "question": "สินค้าราคาทุน 500 บาท ตั้งราคาขายเพิ่มขึ้น 30% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "650.0",
    "choices": [
      "650.0",
      "655.0",
      "645.0",
      "660.0"
    ]
  },
  {
    "id": "g6:hard:72",
    "grade": 6,
    "difficulty": "hard",
    "num": 72,
    "question": "ราคาสินค้าเดิม 300 บาท ลดราคา 15% แล้วยังต้องเสียภาษีเพิ่มอีก 7% ของราคาที่ลดแล้ว ราคาสุทธิเป็นเท่าไร (ทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "272.85",
    "choices": [
      "272.85",
      "273.10",
      "272.60",
      "273.35"
    ]
  },
  {
    "id": "g6:hard:73",
    "grade": 6,
    "difficulty": "hard",
    "num": 73,
    "question": "นักเรียนสอบได้คะแนน 80 จากคะแนนเต็ม 100 คิดเป็นร้อยละเท่าไร (ทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "80.0",
    "choices": [
      "80.0",
      "81.0",
      "79.0",
      "82.0"
    ]
  },
  {
    "id": "g6:hard:74",
    "grade": 6,
    "difficulty": "hard",
    "num": 74,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 4 : 3 : 1 ถ้าลูกอายุ 5 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "15",
    "choices": [
      "15",
      "17",
      "13",
      "19"
    ]
  },
  {
    "id": "g6:hard:75",
    "grade": 6,
    "difficulty": "hard",
    "num": 75,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 4 : 3 : 1 ถ้าลูกอายุ 5 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "15",
    "choices": [
      "15",
      "17",
      "13",
      "19"
    ]
  },
  {
    "id": "g6:hard:76",
    "grade": 6,
    "difficulty": "hard",
    "num": 76,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 7 : 5 : 2 ถ้าลูกอายุ 4 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "10",
    "choices": [
      "10",
      "12",
      "8",
      "14"
    ]
  },
  {
    "id": "g6:hard:77",
    "grade": 6,
    "difficulty": "hard",
    "num": 77,
    "question": "ผสมสีน้ำเงินกับสีเหลืองในอัตราส่วน 2 : 6 ถ้าต้องการสีน้ำเงิน 6 ลิตร จะต้องใช้สีเหลืองกี่ลิตร",
    "correctAnswer": "18",
    "choices": [
      "18",
      "20",
      "16",
      "22"
    ]
  },
  {
    "id": "g6:hard:78",
    "grade": 6,
    "difficulty": "hard",
    "num": 78,
    "question": "จำนวนเงินฝากธนาคาร 10000 บาท ได้ดอกเบี้ย 3% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "10300.0",
    "choices": [
      "10300.0",
      "10305.0",
      "10295.0",
      "10310.0"
    ]
  },
  {
    "id": "g6:hard:79",
    "grade": 6,
    "difficulty": "hard",
    "num": 79,
    "question": "จำนวนเงินฝากธนาคาร 5000 บาท ได้ดอกเบี้ย 5% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "5250.0",
    "choices": [
      "5250.0",
      "5255.0",
      "5245.0",
      "5260.0"
    ]
  },
  {
    "id": "g6:hard:80",
    "grade": 6,
    "difficulty": "hard",
    "num": 80,
    "question": "จำนวนเงินฝากธนาคาร 10000 บาท ได้ดอกเบี้ย 2% ต่อปี เมื่อฝากครบ 1 ปี จะมีเงินรวมทั้งหมดกี่บาท",
    "correctAnswer": "10200.0",
    "choices": [
      "10200.0",
      "10205.0",
      "10195.0",
      "10210.0"
    ]
  },
  {
    "id": "g6:hard:81",
    "grade": 6,
    "difficulty": "hard",
    "num": 81,
    "question": "นักเรียนสอบได้คะแนน 52 จากคะแนนเต็ม 80 คิดเป็นร้อยละเท่าไร (ทศนิยม 2 ตำแหน่ง)",
    "correctAnswer": "65.0",
    "choices": [
      "65.0",
      "66.0",
      "64.0",
      "67.0"
    ]
  },
  {
    "id": "g6:hard:82",
    "grade": 6,
    "difficulty": "hard",
    "num": 82,
    "question": "ผสมสีน้ำเงินกับสีเหลืองในอัตราส่วน 4 : 4 ถ้าต้องการสีน้ำเงิน 12 ลิตร จะต้องใช้สีเหลืองกี่ลิตร",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  },
  {
    "id": "g6:hard:83",
    "grade": 6,
    "difficulty": "hard",
    "num": 83,
    "question": "ผสมสีน้ำเงินกับสีเหลืองในอัตราส่วน 5 : 2 ถ้าต้องการสีน้ำเงิน 10 ลิตร จะต้องใช้สีเหลืองกี่ลิตร",
    "correctAnswer": "4",
    "choices": [
      "4",
      "6",
      "2",
      "8"
    ]
  },
  {
    "id": "g6:hard:84",
    "grade": 6,
    "difficulty": "hard",
    "num": 84,
    "question": "สินค้าราคาทุน 200 บาท ตั้งราคาขายเพิ่มขึ้น 25% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "250.0",
    "choices": [
      "250.0",
      "255.0",
      "245.0",
      "260.0"
    ]
  },
  {
    "id": "g6:hard:85",
    "grade": 6,
    "difficulty": "hard",
    "num": 85,
    "question": "สินค้าราคาทุน 500 บาท ตั้งราคาขายเพิ่มขึ้น 15% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "575.0",
    "choices": [
      "575.0",
      "580.0",
      "570.0",
      "585.0"
    ]
  },
  {
    "id": "g6:hard:86",
    "grade": 6,
    "difficulty": "hard",
    "num": 86,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 5 : 4 : 1 ถ้าลูกอายุ 6 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "24",
    "choices": [
      "24",
      "29",
      "19",
      "34"
    ]
  },
  {
    "id": "g6:hard:87",
    "grade": 6,
    "difficulty": "hard",
    "num": 87,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 4 : 3 : 1 ถ้าลูกอายุ 7 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "21",
    "choices": [
      "21",
      "26",
      "16",
      "31"
    ]
  },
  {
    "id": "g6:hard:88",
    "grade": 6,
    "difficulty": "hard",
    "num": 88,
    "question": "สินค้าราคาทุน 600 บาท ตั้งราคาขายเพิ่มขึ้น 20% จากราคาทุน จงหาราคาขาย",
    "correctAnswer": "720.0",
    "choices": [
      "720.0",
      "725.0",
      "715.0",
      "730.0"
    ]
  },
  {
    "id": "g6:hard:89",
    "grade": 6,
    "difficulty": "hard",
    "num": 89,
    "question": "ผสมสีน้ำเงินกับสีเหลืองในอัตราส่วน 5 : 2 ถ้าต้องการสีน้ำเงิน 20 ลิตร จะต้องใช้สีเหลืองกี่ลิตร",
    "correctAnswer": "8",
    "choices": [
      "8",
      "10",
      "6",
      "12"
    ]
  },
  {
    "id": "g6:hard:90",
    "grade": 6,
    "difficulty": "hard",
    "num": 90,
    "question": "อัตราส่วนของอายุ พ่อ แม่ และลูก เป็น 4 : 3 : 1 ถ้าลูกอายุ 4 ปี แม่จะอายุกี่ปี",
    "correctAnswer": "12",
    "choices": [
      "12",
      "14",
      "10",
      "16"
    ]
  }
];
