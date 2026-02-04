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
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          limitRate: {
            id: 'app',
            throttle: 10000 // Allow 1 request
          }
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
    <section id="contact-me" className="relative mt-10 pb-6 md:mt-20 2xl:pb-12">
      <SectionTitle
        title="Envie uma mensagem via Hermes"
        imageUrl="/title-icons/hermes.svg"
      />

      <div className="border-secondaryColor mx-auto mt-10 max-w-[750px] rounded-xl border px-8 py-6 shadow-lg">
        <h2 className="text-primaryColor text-3xl font-bold">Fale Comigo</h2>
        <p className="mt-2 text-sm opacity-70">
          Vamos criar algo lendário juntos. Preencha os campos abaixo e entrarei
          em contato.
        </p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-primaryColor text-sm font-medium"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Seu nome completo"
              aria-label="Seu nome completo"
              className="focus:ring-primaryColor mt-1 rounded-lg bg-zinc-800 px-4 py-2 focus:ring-2 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-primaryColor text-sm font-medium"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              aria-label="Seu endereço de e-mail"
              className="focus:ring-primaryColor mt-1 rounded-lg bg-zinc-800 px-4 py-2 focus:ring-2 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-primaryColor text-sm font-medium"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Escreva sua mensagem aqui"
              aria-label="Sua mensagem"
              className="focus:ring-primaryColor mt-1 h-28 resize-none rounded-lg bg-zinc-800 px-4 py-2 focus:ring-2 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`text-primaryColor border-secondaryColor mt-4 flex items-center justify-center gap-2 rounded-lg border px-6 py-2 font-semibold shadow-md transition duration-300 ${
              loading
                ? 'cursor-not-allowed bg-gray-700'
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
