import { LuDumbbell } from "react-icons/lu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 py-6 px-4 shadow-lg">
      <Link href="/">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <LuDumbbell className="h-8 w-8" />
            TÁ PAGO
          </h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
