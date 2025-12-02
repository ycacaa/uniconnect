import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  MapPin, Wallet, ShoppingCart, ArrowRight, Printer, Shirt, Bike, 
  CreditCard, ExternalLink, Bot, X, Send, Mail, Lock, User, GraduationCap 
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

// ==========================================
// 2. LAYANAN AI (GEMINI)
// ==========================================

// Mengambil API Key dari environment
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const generateCampusResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "Maaf, kunci API belum dikonfigurasi. Hubungi administrator.";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `Anda adalah 'UniConnect AI', asisten virtual cerdas untuk mahasiswa.
    Tugas anda adalah membantu mahasiswa dengan masalah sehari-hari seperti:
    - Mencari kos murah
    - Tips hemat uang saku
    - Cara belajar efektif
    - Rekomendasi makanan di sekitar kampus
    
    Jawab dengan gaya bahasa yang santai, ramah, dan khas anak muda Indonesia (menggunakan istilah seperti 'kak', 'guys', 'bestie' jika cocok).
    Jaga jawaban tetap ringkas (maksimal 3 paragraf).`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Maaf, saya sedang tidak bisa berpikir sekarang.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan saat menghubungi server AI. Coba lagi nanti ya!";
  }
};

// ==========================================
// 3. KOMPONEN HALAMAN LOGIN (AUTH PAGE)
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
    // Simulasi loading network
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-poppins">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">
        
        {/* Sisi Kiri - Visual & Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Dekorasi Latar Belakang */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">UniConnect</h1>
            </div>
            <p className="text-blue-100 text-lg font-light tracking-wide">University Life Made Easy.</p>
          </div>

          <div className="relative z-10 my-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
              {isLogin ? 'Selamat Datang!' : 'Ayo Bergabung!'}
            </h2>
            <p className="text-blue-100 max-w-md text-lg leading-relaxed">
              Satu aplikasi untuk semua kebutuhan kampusmu. Cari kos, layanan print, hingga pembayaran praktis.
            </p>
          </div>

          <div className="relative z-10 text-xs font-medium text-blue-200 uppercase tracking-widest opacity-80">
            © 2025 UniConnect Inc.
          </div>
        </div>

        {/* Sisi Kanan - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <h3 className="text-3xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Masuk Akun' : 'Buat Akun Baru'}
            </h3>
            <p className="text-slate-500 mb-8">
              {isLogin ? 'Silakan masukkan kredensial mahasiswa anda.' : 'Lengkapi data diri untuk memulai pengalaman kampusmu.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              )}
              
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Mahasiswa" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Kata Sandi" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {isLogin && (
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    Ingat Saya
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Lupa Kata Sandi?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Memproses...
                  </span>
                ) : (
                  <>
                    {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
              <p className="text-slate-500">
                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
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
// 4. KOMPONEN DASHBOARD UTAMA
// ==========================================

const Dashboard: React.FC = () => {
  // --- Data ---
  const serviceData: Record<string, ServiceData> = {
    laundry: {
      title: "Daftar Mitra Laundry Terdekat:",
      items: [
        "Laundry Kampus UIGM 1 (300m) - Buka 08:00 - 20:00",
        "Laundry Bersih Cepat (450m) - Buka 24 Jam",
        "Express Laundry Kol. H. Burlian (600m) - Promo 5kg pertama!"
      ]
    },
    print: {
      title: "Daftar Mitra Print & Photocopy:",
      items: [
        "Print & Photocopy UIGM (Dalam Kampus) - Harga Mahasiswa",
        "PrintCepat Palembang (250m) - Buka sampai malam",
        "Sinar Copy (400m) - Tersedia layanan jilid"
      ]
    },
    ojek: {
      title: "Ojek Kampus & Transportasi:",
      items: [
        "Ojek Kampus UIGM Gate (100m) - Titik Kumpul Resmi",
        "Grab/Gojek tersedia di sekitar kampus - Cepat dan Aman",
        "Angkutan Kota (Angkot) - Rute Utama"
      ]
    }
  };

  const paymentData: Record<string, PaymentData> = {
    gopay: {
      title: "Pembayaran via GoPay:",
      details: "Anda akan diarahkan ke aplikasi GoPay untuk menyelesaikan transaksi. Pastikan saldo GoPay Anda mencukupi.",
      actionLabel: "Bayar via Aplikasi GoPay",
      actionUrl: "https://www.gojek.com/gopay/",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    dana: {
      title: "Pembayaran via DANA:",
      details: "Anda akan diarahkan ke aplikasi DANA untuk memverifikasi pembayaran. Masukkan PIN DANA Anda untuk konfirmasi.",
      actionLabel: "Bayar via Aplikasi DANA",
      actionUrl: "https://link.dana.id/",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    bank: {
      title: "Pembayaran via Transfer Bank:",
      details: "Pilih salah satu bank di bawah. Nomor virtual account akan dibuat setelah Anda memilih bank.",
      items: [
        "Bank BRI (Virtual Account)",
        "Bank BNI (Virtual Account)",
        "Bank Mandiri (VA)",
        "Bank BCA (VA)"
      ],
      actionLabel: "Tampilkan Virtual Account",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  };

  // --- State ---
  const [activePayment, setActivePayment] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  
  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Aku UniConnect AI. Ada yang bisa aku bantu seputar kampus hari ini?', timestamp: Date.now() }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-sm mt-4 animate-fade-in flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          Pilih salah satu metode di atas untuk simulasi pembayaran.
        </div>
      );
    }
    const data = paymentData[activePayment];
    return (
      <div className={`mt-4 p-5 rounded-xl border ${data.bgColor} ${data.borderColor} animate-fade-in shadow-sm`}>
        <h4 className={`font-bold text-lg mb-2 ${data.color}`}>
          {data.title}
        </h4>
        <p className="text-slate-600 text-sm mb-3">{data.details}</p>
        {data.items && (
          <ul className="list-disc pl-5 text-sm text-slate-700 mb-4 space-y-1">
            {data.items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        )}
        {data.actionUrl ? (
          <a href={data.actionUrl} target="_blank" rel="noreferrer" className={`block w-full text-center py-3 rounded-lg text-white font-bold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ${activePayment === 'gopay' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {data.actionLabel}
          </a>
        ) : (
          <button onClick={() => alert('Simulasi Virtual Account')} className={`block w-full text-center py-3 rounded-lg text-white font-bold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg bg-red-600 hover:bg-red-700`}>
            {data.actionLabel}
          </button>
        )}
      </div>
    );
  };

  const renderServiceContent = () => {
    if (!activeService) {
      return (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm mt-4 animate-fade-in flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Klik tombol di atas untuk melihat detail mitra terdekat!
        </div>
      );
    }
    const data = serviceData[activeService];
    return (
      <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 animate-fade-in shadow-sm">
        <h4 className="font-bold text-blue-800 text-lg mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> {data.title}
        </h4>
        <ul className="space-y-3 mb-3">
          {data.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-blue-500 mt-0.5 font-bold">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 italic text-right">*Aplikasi akan menampilkan rute.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-slate-100 px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-blue-600 leading-none tracking-tight">UniConnect</h1>
            <p className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-0.5">University Life</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors relative group">
            Fitur
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors relative group">
            Tentang
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors relative group">
            Kontak
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
        </nav>
        <button className="md:hidden text-slate-600">
            <span className="text-2xl">☰</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-100 pt-24 pb-24 px-6 text-center relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide shadow-sm border border-blue-100">
            SOLUSI CERDAS MAHASISWA
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Hidup Kampus <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Lebih Mudah & Praktis</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Cari kos, pesan makanan, bayar layanan kampus, hingga tanya asisten AI. Semua terintegrasi dalam satu genggaman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              Unduh Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:-translate-y-1 transition-all w-full sm:w-auto">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Fitur Andalan</h2>
             <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Maps */}
            <div className="group bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-md border border-slate-200 relative">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder loading */}
                 <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127487.22815363892!2d104.748726!3d-2.954794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75fe2bd91f1f%3A0x941938bc0f24bd0e!2sUniversitas%20Indo%20Global%20Mandiri%20(UIGM)%20Palembang!5e0!3m2!1sid!2sid!4v1700000000001"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="University Map"
                    className="relative z-10"
                ></iframe>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 p-2.5 rounded-xl group-hover:bg-red-500 transition-colors duration-300">
                  <MapPin className="text-red-500 w-6 h-6 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Peta Lokasi</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Temukan kos, warung makan, dan UMKM mitra terdekat dengan akurasi GPS. Dilengkapi fitur rute dan estimasi waktu tempuh.
              </p>
            </div>

            {/* Card 2: Payment */}
            <div className="group bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-tr from-white to-blue-50 rounded-2xl p-5 border border-blue-100 mb-6 shadow-inner">
                <strong className="block text-slate-800 mb-4 text-sm uppercase tracking-wider font-bold">Simulasi Pembayaran</strong>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActivePayment('gopay')}
                    className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold border transition-all ${activePayment === 'gopay' ? 'bg-green-100 border-green-500 text-green-700 shadow-sm transform scale-105' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    GoPay
                  </button>
                  <button 
                    onClick={() => setActivePayment('dana')}
                    className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold border transition-all ${activePayment === 'dana' ? 'bg-blue-100 border-blue-500 text-blue-700 shadow-sm transform scale-105' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    DANA
                  </button>
                  <button 
                    onClick={() => setActivePayment('bank')}
                    className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold border transition-all ${activePayment === 'bank' ? 'bg-red-100 border-red-500 text-red-700 shadow-sm transform scale-105' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    Bank
                  </button>
                </div>
                {renderPaymentContent()}
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-2.5 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                    <Wallet className="text-green-600 w-6 h-6 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Transaksi Aman</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pembayaran lancar tanpa tunai melalui e-payment terkemuka. Transaksi terjamin aman dan tercatat rapi.
                </p>
              </div>
            </div>

            {/* Card 3: Services */}
            <div className="group bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-tr from-white to-yellow-50 rounded-2xl p-5 border border-yellow-100 mb-6 shadow-inner">
                 <strong className="block text-slate-800 mb-4 text-sm uppercase tracking-wider font-bold">Cari Layanan</strong>
                 <div className="space-y-2">
                    <button 
                      onClick={() => setActiveService('laundry')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeService === 'laundry' ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-blue-300'}`}
                    >
                      <Shirt className="w-5 h-5" />
                      <span className="font-bold text-sm">Laundry Terdekat</span>
                    </button>
                    <button 
                      onClick={() => setActiveService('print')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeService === 'print' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-indigo-300'}`}
                    >
                      <Printer className="w-5 h-5" />
                      <span className="font-bold text-sm">Printer Terdekat</span>
                    </button>
                    <button 
                       onClick={() => setActiveService('ojek')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeService === 'ojek' ? 'bg-amber-400 text-slate-900 border-amber-400 shadow-md transform scale-[1.02]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-amber-300'}`}
                    >
                      <Bike className="w-5 h-5" />
                      <span className="font-bold text-sm">Ojek Kampus</span>
                    </button>
                 </div>
                 {renderServiceContent()}
              </div>

              <div className="mt-auto">
                 <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-100 p-2.5 rounded-xl group-hover:bg-yellow-500 transition-colors duration-300">
                    <ShoppingCart className="text-yellow-600 w-6 h-6 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Layanan Lengkap</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cari laundry, print, dan ojek dengan cepat langsung dari aplikasi. Hemat waktu, fokus belajar.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="group bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 pr-6"
          >
            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-12 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm hidden md:inline">Tanya UniConnect AI</span>
          </button>
        ) : (
          <div className="bg-white w-[85vw] md:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-fade-in-up ring-1 ring-black/5">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">UniConnect AI</h3>
                  <p className="text-[10px] text-blue-100 opacity-90">Online • Siap Membantu</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Body */}
            <div className="flex-1 bg-slate-50 p-4 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
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
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanya rekomendasi kos..."
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
      <footer className="bg-slate-900 text-white py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 flex justify-center items-center gap-2 opacity-90">
             <GraduationCap className="w-6 h-6 text-blue-400" />
             <h2 className="text-2xl font-bold">UniConnect</h2>
          </div>
          <p className="text-slate-400 text-sm mb-8 uppercase tracking-widest font-medium">University Life Made Easy</p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-slate-300 font-medium">
            <a href="mailto:info@uniconnect.com" className="hover:text-blue-400 transition-colors">Hubungi Kami</a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-400 transition-colors">Gabung Mitra</a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a>
          </div>
          
          <div className="text-xs text-slate-600 border-t border-slate-800 pt-8">
            © 2025 UniConnect. All Rights Reserved. Powered by Teknologi Cerdas & Gemini AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// 5. MAIN APP (LOGIC PINDAH HALAMAN)
// ==========================================

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fungsi Login Sederhana
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

// Render Aplikasi
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
