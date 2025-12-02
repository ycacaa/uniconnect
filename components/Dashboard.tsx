import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Wallet, ShoppingCart, ArrowRight, Printer, Shirt, Bike, CreditCard, ExternalLink, Bot, X, Send } from 'lucide-react';
import { generateCampusResponse } from '../services/geminiService';
import { ServiceData, PaymentData, ChatMessage } from '../types';

const Dashboard: React.FC = () => {
  // --- Data from User's original script ---
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
      color: "bg-green-600"
    },
    dana: {
      title: "Pembayaran via DANA:",
      details: "Anda akan diarahkan ke aplikasi DANA untuk memverifikasi pembayaran. Masukkan PIN DANA Anda untuk konfirmasi.",
      actionLabel: "Bayar via Aplikasi DANA",
      actionUrl: "https://link.dana.id/",
      color: "bg-blue-500"
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
      color: "bg-red-600"
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

  // --- Helper Renders ---
  const renderPaymentContent = () => {
    if (!activePayment) {
      return (
        <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-sm mt-4 animate-fade-in">
          Pilih salah satu metode di atas untuk simulasi pembayaran.
        </div>
      );
    }
    const data = paymentData[activePayment];
    return (
      <div className={`mt-4 p-5 rounded-lg border bg-white shadow-sm border-slate-200 animate-fade-in`}>
        <h4 className={`font-bold text-lg mb-2 ${activePayment === 'gopay' ? 'text-green-600' : activePayment === 'dana' ? 'text-blue-500' : 'text-red-600'}`}>
          {data.title}
        </h4>
        <p className="text-slate-600 text-sm mb-3">{data.details}</p>
        {data.items && (
          <ul className="list-disc pl-5 text-sm text-slate-700 mb-4 space-y-1">
            {data.items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        )}
        {data.actionUrl ? (
          <a href={data.actionUrl} target="_blank" rel="noreferrer" className={`block w-full text-center py-2.5 rounded-lg text-white font-medium shadow transition-transform hover:-translate-y-1 ${data.color}`}>
            {data.actionLabel}
          </a>
        ) : (
          <button onClick={() => alert('Simulasi Virtual Account')} className={`block w-full text-center py-2.5 rounded-lg text-white font-medium shadow transition-transform hover:-translate-y-1 ${data.color}`}>
            {data.actionLabel}
          </button>
        )}
      </div>
    );
  };

  const renderServiceContent = () => {
    if (!activeService) {
      return (
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm mt-4 animate-fade-in">
          Klik tombol di atas untuk melihat detail mitra terdekat!
        </div>
      );
    }
    const data = serviceData[activeService];
    return (
      <div className="mt-4 p-5 rounded-lg bg-blue-50 border border-blue-100 animate-fade-in">
        <h4 className="font-bold text-blue-800 text-lg mb-3">{data.title}</h4>
        <ul className="space-y-2 mb-3">
          {data.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
              <span className="text-blue-500 mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 italic">*Aplikasi akan menampilkan rute dan estimasi harga.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-blue-600 leading-none">UniConnect</h1>
          <p className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mt-1">University Life Made Easy</p>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Fitur</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Kontak</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 leading-tight">
            Aplikasi <span className="text-blue-600">All‑in‑One</span> untuk <br/> Mahasiswa Modern
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Satu aplikasi yang membantu mahasiswa mencari kos, makanan hemat, dan berbagai layanan kampus. Semua cepat, terintegrasi, dan dalam satu genggaman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all w-full sm:w-auto">
              Unduh di Google Play
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 hover:-translate-y-1 transition-all w-full sm:w-auto">
              Unduh di App Store
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">Fitur Utama yang Memudahkan Aktivitas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Maps */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="h-48 w-full rounded-xl overflow-hidden mb-6 shadow-inner bg-slate-200">
                 <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127487.22815363892!2d104.748726!3d-2.954794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75fe2bd91f1f%3A0x941938bc0f24bd0e!2sUniversitas%20Indo%20Global%20Mandiri%20(UIGM)%20Palembang!5e0!3m2!1sid!2sid!4v1700000000001"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="University Map"
                ></iframe>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <MapPin className="text-red-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Peta Lokasi</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Temukan kos, warung makan, dan UMKM mitra terdekat dengan akurasi GPS. Dilengkapi fitur rute dan estimasi waktu tempuh.
              </p>
            </div>

            {/* Card 2: Payment */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-tr from-blue-50 to-white rounded-xl p-5 border border-blue-100 mb-6">
                <strong className="block text-slate-800 mb-4">Metode Pembayaran</strong>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActivePayment('gopay')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${activePayment === 'gopay' ? 'bg-green-100 border-green-500 text-green-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    GoPay
                  </button>
                  <button 
                    onClick={() => setActivePayment('dana')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${activePayment === 'dana' ? 'bg-blue-100 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    DANA
                  </button>
                  <button 
                    onClick={() => setActivePayment('bank')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${activePayment === 'bank' ? 'bg-red-100 border-red-500 text-red-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    Bank
                  </button>
                </div>
                {renderPaymentContent()}
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Wallet className="text-green-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Transaksi Aman</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pembayaran lancar tanpa tunai melalui e-payment terkemuka. Transaksi terjamin aman.
                </p>
              </div>
            </div>

            {/* Card 3: Services */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-tr from-yellow-50 to-white rounded-xl p-5 border border-yellow-100 mb-6">
                 <strong className="block text-slate-800 mb-4">Cari Layanan</strong>
                 <div className="space-y-2">
                    <button 
                      onClick={() => setActiveService('laundry')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeService === 'laundry' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                    >
                      <Shirt className="w-5 h-5" />
                      <span className="font-medium text-sm">Laundry Terdekat</span>
                    </button>
                    <button 
                      onClick={() => setActiveService('print')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeService === 'print' ? 'bg-blue-700 text-white border-blue-700 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                    >
                      <Printer className="w-5 h-5" />
                      <span className="font-medium text-sm">Printer Terdekat</span>
                    </button>
                    <button 
                       onClick={() => setActiveService('ojek')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${activeService === 'ojek' ? 'bg-amber-400 text-slate-900 border-amber-400 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                    >
                      <Bike className="w-5 h-5" />
                      <span className="font-medium text-sm">Ojek Kampus</span>
                    </button>
                 </div>
                 {renderServiceContent()}
              </div>

              <div className="mt-auto">
                 <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <ShoppingCart className="text-yellow-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Layanan Lengkap</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cari laundry, print, dan ojek dengan cepat langsung dari aplikasi.
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
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
          >
            <Bot className="w-6 h-6" />
            <span className="font-semibold hidden md:inline">Tanya UniConnect AI</span>
          </button>
        ) : (
          <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
            {/* Chat Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-bold">UniConnect AI</h3>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-blue-700 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Body */}
            <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanya info kos, makanan..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                disabled={isThinking || !chatInput.trim()}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <h2 className="text-2xl font-bold mb-2">UniConnect</h2>
          <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest">University Life Made Easy</p>
          
          <div className="flex justify-center gap-8 mb-8 text-sm text-slate-300">
            <a href="mailto:info@uniconnect.com" className="hover:text-yellow-400 transition-colors">info@uniconnect.com</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-yellow-400 transition-colors">Mitra UMKM</a>
          </div>
          
          <div className="text-xs text-slate-500 border-t border-slate-800 pt-8">
            © 2025 UniConnect. All Rights Reserved. Powered by Teknologi Cerdas.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;