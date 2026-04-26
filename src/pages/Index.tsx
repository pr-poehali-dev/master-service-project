import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/22e6a9ce-ffd3-44a2-9686-b17a6eead553/files/2157cfee-2e3c-441b-b78d-5e82e1e5470c.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Как мы работаем", href: "#process" },
  { label: "О нас", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Hammer", title: "Капитальный ремонт", desc: "Полное преображение помещения под ключ — от демонтажа до финишной отделки." },
  { icon: "Paintbrush", title: "Косметический ремонт", desc: "Быстрое обновление интерьера: покраска, поклейка обоев, замена напольных покрытий." },
  { icon: "Layers", title: "Дизайн интерьера", desc: "Разработка авторских проектов с визуализацией и сопровождением реализации." },
  { icon: "Wrench", title: "Сантехника и электрика", desc: "Монтаж, замена и ремонт инженерных систем с соблюдением всех норм и стандартов." },
  { icon: "Building2", title: "Коммерческие объекты", desc: "Ремонт офисов, магазинов и ресторанов в сжатые сроки без остановки бизнеса." },
  { icon: "Star", title: "Гарантия качества", desc: "Гарантия на все виды работ до 3 лет. Договор, смета и акты выполненных работ." },
];

const STEPS = [
  { num: "01", title: "Консультация", desc: "Бесплатный выезд мастера на объект, оценка объёма работ и пожеланий." },
  { num: "02", title: "Смета и договор", desc: "Фиксированная стоимость без скрытых доплат. Подписываем договор." },
  { num: "03", title: "Работы", desc: "Профессиональная бригада выходит на объект в согласованные сроки." },
  { num: "04", title: "Сдача объекта", desc: "Финальная приёмка с заказчиком. Устраняем любые замечания бесплатно." },
];

const REVIEWS = [
  {
    name: "Анна Смирнова",
    role: "Владелица квартиры",
    text: "Сделали ремонт в двушке за 45 дней. Всё чётко по смете, никаких сюрпризов. Бригада аккуратная, убрали за собой идеально.",
    rating: 5,
  },
  {
    name: "Михаил Орлов",
    role: "Собственник бизнеса",
    text: "Ремонтировали офис 200 кв.м. Уложились в срок, работали в нерабочее время чтобы не мешать. Рекомендую.",
    rating: 5,
  },
  {
    name: "Елена Козлова",
    role: "Дизайнер интерьеров",
    text: "Сотрудничаю как партнёр уже 2 года. Мои проекты реализуют точно по чертежам. Профессионализм на высшем уровне.",
    rating: 5,
  },
];

