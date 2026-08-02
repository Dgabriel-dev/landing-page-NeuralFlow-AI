import Link from "next/link";
import Button from "@/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-xl text-gray-400">Página não encontrada</p>
      <p className="mt-2 text-gray-500">
        A página que você procura não existe ou foi movida.
      </p>
      <Button href="/" className="mt-8">
        Voltar ao Início
      </Button>
    </div>
  );
}
