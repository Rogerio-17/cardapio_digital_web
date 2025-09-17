"use client";

import { useState } from "react";
import {
  Smartphone,
  Clock,
  DollarSign,
  Star,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const benefits = [
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      title: "Experiência Moderna",
      description:
        "Seus clientes acessam o cardápio direto do celular, sem precisar tocar em nada.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Atualização em Tempo Real",
      description:
        "Mude preços e itens instantaneamente, sem precisar reimprimir cardápios.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Economia Garantida",
      description:
        "Elimine gastos com impressão e tenha um cardápio sempre atualizado.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Aumento de Vendas",
      description:
        "Cardápios digitais geram até 30% mais vendas com fotos atrativas dos pratos.",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Mais Praticidade",
      description:
        "Clientes podem ver o cardápio antes mesmo de chegar ao restaurante.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Configuração Rápida",
      description:
        "Tenha seu cardápio digital funcionando em menos de 30 minutos.",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      restaurant: "Pizzaria Bella Vista",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Desde que adotamos o cardápio digital, nossas vendas aumentaram 35%! Os clientes adoram a praticidade e nós economizamos muito em impressão.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      restaurant: "Restaurante Sabor Caseiro",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "A facilidade para atualizar preços é incrível! Antes era um pesadelo quando precisava mudar algum item. Agora é só alguns cliques!",
      rating: 5,
    },
    {
      name: "João Pereira",
      restaurant: "Burger House",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Meus clientes sempre elogiam o cardápio digital. É moderno, prático e passa uma imagem profissional do nosso negócio.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Preciso de site próprio para usar?",
      answer:
        "Não! Criamos tudo para você. Basta nos enviar suas informações e cardápio que montamos seu link personalizado em minutos.",
    },
    {
      question: "Posso atualizar os itens quando quiser?",
      answer:
        "Sim! Você tem acesso total para adicionar, remover ou editar itens, preços e descrições a qualquer momento, 24/7.",
    },
    {
      question: "Funciona em qualquer celular?",
      answer:
        "Perfeitamente! Nosso cardápio digital é otimizado para funcionar em qualquer smartphone, tablet ou computador.",
    },
    {
      question: "E se eu quiser cancelar?",
      answer:
        "Você pode cancelar a qualquer momento, sem multas ou taxas extras. Seu cardápio fica ativo até o final do período pago.",
    },
    {
      question: "Vocês oferecem suporte?",
      answer:
        "Claro! Temos suporte especializado via WhatsApp e email para te ajudar sempre que precisar.",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">
                CardápioDigital
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => scrollToSection("benefits")}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Benefícios
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Como Funciona
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Depoimentos
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Assinar Agora
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="bg-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-purple-700"
              >
                Assinar Agora
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transforme seu restaurante com um{" "}
                <span className="text-purple-600">Cardápio Digital</span>{" "}
                moderno!
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Ofereça uma experiência moderna aos seus clientes e aumente suas
                vendas. Atualize preços e itens em tempo real, sem custos de
                impressão.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Comece agora por R$39,90
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  Como Funciona
                </button>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-500">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>
                  Sem taxa de setup • Sem fidelidade • Cancele quando quiser
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Cardápio digital em smartphone"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nosso Cardápio Digital?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos a solução completa que seu restaurante precisa para se
              modernizar e aumentar as vendas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-purple-200"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona? É simples!
            </h2>
            <p className="text-xl text-gray-600">
              Em apenas 3 passos você já terá seu cardápio digital funcionando
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Passo 1 */}
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Envie seus dados
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nos envie o nome do seu restaurante, cardápio atual e suas
                informações. Pode ser por WhatsApp, email ou foto mesmo!
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />5 minutos
                </div>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Criamos tudo para você
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nossa equipe monta seu cardápio digital personalizado com fotos,
                preços e descrições. Tudo organizado e bonito!
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Zap className="w-4 h-4 mr-2" />
                  Até 24 horas
                </div>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Comece a usar!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receba seu link personalizado e QR Code. Cole nas mesas e
                pronto! Seus clientes já podem acessar o cardápio.
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Instantâneo
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para modernizar seu restaurante?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 500 restaurantes que já aumentaram suas vendas
              com nosso cardápio digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection("pricing")}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Começar Agora - R$39,90
              </button>
              <div className="flex items-center text-purple-100">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  500+ restaurantes confiam em nós
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 500 restaurantes já confiam em nossa solução
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.restaurant}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-br from-purple-600 to-blue-600"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plano único, sem complicações
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Tudo que você precisa por um preço justo e transparente
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Plano Completo
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-purple-600">R$39</span>
                <span className="text-xl text-gray-600">,90/mês</span>
              </div>

              <ul className="text-left mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Cardápio digital ilimitado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Atualizações em tempo real</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Design responsivo</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Suporte especializado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>QR Code personalizado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Relatórios de acesso</span>
                </li>
              </ul>

              <button className="w-full bg-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Assinar Agora
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Sem taxa de setup • Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nosso cardápio digital
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      faqOpen === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {faqOpen === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                CardápioDigital
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A solução completa em cardápio digital para restaurantes
                modernos. Transforme a experiência dos seus clientes e aumente
                suas vendas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-gray-300">(11) 99999-9999</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-gray-300">
                    contato@cardapiodigital.com
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-gray-300">São Paulo, SP</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Central de Ajuda
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Tutoriais
                </a>
                <a
                  href="#"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CardápioDigital. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
