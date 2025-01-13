import { GiFeatheredWing } from 'react-icons/gi';
import { SectionTitle } from '../SectionTitle';

export const ContactMe = () => {
  return (
    <section className="mt-10 md:mt-20 pb-6 2xl:pb-12">
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

        <form className="flex flex-col gap-4 mt-5">
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
            className="mt-4 flex items-center gap-2 justify-center text-primaryColor font-semibold border border-secondaryColor py-2 px-6 rounded-lg shadow-md hover:bg-secondaryColor hover:text-primaryColor transition duration-300"
          >
            <GiFeatheredWing size={22} />
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  );
};