const BLOG_POSTS = [
  {
    tag: "Советы",
    date: "18 апреля 2026",
    title: "Как правильно принять ремонт квартиры: чек-лист из 20 пунктов",
    excerpt: "Рассказываем, на что обратить внимание при финальной приёмке, чтобы не пожалеть потом.",
  },
  {
    tag: "Материалы",
    date: "5 апреля 2026",
    title: "Топ-5 ошибок при выборе напольного покрытия",
    excerpt: "Ламинат, паркет или плитка? Разбираем плюсы и минусы каждого варианта для разных комнат.",
  },
  {
    tag: "Тренды",
    date: "22 марта 2026",
    title: "Интерьерные тренды 2026 года: что в моде",
    excerpt: "Натуральные материалы, приглушённые тона и функциональность — главные направления этого сезона.",
  },
];

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`section-reveal ${className}`}>{children}</div>;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Здравствуйте! Готов ответить на ваши вопросы о ремонте. Чем могу помочь?" },
  ]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { from: "user", text: chatMsg },
      { from: "bot", text: "Спасибо за вопрос! Наш специалист свяжется с вами в ближайшее время. Или позвоните нам: +7 (495) 123-45-67" },
    ]);
    setChatMsg("");
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-golos overflow-x-hidden">

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1A3A5C] shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-cormorant text-2xl font-bold text-[#E8842B] tracking-widest uppercase">
            РемонтПро
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="nav-link text-[#FFFFFF] text-sm font-golos tracking-wide hover:text-[#E8842B] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <a
            href="tel:+74951234567"
            className="hidden lg:flex items-center gap-2 bg-[#E8842B] text-[#1A3A5C] px-5 py-2 text-sm font-semibold font-golos tracking-wide hover:bg-[#FF9A3F] transition-colors"
          >
            <Icon name="Phone" size={14} />
            +7 (495) 123-45-67
          </a>
          <button className="lg:hidden text-[#E8842B]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#1A3A5C] border-t border-[#22466B] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-[#FFFFFF] text-left py-2 border-b border-[#22466B] last:border-0"
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+74951234567" className="text-[#E8842B] font-semibold mt-2">+7 (495) 123-45-67</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#13283F]/92 via-[#13283F]/72 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13283F]/60 via-transparent to-transparent" />
        <div className="relative container mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="w-10 h-px bg-[#E8842B]" />
              <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">С 2008 года на рынке</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6 animate-fade-up delay-100">
              Ремонт,<br />
              <em className="text-[#E8842B] not-italic">которому</em><br />
              доверяют
            </h1>
            <p className="font-golos text-[#D6DDE6] text-lg leading-relaxed mb-10 max-w-lg animate-fade-up delay-200">
              Профессиональный ремонт квартир и коммерческих объектов. Фиксированные цены, строгие сроки, гарантия до 3 лет.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <button
                onClick={() => scrollTo("#contacts")}
                className="bg-[#E8842B] text-[#1A3A5C] px-8 py-4 font-golos font-semibold tracking-wide hover:bg-[#FF9A3F] transition-all hover:shadow-lg hover:shadow-[#E8842B]/20 active:scale-95"
              >
                Получить консультацию
              </button>
              <button
                onClick={() => scrollTo("#services")}
                className="border border-[#E5EAF0]/40 text-[#E5EAF0] px-8 py-4 font-golos tracking-wide hover:border-[#E8842B] hover:text-[#E8842B] transition-all"
              >
                Наши услуги
              </button>
            </div>
            <div className="flex gap-12 mt-16 animate-fade-up delay-400">
              {[["600+", "объектов сдано"], ["15", "лет на рынке"], ["98%", "клиентов довольны"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-cormorant text-4xl font-semibold text-[#E8842B]">{num}</div>
                  <div className="font-golos text-[#B8C2CE] text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => scrollTo("#services")} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#E8842B] animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#E8842B]" />
              <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">Что мы делаем</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-[#1A3A5C] mb-3">Наши услуги</h2>
            <div className="gold-line w-24 mb-14" />
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E7EB]">
            {SERVICES.map((s, i) => (
              <RevealSection key={s.title}>
                <div className="bg-white p-8 group hover:bg-[#1A3A5C] transition-all duration-300 cursor-default h-full" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-12 h-12 flex items-center justify-center border border-[#E8842B]/30 group-hover:border-[#E8842B] mb-6 transition-colors">
                    <Icon name={s.icon} size={22} className="text-[#E8842B]" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-[#1A3A5C] group-hover:text-white mb-3 transition-colors">{s.title}</h3>
                  <p className="font-golos text-[#666666] group-hover:text-[#D6DDE6] text-sm leading-relaxed transition-colors">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[#E8842B] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-golos">
                    <span>Подробнее</span><Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="process" className="py-24 bg-[#1A3A5C]">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#E8842B]" />
              <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">Прозрачный процесс</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white mb-3">Как мы работаем</h2>
            <div className="gold-line w-24 mb-16" />
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <RevealSection key={step.num}>
                <div className="relative" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="font-cormorant text-6xl font-light text-[#E8842B]/20 mb-4 leading-none">{step.num}</div>
                  <div className="w-10 h-px bg-[#E8842B] mb-5" />
                  <h3 className="font-cormorant text-2xl text-white mb-3">{step.title}</h3>
                  <p className="font-golos text-[#B8C2CE] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection>
            <div className="mt-16 p-8 border border-[#E8842B]/20 bg-[#22466B]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-cormorant text-3xl text-white mb-2">Готовы начать?</h3>
                  <p className="font-golos text-[#B8C2CE] text-sm">Бесплатный выезд замерщика на следующий день после заявки.</p>
                </div>
                <button
                  onClick={() => scrollTo("#contacts")}
                  className="shrink-0 bg-[#E8842B] text-[#1A3A5C] px-8 py-4 font-golos font-semibold tracking-wide hover:bg-[#FF9A3F] transition-all"
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-[#E8842B]" />
                  <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">Наша история</span>
                </div>
                <h2 className="font-cormorant text-5xl md:text-6xl text-[#1A3A5C] mb-6">О компании</h2>
                <div className="gold-line w-24 mb-8" />
                <p className="font-golos text-[#555555] leading-relaxed mb-6">
                  С 2008 года мы занимаемся ремонтом квартир, загородных домов и коммерческих объектов. За это время сдали более 600 объектов, воспитали команду из 80 профессионалов и заработали репутацию компании, которой доверяют.
                </p>
                <p className="font-golos text-[#555555] leading-relaxed mb-10">
                  Мы не гонимся за количеством — каждый проект для нас важен. Именно поэтому 70% клиентов возвращаются снова и рекомендуют нас друзьям.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: "Users", label: "80+ мастеров в штате" },
                    { icon: "Award", label: "Лицензированные работы" },
                    { icon: "ShieldCheck", label: "Гарантия до 3 лет" },
                    { icon: "Clock", label: "Работаем 7 дней в неделю" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center bg-[#E8842B]/10 shrink-0">
                        <Icon name={item.icon} size={16} className="text-[#E8842B]" />
                      </div>
                      <span className="font-golos text-sm text-[#333333]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
            <RevealSection>
              <div className="relative">
                <div className="aspect-[4/5] bg-[#1A3A5C] overflow-hidden">
                  <img src={HERO_IMAGE} alt="О компании" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#E8842B] p-8 text-[#1A3A5C]">
                  <div className="font-cormorant text-5xl font-semibold">15</div>
                  <div className="font-golos text-sm mt-1">лет опыта</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#E8842B]" />
              <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">Мнения клиентов</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-[#1A3A5C] mb-3">Отзывы</h2>
            <div className="gold-line w-24 mb-14" />
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <RevealSection key={r.name}>
                <div className="border border-[#E5E7EB] p-8 hover:border-[#E8842B]/40 hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-[#E8842B] fill-[#E8842B]" />
                    ))}
                  </div>
                  <p className="font-cormorant text-xl italic text-[#333333] leading-relaxed mb-8">«{r.text}»</p>
                  <div className="border-t border-[#EAECEE] pt-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1A3A5C] flex items-center justify-center font-cormorant text-[#E8842B] text-lg font-semibold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-golos font-semibold text-[#333333] text-sm">{r.name}</div>
                      <div className="font-golos text-[#999999] text-xs mt-0.5">{r.role}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-[#E8842B]" />
                  <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">Полезно знать</span>
                </div>
                <h2 className="font-cormorant text-5xl md:text-6xl text-[#1A3A5C]">Блог</h2>
                <div className="gold-line w-24 mt-3" />
              </div>
              <button className="font-golos text-sm text-[#1A3A5C] border border-[#1A3A5C] px-6 py-3 hover:bg-[#1A3A5C] hover:text-white transition-all">
                Все статьи
              </button>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <RevealSection key={post.title}>
                <article className="group cursor-pointer" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="aspect-video bg-[#1A3A5C] mb-6 overflow-hidden relative">
                    <img src={HERO_IMAGE} alt={post.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#E8842B] text-[#1A3A5C] font-golos text-xs font-semibold px-3 py-1 tracking-wide uppercase">{post.tag}</span>
                    </div>
                  </div>
                  <div className="font-golos text-xs text-[#999999] mb-3 tracking-wide">{post.date}</div>
                  <h3 className="font-cormorant text-2xl text-[#1A3A5C] mb-3 group-hover:text-[#C66E1F] transition-colors leading-snug">{post.title}</h3>
                  <p className="font-golos text-[#666666] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-[#C66E1F] font-golos text-sm group-hover:gap-3 transition-all">
                    <span>Читать</span><Icon name="ArrowRight" size={14} />
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#1A3A5C]">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#E8842B]" />
              <span className="text-[#E8842B] font-golos text-sm tracking-[0.2em] uppercase">Свяжитесь с нами</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white mb-3">Контакты</h2>
            <div className="gold-line w-24 mb-14" />
          </RevealSection>
          <div className="grid lg:grid-cols-2 gap-16">
            <RevealSection>
              <div className="space-y-8">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", href: "tel:+74951234567" },
                  { icon: "Mail", label: "Email", value: "info@remontpro.ru", href: "mailto:info@remontpro.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Строителей, 12, офис 301" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 8:00 — 22:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-5">
                    <div className="w-11 h-11 border border-[#E8842B]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={c.icon} size={18} className="text-[#E8842B]" />
                    </div>
                    <div>
                      <div className="font-golos text-xs text-[#999999] uppercase tracking-wider mb-1">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="font-golos text-[#E5EAF0] hover:text-[#E8842B] transition-colors">{c.value}</a>
                      ) : (
                        <span className="font-golos text-[#E5EAF0]">{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
            <RevealSection>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-golos text-xs text-[#999999] uppercase tracking-wider mb-2">Имя</label>
                    <input type="text" placeholder="Иван Иванов" className="w-full bg-[#22466B] border border-[#2C547D] text-[#E5EAF0] px-4 py-3 font-golos text-sm placeholder:text-[#555555] focus:outline-none focus:border-[#E8842B] transition-colors" />
                  </div>
                  <div>
                    <label className="block font-golos text-xs text-[#999999] uppercase tracking-wider mb-2">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-[#22466B] border border-[#2C547D] text-[#E5EAF0] px-4 py-3 font-golos text-sm placeholder:text-[#555555] focus:outline-none focus:border-[#E8842B] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block font-golos text-xs text-[#999999] uppercase tracking-wider mb-2">Тип объекта</label>
                  <select className="w-full bg-[#22466B] border border-[#2C547D] text-[#E5EAF0] px-4 py-3 font-golos text-sm focus:outline-none focus:border-[#E8842B] transition-colors">
                    <option value="">Выберите тип</option>
                    <option>Квартира</option>
                    <option>Частный дом</option>
                    <option>Коммерческое помещение</option>
                  </select>
                </div>
                <div>
                  <label className="block font-golos text-xs text-[#999999] uppercase tracking-wider mb-2">Сообщение</label>
                  <textarea rows={4} placeholder="Опишите ваш объект и пожелания..." className="w-full bg-[#22466B] border border-[#2C547D] text-[#E5EAF0] px-4 py-3 font-golos text-sm placeholder:text-[#555555] focus:outline-none focus:border-[#E8842B] transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#E8842B] text-[#1A3A5C] py-4 font-golos font-semibold tracking-wide hover:bg-[#FF9A3F] transition-all active:scale-[0.99]">
                  Отправить заявку
                </button>
                <p className="font-golos text-[#666666] text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F2438] py-10 border-t border-[#22466B]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-cormorant text-xl font-bold text-[#E8842B] tracking-widest uppercase">РемонтПро</div>
          <div className="font-golos text-[#666666] text-sm text-center">© 2026 РемонтПро. Все права защищены.</div>
          <div className="flex gap-6">
            {["ВКонтакте", "Telegram", "WhatsApp"].map((s) => (
              <button key={s} className="font-golos text-[#666666] text-sm hover:text-[#E8842B] transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="chat-widget w-80 bg-white border border-[#E5E7EB] flex flex-col overflow-hidden animate-fade-up">
            <div className="bg-[#1A3A5C] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E8842B] flex items-center justify-center">
                  <Icon name="MessageSquare" size={14} className="text-[#1A3A5C]" />
                </div>
                <div>
                  <div className="font-golos font-semibold text-white text-sm">Онлайн-чат</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="font-golos text-xs text-[#B8C2CE]">Онлайн</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[#999999] hover:text-white transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-60 min-h-32 bg-[#F8F9FA]">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 font-golos text-sm leading-relaxed ${m.from === "user" ? "bg-[#1A3A5C] text-white" : "bg-white border border-[#E5E7EB] text-[#333333]"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[#E5E7EB] flex gap-2 bg-white">
              <input
                type="text"
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Напишите вопрос..."
                className="flex-1 font-golos text-sm border border-[#E5E7EB] px-3 py-2 focus:outline-none focus:border-[#E8842B] transition-colors text-[#333333] placeholder:text-[#999999]"
              />
              <button onClick={sendMessage} className="bg-[#E8842B] text-[#1A3A5C] w-9 h-9 flex items-center justify-center hover:bg-[#FF9A3F] transition-colors shrink-0">
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-[#1A3A5C] text-[#E8842B] flex items-center justify-center shadow-xl hover:bg-[#264B72] transition-all hover:scale-105 active:scale-95 border-2 border-[#E8842B]/40"
          title="Онлайн-чат"
        >
          <Icon name={chatOpen ? "X" : "MessageSquare"} size={22} />
        </button>
      </div>
    </div>
  );
}