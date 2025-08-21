export interface SpaLocation {
  id: string;
  name: {
    en: string;
    vi: string;
    ja: string;
  };
  address: {
    en: string;
    vi: string;
    ja: string;
  };
  phone: string;
  capacity: number;
  image: string;
  features: {
    en: string[];
    vi: string[];
    ja: string[];
  };
  openHours: {
    en: string;
    vi: string;
    ja: string;
  };
  slug: string;
}

export interface SpaService {
  id: string;
  name: {
    en: string;
    vi: string;
    ja: string;
  };
  duration: number; // in minutes
  price: number;
  originalPrice?: number; // For promotions
  category: {
    en: string;
    vi: string;
    ja: string;
  };
  description: {
    en: string;
    vi: string;
    ja: string;
  };
  benefits: {
    en: string[];
    vi: string[];
    ja: string[];
  };
  image?: string;
  isPromotion?: boolean;
  isHot?: boolean;
  validUntil?: string; // ISO date string - for promotions
  slug: string;
}



export const spaLocations: SpaLocation[] = [
  {
    id: "1",
    name: {
      en: "Orient Spa Hanoi - Old Quarter",
      vi: "Orient Spa Hà Nội - Phố Cổ",
      ja: "オリエントスパハノイ - 旧市街"
    },
    address: {
      en: "21 Hang Bac Street, Hoan Kiem District, Hanoi",
      vi: "21 Phố Hàng Bạc, Quận Hoàn Kiếm, Hà Nội",
      ja: "ハノイ市ホアンキエム区ハンバック通り21番地"
    },
    phone: "+84 24 3828 8889",
    capacity: 8,
    image: "/images/spa-location-1.jpg",
    features: {
      en: [
        "Single/double/triple rooms available",
        "Traditional Vietnamese massage",
        "Foot massage specialists",
        "Organic products only"
      ],
      vi: [
        "Phòng đơn/đôi/ba có sẵn",
        "Massage truyền thống Việt Nam",
        "Chuyên gia massage chân",
        "Chỉ sử dụng sản phẩm hữu cơ"
      ],
      ja: [
        "シングル/ダブル/トリプルルーム完備",
        "ベトナム伝統マッサージ",
        "フットマッサージ専門",
        "オーガニック製品のみ使用"
      ]
    },
    openHours: {
      en: "Daily: 10:00 AM - 10:00 PM",
      vi: "Hàng ngày: 10:00 - 22:00",
      ja: "毎日: 10:00 - 22:00"
    },
    slug: "old-quarter"
  },
  {
    id: "2",
    name: {
      en: "Orient Spa Hanoi - Ta Hien",
      vi: "Orient Spa Hà Nội - Tạ Hiện",
      ja: "オリエントスパハノイ - タヒエン"
    },
    address: {
      en: "15 Ta Hien Street, Hoan Kiem District, Hanoi",
      vi: "15 Phố Tạ Hiện, Quận Hoàn Kiếm, Hà Nội",
      ja: "ハノイ市ホアンキエム区タヒエン通り15番地"
    },
    phone: "+84 24 3828 7777",
    capacity: 6,
    image: "/images/spa-location-2.jpg",
    features: {
      en: [
        "Couple's treatment rooms",
        "Aromatherapy specialists",
        "Hot stone massage",
        "Premium location"
      ],
      vi: [
        "Phòng trị liệu cho cặp đôi",
        "Chuyên gia thơm liệu",
        "Massage đá nóng",
        "Vị trí cao cấp"
      ],
      ja: [
        "カップル専用トリートメントルーム",
        "アロマセラピー専門",
        "ホットストーンマッサージ",
        "プレミアムロケーション"
      ]
    },
    openHours: {
      en: "Daily: 10:00 AM - 10:00 PM",
      vi: "Hàng ngày: 10:00 - 22:00",
      ja: "毎日: 10:00 - 22:00"
    },
    slug: "ta-hien"
  },
  {
    id: "3",
    name: {
      en: "Orient Spa Hanoi - Luong Ngoc Quyen",
      vi: "Orient Spa Hà Nội - Lương Ngọc Quyến",
      ja: "オリエントスパハノイ - ルオンゴックケン"
    },
    address: {
      en: "8 Luong Ngoc Quyen Street, Hoan Kiem District, Hanoi",
      vi: "8 Phố Lương Ngọc Quyến, Quận Hoàn Kiếm, Hà Nội",
      ja: "ハノイ市ホアンキエム区ルオンゴックケン通り8番地"
    },
    phone: "+84 24 3828 6666",
    capacity: 10,
    image: "/images/spa-location-3.jpg",
    features: {
      en: [
        "Largest location",
        "VIP treatment rooms",
        "Full body treatments",
        "Group bookings welcome"
      ],
      vi: [
        "Chi nhánh lớn nhất",
        "Phòng trị liệu VIP",
        "Liệu pháp toàn thân",
        "Chào đón nhóm khách"
      ],
      ja: [
        "最大の店舗",
        "VIPトリートメントルーム",
        "全身トリートメント",
        "グループ予約歓迎"
      ]
    },
    openHours: {
      en: "Daily: 10:00 AM - 10:00 PM",
      vi: "Hàng ngày: 10:00 - 22:00",
      ja: "毎日: 10:00 - 22:00"
    },
    slug: "luong-ngoc-quyen"
  }
];

