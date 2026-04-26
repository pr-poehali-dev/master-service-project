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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[hsl(220,35%,10%)] shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-cormorant text-2xl font-bold text-[hsl(43,74%,58%)] tracking-widest uppercase">
            РемонтПро
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="nav-link text-[hsl(45,60%,88%)] text-sm font-golos tracking-wide hover:text-[hsl(43,74%,58%)] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <a
            href="tel:+74951234567"
            className="hidden lg:flex items-center gap-2 bg-[hsl(43,74%,58%)] text-[hsl(220,35%,10%)] px-5 py-2 text-sm font-semibold font-golos tracking-wide hover:bg-[hsl(43,74%,68%)] transition-colors"
          >
            <Icon name="Phone" size={14} />
            +7 (495) 123-45-67
          </a>
          <button className="lg:hidden text-[hsl(43,74%,58%)]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[hsl(220,35%,10%)] border-t border-[hsl(220,25%,20%)] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-[hsl(45,60%,88%)] text-left py-2 border-b border-[hsl(220,25%,20%)] last:border-0"
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+74951234567" className="text-[hsl(43,74%,58%)] font-semibold mt-2">+7 (495) 123-45-67</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,35%,8%)]/92 via-[hsl(220,35%,8%)]/72 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,35%,8%)]/60 via-transparent to-transparent" />
        <div className="relative container mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="w-10 h-px bg-[hsl(43,74%,58%)]" />
              <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">С 2008 года на рынке</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6 animate-fade-up delay-100">
              Ремонт,<br />
              <em className="text-[hsl(43,74%,58%)] not-italic">которому</em><br />
              доверяют
            </h1>
            <p className="font-golos text-[hsl(45,30%,78%)] text-lg leading-relaxed mb-10 max-w-lg animate-fade-up delay-200">
              Профессиональный ремонт квартир и коммерческих объектов. Фиксированные цены, строгие сроки, гарантия до 3 лет.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <button
                onClick={() => scrollTo("#contacts")}
                className="bg-[hsl(43,74%,58%)] text-[hsl(220,35%,10%)] px-8 py-4 font-golos font-semibold tracking-wide hover:bg-[hsl(43,74%,68%)] transition-all hover:shadow-lg hover:shadow-[hsl(43,74%,58%)]/20 active:scale-95"
              >
                Получить консультацию
              </button>
              <button
                onClick={() => scrollTo("#services")}
                className="border border-[hsl(45,60%,82%)]/40 text-[hsl(45,60%,82%)] px-8 py-4 font-golos tracking-wide hover:border-[hsl(43,74%,58%)] hover:text-[hsl(43,74%,58%)] transition-all"
              >
                Наши услуги
              </button>
            </div>
            <div className="flex gap-12 mt-16 animate-fade-up delay-400">
              {[["600+", "объектов сдано"], ["15", "лет на рынке"], ["98%", "клиентов довольны"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-cormorant text-4xl font-semibold text-[hsl(43,74%,58%)]">{num}</div>
                  <div className="font-golos text-[hsl(45,30%,70%)] text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => scrollTo("#services")} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[hsl(43,74%,58%)] animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[hsl(43,74%,58%)]" />
              <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">Что мы делаем</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-[hsl(220,35%,10%)] mb-3">Наши услуги</h2>
            <div className="gold-line w-24 mb-14" />
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(220,15%,88%)]">
            {SERVICES.map((s, i) => (
              <RevealSection key={s.title}>
                <div className="bg-white p-8 group hover:bg-[hsl(220,35%,10%)] transition-all duration-300 cursor-default h-full" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-12 h-12 flex items-center justify-center border border-[hsl(43,74%,58%)]/30 group-hover:border-[hsl(43,74%,58%)] mb-6 transition-colors">
                    <Icon name={s.icon} size={22} className="text-[hsl(43,74%,58%)]" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-[hsl(220,35%,10%)] group-hover:text-white mb-3 transition-colors">{s.title}</h3>
                  <p className="font-golos text-[hsl(220,10%,50%)] group-hover:text-[hsl(45,30%,78%)] text-sm leading-relaxed transition-colors">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[hsl(43,74%,58%)] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-golos">
                    <span>Подробнее</span><Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="process" className="py-24 bg-[hsl(220,35%,10%)]">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[hsl(43,74%,58%)]" />
              <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">Прозрачный процесс</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-white mb-3">Как мы работаем</h2>
            <div className="gold-line w-24 mb-16" />
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <RevealSection key={step.num}>
                <div className="relative" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="font-cormorant text-6xl font-light text-[hsl(43,74%,58%)]/20 mb-4 leading-none">{step.num}</div>
                  <div className="w-10 h-px bg-[hsl(43,74%,58%)] mb-5" />
                  <h3 className="font-cormorant text-2xl text-white mb-3">{step.title}</h3>
                  <p className="font-golos text-[hsl(220,10%,65%)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection>
            <div className="mt-16 p-8 border border-[hsl(43,74%,58%)]/20 bg-[hsl(220,35%,14%)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-cormorant text-3xl text-white mb-2">Готовы начать?</h3>
                  <p className="font-golos text-[hsl(220,10%,65%)] text-sm">Бесплатный выезд замерщика на следующий день после заявки.</p>
                </div>
                <button
                  onClick={() => scrollTo("#contacts")}
                  className="shrink-0 bg-[hsl(43,74%,58%)] text-[hsl(220,35%,10%)] px-8 py-4 font-golos font-semibold tracking-wide hover:bg-[hsl(43,74%,68%)] transition-all"
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[hsl(45,60%,96%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-[hsl(43,74%,58%)]" />
                  <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">Наша история</span>
                </div>
                <h2 className="font-cormorant text-5xl md:text-6xl text-[hsl(220,35%,10%)] mb-6">О компании</h2>
                <div className="gold-line w-24 mb-8" />
                <p className="font-golos text-[hsl(220,10%,40%)] leading-relaxed mb-6">
                  С 2008 года мы занимаемся ремонтом квартир, загородных домов и коммерческих объектов. За это время сдали более 600 объектов, воспитали команду из 80 профессионалов и заработали репутацию компании, которой доверяют.
                </p>
                <p className="font-golos text-[hsl(220,10%,40%)] leading-relaxed mb-10">
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
                      <div className="w-9 h-9 flex items-center justify-center bg-[hsl(43,74%,58%)]/10 shrink-0">
                        <Icon name={item.icon} size={16} className="text-[hsl(43,74%,58%)]" />
                      </div>
                      <span className="font-golos text-sm text-[hsl(220,25%,20%)]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
            <RevealSection>
              <div className="relative">
                <div className="aspect-[4/5] bg-[hsl(220,35%,10%)] overflow-hidden">
                  <img src={HERO_IMAGE} alt="О компании" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[hsl(43,74%,58%)] p-8 text-[hsl(220,35%,10%)]">
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
              <div className="w-8 h-px bg-[hsl(43,74%,58%)]" />
              <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">Мнения клиентов</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-[hsl(220,35%,10%)] mb-3">Отзывы</h2>
            <div className="gold-line w-24 mb-14" />
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <RevealSection key={r.name}>
                <div className="border border-[hsl(220,15%,88%)] p-8 hover:border-[hsl(43,74%,58%)]/40 hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-[hsl(43,74%,58%)] fill-[hsl(43,74%,58%)]" />
                    ))}
                  </div>
                  <p className="font-cormorant text-xl italic text-[hsl(220,25%,20%)] leading-relaxed mb-8">«{r.text}»</p>
                  <div className="border-t border-[hsl(220,15%,90%)] pt-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[hsl(220,35%,10%)] flex items-center justify-center font-cormorant text-[hsl(43,74%,58%)] text-lg font-semibold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-golos font-semibold text-[hsl(220,25%,15%)] text-sm">{r.name}</div>
                      <div className="font-golos text-[hsl(220,10%,55%)] text-xs mt-0.5">{r.role}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 bg-[hsl(220,15%,97%)]">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-[hsl(43,74%,58%)]" />
                  <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">Полезно знать</span>
                </div>
                <h2 className="font-cormorant text-5xl md:text-6xl text-[hsl(220,35%,10%)]">Блог</h2>
                <div className="gold-line w-24 mt-3" />
              </div>
              <button className="font-golos text-sm text-[hsl(220,35%,10%)] border border-[hsl(220,35%,10%)] px-6 py-3 hover:bg-[hsl(220,35%,10%)] hover:text-white transition-all">
                Все статьи
              </button>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <RevealSection key={post.title}>
                <article className="group cursor-pointer" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="aspect-video bg-[hsl(220,35%,10%)] mb-6 overflow-hidden relative">
                    <img src={HERO_IMAGE} alt={post.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[hsl(43,74%,58%)] text-[hsl(220,35%,10%)] font-golos text-xs font-semibold px-3 py-1 tracking-wide uppercase">{post.tag}</span>
                    </div>
                  </div>
                  <div className="font-golos text-xs text-[hsl(220,10%,55%)] mb-3 tracking-wide">{post.date}</div>
                  <h3 className="font-cormorant text-2xl text-[hsl(220,35%,10%)] mb-3 group-hover:text-[hsl(43,74%,42%)] transition-colors leading-snug">{post.title}</h3>
                  <p className="font-golos text-[hsl(220,10%,50%)] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-[hsl(43,74%,42%)] font-golos text-sm group-hover:gap-3 transition-all">
                    <span>Читать</span><Icon name="ArrowRight" size={14} />
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[hsl(220,35%,10%)]">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[hsl(43,74%,58%)]" />
              <span className="text-[hsl(43,74%,58%)] font-golos text-sm tracking-[0.2em] uppercase">Свяжитесь с нами</span>
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
                    <div className="w-11 h-11 border border-[hsl(43,74%,58%)]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={c.icon} size={18} className="text-[hsl(43,74%,58%)]" />
                    </div>
                    <div>
                      <div className="font-golos text-xs text-[hsl(220,10%,55%)] uppercase tracking-wider mb-1">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="font-golos text-[hsl(45,60%,82%)] hover:text-[hsl(43,74%,58%)] transition-colors">{c.value}</a>
                      ) : (
                        <span className="font-golos text-[hsl(45,60%,82%)]">{c.value}</span>
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
                    <label className="block font-golos text-xs text-[hsl(220,10%,55%)] uppercase tracking-wider mb-2">Имя</label>
                    <input type="text" placeholder="Иван Иванов" className="w-full bg-[hsl(220,35%,14%)] border border-[hsl(220,25%,22%)] text-[hsl(45,60%,82%)] px-4 py-3 font-golos text-sm placeholder:text-[hsl(220,10%,40%)] focus:outline-none focus:border-[hsl(43,74%,58%)] transition-colors" />
                  </div>
                  <div>
                    <label className="block font-golos text-xs text-[hsl(220,10%,55%)] uppercase tracking-wider mb-2">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-[hsl(220,35%,14%)] border border-[hsl(220,25%,22%)] text-[hsl(45,60%,82%)] px-4 py-3 font-golos text-sm placeholder:text-[hsl(220,10%,40%)] focus:outline-none focus:border-[hsl(43,74%,58%)] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block font-golos text-xs text-[hsl(220,10%,55%)] uppercase tracking-wider mb-2">Тип объекта</label>
                  <select className="w-full bg-[hsl(220,35%,14%)] border border-[hsl(220,25%,22%)] text-[hsl(45,60%,82%)] px-4 py-3 font-golos text-sm focus:outline-none focus:border-[hsl(43,74%,58%)] transition-colors">
                    <option value="">Выберите тип</option>
                    <option>Квартира</option>
                    <option>Частный дом</option>
                    <option>Коммерческое помещение</option>
                  </select>
                </div>
                <div>
                  <label className="block font-golos text-xs text-[hsl(220,10%,55%)] uppercase tracking-wider mb-2">Сообщение</label>
                  <textarea rows={4} placeholder="Опишите ваш объект и пожелания..." className="w-full bg-[hsl(220,35%,14%)] border border-[hsl(220,25%,22%)] text-[hsl(45,60%,82%)] px-4 py-3 font-golos text-sm placeholder:text-[hsl(220,10%,40%)] focus:outline-none focus:border-[hsl(43,74%,58%)] transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-[hsl(43,74%,58%)] text-[hsl(220,35%,10%)] py-4 font-golos font-semibold tracking-wide hover:bg-[hsl(43,74%,68%)] transition-all active:scale-[0.99]">
                  Отправить заявку
                </button>
                <p className="font-golos text-[hsl(220,10%,45%)] text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(220,40%,7%)] py-10 border-t border-[hsl(220,25%,16%)]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-cormorant text-xl font-bold text-[hsl(43,74%,58%)] tracking-widest uppercase">РемонтПро</div>
          <div className="font-golos text-[hsl(220,10%,50%)] text-sm text-center">© 2026 РемонтПро. Все права защищены.</div>
          <div className="flex gap-6">
            {["ВКонтакте", "Telegram", "WhatsApp"].map((s) => (
              <button key={s} className="font-golos text-[hsl(220,10%,50%)] text-sm hover:text-[hsl(43,74%,58%)] transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="chat-widget w-80 bg-white border border-[hsl(220,15%,88%)] flex flex-col overflow-hidden animate-fade-up">
            <div className="bg-[hsl(220,35%,10%)] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[hsl(43,74%,58%)] flex items-center justify-center">
                  <Icon name="MessageSquare" size={14} className="text-[hsl(220,35%,10%)]" />
                </div>
                <div>
                  <div className="font-golos font-semibold text-white text-sm">Онлайн-чат</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="font-golos text-xs text-[hsl(220,10%,65%)]">Онлайн</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[hsl(220,10%,60%)] hover:text-white transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-60 min-h-32 bg-[hsl(220,15%,97%)]">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 font-golos text-sm leading-relaxed ${m.from === "user" ? "bg-[hsl(220,35%,10%)] text-white" : "bg-white border border-[hsl(220,15%,88%)] text-[hsl(220,25%,20%)]"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[hsl(220,15%,88%)] flex gap-2 bg-white">
              <input
                type="text"
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Напишите вопрос..."
                className="flex-1 font-golos text-sm border border-[hsl(220,15%,88%)] px-3 py-2 focus:outline-none focus:border-[hsl(43,74%,58%)] transition-colors text-[hsl(220,25%,15%)] placeholder:text-[hsl(220,10%,60%)]"
              />
              <button onClick={sendMessage} className="bg-[hsl(43,74%,58%)] text-[hsl(220,35%,10%)] w-9 h-9 flex items-center justify-center hover:bg-[hsl(43,74%,68%)] transition-colors shrink-0">
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-[hsl(220,35%,10%)] text-[hsl(43,74%,58%)] flex items-center justify-center shadow-xl hover:bg-[hsl(220,35%,16%)] transition-all hover:scale-105 active:scale-95 border-2 border-[hsl(43,74%,58%)]/40"
          title="Онлайн-чат"
        >
          <Icon name={chatOpen ? "X" : "MessageSquare"} size={22} />
        </button>
      </div>
    </div>
  );
}