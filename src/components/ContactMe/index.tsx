'use client';

import { GiFeatheredWing } from 'react-icons/gi';
import { SectionTitle } from '../SectionTitle';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '../ui/toaster';

export const ContactMe = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    limitRate: {
      id: 'app',
      throttle: 10000 // Allow 1 request per 10s
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        }
      )
      .then(() => {
        setLoading(false);
        toast({
          title:
            'Mensagem enviada com sucesso! Obrigado por entrar em contato.',
          variant: 'success'
        });

        e?.currentTarget?.reset();
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.',
          variant: 'error'
        });
      });
  };

  return (
    <section id="contact-me" className="mt-10 md:mt-20 pb-6 2xl:pb-12 relative">
      <SectionTitle
        title="Envie uma mensagem via Hermes"
        imageUrl="/hermes.svg"
      />

      <div className="px-8 py-6 mt-10 border border-secondaryColor rounded-xl max-w-[750px] mx-auto shadow-lg">
        <h2 className="text-3xl font-bold text-primaryColor">Fale Comigo</h2>
        <p className="opacity-70 mt-2 text-sm">
          Vamos criar algo lendário juntos. Preencha os campos abaixo e entrarei
          em contato.
        </p>

        <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-primaryColor"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Seu nome completo"
              aria-label="Seu nome completo"
              className="mt-1 px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-primaryColor"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              aria-label="Seu endereço de e-mail"
              className="mt-1 px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-medium text-primaryColor"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Escreva sua mensagem aqui"
              aria-label="Sua mensagem"
              className="mt-1 px-4 py-2 rounded-lg bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primaryColor h-28 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 flex items-center gap-2 justify-center text-primaryColor font-semibold border border-secondaryColor py-2 px-6 rounded-lg shadow-md transition duration-300 ${
              loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'hover:bg-secondaryColor hover:text-primaryColor'
            }`}
          >
            <GiFeatheredWing size={22} />
            {loading ? (
              <span className="flex items-center gap-1">
                Enviando
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            ) : (
              'Enviar Mensagem'
            )}
          </button>
        </form>
      </div>

      <Toaster />
    </section>
  );
};