export const promotionPackages: SpaService[] = [
  {
    id: "promo-1",
    name: {
      en: "Body & Foot Massage - 105min",
      vi: "Massage Toàn Thân & Chân - 105 phút",
      ja: "ボディ&フットマッサージ - 105分"
    },
    duration: 105,
    originalPrice: 1500000,
    price: 1200000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "A complete relaxation experience combining full body massage with specialized foot treatment",
      vi: "Trải nghiệm thư giãn hoàn toàn kết hợp massage toàn thân với liệu pháp chân chuyên biệt",
      ja: "全身マッサージと専門フットトリートメントを組み合わせた完全なリラクゼーション体験"
    },
    benefits: {
      en: [
        "Body Massage 75 minutes",
        "Foot massage/treatment 30 minutes",
        "Choice of Aroma, Thai, Deep Tissue or Hotstone Massage"
      ],
      vi: [
        "Massage toàn thân 75 phút",
        "Massage/liệu pháp chân 30 phút",
        "Lựa chọn Aroma, Thái, Deep Tissue hoặc Hotstone Massage"
      ],
      ja: [
        "ボディマッサージ75分",
        "フットマッサージ/トリートメント30分",
        "アロマ、タイ、ディープティッシュ、ホットストーンマッサージから選択"
      ]
    },
    image: "/images/promotions/4912d86776594b171a8c8e711813b796.jpg",
    isPromotion: true,
    isHot: true,
    validUntil: "2025-08-31",
    slug: "body-foot-massage"
  },
  {
    id: "promo-2",
    name: {
      en: "Body & Facial Care - 120min",
      vi: "Massage Toàn Thân & Chăm Sóc Da Mặt - 120 phút",
      ja: "ボディ&フェイシャルケア - 120分"
    },
    duration: 120,
    originalPrice: 1800000,
    price: 1400000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "Combined body massage and facial care for complete wellness experience",
      vi: "Kết hợp massage toàn thân và chăm sóc da mặt cho trải nghiệm chăm sóc sức khỏe toàn diện",
      ja: "ボディマッサージとフェイシャルケアを組み合わせた完全なウェルネス体験"
    },
    benefits: {
      en: [
        "Body Massage 75 minutes",
        "Facial care 45 minutes",
        "Choice of Aroma, Thai, Deep Tissue or Hotstone Massage"
      ],
      vi: [
        "Massage toàn thân 75 phút",
        "Chăm sóc da mặt 45 phút",
        "Lựa chọn Aroma, Thái, Deep Tissue hoặc Hotstone Massage"
      ],
      ja: [
        "ボディマッサージ75分",
        "フェイシャルケア45分",
        "アロマ、タイ、ディープティッシュ、ホットストーンマッサージから選択"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: false,
    validUntil: "2025-08-31",
    slug: "body-facial-care"
  },
  {
    id: "promo-3",
    name: {
      en: "Scrub & Body Massage - 130min",
      vi: "Tẩy Tế Bào Chết & Massage Toàn Thân - 130 phút",
      ja: "スクラブ&ボディマッサージ - 130分"
    },
    duration: 130,
    originalPrice: 2000000,
    price: 1600000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "Deep exfoliation followed by relaxing full body massage treatment",
      vi: "Tẩy tế bào chết sâu kết hợp với massage toàn thân thư giãn",
      ja: "深いスクラブの後にリラクシングなフルボディマッサージトリートメント"
    },
    benefits: {
      en: [
        "Body scrub 40 minutes",
        "Body massage 90 minutes",
        "Unlimited choice for body massage types"
      ],
      vi: [
        "Tẩy tế bào chết toàn thân 40 phút",
        "Massage toàn thân 90 phút",
        "Không giới hạn lựa chọn loại massage toàn thân"
      ],
      ja: [
        "ボディスクラブ40分",
        "ボディマッサージ90分",
        "ボディマッサージタイプの選択無制限"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: false,
    validUntil: "2025-08-31",
    slug: "scrub-body-massage"
  },
  {
    id: "promo-4",
    name: {
      en: "Healing Touch Package - 180min",
      vi: "Gói Liệu Pháp Chữa Lành - 180 phút",
      ja: "ヒーリングタッチパッケージ - 180分"
    },
    duration: 180,
    originalPrice: 2800000,
    price: 2200000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "Complete healing experience with multiple treatments for ultimate relaxation",
      vi: "Trải nghiệm chữa lành hoàn chỉnh với nhiều liệu pháp để thư giãn tối đa",
      ja: "究極のリラクゼーションのための複数のトリートメントによる完全なヒーリング体験"
    },
    benefits: {
      en: [
        "Foot scrub 10 minutes",
        "Sauna/ Herbal bath 20 minutes",
        "Body massage 90 minutes",
        "Ori Hair-wash 60 minutes"
      ],
      vi: [
        "Tẩy tế bào chết chân 10 phút",
        "Sauna/ Tắm thảo dược 20 phút",
        "Massage toàn thân 90 phút",
        "Gội đầu Ori 60 phút"
      ],
      ja: [
        "フットスクラブ10分",
        "サウナ/ハーブバス20分",
        "ボディマッサージ90分",
        "Oriヘアウォッシュ60分"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: true,
    validUntil: "2025-08-31",
    slug: "healing-touch-package"
  },
  {
    id: "promo-5",
    name: {
      en: "Pampering Package - 285min",
      vi: "Gói Nuông Chiều Toàn Diện - 285 phút",
      ja: "パンパリングパッケージ - 285分"
    },
    duration: 285,
    originalPrice: 4000000,
    price: 3200000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "Ultimate pampering experience with comprehensive spa treatments for full day relaxation",
      vi: "Trải nghiệm nuông chiều tối thượng với các liệu pháp spa toàn diện cho cả ngày thư giãn",
      ja: "一日中リラクゼーションのための包括的なスパトリートメントによる究極のパンパリング体験"
    },
    benefits: {
      en: [
        "Body Scrub 40 minutes",
        "Herbal Bath 20 minutes",
        "Signature Massage 90 minutes",
        "Deep Cleansing Facial 75 minutes",
        "Spa Foot Care/Nails (Manicure/ Pedicure)"
      ],
      vi: [
        "Tẩy tế bào chết toàn thân 40 phút",
        "Tắm thảo dược 20 phút",
        "Massage đặc trưng 90 phút",
        "Chăm sóc da mặt làm sạch sâu 75 phút",
        "Chăm sóc chân Spa/Móng (Manicure/Pedicure)"
      ],
      ja: [
        "ボディスクラブ40分",
        "ハーブバス20分",
        "シグネチャーマッサージ90分",
        "ディープクレンジングフェイシャル75分",
        "スパフットケア/ネイル（マニキュア/ペディキュア）"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: true,
    validUntil: "2025-08-31",
    slug: "pampering-package"
  }
];

export const spaServices: SpaService[] = [
  {
    id: "promo-1",
    name: {
      en: "Body & Foot Massage Combo - 105min",
      vi: "Combo Massage Toàn Thân & Chân - 105 phút",
      ja: "ボディ&フットマッサージコンボ - 105分"
    },
    duration: 105,
    originalPrice: 1500000,
    price: 1200000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "A complete relaxation experience combining full body massage with specialized foot treatment",
      vi: "Trải nghiệm thư giãn hoàn toàn kết hợp massage toàn thân với liệu pháp chân chuyên biệt",
      ja: "全身マッサージと専門フットトリートメントを組み合わせた完全なリラクゼーション体験"
    },
    benefits: {
      en: [
        "Body Massage 75 minutes",
        "Foot massage/treatment 30 minutes",
        "Choice of Aroma, Thai, Deep Tissue or Hotstone Massage",
        "Save 300,000 VND"
      ],
      vi: [
        "Massage toàn thân 75 phút",
        "Massage/liệu pháp chân 30 phút",
        "Lựa chọn Aroma, Thái, Deep Tissue hoặc Hotstone Massage",
        "Tiết kiệm 300,000 VND"
      ],
      ja: [
        "ボディマッサージ75分",
        "フットマッサージ/トリートメント30分",
        "アロマ、タイ、ディープティッシュ、ホットストーンマッサージから選択",
        "300,000 VND節約"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: true,
    validUntil: "2024-12-31",
    slug: "body-foot-massage-combo-105min"
  },
  {
    id: "promo-2",
    name: {
      en: "Signature Facial Treatment - 90min",
      vi: "Liệu Pháp Chăm Sóc Da Mặt Đặc Biệt - 90 phút",
      ja: "シグネチャーフェイシャルトリートメント - 90分"
    },
    duration: 90,
    originalPrice: 1200000,
    price: 950000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "Rejuvenate your skin with our premium facial treatment using organic products",
      vi: "Làm tươi trẻ làn da với liệu pháp chăm sóc da mặt cao cấp sử dụng sản phẩm hữu cơ",
      ja: "オーガニック製品を使用したプレミアムフェイシャルトリートメントで肌を若返らせます"
    },
    benefits: {
      en: [
        "Deep cleansing 15 minutes",
        "Exfoliation and extraction 20 minutes",
        "Organic mask treatment 30 minutes",
        "Facial massage 25 minutes",
        "Save 250,000 VND"
      ],
      vi: [
        "Làm sạch sâu 15 phút",
        "Tẩy tế bào chết và làm sạch lỗ chân lông 20 phút",
        "Đắp mặt nạ hữu cơ 30 phút",
        "Massage mặt 25 phút",
        "Tiết kiệm 250,000 VND"
      ],
      ja: [
        "ディープクレンジング15分",
        "角質除去と抽出20分",
        "オーガニックマスクトリートメント30分",
        "フェイシャルマッサージ25分",
        "250,000 VND節約"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: false,
    validUntil: "2024-11-30",
    slug: "signature-facial-treatment-90min"
  },
  {
    id: "promo-3",
    name: {
      en: "Couples Spa Package - 120min",
      vi: "Gói Spa Dành Cho Cặp Đôi - 120 phút",
      ja: "カップルスパパッケージ - 120分"
    },
    duration: 120,
    originalPrice: 2800000,
    price: 2200000,
    category: {
      en: "Promotion Package",
      vi: "Gói Khuyến Mãi",
      ja: "プロモーションパッケージ"
    },
    description: {
      en: "Perfect romantic experience for couples with side-by-side treatments",
      vi: "Trải nghiệm lãng mạn hoàn hảo cho các cặp đôi với liệu pháp cạnh nhau",
      ja: "カップルでのサイドバイサイドトリートメントで完璧なロマンチック体験"
    },
    benefits: {
      en: [
        "Welcome drink and fruits",
        "Full body massage 90 minutes each",
        "Private couple treatment room",
        "Complimentary rose petals decoration",
        "Save 600,000 VND"
      ],
      vi: [
        "Đồ uống chào mừng và trái cây",
        "Massage toàn thân 90 phút mỗi người",
        "Phòng trị liệu riêng cho cặp đôi",
        "Trang trí cánh hoa hồng miễn phí",
        "Tiết kiệm 600,000 VND"
      ],
      ja: [
        "ウェルカムドリンクとフルーツ",
        "全身マッサージ各90分",
        "プライベートカップルトリートメントルーム",
        "無料のバラの花びらデコレーション",
        "600,000 VND節約"
      ]
    },
    image: "/images/promotions/1778e314640f2068c1a75a9074cfeea6.jpg",
    isPromotion: true,
    isHot: true,
    validUntil: "2024-12-25",
    slug: "couples-spa-package-120min"
  },

  {
    id: "1",
    name: {
      en: "Traditional Vietnamese Massage",
      vi: "Massage Truyền Thống Việt Nam",
      ja: "ベトナム伝統マッサージ"
    },
    duration: 60,
    price: 400000,
    category: {
      en: "Body Massage",
      vi: "Massage Toàn Thân",
      ja: "ボディマッサージ"
    },
    description: {
      en: "Authentic Vietnamese massage techniques using traditional methods passed down through generations",
      vi: "Kỹ thuật massage Việt Nam đích thực sử dụng phương pháp truyền thống được truyền qua nhiều thế hệ",
      ja: "世代を超えて受け継がれた伝統的な手法を用いた本格的なベトナムマッサージ"
    },
    benefits: {
      en: ["Improves blood circulation", "Relieves muscle tension", "Reduces stress", "Promotes relaxation"],
      vi: ["Cải thiện tuần hoàn máu", "Giảm căng thẳng cơ bắp", "Giảm stress", "Thúc đẩy thư giãn"],
      ja: ["血行促進", "筋肉の緊張緩和", "ストレス軽減", "リラクゼーション促進"]
    },
    isPromotion: false,
    slug: "traditional-vietnamese-massage"
  },
  {
    id: "2",
    name: {
      en: "Aroma Oil Massage",
      vi: "Massage Tinh Dầu Thơm",
      ja: "アロマオイルマッサージ"
    },
    duration: 75,
    price: 500000,
    category: {
      en: "Aromatherapy",
      vi: "Liệu Pháp Thơm",
      ja: "アロマセラピー"
    },
    description: {
      en: "Relaxing massage using premium essential oils to soothe both body and mind",
      vi: "Massage thư giãn sử dụng tinh dầu cao cấp để xoa dịu cả cơ thể và tinh thần",
      ja: "プレミアムエッセンシャルオイルを使用して心身を癒すリラクシングマッサージ"
    },
    benefits: {
      en: ["Deep relaxation", "Nourishes skin", "Aromatherapy benefits", "Stress relief"],
      vi: ["Thư giãn sâu", "Nuôi dưỡng da", "Lợi ích liệu pháp thơm", "Giảm căng thẳng"],
      ja: ["深いリラクゼーション", "肌の栄養補給", "アロマセラピー効果", "ストレス緩和"]
    },
    isPromotion: false,
    slug: "aroma-oil-massage"
  },
  {
    id: "3",
    name: {
      en: "Hot Stone Massage",
      vi: "Massage Đá Nóng",
      ja: "ホットストーンマッサージ"
    },
    duration: 90,
    price: 650000,
    category: {
      en: "Therapeutic Massage",
      vi: "Massage Trị Liệu",
      ja: "セラピューティックマッサージ"
    },
    description: {
      en: "Therapeutic massage using heated volcanic stones to penetrate deep into muscles",
      vi: "Massage trị liệu sử dụng đá núi lửa được nung nóng để thẩm thấu sâu vào cơ bắp",
      ja: "加熱した火山石を使用して筋肉の深部まで浸透するセラピューティックマッサージ"
    },
    benefits: {
      en: ["Deep muscle relaxation", "Improved circulation", "Pain relief", "Mental tranquility"],
      vi: ["Thư giãn cơ bắp sâu", "Cải thiện tuần hoàn", "Giảm đau", "Bình tĩnh tinh thần"],
      ja: ["深層筋肉のリラクゼーション", "血行改善", "痛み緩和", "精神の安らぎ"]
    },
    isPromotion: false,
    slug: "hot-stone-massage"
  },
  {
    id: "4",
    name: {
      en: "Foot Massage & Reflexology",
      vi: "Massage Chân & Phản Xạ Học",
      ja: "フットマッサージ&反射療法"
    },
    duration: 45,
    price: 300000,
    category: {
      en: "Foot Care",
      vi: "Chăm Sóc Chân",
      ja: "フットケア"
    },
    description: {
      en: "Specialized foot massage targeting pressure points to promote overall wellness",
      vi: "Massage chân chuyên biệt tập trung vào các huyệt đạo để thúc đẩy sức khỏe tổng thể",
      ja: "全身の健康促進のためのツボを集中的にケアする専門的なフットマッサージ"
    },
    benefits: {
      en: ["Relieves foot pain", "Improves sleep quality", "Boosts energy", "Enhances circulation"],
      vi: ["Giảm đau chân", "Cải thiện chất lượng giấc ngủ", "Tăng cường năng lượng", "Tăng cường tuần hoàn"],
      ja: ["足の痛み緩和", "睡眠の質向上", "エネルギー向上", "血行促進"]
    },
    isPromotion: false,
    slug: "foot-massage-reflexology"
  },
  {
    id: "5",
    name: {
      en: "Deep Tissue Massage",
      vi: "Massage Mô Sâu",
      ja: "ディープティッシュマッサージ"
    },
    duration: 90,
    price: 600000,
    category: {
      en: "Therapeutic Massage",
      vi: "Massage Trị Liệu",
      ja: "セラピューティックマッサージ"
    },
    description: {
      en: "Intensive massage targeting deep muscle layers to relieve chronic tension and pain",
      vi: "Massage chuyên sâu nhắm vào các lớp cơ sâu để giảm căng thẳng và đau mãn tính",
      ja: "慢性的な緊張と痛みを和らげるために深層筋をターゲットにした集中的なマッサージ"
    },
    benefits: {
      en: ["Releases chronic tension", "Improves posture", "Reduces inflammation", "Enhances mobility"],
      vi: ["Giải phóng căng thẳng mãn tính", "Cải thiện tư thế", "Giảm viêm", "Tăng cường khả năng vận động"],
      ja: ["慢性的緊張の解放", "姿勢改善", "炎症軽減", "可動性向上"]
    },
    isPromotion: false,
    slug: "deep-tissue-massage"
  },
  {
    id: "6",
    name: {
      en: "Facial Treatment",
      vi: "Chăm Sóc Da Mặt",
      ja: "フェイシャルトリートメント"
    },
    duration: 60,
    price: 450000,
    category: {
      en: "Facial Care",
      vi: "Chăm Sóc Da Mặt",
      ja: "フェイシャルケア"
    },
    description: {
      en: "Comprehensive facial treatment to cleanse, nourish and rejuvenate your skin",
      vi: "Liệu pháp chăm sóc da mặt toàn diện để làm sạch, nuôi dưỡng và trẻ hóa làn da",
      ja: "肌を清潔にし、栄養を与え、若返らせる包括的なフェイシャルトリートメント"
    },
    benefits: {
      en: ["Deep skin cleansing", "Anti-aging effects", "Hydrates skin", "Improves skin texture"],
      vi: ["Làm sạch sâu da", "Hiệu quả chống lão hóa", "Cấp ẩm cho da", "Cải thiện kết cấu da"],
      ja: ["深層肌クレンジング", "アンチエイジング効果", "肌の保湿", "肌質改善"]
    },
    isPromotion: false,
    slug: "facial-treatment"
  }
];

export const getSpaLocationBySlug = (slug: string): SpaLocation | undefined => {
  return spaLocations.find(location => location.slug === slug);
};

export const getSpaLocationsByLocale = (locale: 'en' | 'vi' | 'ja' = 'en'): SpaLocation[] => {
  return spaLocations;
};

// Helper functions
export const getSpaServiceBySlug = (slug: string): SpaService | undefined => {
  return spaServices.find(service => service.slug === slug);
};

export const getSpaServicesByLocale = (locale: 'en' | 'vi' | 'ja' = 'en'): SpaService[] => {
  return spaServices;
};

export const getSpaServicesByCategory = (category: string, locale: 'en' | 'vi' | 'ja' = 'en'): SpaService[] => {
  return spaServices.filter(service =>
    service.category[locale].toLowerCase().includes(category.toLowerCase())
  );
};

// Get promotion packages
export const getPromotionServices = (locale: 'en' | 'vi' | 'ja' = 'en'): SpaService[] => {
  return promotionPackages;
};

// Get only regular services (non-promotion)
export const getRegularServices = (locale: 'en' | 'vi' | 'ja' = 'en'): SpaService[] => {
  return spaServices.filter(service => service.isPromotion === false);
};

// Get hot/featured services
export const getHotServices = (locale: 'en' | 'vi' | 'ja' = 'en'): SpaService[] => {
  return promotionPackages.filter(service => service.isHot === true);
};

// Get promotion by slug
export const getPromotionBySlug = (slug: string): SpaService | undefined => {
  return promotionPackages.find(service => service.slug === slug);
};

// Backward compatibility aliases
export const promotionServices = promotionPackages;
export const getPromotionsByLocale = getPromotionServices;
