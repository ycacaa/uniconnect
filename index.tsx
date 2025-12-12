
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  MapPin, Wallet, ShoppingCart, ArrowRight, Printer, Shirt, Bike, 
  CreditCard, ExternalLink, Bot, X, Send, Mail, Lock, User, GraduationCap,
  Shield, CheckCircle, Smartphone, Star, Wind, Wifi, Zap, Bath, Home
} from 'lucide-react';

// ==========================================
// 1. TIPE DATA & INTERFACE
// ==========================================

interface ServiceData {
  title: string;
  items: string[];
}

interface PaymentData {
  title: string;
  details: string;
  items?: string[];
  actionLabel: string;
  actionUrl?: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

interface Review {
  user: string;
  comment: string;
  rating: number;
  date: string;
}

interface KosanData {
  id: string;
  name: string;
  type: 'Putra' | 'Putri' | 'Campur';
  price: string;
  distance: string;
  rating: number;
  image: string;
  facilities: string[];
  description: string;
  reviews: Review[];
}

// ==========================================
// 2. LAYANAN AI (GEMINI)
// ==========================================

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const generateCampusResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "Mode Demo: API Key belum diatur. Namun sistem UI berjalan normal.";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `Anda adalah 'UniConnect AI', asisten virtual cerdas untuk mahasiswa.
    Gaya bicara: Santai, gaul, membantu, khas mahasiswa Indonesia.
    
    Pengetahuan Khusus:
    - Anda tahu tentang fitur 'Kosan Terlaris' di aplikasi ini (Griya Cendekia, Wisma Melati, Kost Executive).
    - Jika user tanya kos, rekomendasikan berdasarkan budget atau fasilitas.
    
    Tugas: Bantu cari kos, tips hemat, info kampus, dan rekomendasi makanan.
    Jawaban: Pendek, padat, maksimal 3 paragraf. Gunakan emoji sesekali.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Waduh, koneksi lagi lemot nih. Tanya lagi dong kak!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf kak, server AI lagi sibuk. Coba refresh ya!";
  }
};

// ==========================================
// 3. HALAMAN LOGIN (AUTH)
// ==========================================

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi koneksi aman
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-poppins">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">
        
        {/* Sisi Kiri - Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30 shadow-lg">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">UniConnect</h1>
            </div>
            <p className="text-blue-100 text-lg font-light tracking-wide">University Life Made Easy.</p>
          </div>

          <div className="relative z-10 my-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md">
              {isLogin ? 'Selamat Datang!' : 'Mulai Sekarang!'}
            </h2>
            <p className="text-blue-100 max-w-md text-lg leading-relaxed opacity-90">
              Satu akun untuk akses ke seluruh layanan kampus, pembayaran UKT, dan pencarian kos.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs font-medium text-blue-200 uppercase tracking-widest opacity-80">
            <Shield className="w-4 h-4" />
            Secure & Encrypted Connection
          </div>
        </div>

        {/* Sisi Kanan - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-slate-800">
                {isLogin ? 'Masuk' : 'Daftar'}
              </h3>
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                <Lock className="w-3 h-3" />
                HTTPS Secured
              </div>
            </div>
            
            <p className="text-slate-500 mb-8">
              {isLogin ? 'Masukkan email dan kata sandi mahasiswa Anda.' : 'Isi data diri untuk akses penuh.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              )}
              
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Kampus (@univ.ac.id)" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Kata Sandi" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                />
              </div>

              {isLogin && (
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300" />
                    Ingat Saya
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Lupa Sandi?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Menghubungkan...
                  </span>
                ) : (
                  <>
                    {isLogin ? 'Masuk Portal' : 'Buat Akun'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
              <p className="text-slate-500">
                {isLogin ? 'Mahasiswa baru? ' : 'Sudah punya akun? '}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-bold hover:underline focus:outline-none ml-1"
                >
                  {isLogin ? 'Daftar Disini' : 'Masuk Disini'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. DASHBOARD UTAMA
// ==========================================

const Dashboard: React.FC = () => {
  // --- Data Dummy Kosan ---
  const kosanData: KosanData[] = [
    {
      id: "kos1",
      name: "Griya Cendekia Premium",
      type: "Putri",
      price: "Rp 1.500.000",
      distance: "200m dari Kampus",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      facilities: ["AC", "WiFi Kencang", "K. Mandi Dalam", "Dapur Bersama", "Parkir Luas"],
      description: "Kos eksklusif khusus putri dengan keamanan 24 jam. Lingkungan tenang sangat cocok untuk belajar. Tersedia layanan laundry kiloan di lantai dasar.",
      reviews: [
        { user: "Sari M.", comment: "Tempatnya bersih banget, ibu kosnya ramah.", rating: 5, date: "2 hari lalu" },
        { user: "Dina A.", comment: "WiFi kencang buat nugas, mantap!", rating: 4.5, date: "1 minggu lalu" }
      ]
    },
    {
      id: "kos2",
      name: "Wisma Melati Hemat",
      type: "Campur",
      price: "Rp 850.000",
      distance: "500m dari Kampus",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      facilities: ["Kipas Angin", "WiFi", "K. Mandi Luar", "Bebas Jam Malam"],
      description: "Pilihan terbaik untuk mahasiswa hemat. Lokasi strategis dekat banyak warung makan murah. Gedung baru direnovasi.",
      reviews: [
        { user: "Budi S.", comment: "Murah meriah, sesuai harga.", rating: 4, date: "3 minggu lalu" },
      ]
    },
    {
      id: "kos3",
      name: "Kost Executive 88",
      type: "Putra",
      price: "Rp 2.100.000",
      distance: "100m dari Kampus",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      facilities: ["AC", "Smart TV", "Water Heater", "Gym", "Cleaning Service"],
      description: "Hunian mewah selangkah dari gerbang kampus. Fasilitas lengkap serasa di hotel. Listrik sudah termasuk biaya sewa.",
      reviews: [
        { user: "Kevin J.", comment: "Fasilitas gym-nya oke banget.", rating: 5, date: "Kemarin" },
        { user: "Reza P.", comment: "Agak mahal tapi worth it.", rating: 4.8, date: "1 bulan lalu" }
      ]
    }
  ];

  // --- Data Layanan Lain ---
  const serviceData: Record<string, ServiceData> = {
    laundry: {
      title: "Mitra Laundry Terverifikasi",
      items: [
        "Laundry Kampus UIGM 1 (300m) - ⭐ 4.8",
        "Laundry Bersih Cepat (450m) - Buka 24 Jam",
        "Express Laundry (600m) - Diskon KTM 10%"
      ]
    },
    print: {
      title: "Mitra Print & Photocopy",
      items: [
        "Digital Printing UIGM (Lobby) - ⭐ 4.9",
        "PrintCepat Palembang (250m) - Kirim via WA",
        "Sinar Copy Center (400m) - Jilid Hardcover"
      ]
    },
    ojek: {
      title: "Shelter & Transportasi",
      items: [
        "Shelter Utama UIGM (Gate 1)",
        "Titik Jemput Ojol (Indomaret Seberang)",
        "Halte Transmusi (50m)"
      ]
    }
  };

  const paymentData: Record<string, PaymentData> = {
    gopay: {
      title: "GoPay",
      details: "Pembayaran instan terhubung dengan aplikasi Gojek.",
      actionLabel: "Buka Aplikasi GoPay",
      actionUrl: "https://www.gojek.com/gopay/",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    dana: {
      title: "DANA",
      details: "Dompet digital untuk pembayaran non-tunai yang aman.",
      actionLabel: "Buka Aplikasi DANA",
      actionUrl: "https://link.dana.id/",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    bank: {
      title: "Virtual Account Bank",
      details: "Transfer otomatis diverifikasi sistem.",
      items: ["Bank Mandiri (VA)", "Bank BCA (VA)", "Bank BRI (VA)", "Bank BNI (VA)"],
      actionLabel: "Buat Nomor VA",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  };

  // --- State ---
  const [activePayment, setActivePayment] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedKosan, setSelectedKosan] = useState<KosanData | null>(null);
  
  // AI Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo bestie! 👋 Aku AI UniConnect. Mau cari makan, info kos, atau curhat tugas?', timestamp: Date.now() }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsThinking(true);

    const replyText = await generateCampusResponse(chatInput);
    
    const modelMsg: ChatMessage = { role: 'model', text: replyText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsThinking(false);
  };

  // --- Render Helpers ---
  const renderPaymentContent = () => {
    if (!activePayment) {
      return (
        <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-sm mt-4 animate-fade-in flex items-center justify-center gap-2">
          <Wallet className="w-4 h-4" />
          Pilih metode pembayaran di atas
        </div>
      );
    }
    const data = paymentData[activePayment];
    return (
      <div className={`mt-4 p-5 rounded-xl border ${data.bgColor} ${data.borderColor} animate-fade-in shadow-sm`}>
        <div className="flex justify-between items-start mb-2">
           <h4 className={`font-bold text-lg ${data.color}`}>{data.title}</h4>
           <Shield className={`w-5 h-5 ${data.color} opacity-50`} />
        </div>
        <p className="text-slate-600 text-sm mb-3">{data.details}</p>
        {data.items && (
          <ul className="grid grid-cols-2 gap-2 mb-4">
            {data.items.map((item, idx) => (
              <li key={idx} className="text-xs font-medium bg-white px-2 py-1.5 rounded border border-slate-200 text-slate-600 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> {item}
              </li>
            ))}
          </ul>
        )}
        {data.actionUrl ? (
          <a href={data.actionUrl} target="_blank" rel="noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-bold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ${activePayment === 'gopay' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {data.actionLabel} <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <button onClick={() => alert('Nomor VA: 8800 1234 5678 (Simulasi)')} className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-bold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg bg-red-600 hover:bg-red-700`}>
            {data.actionLabel} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  const renderServiceContent = () => {
    if (!activeService) {
      return (
        <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-sm mt-4 animate-fade-in flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" />
          Pilih kategori layanan
        </div>
      );
    }
    const data = serviceData[activeService];
    return (
      <div className="mt-4 p-5 rounded-xl bg-white border border-slate-200 animate-fade-in shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-5">
           <MapPin className="w-24 h-24 text-blue-600" />
        </div>
        <h4 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2 relative z-10">
          {data.title}
        </h4>
        <ul className="space-y-3 mb-3 relative z-10">
          {data.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 hover:border-blue-300 transition-colors">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full text-xs font-bold text-blue-600 mt-2 hover:underline text-right block relative z-10">
          Lihat di Peta Besar →
        </button>
      </div>
    );
  };

  const getFacilityIcon = (facility: string) => {
    if (facility.includes("WiFi")) return <Wifi className="w-3 h-3" />;
    if (facility.includes("AC")) return <Wind className="w-3 h-3" />;
    if (facility.includes("Mandi")) return <Bath className="w-3 h-3" />;
    if (facility.includes("Listrik")) return <Zap className="w-3 h-3" />;
    return <CheckCircle className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-slate-50">
      {/* Navbar */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 leading-none tracking-tight">UniConnect</h1>
            <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Digital Campus</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Beranda</a>
            <a href="#kosan" className="hover:text-blue-600 transition-colors">Cari Kos</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Layanan</a>
          </nav>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
             <User className="w-full h-full p-1 text-slate-500" />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-white to-slate-100 pt-12 pb-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM ONLINE & SECURE
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Kampus Digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dalam Genggaman</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Platform terintegrasi untuk kebutuhan akademik, pembayaran UKT, hingga mencari kos idaman di sekitar kampus.
          </p>
        </div>
      </section>

      {/* SECTION: Kosan Terlaris (New Feature) */}
      <section id="kosan" className="py-8 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
             <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
               <Home className="text-blue-600" /> Rekomendasi Kos Terlaris
             </h2>
             <p className="text-slate-500 text-sm mt-1">Pilihan favorit mahasiswa dengan rating tinggi.</p>
          </div>
          <a href="#" className="text-sm font-bold text-blue-600 hover:underline hidden md:block">Lihat Semua →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {kosanData.map((kos) => (
             <div key={kos.id} 
                  onClick={() => setSelectedKosan(kos)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden flex flex-col"
             >
                <div className="relative h-48 overflow-hidden">
                   <img src={kos.image} alt={kos.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                     {kos.type}
                   </div>
                   <div className="absolute top-3 right-3 bg-yellow-400 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                     <Star className="w-3 h-3 fill-current" /> {kos.rating}
                   </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                   <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{kos.name}</h3>
                   <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {kos.distance}
                   </p>
                   
                   <div className="flex flex-wrap gap-2 mb-4">
                      {kos.facilities.slice(0, 3).map((fac, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1">
                           {getFacilityIcon(fac)} {fac}
                        </span>
                      ))}
                      {kos.facilities.length > 3 && (
                        <span className="bg-slate-50 border border-slate-200 text-slate-400 px-2 py-1 rounded-md text-[10px] font-medium">
                          +{kos.facilities.length - 3}
                        </span>
                      )}
                   </div>

                   <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400">Mulai dari</p>
                        <p className="text-blue-700 font-bold text-lg">{kos.price}<span className="text-xs font-normal text-slate-500">/bln</span></p>
                      </div>
                      <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Konten Utama Layanan (Existing) */}
      <section id="features" className="py-12 px-6 max-w-7xl mx-auto w-full relative z-20">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Layanan Kampus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Kartu Peta */}
            <div className="bg-white rounded-3xl p-1 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
              <div className="p-5 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 p-2.5 rounded-xl">
                    <MapPin className="text-red-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Peta Kampus</h3>
                    <p className="text-xs text-slate-500">Navigasi area sekitar</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 rounded-2xl overflow-hidden m-2 min-h-[250px] relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127487.22815363892!2d104.748726!3d-2.954794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75fe2bd91f1f%3A0x941938bc0f24bd0e!2sUniversitas%20Indo%20Global%20Mandiri%20(UIGM)%20Palembang!5e0!3m2!1sid!2sid!4v1700000000001"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="University Map"
                    className="absolute inset-0"
                ></iframe>
              </div>
            </div>

            {/* Kartu Pembayaran */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2.5 rounded-xl">
                  <Wallet className="text-green-600 w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-slate-800">Pembayaran</h3>
                   <p className="text-xs text-slate-500">Aman & Terverifikasi</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-2">
                {['gopay', 'dana', 'bank'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setActivePayment(type)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all uppercase ${
                      activePayment === type 
                      ? 'bg-slate-800 text-white border-slate-800 shadow-lg transform scale-105' 
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {renderPaymentContent()}
            </div>

            {/* Kartu Layanan */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-100 p-2.5 rounded-xl">
                  <ShoppingCart className="text-yellow-600 w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-slate-800">Layanan</h3>
                   <p className="text-xs text-slate-500">Cari kebutuhanmu</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2">
                  <button 
                    onClick={() => setActiveService('laundry')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeService === 'laundry' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                  >
                    <Shirt className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Laundry</span>
                  </button>
                  <button 
                    onClick={() => setActiveService('print')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeService === 'print' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                  >
                    <Printer className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Print</span>
                  </button>
                  <button 
                    onClick={() => setActiveService('ojek')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeService === 'ojek' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                  >
                    <Bike className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Ojek</span>
                  </button>
              </div>
              {renderServiceContent()}
            </div>

          </div>
      </section>

      {/* MODAL DETAIL KOSAN */}
      {selectedKosan && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full md:max-w-2xl max-h-[90vh] md:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl relative animate-fade-in-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedKosan(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Banner */}
            <div className="h-56 relative shrink-0">
               <img src={selectedKosan.image} alt={selectedKosan.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-2xl font-bold">{selectedKosan.name}</h3>
                  <p className="opacity-90 flex items-center gap-1 text-sm"><MapPin className="w-4 h-4"/> {selectedKosan.distance}</p>
               </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              
              {/* Features Grid */}
              <div className="mb-6">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Fasilitas Menarik</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedKosan.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm">
                       <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-blue-600">
                          {getFacilityIcon(fac)}
                       </div>
                       {fac}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                 <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Deskripsi</h4>
                 <p className="text-slate-600 text-sm leading-relaxed">{selectedKosan.description}</p>
              </div>

              {/* Reviews */}
              <div className="mb-4">
                 <div className="flex items-center justify-between mb-3">
                   <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Review Penghuni</h4>
                   <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                     <Star className="w-4 h-4 fill-current" /> {selectedKosan.rating}
                   </div>
                 </div>
                 
                 <div className="space-y-3">
                   {selectedKosan.reviews.map((review, idx) => (
                     <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                               {review.user.charAt(0)}
                             </div>
                             <span className="text-xs font-bold text-slate-800">{review.user}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{review.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 italic">"{review.comment}"</p>
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-4 shrink-0">
               <div className="flex-1">
                 <p className="text-xs text-slate-500">Harga Sewa</p>
                 <p className="text-xl font-bold text-blue-700">{selectedKosan.price}</p>
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-transform active:scale-95">
                 <Smartphone className="w-4 h-4" />
                 Hubungi Pemilik
               </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Bot Floating */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="group bg-slate-900 hover:bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 pr-6 ring-4 ring-slate-200"
          >
            <div className="bg-blue-500 p-1.5 rounded-full relative">
               <Bot className="w-5 h-5 text-white" />
               <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div className="text-left hidden md:block">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-0.5">Asisten Pintar</p>
               <p className="text-sm font-bold leading-none">Tanya AI</p>
            </div>
          </button>
        ) : (
          <div className="bg-white w-[90vw] md:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[550px] animate-fade-in-up ring-1 ring-black/5">
            {/* Header Chat */}
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">UniConnect AI</h3>
                  <div className="flex items-center gap-1.5 opacity-80">
                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                     <p className="text-[10px]">Online • Powered by Gemini</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body Chat */}
            <div className="flex-1 bg-slate-50 p-4 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div className="text-center text-xs text-slate-400 my-4">Hari ini</div>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && (
                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                          <Bot className="w-3.5 h-3.5 text-blue-600" />
                       </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1">
                          <Bot className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Chat */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tulis pesan..."
                className="flex-1 bg-slate-100 border-0 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                disabled={isThinking || !chatInput.trim()}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="bg-slate-900 p-1.5 rounded-lg">
               <GraduationCap className="w-5 h-5 text-white" />
             </div>
             <span className="font-bold text-slate-900 text-lg">UniConnect</span>
          </div>
          
          <div className="text-sm text-slate-500 flex gap-6 font-medium">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Help</a>
          </div>
          
          <div className="text-xs text-slate-400 flex items-center gap-2">
             <Lock className="w-3 h-3" />
             <span>SSL Encrypted • 2025 UniConnect</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// 5. MAIN APP
// ==========================================

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="antialiased text-slate-900 bg-white">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
