'use client';

import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  'w-full rounded-xl border border-line bg-bg/60 px-4 py-3.5 text-fg placeholder:text-fg-subtle transition-colors outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50';

export function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Informe seu nome.',
        variant: 'error'
      });
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      toast({
        title: 'E-mail inválido',
        description: 'Informe um e-mail válido.',
        variant: 'error'
      });
      return;
    }
    if (!message.trim()) {
      toast({
        title: 'Mensagem obrigatória',
        description: 'Escreva sua mensagem.',
        variant: 'error'
      });
      return;
    }

    setIsSending(true);
    try {
      const minDelay = new Promise(resolve => setTimeout(resolve, 300));
      const sendEmail = emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name, email, reply_to: email, message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      await Promise.all([sendEmail, minDelay]);
      toast({
        title: 'Mensagem enviada',
        description: 'Obrigado! Respondo em breve.',
        variant: 'success'
      });
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
    <form
      onSubmit={handleSubmit}
      noValidate
      className="energy-border bg-navy-900/75 space-y-5 rounded-3xl p-6 backdrop-blur-xl md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="label">Nome</span>
          <input
            name="name"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isSending}
            placeholder="Maria Souza"
            className={fieldClass}
          />
        </label>
        <label className="block space-y-2">
          <span className="label">E-mail</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isSending}
            placeholder="maria@empresa.com"
            className={fieldClass}
          />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="label">Mensagem</span>
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={isSending}
          placeholder="Conte sobre a vaga ou o projeto"
          className={`${fieldClass} resize-none`}
        />
      </label>
      <button
        type="submit"
        disabled={isSending}
        className="group bg-accent text-bg relative isolate flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl py-4 font-mono text-xs font-medium tracking-[0.16em] uppercase transition-shadow hover:shadow-[0_0_32px_-6px_var(--accent)] disabled:opacity-60"
      >
        <Send
          size={15}
          className="ease-out-expo transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
        {isSending ? 'Enviando…' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
