import AboutComponents from "@/components/about.components";
import FooterComponents from "@/components/footer.components";
import HeroComponents from "@/components/hero.components";
import NavbarComponents from "@/components/navbar.components";
import ProjectsComponents from "@/components/projects.components";
import ServicesComponents from "@/components/services.components";

function Page() {
  return (
    <main className="mx-auto w-full max-w-[1440px] overflow-hidden">
      <NavbarComponents />
      <HeroComponents />
      <AboutComponents />
      <ServicesComponents />
      <ProjectsComponents />
      <FooterComponents />
    </main>
  );
}

export default Page;
