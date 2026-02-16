'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export function Contact() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação básica
    if (!name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Por favor, informe seu nome.',
        variant: 'error'
      });
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, informe um email válido.',
        variant: 'error'
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: 'Mensagem obrigatória',
        description: 'Por favor, escreva sua mensagem.',
        variant: 'error'
      });
      return;
    }

    setIsSending(true);

    try {
      // Garantir delay mínimo de 300ms
      const minDelay = new Promise(resolve => setTimeout(resolve, 300));

      const templateParams = {
        name: name,
        email: email,
        reply_to: email,
        message: message
      };

      const sendEmail = emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      await Promise.all([sendEmail, minDelay]);

      toast({
        title: 'Mensagem enviada!',
        description: 'Os deuses receberam sua oferenda. Em breve retornaremos.',
        variant: 'success'
      });

      // Limpar formulário
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Não foi possível enviar sua mensagem. Tente novamente.',
        variant: 'error'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-20">
      <div className="relative z-10 container mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-bold md:text-5xl"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            O Oráculo
          </h2>
          <p className="opacity-70">Envie sua mensagem aos deuses</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={clsx(
            'rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-md md:p-12',
            theme === 'zeus' && 'bg-white/40 shadow-yellow-500/5',
            theme === 'poseidon' && 'bg-cyan-900/20 shadow-cyan-500/5',
            theme === 'hades' && 'bg-black/40 shadow-red-900/5'
          )}
        >
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm tracking-wider uppercase opacity-70">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={isSending}
                placeholder="Seu nome mortal"
                className="w-full rounded-lg border border-current/10 bg-black/5 p-3 ring-current/20 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wider uppercase opacity-70">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isSending}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-current/10 bg-black/5 p-3 ring-current/20 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5"
              />
            </div>
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-sm tracking-wider uppercase opacity-70">
              Mensagem
            </label>
            <textarea
              name="message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={isSending}
              placeholder="Sua oferenda ou dúvida..."
              className="w-full resize-none rounded-lg border border-current/10 bg-black/5 p-3 ring-current/20 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={clsx(
              'flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 font-bold tracking-widest uppercase transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
              theme === 'zeus' &&
                'bg-yellow-500 text-black hover:bg-yellow-400',
              theme === 'poseidon' &&
                'bg-cyan-500 text-black hover:bg-cyan-400',
              theme === 'hades' && 'bg-red-800 text-white hover:bg-red-700'
            )}
          >
            <Send size={20} />
            {isSending ? 'Enviando...' : 'Enviar Oferenda'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
