<template>
  <section class="min-h-screen min-w-screen">

    <!-- Wrapper per gestire il layout -->

    <div class="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">

      <div class="lg:flex lg:justify-between lg:gap-4">
        <header class="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl"><a href="/">Leonardo Bianco</a>
            </h1>
            <h2 class="mt-3 text-lg font-medium tracking-tight sm:text-xl">Software Developer</h2>
            <p class="mt-3 ">
            <div>Currently building enterprise applications...</div>
            </p>
            <NavLinks />
          </div>
          <SocialIcons />
        </header>
        <main class="pt-24 lg:w-1/2 lg:py-24">
          <section id="about" class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
            <div>
              <p class="mb-4">
                Back in 2017, I have decided to pursue a career in the IT field. Having always been passionate about
                technology, I tried my hand at creating small websites to see if I was actually suited for the job.
                To date, I have been fortunate enough to work for companies that have allowed me to grow both as a
                developer and as a person.
              </p>
              <p class="mb-4">
                Currently my main focus is to improve as a developer by trying to work on challenging technologies and
                products at
                <a class="font-bold leading-tight dark:text-light-blue hover:text-red focus-visible:text-red  group/link text-base"
                  href="https://www.eng.it/" target="_blank" rel="noreferrer noopener"
                  aria-label="Engineering Ingegneria Informatica (opens in a new tab)">
                  Engineering Ingegneria Informatica
                </a>.
              </p>
              <p class="mb-4">
                I generally work with web technologies like <span class="font-bold">Javascript</span> (Vue, Angular),
                <span class="font-bold">Java</span> (Spring) and <span class="font-bold">SQL</span>. I also like to
                automate some task with a scripting language like Python.
                In my own small way I also try to contribute to open source when I see web components that I use that
                can be improved.
              </p>
              <p>
                When I'm not at the computer, I'm usually working out, listening to music, reading or hanging out with
                my friends.</p>
            </div>
          </section>
          <section id="experience" class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
            <ExperienceCard v-for="experience in experiences" class="mb-12" :description="experience.description"
              :period="experience.period" :title="experience.title" :technologies="experience.techonologies"
              :link="experience.link" />
          </section>
          <footer class="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
            Design and layout inspired by <a
              class="inline-flex items-baseline leading-tight  hover:text-red focus-visible:text-red  group/link"
              href="https://github.com/bchiang7" target="_blank" rel="noreferrer noopener"
              aria-label="Brittany Chiang github (opens in a new tab)">
              Brittany Chiang
            </a>. Built with <a
              class="inline-flex items-baseline leading-tight  hover:text-red focus-visible:text-red  group/link"
              href="https://nuxt.com/" target="_blank" rel="noreferrer noopener"
              aria-label="Nuxt.js site (opens in a new tab)">
              Nuxt.js
            </a> and <a
              class="inline-flex items-baseline leading-tight  hover:text-red focus-visible:text-red  group/link"
              href="https://tailwindcss.com/" target="_blank" rel="noreferrer noopener"
              aria-label="Tailwind css site (opens in a new tab)">
              Tailwind
            </a>.
          </footer>
        </main>
      </div>

    </div>

  </section>
</template>

<script setup>
const experiences = [
  {
    period: '2022 — PRESENT',
    title: 'Software Developer - Engineering SPA',
    description: 'I\'m designing and developing full-stack web applications using Angular and Java (Spring Boot) for various clients in healthcare and finance such as Nexi, Intesa San Paolo, and various Italian hospitals. Collaborated with multidisciplinary teams to deliver high quality products in line with the requirements of various clients. Led the process of rewriting a document management system to take it from a very old architecture to a modern stack with Angular and Spring Boot.',
    techonologies: ['Java', 'Spring Boot', 'Angular', 'Oracle'],
    link: 'https://www.eng.it/'
  },
  {
    period: '2019 — 2022',
    title: 'Software Developer - Bridge Consulting',
    description: 'During my time at Bridge, I mainly developed frontend applications to help Baker Hughes mechanical engineers monitor their plants. I also developed a tool for Baker Hughes to automate report generation on industrial plants, reducing report turnaround time.',
    techonologies: ['Java', 'Spring Boot', 'Vue.js', 'D3.js', 'Oracle'],
    link: 'https://bridgeconsulting.it/'
  },
  {
    period: '2017 — 2019',
    title: 'Junior Software Developer - Omnia Group',
    description: 'At Omnia Group I started my journey by designing, developing and testing software applications in Java for various clients like Coop and BCC, ensuring full adherence to specifications and customer requirements',
    techonologies: ['Java', 'JavaScript'],
    link: 'https://www.omniagroup.it/'
  }
]

</script>

<style scoped>
.resume-button {
  color: #1D9AF2;
  background-color: #292D3E;
  border: 1px solid #1D9AF2;
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}

.resume-button:hover {
  box-shadow: 1px 1px #53a7ea, 2px 2px #53a7ea, 3px 3px #53a7ea;
  transform: translateX(-3px);
}
</style>
