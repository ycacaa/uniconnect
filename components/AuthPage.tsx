import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, GraduationCap } from 'lucide-react';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side - Visual & Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-lg">
                <GraduationCap className="text-blue-600 w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">UniConnect</h1>
            </div>
            <p className="text-blue-100 text-lg font-light">University Life Made Easy.</p>
          </div>

          <div className="relative z-10 my-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {isLogin ? 'Selamat Datang Kembali!' : 'Bergabunglah Bersama Kami!'}
            </h2>
            <p className="text-blue-100 max-w-md">
              Satu aplikasi untuk semua kebutuhan kampusmu. Cari kos, layanan print, hingga pembayaran praktis dalam satu genggaman.
            </p>
          </div>

          <div className="relative z-10 text-sm opacity-70">
            © 2025 UniConnect Inc.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Masuk ke Akun' : 'Buat Akun Baru'}
            </h3>
            <p className="text-slate-500 mb-8">
              {isLogin ? 'Silakan masukkan detail akun anda.' : 'Lengkapi data diri untuk memulai.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Email Mahasiswa" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="Kata Sandi" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Lupa Kata Sandi?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span className="animate-pulse">Memproses...</span>
                ) : (
                  <>
                    {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500">
                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-bold hover:underline focus:outline-none"
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

export default AuthPage;