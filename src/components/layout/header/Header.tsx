
import Logo from "./sections/logo/Logo";
import Navigation from "./sections/navigation/Navigation";
import Buttons from "./sections/buttons/Buttons";
import Sidebar from "./sections/sidebar/Sidebar";
import Container from "@/ui/Container";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl">
            <Container className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
                <Logo />

                <div className="hidden lg:flex">
                    <Navigation />
                </div>

                <div className="hidden lg:flex">
                    <Buttons />
                </div>

                <div className="flex lg:hidden">
                    <Sidebar />
                </div>
            </Container>
        </header>
    );
}
