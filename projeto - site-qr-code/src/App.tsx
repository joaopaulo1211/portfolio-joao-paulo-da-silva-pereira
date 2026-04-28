/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, RefreshCw, Link as LinkIcon, Type, Image as ImageIcon, Loader2, Wand2, Circle, Square, Smartphone, Maximize, Save, History, Trash2, QrCode } from 'lucide-react';
import { auth, db } from './lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [text, setText] = useState('https://google.com');
  const [vibe, setVibe] = useState('Cyberpunk neon city at night, rain, cinematic lighting');
  const [isGenerating, setIsGenerating] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(256);
  const [qrLevel, setQrLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [qrRenderAs, setQrRenderAs] = useState<'canvas' | 'svg'>('canvas');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [contentType, setContentType] = useState('url');
  const [qrStyle, setQrStyle] = useState<'squares' | 'dots'>('squares');
  const [qrMargin, setQrMargin] = useState(0);
  const [isMockupMode, setIsMockupMode] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, 'qrcodes'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(docs);
    }, (error) => {
      console.error("Firestore Error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const saveQRCode = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'qrcodes'), {
        uid: user.uid,
        text,
        contentType,
        vibe,
        backgroundImage,
        fgColor,
        bgColor,
        qrSize,
        qrLevel,
        qrStyle,
        qrMargin,
        logoImage,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving QR code:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFromHistory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'qrcodes', id));
    } catch (error) {
      console.error("Error deleting QR code:", error);
    }
  };

  const loadFromHistory = (item: any) => {
    setText(item.text);
    setContentType(item.contentType);
    setVibe(item.vibe || '');
    setBackgroundImage(item.backgroundImage || null);
    setFgColor(item.fgColor || '#000000');
    setBgColor(item.bgColor || '#ffffff');
    setQrSize(item.qrSize || 256);
    setQrLevel(item.qrLevel || 'H');
    setQrStyle(item.qrStyle || 'squares');
    setQrMargin(item.qrMargin || 0);
    setLogoImage(item.logoImage || null);
    setShowHistory(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = async () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          // Poderia adicionar um toast aqui
        }
      });
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const generateVibe = async () => {
    if (!vibe.trim()) return;
    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate a high-quality, artistic background image for a QR code. The theme is: ${vibe}. The image should be visually striking but not too busy in the center where the QR code will be.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setBackgroundImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating vibe:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const enhancePrompt = async () => {
    if (!vibe.trim()) return;
    setIsEnhancing(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Enhance this visual prompt for an AI image generator to make it more professional, artistic, and detailed. Keep it concise. Original: ${vibe}`,
      });
      if (response.text) {
        setVibe(response.text.trim());
      }
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    // Create a temporary canvas to combine background and QR
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1024;
    finalCanvas.height = 1024;
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1024, 1024);
        
        // Draw a semi-transparent white box for QR readability
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        const qrSize = 400;
        const x = (1024 - qrSize) / 2;
        const y = (1024 - qrSize) / 2;
        ctx.beginPath();
        ctx.roundRect(x - 20, y - 20, qrSize + 40, qrSize + 40, 20);
        ctx.fill();

        // Draw QR
        ctx.drawImage(canvas, x, y, qrSize, qrSize);

        const link = document.createElement('a');
        link.download = 'qr-styling.png';
        link.href = finalCanvas.toDataURL();
        link.click();
      };
      img.src = backgroundImage;
    } else {
      const link = document.createElement('a');
      link.download = 'qr-styling-simple.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <MainLayout>
      {/* Coluna de Configuração */}
      <div className="lg:col-span-5 space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[linear-gradient(135deg,rgb(0,0,0)_0%,rgb(13,148,136)_100%)] border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
              Conteúdo
            </button>
            <button 
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'design' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
              Design QR
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'content' ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Tipo de Conteúdo</label>
                  <select 
                    value={contentType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContentType(val);
                      if (val === 'url') setText('https://google.com');
                      if (val === 'email') setText('mailto:contato@exemplo.com');
                      if (val === 'wifi') setText('WIFI:S:MinhaRede;T:WPA;P:senha123;;');
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none"
                  >
                    <option value="url" className="bg-black">URL / Link</option>
                    <option value="email" className="bg-black">E-mail</option>
                    <option value="wifi" className="bg-black">Rede Wi-Fi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">URL ou Texto</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      type="text" 
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="https://exemplo.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold">Estilo (Prompt AI)</label>
                    <button 
                      onClick={enhancePrompt}
                      disabled={isEnhancing}
                      className="text-teal-400 hover:text-teal-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      {isEnhancing ? <Loader2 size={10} className="animate-spin" /> : <Wand2 size={10} />}
                      Melhorar com AI
                    </button>
                  </div>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-4 text-white/30" size={18} />
                    <textarea 
                      value={vibe}
                      onChange={(e) => setVibe(e.target.value)}
                      placeholder="Descreva a estética..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="design"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Cor do QR</label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2">
                      <input 
                        type="color" 
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer"
                      />
                      <span className="text-white text-xs font-mono">{fgColor.toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Fundo do QR</label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2">
                      <input 
                        type="color" 
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer"
                      />
                      <span className="text-white text-xs font-mono">{bgColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Tamanho</label>
                    <select 
                      value={qrSize}
                      onChange={(e) => setQrSize(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none"
                    >
                      <option value={128} className="bg-black">128px</option>
                      <option value={256} className="bg-black">256px</option>
                      <option value={384} className="bg-black">384px</option>
                      <option value={512} className="bg-black">512px</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Precisão</label>
                    <select 
                      value={qrLevel}
                      onChange={(e) => setQrLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none"
                    >
                      <option value="L" className="bg-black">Baixa</option>
                      <option value="M" className="bg-black">Média</option>
                      <option value="Q" className="bg-black">Boa</option>
                      <option value="H" className="bg-black">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Estilo dos Pontos</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setQrStyle('squares')}
                        className={`flex-1 py-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${qrStyle === 'squares' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
                      >
                        <Square size={16} />
                        Quadrado
                      </button>
                      <button 
                        onClick={() => setQrStyle('dots')}
                        className={`flex-1 py-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${qrStyle === 'dots' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
                      >
                        <Circle size={16} />
                        Redondo
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Margem QR</label>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 h-[50px] flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="40" 
                        value={qrMargin}
                        onChange={(e) => setQrMargin(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Formato de Renderização</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setQrRenderAs('canvas')}
                      className={`flex-1 py-3 rounded-2xl border transition-all ${qrRenderAs === 'canvas' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
                    >
                      Canvas
                    </button>
                    <button 
                      onClick={() => setQrRenderAs('svg')}
                      className={`flex-1 py-3 rounded-2xl border transition-all ${qrRenderAs === 'svg' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
                    >
                      SVG
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest font-bold mb-2">Logo Central</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ImageIcon size={16} />
                      {logoImage ? 'Trocar Logo' : 'Upload Logo'}
                    </button>
                    {logoImage && (
                      <button 
                        onClick={() => setLogoImage(null)}
                        className="bg-red-500/20 border border-red-500/20 text-red-500 px-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={generateVibe}
              disabled={isGenerating}
              className="flex-1 group relative overflow-hidden bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />
              )}
              {isGenerating ? 'Gerando Estilo...' : 'Gerar Estilo com AI'}
            </button>
            
            {user && (
              <button 
                onClick={saveQRCode}
                disabled={isSaving || !text}
                className="bg-white/10 border border-white/10 text-white p-4 rounded-2xl hover:bg-white/20 transition-all disabled:opacity-50"
                title="Salvar na Nuvem"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              </button>
            )}
          </div>
        </motion.div>

        {user && (
          <div className="flex justify-between items-center px-2">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-teal-600 hover:text-teal-500 font-bold text-sm transition-colors"
            >
              <History size={18} />
              {showHistory ? 'Ocultar Histórico' : 'Ver Meus QR Codes'}
            </button>
            <span className="text-gray-400 text-xs font-medium">{history.length} salvos</span>
          </div>
        )}

        <AnimatePresence>
          {showHistory && user && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4 pt-2">
                {history.length === 0 ? (
                  <div className="col-span-2 py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">Nenhum QR Code salvo ainda.</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div 
                      key={item.id}
                      className="group relative bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => loadFromHistory(item)}
                    >
                      <div className="aspect-square bg-gray-50 rounded-xl mb-2 overflow-hidden flex items-center justify-center relative">
                        {item.backgroundImage ? (
                          <img src={item.backgroundImage} className="w-full h-full object-cover opacity-50" alt="" />
                        ) : (
                          <QrCode size={40} className="text-gray-200" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <QRCodeCanvas value={item.text} size={60} fgColor={item.fgColor} bgColor={item.bgColor} qrStyle={item.qrStyle} />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{item.contentType}</p>
                      <p className="text-xs font-medium text-gray-900 truncate">{item.text}</p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFromHistory(item.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-400 text-sm italic">
          Dica: Use prompts como "Minimalist zen garden", "Vaporwave aesthetic" ou "Abstract oil painting" para melhores resultados.
        </div>
      </div>

      {/* Coluna de Preview */}
      <div className="lg:col-span-7">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square w-full max-w-[600px] mx-auto group"
        >
          {/* Moldura do QR */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(0,0,0)_0%,rgb(13,148,136)_100%)] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Background Image (AI Generated) */}
            <AnimatePresence mode="wait">
              {backgroundImage ? (
                <motion.img 
                  key={backgroundImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={backgroundImage}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="AI Generated Background"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent flex items-center justify-center">
                  <p className="text-white/20 font-medium tracking-widest uppercase text-sm">Preview do Estilo</p>
                </div>
              )}
            </AnimatePresence>

            {/* QR Code Container */}
            <motion.div 
              ref={qrRef}
              layout
              animate={isMockupMode ? { scale: 0.5, y: -20 } : { scale: 1, y: 0 }}
              className={`relative z-10 p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl glow-teal transition-all`}
              style={{ padding: `${qrMargin + 24}px` }}
            >
              {qrRenderAs === 'canvas' ? (
                <QRCodeCanvas 
                  value={text} 
                  size={qrSize}
                  level={qrLevel}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  qrStyle={qrStyle}
                  imageSettings={logoImage ? {
                    src: logoImage,
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  } : undefined}
                  includeMargin={false}
                  className="rounded-lg"
                />
              ) : (
                <QRCodeSVG 
                  value={text} 
                  size={qrSize}
                  level={qrLevel}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  qrStyle={qrStyle}
                  imageSettings={logoImage ? {
                    src: logoImage,
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  } : undefined}
                  includeMargin={false}
                  className="rounded-lg"
                />
              )}
            </motion.div>

            {/* Mockup Overlay */}
            <AnimatePresence>
              {isMockupMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center z-30"
                >
                  <div className="w-[300px] h-[600px] border-8 border-black rounded-[50px] bg-transparent shadow-2xl relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay de Ações */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              <button 
                onClick={downloadQR}
                className="bg-black/80 backdrop-blur-md text-white p-4 rounded-full hover:bg-white hover:text-black transition-all shadow-xl"
                title="Download"
              >
                <Download size={24} />
              </button>
              <button 
                onClick={copyToClipboard}
                className="bg-black/80 backdrop-blur-md text-white p-4 rounded-full hover:bg-white hover:text-black transition-all shadow-xl"
                title="Copiar para Área de Transferência"
              >
                <Type size={24} />
              </button>
              <button 
                onClick={() => setIsMockupMode(!isMockupMode)}
                className={`p-4 rounded-full transition-all shadow-xl ${isMockupMode ? 'bg-white text-black' : 'bg-black/80 backdrop-blur-md text-white hover:bg-white hover:text-black'}`}
                title="Modo Mockup"
              >
                <Smartphone size={24} />
              </button>
              <button 
                onClick={() => {
                  setBackgroundImage(null);
                  setLogoImage(null);
                  setFgColor('#000000');
                  setBgColor('#ffffff');
                  setQrMargin(0);
                  setQrStyle('squares');
                  setIsMockupMode(false);
                }}
                className="bg-black/80 backdrop-blur-md text-white p-4 rounded-full hover:bg-white hover:text-black transition-all shadow-xl"
                title="Reset"
              >
                <RefreshCw size={24} />
              </button>
            </div>
          </div>

          {/* Efeito de Brilho */}
          <div className="absolute -inset-4 bg-teal-500/20 blur-3xl rounded-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        <div className="mt-8 text-center">
          <p className="qr-description !text-black !min-height-0 !text-shadow-none">
            {isGenerating ? "A inteligência artificial está criando sua estética..." : "Personalize seu código com estilo profissional."}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
